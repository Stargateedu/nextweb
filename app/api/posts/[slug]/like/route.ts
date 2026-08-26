import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ slug: string }> };

// POST /api/posts/:slug/like — increment likes
export async function POST(_req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const updated = await prisma.post.update({
    where: { slug },
    data: { likes: { increment: 1 } },
    select: { likes: true, dislikes: true },
  });

  return NextResponse.json(updated);
}
