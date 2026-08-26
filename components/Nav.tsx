"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Magnetic from "./anim/Magnetic";
import FillButton from "./anim/FillButton";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { colors, NAV_LINKS, CTA_LABEL } from "@/lib/theme";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  // Header: gold-tinted shadow once the page leaves the top.
  useGSAP(
    () => {
      const el = headerRef.current;
      if (!el || prefersReducedMotion()) return;

      const trigger = ScrollTrigger.create({
        start: 20,
        end: () => document.documentElement.scrollHeight,
        onToggle: (self) =>
          gsap.to(el, {
            boxShadow: self.isActive ? "0 8px 26px rgba(18,18,20,0.08)" : "0 0px 0px rgba(18,18,20,0)",
            duration: 0.35,
            ease: "power2.out",
          }),
      });
      return () => trigger.kill();
    },
    { scope: headerRef }
  );

  // Burger morphs to an X; the panel unrolls with its links cascading in.
  useGSAP(
    () => {
      const panel = panelRef.current;
      const burger = burgerRef.current;
      if (!panel || !burger) return;

      const [top, mid, bottom] = Array.from(burger.querySelectorAll("[data-bar]"));
      const items = panel.querySelectorAll("[data-mobile-item]");
      const d = prefersReducedMotion() ? 0 : 0.4;

      if (open) {
        gsap.to(panel, { height: "auto", autoAlpha: 1, duration: d, ease: "power3.out" });
        gsap.fromTo(
          items,
          { autoAlpha: 0, y: -10 },
          { autoAlpha: 1, y: 0, duration: d, stagger: 0.05, ease: "power3.out", delay: d * 0.3 }
        );
        gsap.to(top, { rotate: 45, y: 5, duration: d, ease: "power3.inOut" });
        gsap.to(mid, { autoAlpha: 0, duration: d * 0.5, ease: "power2.out" });
        gsap.to(bottom, { rotate: -45, y: -5, duration: d, ease: "power3.inOut" });
      } else {
        gsap.to(panel, { height: 0, autoAlpha: 0, duration: d * 0.85, ease: "power3.inOut" });
        gsap.to([top, bottom], { rotate: 0, y: 0, duration: d, ease: "power3.inOut" });
        gsap.to(mid, { autoAlpha: 1, duration: d, ease: "power2.out", delay: d * 0.3 });
      }
    },
    { dependencies: [open] }
  );

  return (
    <div
      ref={headerRef}
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: colors.bg,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
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
        <Magnetic strength={0.18} scale={1.03}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: colors.ink }}>
            <Logo className="NavLogo" />
          </Link>
        </Magnetic>

        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: 28, flexWrap: "wrap" }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-navlink
                data-active={active ? "true" : "false"}
                onMouseEnter={() => setHoveredNav(link.href)}
                onMouseLeave={() => setHoveredNav(null)}
                onFocus={() => setHoveredNav(link.href)}
                onBlur={() => setHoveredNav(null)}
                style={{
                  position: "relative",
                  fontSize: 13,
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  paddingBottom: 6,
                  color: active ? colors.gold : colors.ink,
                  textTransform: "uppercase",
                }}
              >
                {link.label}
                <span
                  data-navrule
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 2,
                    background: colors.gold,
                    transform: active || hoveredNav === link.href ? "scaleX(1)" : "scaleX(0)",
                    transformOrigin: "left center",
                    pointerEvents: "none",
                  }}
                />
              </Link>
            );
          })}
        </nav>

        <div className="nav-cta" style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Magnetic strength={0.25}>
            <FillButton href="/apply" tone="ink" padding="11px 24px" hoverColor={colors.gold} style={{ fontSize: 12 }}>
              {CTA_LABEL}
            </FillButton>
          </Magnetic>
        </div>

        <button
          ref={burgerRef}
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            display: "none",
            flexDirection: "column",
            justifyContent: "center",
            gap: 3,
            width: 40,
            height: 40,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 8,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              data-bar
              style={{ display: "block", width: 22, height: 2, background: colors.ink, borderRadius: 2 }}
            />
          ))}
        </button>
      </div>

      <div
        ref={panelRef}
        className="nav-mobile"
        style={{
          display: "none",
          overflow: "hidden",
          height: 0,
          opacity: 0,
          visibility: "hidden",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <div style={{ padding: "16px 32px 24px", display: "flex", flexDirection: "column", gap: 18 }}>
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                data-mobile-item
                onClick={() => setOpen(false)}
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
            href="/apply"
            data-mobile-item
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
      </div>

      <style>{`
        @media (max-width: 860px) {
          .nav-links,
          .nav-cta {
            display: none !important;
          }
          .nav-toggle {
            display: flex !important;
          }
          .nav-mobile {
            display: block !important;
          }
        }

        .nav-link [data-navrule] {
          transition: transform 220ms ease;
        }

        .nav-link:hover [data-navrule],
        .nav-link:focus-visible [data-navrule] {
          transform: scaleX(1) !important;
        }
      `}</style>
    </div>
  );
}
