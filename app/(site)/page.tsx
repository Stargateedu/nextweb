import Eyebrow from "@/components/Eyebrow";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import CountUp from "@/components/anim/CountUp";
import LiftCard from "@/components/anim/LiftCard";
import ArrowLink from "@/components/anim/ArrowLink";
import FillButton from "@/components/anim/FillButton";
import Magnetic from "@/components/anim/Magnetic";
import Parallax from "@/components/anim/Parallax";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import { QuoteIcon, CapIcon, ShieldIcon, TrendIcon } from "@/components/icons";
import { colors, CTA_LABEL } from "@/lib/theme";

const stories = [
  {
    quote: "Stargate turned an overwhelming process into a clear path — I never felt alone in it.",
    name: "Amara O.",
    program: "MSc Data Science, Manchester",
    image: "/images/story-tomasz.webp",
  },
  {
    quote: "My visa was approved without a single issue. The mock interview made all the difference.",
    name: "Rohan K.",
    program: "BSc Economics, LSE",
    image: "/images/story-tomasz.webp",
  },
  {
    quote: "They found me a scholarship I didn't even know I qualified for.",
    name: "Chidi E.",
    program: "MEng, Imperial College London",
    image: "/images/story-tomasz.webp",
  },
  {
    quote: "From our first call, I knew exactly what to do next. That clarity was everything.",
    name: "Sofia M.",
    program: "LLB Law, University of Bristol",
    image: "/images/story-tomasz.webp",
  },
  {
    quote: "Stargate's team felt like they cared as much about my future as I did.",
    name: "Tomasz W.",
    program: "MA International Relations, Edinburgh",
    image: "/images/story-tomasz.webp",
  },
  {
    quote: "I applied to five universities and got into four, thanks to their shortlist strategy.",
    name: "Yuki T.",
    program: "BA Architecture, University of Bath",
    image: "/images/story-tomasz.webp",
  },
];

