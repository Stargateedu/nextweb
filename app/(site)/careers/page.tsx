import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import SubmissionForm from "@/components/SubmissionForm";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Join Our Team | Stargate Education Consultants",
  description: "Explore career opportunities at Stargate Education Consultants.",
};

const fields = [
  { name: "fullName", label: "FULL NAME", type: "text" as const, placeholder: "Your full name", required: true },
  { name: "email", label: "EMAIL", type: "email" as const, placeholder: "you@email.com", required: true },
  { name: "phone", label: "PHONE NUMBER", type: "tel" as const, placeholder: "+44 00 0000 0000", required: true },
  { name: "position", label: "POSITION OF INTEREST", type: "select" as const, options: ["Student Recruitment Officer", "Admissions Advisor", "Marketing Coordinator", "Visa Support Specialist", "Other"], required: true },
  { name: "experience", label: "RELEVANT EXPERIENCE", type: "textarea" as const, placeholder: "Briefly describe your relevant experience...", rows: 3, required: true },
  { name: "message", label: "WHY STARGATE?", type: "textarea" as const, placeholder: "Tell us why you'd like to join the team...", rows: 3 },
];

export default function CareersPage() {
  return (
    <div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "90px 32px 100px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Careers</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 40, fontWeight: 800, margin: "0 0 20px" }}>
          Join Our Team
        </SplitHeading>
        <Reveal delay={0.3}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.muted, margin: "0 0 40px", maxWidth: 520 }}>
            We&rsquo;re always looking for passionate people who believe in the power of education. Apply below.
          </p>
        </Reveal>
        <SubmissionForm
          type="JOB_APPLICATION"
          fields={fields}
          submitLabel="SUBMIT APPLICATION"
          successTitle="Application Received!"
          successMessage="Our HR team will review your application and reach out if there's a match."
        />
      </div>
    </div>
  );
}
