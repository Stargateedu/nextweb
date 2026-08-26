import type { Metadata } from "next";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Courses | Stargate Education Consultants",
  description:
    "Browse our undergraduate, HND, and postgraduate programmes at top UK universities.",
};

const categories = [
  {
    title: "Undergraduate Degrees",
    subtitle: "BA & BSc Hons",
    level: "Bachelors",
    courses: [
      "BA/BSc (Hons) Accounting & Finance",
      "BSc (Hons) Accounting and Financial Management",
      "BA/BSc (Hons) Business Management",
      "BSc (Hons) Business & Tourism Management",
      "BSc (Hons) Computing",
      "BSc (Hons) Construction Management",
      "BSc (Hons) Project Management",
      "BA (Hons) LLB Law",
      "BSc (Hons) Applied Business Psychology",
      "BSc (Hons) Psychology with Counselling",
      "BSc (Hons) Health, Wellbeing and Social Care",
      "BSc (Hons) Healthcare Management",
      "BA/BSc (Hons) Psychology & Criminology",
    ],
  },
  {
    title: "Higher National Diplomas",
    subtitle: "HND — Vocational / Undergraduate",
    level: "HND",
    note: true,
    courses: [
      "HND in Business",
      "HND in Health and Social Care Practice",
      "HNC/HND in Healthcare Practice for England",
      "HND in Digital Technologies for England (Cyber Security)",
      "HND in Construction Management for England (Construction Design and Build Technician)",
    ],
  },
  {
    title: "Postgraduate Degrees",
    subtitle: "Masters",
    level: "Masters",
    note: true,
    courses: [
      "MSc Global Business",
      "MSc Project Management",
      "MSc Counselling and Psychotherapy",
    ],
  },
];

export default function CoursesPage() {
  return (
    <div>
      {/* HEADER */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Course Catalogue</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          Explore Our Programmes
        </SplitHeading>
        <Reveal delay={0.35}>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 700, margin: 0 }}>
            From undergraduate degrees to postgraduate qualifications, we offer a range of
            programmes designed to launch your career in the UK and beyond.
          </p>
        </Reveal>
      </div>

      {/* COURSE CATEGORIES */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 80px" }}>
        {categories.map((cat, catIdx) => (
          <Reveal
            key={cat.title}
            delay={catIdx * 0.1}
            style={{
              marginBottom: catIdx < categories.length - 1 ? 56 : 0,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 14,
                marginBottom: 28,
                borderBottom: `2px solid ${colors.gold}`,
                paddingBottom: 16,
              }}
            >
              <h2 style={{ fontSize: 26, fontWeight: 800, margin: 0, color: colors.ink }}>
                {cat.title}
              </h2>
              <span
                style={{
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.gold,
                }}
              >
                ({cat.subtitle}){cat.note ? "*" : ""}
              </span>
            </div>
            <div
              className="course-list-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 0,
              }}
            >
              {cat.courses.map((course) => (
                <div
                  key={course}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "16px 20px",
                    borderBottom: `1px solid ${colors.border}`,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: colors.gold,
                      flexShrink: 0,
                    }}
                  />
                  <span style={{ fontSize: 15, fontWeight: 500, color: colors.ink }}>
                    {course}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal delay={0.3}>
          <p style={{ fontSize: 13, color: colors.muted, marginTop: 32, fontStyle: "italic" }}>
            * Subject to availability. Contact us for the latest intake dates and entry requirements.
          </p>
        </Reveal>
      </div>

      {/* INFO BAND */}
      <div style={{ background: colors.cream }}>
        <Reveal
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "64px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 8px", color: colors.ink }}>
              Not sure which programme is right for you?
            </h2>
            <p style={{ fontSize: 15, color: colors.muted, margin: 0, maxWidth: 520 }}>
              Our advisors can help you choose the right course based on your qualifications,
              career goals, and interests.
            </p>
          </div>
          <Link
            href="/apply"
            style={{
              display: "inline-block",
              padding: "14px 32px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
              background: colors.ink,
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Get in Touch
          </Link>
        </Reveal>
      </div>

      <CtaBand
        title="Ready to Apply?"
        subtitle="Book a free consultation and let our advisors guide you to the right programme."
      />

      <style>{`
        @media (max-width: 768px) {
          .course-list-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
