import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/anim/ScrollProgress";
import BackToTop from "@/components/anim/BackToTop";
import PageTransition from "@/components/anim/PageTransition";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <noscript>
        <style>{`[data-reveal]{visibility:visible !important}`}</style>
      </noscript>
      <ScrollProgress />
      <Nav />
      <main style={{ flex: 1 }}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
