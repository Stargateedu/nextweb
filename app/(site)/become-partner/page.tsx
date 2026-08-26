import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import SubmissionForm from "@/components/SubmissionForm";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Become Our Partner | Stargate Education Consultants",
  description: "Join our network of recruitment partners and earn commissions by helping students reach UK universities.",
};

const fields = [
  { name: "fullName", label: "FULL NAME", type: "text" as const, placeholder: "Your full name", required: true },
  { name: "email", label: "EMAIL", type: "email" as const, placeholder: "you@company.com", required: true },
  { name: "phone", label: "PHONE NUMBER", type: "tel" as const, placeholder: "+44 00 0000 0000", required: true },
  { name: "company", label: "COMPANY / AGENCY NAME", type: "text" as const, placeholder: "Your organisation" },
  { name: "country", label: "COUNTRY", type: "text" as const, placeholder: "Country of operation", required: true },
  { name: "experience", label: "RECRUITMENT EXPERIENCE", type: "select" as const, options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"], required: true },
  { name: "message", label: "MESSAGE", type: "textarea" as const, placeholder: "Tell us why you'd like to partner with Stargate...", rows: 4 },
];

const steps = [
  { num: "1", title: "Register", desc: "Fill out the partner application form below to get started." },
  { num: "2", title: "Refer Students", desc: "Share your unique referral link with prospective students." },
  { num: "3", title: "We Handle Admissions", desc: "Our team takes care of the entire admissions and visa process." },
  { num: "4", title: "You Get Paid", desc: "Earn commissions for every successful enrolment." },
];

const helpItems = [
  {
    title: "Study Abroad Placement",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 10v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
        <path d="M12 3L2 8l10 5 10-5-10-5z" />
        <path d="M20 8v5" />
      </svg>
    ),
  },
  {
    title: "Visa Support",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
  },
  {
    title: "Test Preparation",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
        <line x1="8" y1="7" x2="16" y2="7" />
        <line x1="8" y1="11" x2="14" y2="11" />
      </svg>
    ),
  },
  {
    title: "University Application",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    title: "Scholarships & Funding",
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.4">
        <circle cx="12" cy="12" r="9" />
        <path d="M15 9.5c0-1.5-1.3-2.5-3-2.5s-3 1-3 2.5c0 2.5 6 1.5 6 4 0 1.5-1.3 2.5-3 2.5s-3-1-3-2.5" />
        <line x1="12" y1="5" x2="12" y2="7" />
        <line x1="12" y1="17" x2="12" y2="19" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    quote: "I posted once, didn’t think much of it — next thing I know 8 students are enrolling this month. It’s opened a door I didn’t even know was there.",
    name: "Amara T.",
    role: "Freelance Recruiter, London",
  },
  {
    quote: "I thought it would be extra pocket money. Three months later, it had become a serious income stream I hadn’t planned for.",
    name: "James O.",
    role: "Independent Consultant, Birmingham",
  },
];

