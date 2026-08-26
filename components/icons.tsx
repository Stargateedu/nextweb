type IconProps = Omit<React.SVGProps<SVGSVGElement>, "color"> & {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export function CapIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <path d="M12 4 L22 9 L12 14 L2 9 Z" />
      <path d="M6 11 V16 C6 17 9 18 12 18 C15 18 18 17 18 16 V11" />
      <line x1="22" y1="9" x2="22" y2="15" />
    </svg>
  );
}

export function ShieldIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <path d="M12 3 L20 6 V12 C20 17 16.5 20 12 21 C7.5 20 4 17 4 12 V6 Z" />
    </svg>
  );
}

export function TrendIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <polyline points="3,17 9,11 13,15 21,6" />
      <polyline points="15,6 21,6 21,12" />
    </svg>
  );
}

export function GlobeIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <line x1="3" y1="12" x2="21" y2="12" />
    </svg>
  );
}

export function PeopleIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M14.5 14.2c2.5.3 4.5 2.5 4.5 5.3" />
    </svg>
  );
}

export function ScholarshipIcon({ size = 30, color = "#121214", strokeWidth = 1.5, style, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} style={style} {...rest}>
      <path d="M12 3 L20 6 V12 C20 17 16.5 20 12 21 C7.5 20 4 17 4 12 V6 Z" />
      <polygon
        points="12,9 13,11.5 15.5,11.5 13.5,13 14.2,15.5 12,14 9.8,15.5 10.5,13 8.5,11.5 11,11.5"
        fill="#D4AF37"
        stroke="none"
      />
    </svg>
  );
}

export function QuoteIcon({ size = 24, color = "#D4AF37", style, ...rest }: Omit<IconProps, "strokeWidth">) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill={color} style={style} {...rest}>
      <path d="M9 7C5.5 8.5 4 11 4 14.5c0 2.2 1.5 3.5 3.3 3.5S10.5 16.7 10.5 15c0-1.6-1.2-2.7-2.6-2.7 0-1.5 1-3 3-3.8L9 7zm9 0c-3.5 1.5-5 4-5 7.5 0 2.2 1.5 3.5 3.3 3.5s3.2-1.3 3.2-3c0-1.6-1.2-2.7-2.6-2.7 0-1.5 1-3 3-3.8L18 7z" />
    </svg>
  );
}
