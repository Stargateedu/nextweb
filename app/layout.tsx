import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Stargate Education Consultants | Beyond Education. Beyond Boundaries.",
  description:
    "Stargate Education Consultants guides ambitious students from application to arrival, opening doors to Britain's most prestigious universities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={montserrat.variable}>
      <body style={{ margin: 0, fontFamily: "var(--font-montserrat), sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
