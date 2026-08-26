import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import SubmissionForm from "@/components/SubmissionForm";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import { colors } from "@/lib/theme";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Stargate Education Consultants",
  description: "Get in touch — a Stargate advisor will reach out within one business day.",
};

const fields = [
  { name: "fullName", label: "FULL NAME", type: "text" as const, placeholder: "Jane Doe", required: true },
  { name: "email", label: "EMAIL", type: "email" as const, placeholder: "jane@email.com", required: true },
  { name: "phone", label: "PHONE", type: "tel" as const, placeholder: "+44 00 0000 0000" },
  { name: "program", label: "PROGRAM OF INTEREST", type: "select" as const, options: ["Study-Abroad Placement", "Visa Support", "Test Preparation", "University Application Guidance", "Scholarships & Funding"] },
  { name: "message", label: "MESSAGE", type: "textarea" as const, placeholder: "Tell us about your goals...", rows: 4, required: true },
];

export default function ContactPage() {
  return (
    <div>
      <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 100px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64 }}>
        <div>
          <Reveal variant="fade" duration={0.7}>
            <Eyebrow>Get In Touch</Eyebrow>
          </Reveal>
          <SplitHeading delay={0.1} style={{ fontSize: 40, fontWeight: 800, margin: "0 0 20px" }}>
            Contact Us
          </SplitHeading>
          <Reveal delay={0.3}>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.muted, margin: "0 0 40px", maxWidth: 520 }}>
              Have a question? Send us a message and a Stargate advisor will get back to you within one business day.
            </p>
          </Reveal>
          <SubmissionForm
            type="CONTACT"
            fields={fields}
            submitLabel="SEND"
            successTitle="Message Sent!"
            successMessage="A Stargate advisor will reach out within one business day."
          />
        </div>

        <Reveal variant="right" delay={0.2} duration={0.9}>
          <div style={{ background: colors.cream, padding: 40, marginBottom: 24 }}>
            <Eyebrow style={{ marginBottom: 20 }}>Contact Info</Eyebrow>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: colors.muted, marginBottom: 4 }}>
                EMAIL
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>
                <Link href="mailto:info@stargateeducationconsultants.com" rel="noopener noreferrer">
                  info@stargateeducationconsultants.com
                </Link>
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: colors.muted, marginBottom: 4 }}>
                PHONE
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>+44 7404766169</div>
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: colors.muted, marginBottom: 4 }}>
                OFFICE HOURS
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Mon–Fri, 9:00–18:00</div>
            </div>
          </div>
          <ImagePlaceholder label="An office photo or map" style={{ width: "100%", height: 280 }} />
        </Reveal>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
