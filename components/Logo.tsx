import { colors } from "@/lib/theme";

export default function Logo({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <path d="M8 14 A10 10 0 0 1 16 6" stroke="currentColor" strokeWidth="1.6" />
      <path d="M20 6 A10 10 0 0 1 28 14" stroke="currentColor" strokeWidth="1.6" />
      <path d="M8 14 A10 10 0 0 0 12 22" stroke="currentColor" strokeWidth="1.6" />
      <path d="M28 14 A10 10 0 0 1 24 22" stroke="currentColor" strokeWidth="1.6" />
      <polygon
        points="18,8 19.3,11 22,11 19.8,12.8 20.6,15.5 18,13.8 15.4,15.5 16.2,12.8 14,11 16.7,11"
        fill={colors.gold}
      />
      <rect x="15.5" y="16" width="5" height="2" fill="currentColor" />
      <rect x="14.5" y="18.3" width="7" height="2" fill="currentColor" />
      <rect x="13.5" y="20.6" width="9" height="2" fill="currentColor" />
      <rect x="12.5" y="22.9" width="11" height="2" fill="currentColor" />
      <rect x="11.5" y="25.2" width="13" height="2" fill="currentColor" />
    </svg>
  );
}
