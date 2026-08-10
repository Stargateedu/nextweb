import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Insights | Stargate Education Group",
  description: "Guidance for every stage of your application.",
};

const articles = [
  {
    id: "blog-1",
    tag: "ADMISSIONS",
    title: "Top UK Universities for International Students in 2026",
    date: "March 2026",
    excerpt: "A look at the Russell Group institutions attracting the most international applicants this year.",
  },
  {
    id: "blog-2",
    tag: "VISA",
    title: "Understanding the UK Student Visa Process, Step by Step",
    date: "February 2026",
    excerpt: "Everything you need to know about the CAS, financial evidence, and interview stage.",
  },
  {
    id: "blog-3",
    tag: "FUNDING",
    title: "Five Scholarships UK-Bound Students Overlook",
    date: "January 2026",
    excerpt: "Lesser-known funding routes that can significantly offset tuition and living costs.",
  },
  {
    id: "blog-4",
    tag: "TEST PREP",
    title: "How to Raise Your IELTS Score in Six Weeks",
    date: "December 2025",
    excerpt: "A study plan our test-prep coaches use with students ahead of application deadlines.",
  },
  {
    id: "blog-5",
    tag: "LIFE ABROAD",
    title: "Settling In: A First-Term Checklist for New Students",
    date: "November 2025",
    excerpt: "Practical steps for banking, housing, and healthcare in your first weeks in the UK.",
  },
  {
    id: "blog-6",
    tag: "ADMISSIONS",
    title: "Writing a Personal Statement That Stands Out",
    date: "October 2025",
    excerpt: "What admissions officers actually look for, from our head of admissions.",
  },
];

export default function InsightsPage() {
  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Eyebrow>Insights & News</Eyebrow>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          Guidance for Every Stage of Your Application
        </h1>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 100px" }}>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {articles.map((a) => (
            <div key={a.id}>
              <ImagePlaceholder label="Article image" style={{ width: "100%", height: 200, marginBottom: 20 }} />
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: colors.gold, marginBottom: 10 }}>
                {a.tag}
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px", lineHeight: 1.4 }}>{a.title}</h3>
              <p style={{ fontSize: 13, color: colors.silver, margin: "0 0 12px" }}>{a.date}</p>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted, margin: 0 }}>{a.excerpt}</p>
            </div>
          ))}
        </div>
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