export default function BecomePartnerPage() {
  return (
    <div>
      {/* HERO */}
      <div style={{ background: colors.ink, color: colors.bg }}>
        <div
          className="partner-hero-grid"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "90px 32px 80px",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: 64,
            alignItems: "center",
          }}
        >
          <Reveal variant="fade" duration={0.7}>
            <Eyebrow style={{ color: colors.gold }}>Recruitment Partners</Eyebrow>
            <SplitHeading delay={0.1} style={{ fontSize: 44, fontWeight: 800, margin: "0 0 8px", color: colors.bg }}>
              Earn Up To
            </SplitHeading>
            <div style={{ fontSize: 72, fontWeight: 800, color: colors.gold, lineHeight: 1.1, margin: "0 0 4px" }}>
              £500
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, color: colors.bg, margin: "0 0 24px", letterSpacing: 1 }}>
              PER STUDENT*
            </div>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.silver, margin: "0 0 32px", maxWidth: 480 }}>
              Join our network of partners across the UK and earn generous commissions by helping students achieve their university goals.
            </p>
            <a
              href="#partner-form"
              style={{
                display: "inline-block",
                background: colors.gold,
                color: colors.ink,
                padding: "16px 36px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: 1,
                textDecoration: "none",
              }}
            >
              BECOME A PARTNER
            </a>
          </Reveal>
          <Reveal variant="scale" delay={0.3} duration={1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {["Guidance", "Opportunity", "Success"].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    background: "rgba(212,175,55,0.08)",
                    border: `1px solid rgba(212,175,55,0.2)`,
                    padding: "16px 24px",
                  }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gold} strokeWidth="2.5">
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  <span style={{ fontSize: 16, fontWeight: 700, color: colors.bg }}>{item}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* WE HELP YOU */}
      <div style={{ background: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow>What We Provide</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>We Help You</h2>
          </Reveal>
          <Reveal
            className="help-grid"
            stagger={0.1}
            style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, background: colors.border }}
          >
            {helpItems.map((item) => (
              <div
                key={item.title}
                style={{
                  background: colors.bg,
                  padding: "36px 20px",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div style={{ color: colors.gold }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 0.3, color: colors.ink }}>{item.title}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: colors.cream }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal style={{ marginBottom: 48 }}>
            <Eyebrow>Simple Process</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0 }}>How It Works</h2>
          </Reveal>
          <Reveal
            className="steps-grid"
            stagger={0.12}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}
          >
            {steps.map((step) => (
              <div key={step.num} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: colors.gold,
                    color: colors.ink,
                    fontSize: 20,
                    fontWeight: 800,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    marginBottom: 16,
                  }}
                >
                  {step.num}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>{step.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: colors.muted, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div style={{ background: colors.ink, color: colors.bg }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 32px" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <Eyebrow style={{ color: colors.gold }}>Partner Stories</Eyebrow>
            <h2 style={{ fontSize: 32, fontWeight: 800, margin: 0, color: colors.bg }}>What Our Partners Say</h2>
          </Reveal>
          <Reveal
            className="testimonials-grid"
            stagger={0.15}
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            {testimonials.map((t) => (
              <div
                key={t.name}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(212,175,55,0.15)",
                  padding: "36px 32px",
                }}
              >
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={colors.gold}>
                      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                    </svg>
                  ))}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.silver, margin: "0 0 20px", fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ fontSize: 14, fontWeight: 700, color: colors.bg }}>{t.name}</div>
                <div style={{ fontSize: 12, color: colors.silver, marginTop: 2 }}>{t.role}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* READY TO START CTA */}
      <div style={{ background: colors.gold }}>
        <Reveal
          style={{
            maxWidth: 900,
            margin: "0 auto",
            padding: "60px 32px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: 28, fontWeight: 800, color: colors.ink, margin: "0 0 12px" }}>
            Ready to Start Earning?
          </h2>
          <p style={{ fontSize: 16, color: colors.ink, margin: "0 0 24px", opacity: 0.8 }}>
            Become a recruitment partner today and start earning commissions.
          </p>
          <a
            href="#partner-form"
            style={{
              display: "inline-block",
              background: colors.ink,
              color: colors.gold,
              padding: "16px 36px",
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 1,
              textDecoration: "none",
            }}
          >
            APPLY NOW
          </a>
        </Reveal>
      </div>

      {/* PARTNER FORM */}
      <div id="partner-form" style={{ maxWidth: 720, margin: "0 auto", padding: "90px 32px 100px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Partner Application</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 36, fontWeight: 800, margin: "0 0 20px" }}>
          Apply to Become a Partner
        </SplitHeading>
        <Reveal delay={0.3}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.muted, margin: "0 0 40px", maxWidth: 520 }}>
            Fill out the form below and our partnerships team will be in touch.
          </p>
        </Reveal>
        <SubmissionForm
          type="AGENT_ENQUIRY"
          fields={fields}
          submitLabel="SUBMIT ENQUIRY"
          successTitle="Enquiry Received!"
          successMessage="Our partnerships team will review your application and get back to you shortly."
        />
      </div>

      <style>{`
        @media (max-width: 960px) {
          .partner-hero-grid { grid-template-columns: 1fr !important; }
          .help-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .help-grid { grid-template-columns: 1fr 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
