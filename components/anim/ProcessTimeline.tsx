"use client";

import { Fragment, useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion, isHoverCapable } from "@/lib/gsap";
import { colors } from "@/lib/theme";

export type Step = {
  n: string;
  title: string;
  desc: string;
  final?: boolean;
};

/**
 * The five-stage process list. Connector segments draw downward as the reader
 * scrolls, each numbered badge pops in on arrival, and hovering a stage brings
 * its badge forward in gold.
 */
export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;

      // The badge column and the copy are grid siblings, not nested — pair
      // them positionally so each stage animates as one unit.
      const rails = Array.from(root.querySelectorAll<HTMLElement>("[data-step]"));
      const bodies = Array.from(root.querySelectorAll<HTMLElement>("[data-step-body]"));

      if (prefersReducedMotion()) {
        gsap.set(root.querySelectorAll("[data-step-badge], [data-step-body], [data-step-line]"), {
          autoAlpha: 1,
          scaleY: 1,
        });
        return;
      }

      const cleanups: Array<() => void> = [];

      rails.forEach((rail, i) => {
        const badge = rail.querySelector<HTMLElement>("[data-step-badge]");
        const line = rail.querySelector("[data-step-line]");
        const body = bodies[i];
        if (!badge || !body) return;

        const tl = gsap.timeline({ scrollTrigger: { trigger: rail, start: "top 78%", once: true } });
        tl.from(badge, { autoAlpha: 0, scale: 0.4, duration: 0.55, ease: "back.out(2)" })
          .from(body, { autoAlpha: 0, x: 28, duration: 0.6, ease: "power3.out" }, "-=0.35");

        if (line) {
          gsap.from(line, {
            scaleY: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: rail, start: "top 70%", once: true },
          });
        }

        if (!isHoverCapable() || badge.dataset.final === "true") return;

        const onEnter = () =>
          gsap.to(badge, { scale: 1.14, backgroundColor: colors.gold, color: colors.ink, duration: 0.35, ease: "power3.out" });
        const onLeave = () =>
          gsap.to(badge, { scale: 1, backgroundColor: colors.ink, color: colors.bg, duration: 0.35, ease: "power3.out" });

        // Both cells of the stage share the hover so the whole row responds.
        [rail, body].forEach((target) => {
          target.addEventListener("pointerenter", onEnter);
          target.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            target.removeEventListener("pointerenter", onEnter);
            target.removeEventListener("pointerleave", onLeave);
          });
        });
      });

      return () => cleanups.forEach((fn) => fn());
    },
    { scope: ref, dependencies: [steps.length] }
  );

  return (
    <div ref={ref} style={{ display: "grid", gridTemplateColumns: "64px 1fr", gap: 24 }}>
      {steps.map((s) => (
        <Fragment key={s.n}>
          <div data-step style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              data-step-badge
              data-final={s.final ? "true" : "false"}
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
                flexShrink: 0,
              }}
            >
              {s.n}
            </div>
            {!s.final && (
              <div
                data-step-line
                style={{
                  width: 1.5,
                  flex: 1,
                  background: colors.border,
                  marginTop: 8,
                  transformOrigin: "top center",
                }}
              />
            )}
          </div>
          <div data-step-body style={{ paddingBottom: s.final ? 0 : 48 }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, margin: "0 0 10px" }}>{s.title}</h3>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.muted, margin: 0 }}>{s.desc}</p>
          </div>
        </Fragment>
      ))}
    </div>
  );
}