const courses = [
  { title: "BA/BSc (Hons) Business Management", level: "Bachelors" },
  { title: "BSc (Hons) Computing", level: "Bachelors" },
  { title: "MSc Global Business", level: "Masters" },
  { title: "BA (Hons) LLB Law", level: "Bachelors" },
  { title: "MSc Project Management", level: "Masters" },
  { title: "HND in Digital Technologies (Cyber Security)", level: "HND" },
];

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
          <Reveal variant="fade" duration={0.7}>
            <Eyebrow>Study in the United Kingdom</Eyebrow>
          </Reveal>
          <SplitHeading
            delay={0.15}
            style={{ fontSize: 56, lineHeight: 1.08, fontWeight: 800, margin: "0 0 24px", letterSpacing: -0.5 }}
          >
            Beyond Education.
            <br />
            Beyond Boundaries.
          </SplitHeading>
          <Reveal delay={0.55} duration={0.8}>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: colors.muted, maxWidth: 480, margin: "0 0 36px" }}>
              Stargate Education Consultants guides ambitious students from application to arrival, opening doors to
              Britain&rsquo;s most prestigious universities.
            </p>
          </Reveal>
          <Reveal delay={0.7} duration={0.8} style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Magnetic>
              <FillButton hoverColor={colors.gold} href="/apply" tone="ink">
                {CTA_LABEL}
              </FillButton>
            </Magnetic>
            <Magnetic>
              <FillButton hoverColor={colors.gold} href="/how-it-works" tone="outline">
                How It Works
              </FillButton>
            </Magnetic>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.3} duration={1.1}>
          <Parallax amount={60} style={{ width: "100%", height: 480 }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: 'url("/images/hero.webp")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Parallax>
        </Reveal>
      </div>

      {/* STATS */}
      <div style={{ background: colors.ink, color: colors.bg }}>
        <Reveal
          className="stats-grid"
          stagger={0.12}
          style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 32px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 38, fontWeight: 800, color: colors.gold }}>
                <CountUp value={s.value} />
              </div>
              <div style={{ fontSize: 12, letterSpacing: 1, color: colors.silver, marginTop: 8 }}>{s.label}</div>
            </div>
          ))}
        </Reveal>
      </div>

      {/* ADMISSIONS 2026 */}
      <div style={{ background: colors.cream }}>
        <div
          className="admissions-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "100px 32px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "start",
          }}
        >
          <Reveal variant="left" duration={0.9}>
            <Eyebrow>Now Open</Eyebrow>
            <h2 style={{ fontSize: 42, fontWeight: 800, margin: "0 0 12px", lineHeight: 1.1 }}>
              Taking Admissions <span style={{ color: colors.gold }}>2026</span>
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.muted, margin: "0 0 32px", maxWidth: 440 }}>
              No prior qualifications required — only in selected universities. Day &amp; evening options available.
            </p>

            <div style={{ display: "flex", gap: 20, marginBottom: 36, flexWrap: "wrap" }}>
              <div style={{ background: colors.gold, padding: "16px 24px", flex: "1 1 140px" }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: colors.ink }}>£24,000</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.ink, marginTop: 2 }}>
                  Funding Available<br />Including Tuition Fees
                </div>
              </div>
              <div style={{ background: colors.ink, padding: "16px 24px", flex: "1 1 140px" }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: colors.gold, letterSpacing: 0.5 }}>DAY &amp; EVENING</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: colors.silver, marginTop: 4 }}>Options Available</div>
              </div>
            </div>

            <Magnetic>
              <FillButton href="/apply" tone="ink" hoverColor={colors.gold}>
                {CTA_LABEL}
              </FillButton>
            </Magnetic>
          </Reveal>

          <Reveal variant="right" duration={0.9}>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.gold, marginBottom: 16 }}>ALL THE COURSES</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                {[
                  "Business Management", "Construction Management", "Project Management",
                  "Health and Social Care", "LLB Law", "Digital Marketing",
                  "Management", "Accounting & Finance", "Psychology & Counselling",
                  "Health and Care Management", "Computing",
                ].map((course) => (
                  <div
                    key={course}
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: colors.ink,
                      paddingLeft: 16,
                      position: "relative",
                    }}
                  >
                    <span style={{ position: "absolute", left: 0, color: colors.gold, fontWeight: 800 }}>›</span>
                    {course}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.gold, marginBottom: 16 }}>CAMPUSES</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 24px" }}>
                {["London", "Leeds", "Leicester", "Derby", "Manchester", "Bradford", "Birmingham", "Newcastle"].map((city) => (
                  <div key={city} style={{ fontSize: 14, fontWeight: 600, color: colors.ink, display: "flex", alignItems: "center", gap: 6 }}>
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
                      <path d="M6 0C2.7 0 0 2.7 0 6c0 4.5 6 10 6 10s6-5.5 6-10c0-3.3-2.7-6-6-6zm0 8.2c-1.2 0-2.2-1-2.2-2.2S4.8 3.8 6 3.8s2.2 1 2.2 2.2S7.2 8.2 6 8.2z" fill={colors.gold} />
                    </svg>
                    {city}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .admissions-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* SERVICES PREVIEW */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow>What We Do</Eyebrow>
            <h2 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>Our Services</h2>
          </div>
          <ArrowLink href="/services">VIEW ALL SERVICES</ArrowLink>
        </Reveal>
        <Reveal
          className="services-grid"
          stagger={0.14}
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: colors.border }}
        >
          {services.map((s) => (
            <LiftCard key={s.title} style={{ background: colors.bg, padding: "40px 32px" }}>
              <s.icon style={{ marginBottom: 20 }} data-lift-icon />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 10px" }}>{s.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted, margin: 0 }}>{s.desc}</p>
            </LiftCard>
          ))}
        </Reveal>
      </div>

      {/* UK SPOTLIGHT */}
      <div style={{ background: colors.cream }}>
        <div className="spotlight-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 64, alignItems: "center" }}>
          <Reveal variant="left" duration={1}>
            <Parallax amount={50} style={{ width: "100%", height: 420 }}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundImage: 'url("/images/cta.webp")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              />
            </Parallax>
          </Reveal>
          <Reveal variant="right" duration={1}>
            <Eyebrow>Destination Spotlight</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: "0 0 20px" }}>Your Gateway to the United Kingdom</h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.muted, margin: "0 0 24px" }}>
              From Oxford and Cambridge to Imperial, LSE, and the Russell Group, we place students at institutions
              renowned the world over — with support that continues long after the offer letter arrives.
            </p>
            <ArrowLink href="/services">EXPLORE UK PROGRAMS</ArrowLink>
          </Reveal>
        </div>
      </div>

      {/* FEATURED COURSES */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
          <div>
            <Eyebrow>Popular Programmes</Eyebrow>
            <h2 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>Featured Courses</h2>
          </div>
          <ArrowLink href="/courses">VIEW ALL COURSES</ArrowLink>
        </Reveal>
        <Reveal
          className="courses-grid"
          stagger={0.1}
          style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: colors.border }}
        >
          {courses.map((c) => (
            <LiftCard key={c.title} style={{ background: colors.bg, padding: "32px 28px" }}>
              <span
                style={{
                  display: "inline-block",
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  background: c.level === "Masters" ? colors.ink : c.level === "HND" ? colors.gold : colors.cream,
                  color: c.level === "Masters" ? colors.gold : c.level === "HND" ? colors.ink : colors.muted,
                  padding: "3px 10px",
                  marginBottom: 14,
                }}
              >
                {c.level}
              </span>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: colors.ink }}>{c.title}</h3>
            </LiftCard>
          ))}
        </Reveal>
      </div>

      {/* SUCCESS STORIES */}
      <div style={{ background: colors.cream }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow>Success Stories</Eyebrow>
            <h2 style={{ fontSize: 34, fontWeight: 800, margin: 0 }}>
              Students Who Went Beyond Boundaries
            </h2>
          </Reveal>
          <Reveal
            className="stories-grid"
            stagger={0.1}
            style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}
          >
            {stories.map((s) => (
              <LiftCard key={s.name} style={{ background: colors.bg, border: `1px solid ${colors.border}`, padding: "36px 28px" }}>
                <QuoteIcon size={24} style={{ marginBottom: 16 }} data-lift-icon />
                <p style={{ fontSize: 15, lineHeight: 1.65, margin: "0 0 20px" }}>
                  &ldquo;{s.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <ImagePlaceholder label="Photo" shape="circle" src={s.image} alt={s.name} style={{ width: 44, height: 44, flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                    <div style={{ fontSize: 11, color: colors.silver }}>{s.program}</div>
                  </div>
                </div>
              </LiftCard>
            ))}
          </Reveal>
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
          .services-grid,
          .courses-grid,
          .stories-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
