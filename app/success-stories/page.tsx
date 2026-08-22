import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import CtaBand from "@/components/CtaBand";
import { QuoteIcon } from "@/components/icons";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Success Stories | Stargate Education Consultants",
  description: "Real students, real placements, real outcomes across the UK's leading universities.",
};

const stories = [
  {
    id: "story-1",
    quote: "Stargate turned an overwhelming process into a clear path — I never felt alone in it.",
    name: "Amara O.",
    program: "MSc Data Science, Manchester",
    image: "/images/story-tomasz.webp",
  },
  {
    id: "story-2",
    quote: "My visa was approved without a single issue. The mock interview made all the difference.",
    name: "Rohan K.",
    program: "BSc Economics, LSE",
    image: "/images/story-tomasz.webp",
  },
  {
    id: "story-3",
    quote: "They found me a scholarship I didn't even know I qualified for.",
    name: "Chidi E.",
    program: "MEng, Imperial College London",
    image: "/images/story-tomasz.webp",
  },
  {
    id: "story-4",
    quote: "From our first call, I knew exactly what to do next. That clarity was everything.",
    name: "Sofia M.",
    program: "LLB Law, University of Bristol",
    image: "/images/story-tomasz.webp",
  },
  {
    id: "story-5",
    quote: "Stargate's team felt like they cared as much about my future as I did.",
    name: "Tomasz W.",
    program: "MA International Relations, Edinburgh",
    image: "/images/story-tomasz.webp",
  },
  {
    id: "story-6",
    quote: "I applied to five universities and got into four, thanks to their shortlist strategy.",
    name: "Yuki T.",
    program: "BA Architecture, University of Bath",
    image: "/images/story-tomasz.webp",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "90px 32px 60px" }}>
        <Eyebrow>Success Stories</Eyebrow>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: "0 0 24px", maxWidth: 760 }}>
          Students Who Went Beyond Boundaries
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: colors.muted, maxWidth: 700, margin: 0 }}>
          Real students, real placements, real outcomes across the UK&rsquo;s leading universities.
        </p>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 100px" }}>
        <div className="stories-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
          {stories.map((s) => (
            <div key={s.id} style={{ border: `1px solid ${colors.border}`, padding: "36px 28px" }}>
              <QuoteIcon size={24} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 15, lineHeight: 1.65, margin: "0 0 20px" }}>&ldquo;{s.quote}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <ImagePlaceholder label="Photo" shape="circle" src={s.image} alt={s.name} style={{ width: 44, height: 44, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: colors.silver }}>{s.program}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <CtaBand title="Your Story Could Be Next" />

      <style>{`
        @media (max-width: 860px) {
          .stories-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 560px) {
          .stories-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
