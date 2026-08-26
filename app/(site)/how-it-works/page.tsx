import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import CtaBand from "@/components/CtaBand";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import ProcessTimeline from "@/components/anim/ProcessTimeline";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "How It Works | Stargate Education Consultants",
  description: "Five clear stages, from your first conversation with us to your first day on a UK campus.",
};

const steps = [
  {
    n: "01",
    title: "Free Consultation",
    desc: "We learn about your academic background, goals, and budget to understand what success looks like for you.",
  },
  {
    n: "02",
    title: "University Shortlisting",
    desc: "Together, we build a shortlist of UK universities and courses matched to your profile and ambitions.",
  },
  {
    n: "03",
    title: "Application & Documentation",
    desc: "We prepare personal statements, references, and required documents, and submit applications on schedule.",
  },
  {
    n: "04",
    title: "Visa Support",
    desc: "Once your offer is secured, we guide you through CAS issuance, financial evidence, and visa application.",
  },
  {
    n: "05",
    title: "Pre-Departure & Arrival",
    desc: "Accommodation guidance, travel briefings, and airport arrival support — so your first days feel familiar.",
    final: true,
  },
];

export default function HowItWorksPage() {
  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Our Process</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          How It Works
        </SplitHeading>
        <Reveal delay={0.3}>
          <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 700, margin: 0 }}>
            Five clear stages, from your first conversation with us to your first day on a UK campus.
          </p>
        </Reveal>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 100px" }}>
        <ProcessTimeline steps={steps} />
      </div>

      <CtaBand title="Start Stage One Today" />
    </div>
  );
}
