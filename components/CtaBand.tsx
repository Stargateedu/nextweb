import Link from "next/link";
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
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 32px", textAlign: "center" }}>
        <h2 style={{ fontSize: 34, fontWeight: 800, margin: "0 0 20px" }}>{title}</h2>
        {subtitle && (
          <p style={{ fontSize: 16, lineHeight: 1.7, color: colors.silver, margin: "0 0 36px" }}>{subtitle}</p>
        )}
        <Link
          href="/contact"
          style={{
            display: "inline-block",
            background: colors.gold,
            color: colors.ink,
            padding: "16px 36px",
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            marginTop: subtitle ? 0 : 16,
            textTransform: "uppercase",
          }}
        >
          {CTA_LABEL}
        </Link>
      </div>
    </div>
  );
}
