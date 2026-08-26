import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const program = typeof body.program === "string" ? body.program.trim() : "";

  const detailParts = [`email: ${email}`];
  if (phone) detailParts.push(`phone: ${phone}`);
  if (program) detailParts.push(`program: ${program}`);
  detailParts.push(`message: ${message}`);

  await prisma.submission.create({
    data: {
      name,
      type: "CONTACT",
      details: detailParts.join(" | "),
    },
  });

  return NextResponse.json({ ok: true });
}
