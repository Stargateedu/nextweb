import Link from "next/link";
import Logo from "./Logo";
import { colors } from "@/lib/theme";

export default function Footer() {
  return (
    <div style={{ background: colors.ink, color: colors.bg }}>
      <div
        className="footer-grid"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 32px 32px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: colors.bg, marginBottom: 16 }}>
            <Logo size={30} />
            <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: 1.5 }}>STARGATE</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: colors.silver, maxWidth: 280, margin: 0 }}>
            A student recruitment agency committed to opening doors to global education — beyond education, beyond
            boundaries.
          </p>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            COMPANY
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/about" style={{ fontSize: 13, color: colors.bg }}>
              About
            </Link>
            <Link href="/services" style={{ fontSize: 13, color: colors.bg }}>
              Services
            </Link>
            <Link href="/success-stories" style={{ fontSize: 13, color: colors.bg }}>
              Success Stories
            </Link>
            <Link href="/insights" style={{ fontSize: 13, color: colors.bg }}>
              Insights
            </Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            RESOURCES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/how-it-works" style={{ fontSize: 13, color: colors.bg }}>
              How It Works
            </Link>
            <Link href="/contact" style={{ fontSize: 13, color: colors.bg }}>
              Contact
            </Link>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            CONTACT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: colors.bg }}>
            <span>info@stargategroup.com</span>
            <span>+00 1234 567 800</span>
          </div>
        </div>
      </div>
      <div style={{ borderTop: "1px solid #2a2a2c" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", fontSize: 12, color: colors.silver }}>
          &copy; 2026 Stargate Education Group. All rights reserved.
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 520px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
