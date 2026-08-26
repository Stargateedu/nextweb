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
  const { name, email, phone, country, tier, status } = body;

  const data: Record<string, string> = {};
  if (name?.trim()) data.name = name.trim();
  if (email?.trim()) data.email = email.trim();
  if (phone?.trim()) data.phone = phone.trim();
  if (country?.trim()) data.country = country.trim();
  if (tier) data.tier = tier;
  if (status) data.status = status;

  const agent = await prisma.agent.update({ where: { id }, data });
  return NextResponse.json({ agent });
}

export async function DELETE(req: NextRequest, ctx: Ctx) {
  const admin = await requireAdmin(req);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await ctx.params;
  await prisma.agent.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
