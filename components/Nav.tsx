"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
// import FooterLogo from "./FooterLogo";
import { colors, NAV_LINKS, CTA_LABEL } from "@/lib/theme";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "18px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: colors.ink }}>
          <Logo className="NavLogo"/>
        </Link>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${active ? "active" : ""}`}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  paddingBottom: 6,
                  borderBottom: "2px solid transparent",
                  color: active ? colors.gold : colors.ink,
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Link
            href="/contact"
            style={{
              background: colors.ink,
              color: colors.bg,
              padding: "11px 24px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: "uppercase",
            }}
          >
            {CTA_LABEL}
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
            color: colors.ink,
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            {open ? (
              <path d="M6 6 L18 18 M18 6 L6 18" />
            ) : (
              <path d="M4 7 H20 M4 12 H20 M4 17 H20" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="nav-mobile" style={{ borderTop: `1px solid ${colors.border}`, padding: "16px 32px 24px", display: "none", flexDirection: "column", gap: 18 }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`nav-link ${active ? "active" : ""}`}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  color: active ? colors.gold : colors.ink,
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            style={{
              background: colors.ink,
              color: colors.bg,
              padding: "13px 24px",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 1,
              textAlign: "center",
              textTransform: "uppercase",
            }}
          >
            {CTA_LABEL}
          </Link>
        </div>
      )}

      <style>{`
        .nav-link{transition: color .18s ease, transform .18s ease, box-shadow .18s ease; text-decoration: none; box-shadow: none;}
        .nav-link:hover, .nav-link:focus{color: ${colors.gold}; transform: scale(1.02); text-decoration: none;}
        .nav-link.active{color: ${colors.gold};}

        @media (max-width: 860px) {
          .nav-links,
          .nav-cta {
            display: none !important;
          }
          .nav-toggle {
            display: inline-flex !important;
          }
          .nav-mobile {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
}
