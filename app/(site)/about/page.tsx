import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import LiftCard from "@/components/anim/LiftCard";
import Parallax from "@/components/anim/Parallax";
import { CapIcon, ShieldIcon, PeopleIcon, GlobeIcon } from "@/components/icons";
import { TrendIcon } from "@/components/icons";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "About | Stargate Education Consultants",
  description: "Stargate Education Consultants is a student recruitment agency committed to opening doors to global education.",
};

const values = [
  { icon: TrendIcon, title: "Opportunity", desc: "Doors opened to institutions once out of reach." },
  { icon: ShieldIcon, title: "Trust", desc: "Honest guidance at every step of the process." },
  { icon: PeopleIcon, title: "Community", desc: "A network of alumni and advisors behind you." },
  { icon: GlobeIcon, title: "Growth", desc: "Preparing students for life far beyond graduation." },
  { icon: CapIcon, title: "Future", desc: "Every placement is an investment in what comes next." },
];

const team = [
  { id: "team-1", name: "Eleanor Reyes", role: "FOUNDER & DIRECTOR" },
  { id: "team-2", name: "Marcus Whitfield", role: "HEAD OF ADMISSIONS" },
  { id: "team-3", name: "Priya Nair", role: "VISA & IMMIGRATION LEAD" },
  { id: "team-4", name: "Daniel Osei", role: "STUDENT SUCCESS MANAGER" },
];

export default function AboutPage() {
  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>About Us</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 44, fontWeight: 800, margin: "0 0 28px", maxWidth: 760 }}>
          Opening Doors to Global Education
        </SplitHeading>
        <Reveal delay={0.35}>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 720, margin: 0 }}>
            Stargate Education Consultants is a student recruitment agency committed to opening doors to global
            education. Our brand represents progress, trust, and the pursuit of a future beyond boundaries.
          </p>
        </Reveal>
      </div>

      <div style={{ background: colors.cream }}>
        <div className="story-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <Reveal variant="left" duration={1}>
            <Parallax amount={44} style={{ width: "100%", height: 420 }}>
              <ImagePlaceholder label="A founding-team or office photo" style={{ width: "100%", height: "100%" }} />
            </Parallax>
          </Reveal>
          <Reveal variant="right" duration={1}>
            <Eyebrow>Our Story</Eyebrow>
            <h2 style={{ fontSize: 30, fontWeight: 800, margin: "0 0 20px" }}>Built on Trust, Driven by Ambition</h2>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: "0 0 16px" }}>
              Founded by a team who once navigated the UK application process themselves, Stargate was created to
              make that path clearer for the students who follow.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: 0 }}>
              Twelve years on, we&rsquo;ve built lasting partnerships with universities across Britain and supported
              hundreds of students to study, work, and settle abroad with confidence.
            </p>
          </Reveal>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "100px 32px" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
          <Eyebrow style={{ display: "block" }}>What We Stand For</Eyebrow>
          <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>Our Values</h2>
        </Reveal>
        <Reveal
          className="values-grid"
          stagger={0.1}
          style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 32 }}
        >
          {values.map((v) => (
            <LiftCard key={v.title} lift={-6} accent={false} style={{ textAlign: "center", padding: "20px 8px" }}>
              <v.icon size={28} style={{ margin: "0 auto 16px", display: "block" }} data-lift-icon />
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 0.5, marginBottom: 8 }}>
                {v.title.toUpperCase()}
              </div>
              <div style={{ fontSize: 13, color: colors.muted, lineHeight: 1.5 }}>{v.desc}</div>
            </LiftCard>
          ))}
        </Reveal>
      </div>

      <div style={{ background: colors.cream }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 56 }}>
            <Eyebrow style={{ display: "block" }}>Meet the Team</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>The People Behind Stargate</h2>
          </Reveal>
          <Reveal
            className="team-grid"
            variant="scale"
            stagger={0.12}
            style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32 }}
          >
            {team.map((t) => (
              <LiftCard key={t.id} lift={-6} accent={false} style={{ textAlign: "center", padding: "16px 8px" }}>
                <div data-lift-icon>
                  <ImagePlaceholder
                    label="Photo"
                    shape="circle"
                    style={{ width: 140, height: 140, margin: "0 auto 16px" }}
                  />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700 }}>{t.name}</div>
                <div style={{ fontSize: 12, color: colors.silver, letterSpacing: 0.5 }}>{t.role}</div>
              </LiftCard>
            ))}
          </Reveal>
        </div>
      </div>

      <CtaBand title="Let's Build Your Future, Together" />

      <style>{`
        @media (max-width: 860px) {
          .story-grid {
            grid-template-columns: 1fr !important;
          }
          .values-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .team-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
