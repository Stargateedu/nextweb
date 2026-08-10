import { colors } from "@/lib/theme";

export default function Eyebrow({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 2,
        color: colors.gold,
        marginBottom: 16,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
