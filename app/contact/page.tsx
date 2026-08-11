import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import ContactForm from "@/components/ContactForm";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Contact | Stargate Education Group",
  description: "Start your application — a Stargate advisor will reach out within one business day.",
};

export default function ContactPage() {
  return (
    <div>
      <div className="contact-grid" style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 100px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 64 }}>
        <div>
          <Eyebrow>Get Started</Eyebrow>
          <h1 style={{ fontSize: 40, fontWeight: 800, margin: "0 0 20px" }}>Start Your Application</h1>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.muted, margin: "0 0 40px", maxWidth: 520 }}>
            Tell us a little about yourself and a Stargate advisor will reach out within one business day.
          </p>
          <ContactForm />
        </div>

        <div>
          <div style={{ background: colors.cream, padding: 40, marginBottom: 24 }}>
            <Eyebrow style={{ marginBottom: 20 }}>Contact Info</Eyebrow>
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 0.5, color: colors.muted, marginBottom: 4 }}>
                EMAIL
              </div>
              <div style={{ fontSize: 15, fontWeight: 600 }}>info@stargateeducationgroup.com</div>
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
        </div>
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
