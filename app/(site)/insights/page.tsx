import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import LiftCard from "@/components/anim/LiftCard";
import { colors } from "@/lib/theme";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Insights | Stargate Education Consultants",
  description: "Guidance for every stage of your application.",
};

export default async function InsightsPage() {
  const posts = await prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Insights & News</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          Guidance for Every Stage of Your Application
        </SplitHeading>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 100px" }}>
        {posts.length === 0 ? (
          <p style={{ fontSize: 16, color: colors.muted, textAlign: "center", padding: "60px 0" }}>
            No articles published yet. Check back soon!
          </p>
        ) : (
          <Reveal
            className="blog-grid"
            stagger={0.1}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}
          >
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/insights/${post.slug}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <LiftCard accent={false} lift={-6} style={{ paddingBottom: 4 }}>
                  <div data-lift-icon style={{ overflow: "hidden", marginBottom: 20 }}>
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
                      />
                    ) : (
                      <ImagePlaceholder label="Article image" style={{ width: "100%", height: 200 }} />
                    )}
                  </div>
                  <div style={{ margin: "10px"}}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: colors.gold, marginBottom: 10 }}>
                      {post.category}
                    </div>
                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4 }}>{post.title}</h3>
                    <p style={{ fontSize: 13, color: colors.silver, margin: "0 0 12px" }}>
                      {post.createdAt.toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                    </p>
                    <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted, margin: 0 }}>{post.excerpt}</p>
                  </div>
                </LiftCard>
              </Link>
            ))}
          </Reveal>
        )}
      </div>

      <style>{`
        @media (max-width: 860px) {
          .blog-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
