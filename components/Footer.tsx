import Link from "next/link";
import Reveal from "./anim/Reveal";
import FooterLink from "./anim/FooterLink";
import { colors } from "@/lib/theme";
import { getSession } from "@/lib/auth";

export default async function Footer() {
  const session = await getSession();
  return (
    <div style={{ background: colors.ink, color: colors.bg }}>
      <Reveal
        className="footer-grid"
        stagger={0.1}
        start="top 92%"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "64px 32px 32px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: colors.bg, marginBottom: 16 }}>
            <img
              src="images/footerlogo.png"
              alt="Stargate Education Consultants"
              style={{ display: "block", height: 42, width: "auto" }}
            />
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
            <FooterLink href="/">Home</FooterLink>
            <FooterLink href="/about">About</FooterLink>
            <FooterLink href="/services">Services</FooterLink>
            <FooterLink href="/courses">Courses</FooterLink>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            RESOURCES
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FooterLink href="/how-it-works">How It Works</FooterLink>
            <FooterLink href="/insights">Insights</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
            <FooterLink href="/become-partner">Become Our Partner</FooterLink>
            <FooterLink href="/careers">Join Our Team</FooterLink>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            ACCOUNT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {session ? (
              <>
                {session.role === "ADMIN" && (
                  <FooterLink href="/admin">Admin Dashboard</FooterLink>
                )}
                <FooterLink href="/profile">Profile</FooterLink>
              </>
            ) : (
              <>
                <FooterLink href="/login">Login</FooterLink>
                <FooterLink href="/register">Register</FooterLink>
              </>
            )}
          </div>
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: colors.silver, marginBottom: 18 }}>
            CONTACT
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: colors.bg }}>
            <Link href="mailto:info@stargateeducationconsultants.com" rel="noopener noreferrer" style={{ color: colors.bg }}>
              info@stargateeducationconsultants.com
            </Link>
            <span>+44 7404766169</span>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <Link
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: colors.bg, display: "flex"
                 }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </Link>
              <Link
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: colors.bg, display: "flex" }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.2V10H8v3h2.5v8h3Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
      <div style={{ borderTop: "1px solid #2a2a2c" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 32px", fontSize: 12, color: colors.silver }}>
          &copy; 2026 Stargate Education Consultants. All rights reserved.
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 420px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
