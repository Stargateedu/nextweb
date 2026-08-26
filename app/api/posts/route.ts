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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

// GET /api/posts — list all posts (optionally filter by status)
export async function GET(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status")?.toUpperCase();

  const posts = await prisma.post.findMany({
    where: status === "PUBLISHED" || status === "DRAFT" ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ posts });
}

// POST /api/posts — create a new post
// Body (JSON): { title, content?, excerpt?, category?, status?, coverImage? }
// coverImage: base64 string (data:image/...;base64,...) or external URL
export async function POST(req: NextRequest) {
  if (!(await authorize(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const title = body.title as string | undefined;
  if (!title?.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  }

  const slug = slugify(title);
  const existing = await prisma.post.findUnique({ where: { slug } });
  if (existing) {
    return NextResponse.json({ error: `A post with slug "${slug}" already exists` }, { status: 409 });
  }

  // Find admin author (first ADMIN user)
  const admin = await prisma.user.findFirst({ where: { role: "ADMIN" } });
  if (!admin) {
    return NextResponse.json({ error: "No admin user found to assign as author" }, { status: 500 });
  }

  // Handle cover image
  let imageUrl: string | null = null;
  const coverImage = body.coverImage as string | undefined;

  if (coverImage) {
    if (coverImage.startsWith("data:image/")) {
      // Base64 upload
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
      imageUrl = `/uploads/posts/${filename}`;
    } else if (coverImage.startsWith("http://") || coverImage.startsWith("https://")) {
      // External URL — store as-is
      imageUrl = coverImage;
    } else {
      return NextResponse.json({ error: "coverImage must be a base64 data URI or an HTTP(S) URL" }, { status: 400 });
    }
  }

  const status = ((body.status as string) || "PUBLISHED").toUpperCase();
  const post = await prisma.post.create({
    data: {
      title: title.trim(),
      slug,
      category: ((body.category as string) || "General").trim(),
      status: status === "DRAFT" ? "DRAFT" : "PUBLISHED",
      excerpt: ((body.excerpt as string) || "").trim(),
      content: ((body.content as string) || "").trim() || null,
      imageUrl,
      authorId: admin.id,
    },
    include: { author: { select: { name: true, email: true } } },
  });

  return NextResponse.json({ post }, { status: 201 });
}
