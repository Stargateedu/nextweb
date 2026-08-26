import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

async function authorize(req: NextRequest) {
  const key =
    req.headers.get("x-api-key") ||
    req.headers.get("authorization")?.replace("Bearer ", "");
  if (key === process.env.API_KEY) return true;
  const token = req.cookies.get("stargate-session")?.value;
  if (!token) return false;
  const session = await verifyToken(token);
  return session?.role === "ADMIN";
}

type Ctx = { params: Promise<{ slug: string }> };

// GET /api/posts/:slug
export async function GET(req: NextRequest, ctx: Ctx) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const post = await prisma.post.findUnique({
    where: { slug },
    include: { author: { select: { name: true, email: true } } },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

// PATCH /api/posts/:slug — update a post
export async function PATCH(req: NextRequest, ctx: Ctx) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  if (body.title !== undefined) data.title = (body.title as string).trim();
  if (body.category !== undefined) data.category = (body.category as string).trim();
  if (body.excerpt !== undefined) data.excerpt = (body.excerpt as string).trim();
  if (body.content !== undefined) data.content = (body.content as string).trim() || null;

  if (body.status !== undefined) {
    const s = (body.status as string).toUpperCase();
    data.status = s === "DRAFT" ? "DRAFT" : "PUBLISHED";
  }

  // Handle cover image update
  const coverImage = body.coverImage as string | undefined;
  if (coverImage !== undefined) {
    if (!coverImage) {
      data.imageUrl = null;
    } else if (coverImage.startsWith("data:image/")) {
      const match = coverImage.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!match) {
        return NextResponse.json({ error: "Invalid base64 image format" }, { status: 400 });
      }
      const ext = match[1] === "jpeg" ? "jpg" : match[1];
      const buffer = Buffer.from(match[2], "base64");
      const filename = `${slug}-${Date.now()}.${ext}`;
      const uploadDir = join(process.cwd(), "public", "uploads", "posts");
      await mkdir(uploadDir, { recursive: true });
      await writeFile(join(uploadDir, filename), buffer);
      data.imageUrl = `/uploads/posts/${filename}`;
    } else if (coverImage.startsWith("http://") || coverImage.startsWith("https://")) {
      data.imageUrl = coverImage;
    }
  }

  const post = await prisma.post.update({
    where: { slug },
    data,
    include: { author: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ post });
}

// DELETE /api/posts/:slug
export async function DELETE(req: NextRequest, ctx: Ctx) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await ctx.params;
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (!existing) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  await prisma.post.delete({ where: { slug } });
  return NextResponse.json({ message: "Post deleted" });
}
