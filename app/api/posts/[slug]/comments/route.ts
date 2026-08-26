import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Ctx = { params: Promise<{ slug: string }> };

// GET /api/posts/:slug/comments — list comments
export async function GET(_req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  const comments = await prisma.comment.findMany({
    where: { postId: post.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comments });
}

// POST /api/posts/:slug/comments — add a comment
export async function POST(req: NextRequest, ctx: Ctx) {
  const { slug } = await ctx.params;

  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = (body.name as string)?.trim();
  const content = (body.content as string)?.trim();

  if (!name || !content) {
    return NextResponse.json({ error: "name and content are required" }, { status: 400 });
  }

  const comment = await prisma.comment.create({
    data: { name, content, postId: post.id },
  });

  return NextResponse.json({ comment }, { status: 201 });
}
