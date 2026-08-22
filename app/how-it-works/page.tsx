import type { Metadata } from "next";
import { Fragment } from "react";
import Eyebrow from "@/components/Eyebrow";
import CtaBand from "@/components/CtaBand";
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
        <Eyebrow>Our Process</Eyebrow>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>How It Works</h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 700, margin: 0 }}>
          Five clear stages, from your first conversation with us to your first day on a UK campus.
        </p>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 100px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 24 }}>
          {steps.map((s) => (
            <Fragment key={s.n}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: s.final ? colors.gold : colors.ink,
                    color: s.final ? colors.ink : colors.bg,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 800,
                    fontSize: 15,
                  }}
                >
                  {s.n}
                </div>
                {!s.final && <div style={{ width: 1.5, flex: 1, background: colors.border, marginTop: 8 }} />}
              </div>
              <div style={{ paddingBottom: s.final ? 0 : 48 }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px" }}>{s.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: 0 }}>{s.desc}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>

      <CtaBand title="Start Stage One Today" />
    </div>
  );
}
