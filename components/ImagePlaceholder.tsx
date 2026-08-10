import Image from "next/image";
import { colors } from "@/lib/theme";

type Shape = "rect" | "circle";

export default function ImagePlaceholder({
  label,
  shape = "rect",
  style,
  src,
  alt = "",
}: {
  label: string;
  shape?: Shape;
  style?: React.CSSProperties;
  src?: string;
  alt?: string;
}) {
  const radius = shape === "circle" ? "50%" : "4px";

  if (src) {
    return (
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: radius,
          background: colors.border,
          ...style,
        }}
      >
        <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" style={{ objectFit: "cover" }} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        textAlign: "center",
        padding: 16,
        background: "rgba(18,18,20,0.045)",
        border: `1.5px dashed ${colors.silver}`,
        borderRadius: radius,
        color: colors.muted,
        ...style,
      }}
    >
      <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ opacity: 0.5 }}>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="m21 15-5-5L5 21" />
      </svg>
      <span style={{ fontSize: 12, fontWeight: 500, maxWidth: "90%" }}>{label}</span>
    </div>
  );
}
