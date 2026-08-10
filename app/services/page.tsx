import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import CtaBand from "@/components/CtaBand";
import { CapIcon, ShieldIcon, TrendIcon, GlobeIcon, ScholarshipIcon } from "@/components/icons";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Services | Stargate Education Group",
  description: "Services built around your application — from first shortlist to landing on campus.",
};

const services = [
  {
    icon: CapIcon,
    title: "Study-Abroad Placement",
    desc: "We match your academic profile and goals against 40+ partner universities to build a shortlist you'll actually get into.",
    bullets: ["Course & university matching", "Personal statement review", "Offer negotiation support"],
  },
  {
    icon: ShieldIcon,
    title: "Visa Support",
    desc: "A 98% visa success rate comes from getting the paperwork right the first time. We prepare and check every document with you.",
    bullets: ["CAS & financial documentation", "Mock visa interviews", "Pre-departure briefing"],
  },
  {
    icon: TrendIcon,
    title: "Test Preparation",
    desc: "Structured IELTS and academic English coaching, with practice testing to make sure you meet entry requirements the first time.",
    bullets: ["IELTS & TOEFL coaching", "Mock exams", "Score improvement plans"],
  },
  {
    icon: GlobeIcon,
    title: "University Application Guidance",
    desc: "From UCAS forms to reference letters, we manage the details so nothing holds up your application.",
    bullets: ["UCAS & direct applications", "Document checklists", "Deadline tracking"],
  },
  {
    icon: ScholarshipIcon,
    title: "Scholarships & Funding",
    desc: "We identify scholarships, bursaries, and funding routes you qualify for, and help you build a competitive application.",
    bullets: ["Scholarship matching", "Application & essay support", "Financial planning guidance"],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Eyebrow>What We Offer</Eyebrow>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          Services Built Around Your Application
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 700, margin: 0 }}>
          Every student&rsquo;s path to the UK looks different. Our services cover each stage — from first shortlist
          to landing on campus.
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 40px" }}>
        {services.map((s, i) => (
          <div
            key={s.title}
            className="service-row"
            style={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              gap: 40,
              alignItems: "start",
              padding: "48px 0",
              borderTop: `1px solid ${colors.border}`,
              borderBottom: i === services.length - 1 ? `1px solid ${colors.border}` : undefined,
            }}
          >
            <s.icon size={40} color={colors.gold} strokeWidth={1.4} />
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 12px" }}>{s.title}</h3>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: colors.muted, margin: "0 0 16px", maxWidth: 640 }}>
                {s.desc}
              </p>
              <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, color: colors.muted }}>
                {s.bullets.map((b) => (
                  <span key={b}>— {b}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <CtaBand
        title="Not Sure Where to Start?"
        subtitle="Book a free consultation and we'll map out the right service for your goals."
      />
    </div>
  );
}
