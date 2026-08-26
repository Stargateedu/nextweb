import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get("stargate-session")?.value;
  if (!token) return null;
  const session = await verifyToken(token);
  if (!session || session.role !== "ADMIN") return null;
  return session;
}

async function nextAgentCode(): Promise<string> {
  const last = await prisma.agent.findFirst({
    orderBy: { agentCode: "desc" },
    select: { agentCode: true },
  });
  if (!last) return "SG-0001";
  const num = parseInt(last.agentCode.replace("SG-", ""), 10);
  return `SG-${String(num + 1).padStart(4, "0")}`;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const agents = await prisma.agent.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ agents });
}

export async function POST(req: NextRequest) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { name, email, phone, country, tier, status } = body;

  if (!name?.trim() || !email?.trim() || !phone?.trim() || !country?.trim()) {
    return NextResponse.json({ error: "name, email, phone, and country are required" }, { status: 400 });
  }

  const agentCode = await nextAgentCode();
  const agent = await prisma.agent.create({
    data: {
      agentCode,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      country: country.trim(),
      tier: tier || "BRONZE",
      status: status || "APPROVED",
    },
  });

  return NextResponse.json({ agent }, { status: 201 });
}
