import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import CtaBand from "@/components/CtaBand";
import { QuoteIcon, CapIcon, ShieldIcon, TrendIcon } from "@/components/icons";
import { colors, CTA_LABEL } from "@/lib/theme";

const stats = [
  { value: "500+", label: "STUDENTS PLACED" },
  { value: "98%", label: "VISA SUCCESS RATE" },
  { value: "40+", label: "PARTNER UNIVERSITIES" },
  { value: "12", label: "YEARS OF EXCELLENCE" },
];

const services = [
  {
    icon: CapIcon,
    title: "Study-Abroad Placement",
    desc: "Matched to the right UK institution and course for your goals.",
  },
  {
    icon: ShieldIcon,
    title: "Visa Support",
    desc: "End-to-end guidance through UK student visa documentation.",
  },
  {
    icon: TrendIcon,
    title: "Test Preparation",
    desc: "IELTS and academic coaching to meet entry requirements.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <div className="hero-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px 90px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64, alignItems: "center" }}>
        <div>
          <Eyebrow>Study in the United Kingdom</Eyebrow>
          <h1 style={{ fontSize: 56, lineHeight: 1.08, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.5 }}>
            Beyond Education.
            <br />
            Beyond Boundaries.
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.7, color: colors.muted, maxWidth: 480, margin: "0 0 36px" }}>
            Stargate Education Group guides ambitious students from application to arrival, opening doors to
            Britain&rsquo;s most prestigious universities.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact" style={{ background: colors.ink, color: colors.bg, padding: "16px 32px", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
              {CTA_LABEL}
            </Link>
            <Link href="/how-it-works" style={{ background: "transparent", color: colors.ink, border: `1.5px solid ${colors.ink}`, padding: "16px 32px", fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
              How It Works
            </Link>
          </div>
        </div>
        <ImagePlaceholder label="Students on a UK campus" style={{ width: "100%", height: 480 }} />
      </div>

      {/* STATS */}
      <div style={{ background: colors.ink, color: colors.bg }}>
        <div className="stats-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}>
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: colors.gold }}>{s.value}</div>
              <div style={{ fontSize: 12, letterSpacing: 1, color: colors.silver, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SERVICES PREVIEW */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>Our Services</h2>
          </div>
          <Link href="/services" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, borderBottom: `1.5px solid ${colors.ink}`, paddingBottom: 4 }}>
            VIEW ALL SERVICES →
          </Link>
        </div>
        <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: colors.border }}>
          {services.map((s) => (
            <div key={s.title} style={{ background: colors.bg, padding: "40px 32px" }}>
              <s.icon style={{ marginBottom: 20 }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* UK SPOTLIGHT */}
      <div style={{ background: colors.cream }}>
        <div className="spotlight-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }}>
          <ImagePlaceholder label="A UK landmark or campus photo" style={{ width: "100%", height: 420 }} />
          <div>
            <Eyebrow>Destination Spotlight</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>Your Gateway to the United Kingdom</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.muted, margin: "0 0 24px" }}>
              From Oxford and Cambridge to Imperial, LSE, and the Russell Group, we place students at institutions
              renowned the world over — with support that continues long after the offer letter arrives.
            </p>
            <Link href="/services" style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, borderBottom: `1.5px solid ${colors.ink}`, paddingBottom: 4 }}>
              EXPLORE UK PROGRAMS →
            </Link>
          </div>
        </div>
      </div>

      {/* TESTIMONIAL */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ maxWidth: 760, textAlign: "center" }}>
            <QuoteIcon size={32} style={{ marginBottom: 24 }} />
            <p style={{ fontSize: 24, lineHeight: 1.5, fontWeight: 600, margin: "0 0 24px" }}>
              &ldquo;Stargate turned an overwhelming process into a clear path — from my first call to landing at
              Manchester, I never felt alone in it.&rdquo;
            </p>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.5, color: colors.muted }}>
              AMARA O. — MSc DATA SCIENCE, UNIVERSITY OF MANCHESTER
            </div>
            <Link href="/success-stories" style={{ display: "inline-block", marginTop: 24, fontSize: 13, fontWeight: 700, letterSpacing: 0.5, borderBottom: `1.5px solid ${colors.ink}`, paddingBottom: 4 }}>
              READ MORE STORIES →
            </Link>
          </div>
        </div>
      </div>

      <CtaBand
        title={
          <>
            Ready to Begin Your Journey
            <br />
            Beyond Boundaries?
          </>
        }
        subtitle="Book a free consultation with a Stargate advisor and take the first step toward studying in the UK."
      />

      <style>{`
        @media (max-width: 860px) {
          .hero-grid,
          .spotlight-grid {
            grid-template-columns: 1fr !important;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .services-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
