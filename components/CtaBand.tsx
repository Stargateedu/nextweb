import Reveal from "./anim/Reveal";
import Magnetic from "./anim/Magnetic";
import FillButton from "./anim/FillButton";
import { colors, CTA_LABEL } from "@/lib/theme";

export default function CtaBand({
  title,
  subtitle,
}: {
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div style={{ background: colors.ink, color: colors.bg }}>
      <Reveal
        variant="up"
        duration={0.9}
        style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}
      >
        <h2 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 20px" }}>{title}</h2>
        {subtitle && (
          <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.silver, margin: "0 0 36px" }}>{subtitle}</p>
        )}
        <div style={{ marginTop: subtitle ? 0 : 16 }}>
          <Magnetic>
            <FillButton href="/apply" tone="gold" padding="16px 36px">
              {CTA_LABEL}
            </FillButton>
          </Magnetic>
        </div>
      </Reveal>
    </div>
  );
}
