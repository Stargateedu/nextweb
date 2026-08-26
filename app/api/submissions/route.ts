import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { sendSubmissionEmails } from "@/lib/mail";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("stargate-session")?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const submissions = await prisma.submission.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ submissions });
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const type = typeof body.type === "string" ? body.type : "";
  const details = typeof body.details === "string" ? body.details.trim() : "";

  if (!name || !type || !details) {
    return NextResponse.json({ error: "name, type, and details are required." }, { status: 400 });
  }

  const validTypes = ["CONTACT", "STUDENT_APPLICATION", "AGENT_ENQUIRY", "JOB_APPLICATION"];
  if (!validTypes.includes(type)) {
    return NextResponse.json({ error: "Invalid submission type." }, { status: 400 });
  }

  const submission = await prisma.submission.create({
    data: {
      name,
      type: type as "CONTACT" | "STUDENT_APPLICATION" | "AGENT_ENQUIRY" | "JOB_APPLICATION",
      details,
    },
  });

  sendSubmissionEmails(type, name, details).catch(() => {});

  return NextResponse.json({ submission }, { status: 201 });
}
