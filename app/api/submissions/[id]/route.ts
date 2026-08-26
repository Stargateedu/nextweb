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

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: NextRequest, ctx: Ctx) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  const body = await req.json();

  const data: Record<string, unknown> = {};
  if (typeof body.read === "boolean") data.read = body.read;

  const submission = await prisma.submission.update({ where: { id }, data });
  return NextResponse.json({ submission });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  await prisma.submission.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
