import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { colors } from "@/lib/theme";
import PostInteractions from "./PostInteractions";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({ where: { slug } });
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Stargate Education Consultants`,
    description: post.excerpt,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug, status: "PUBLISHED" },
    include: {
      author: { select: { name: true } },
      comments: { orderBy: { createdAt: "desc" } },
    },
  });

  if (!post) notFound();

  const similarPosts = await prisma.post.findMany({
    where: {
      category: post.category,
      status: "PUBLISHED",
      id: { not: post.id },
    },
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  const date = post.createdAt.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div>
      {/* HEADER */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 40px" }}>
        <div style={{ marginBottom: 24 }}>
          <Link
            href="/insights"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: colors.muted,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15,18 9,12 15,6" />
            </svg>
            Back to Insights
          </Link>
        </div>

        <div
          style={{
            display: "inline-block",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: 1,
            color: colors.gold,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          {post.category}
        </div>

        <h1
          style={{
            fontSize: 38,
            fontWeight: 800,
            lineHeight: 1.2,
            color: colors.ink,
            margin: "0 0 16px",
            letterSpacing: -0.5,
          }}
        >
          {post.title}
        </h1>

        <p style={{ fontSize: 17, lineHeight: 1.7, color: colors.muted, margin: "0 0 20px" }}>
          {post.excerpt}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 13, color: colors.silver }}>
          <span style={{ fontWeight: 600, color: colors.ink }}>{post.author.name}</span>
          <span>&middot;</span>
          <span>{date}</span>
        </div>
      </div>

      {/* COVER IMAGE */}
      {post.imageUrl && (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 24px 40px" }}>
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{
              width: "100%",
              height: "auto",
              maxHeight: 480,
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px 60px" }}>
        {post.content ? (
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
            style={{ fontSize: 16, lineHeight: 1.85, color: colors.ink }}
          />
        ) : (
          <p style={{ fontSize: 16, lineHeight: 1.85, color: colors.muted, fontStyle: "italic" }}>
            Full article content coming soon.
          </p>
        )}
      </div>

      {/* INTERACTIONS */}
      <PostInteractions
        slug={post.slug}
        initialLikes={post.likes}
        initialDislikes={post.dislikes}
        initialComments={post.comments.map((c) => ({
          id: c.id,
          name: c.name,
          content: c.content,
          createdAt: c.createdAt.toISOString(),
        }))}
      />

      {/* SIMILAR POSTS */}
      {similarPosts.length > 0 && (
        <div style={{ background: colors.cream }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "60px 24px" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 28px", color: colors.ink }}>
              Similar Posts
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {similarPosts.map((sp) => (
                <Link
                  key={sp.id}
                  href={`/insights/${sp.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 20,
                    padding: "20px 0",
                    borderBottom: `1px solid ${colors.border}`,
                    textDecoration: "none",
                  }}
                >
                  {sp.imageUrl && (
                    <img
                      src={sp.imageUrl}
                      alt={sp.title}
                      style={{
                        width: 100,
                        height: 70,
                        objectFit: "cover",
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: 1,
                        color: colors.gold,
                        textTransform: "uppercase",
                        marginBottom: 6,
                      }}
                    >
                      {sp.category}
                    </div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, color: colors.ink, lineHeight: 1.4 }}>
                      {sp.title}
                    </h3>
                    <p style={{ fontSize: 13, color: colors.muted, margin: "6px 0 0", lineHeight: 1.5 }}>
                      {sp.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        .post-content h2 { font-size: 24px; font-weight: 700; margin: 36px 0 16px; }
        .post-content h3 { font-size: 20px; font-weight: 700; margin: 28px 0 12px; }
        .post-content p { margin: 0 0 20px; }
        .post-content ul, .post-content ol { margin: 0 0 20px; padding-left: 24px; }
        .post-content li { margin-bottom: 8px; }
        .post-content img { max-width: 100%; height: auto; margin: 24px 0; }
        .post-content blockquote {
          border-left: 3px solid ${colors.gold};
          padding: 12px 20px;
          margin: 24px 0;
          font-style: italic;
          color: ${colors.muted};
        }
        .post-content a { color: ${colors.gold}; font-weight: 600; }
      `}</style>
    </div>
  );
}
