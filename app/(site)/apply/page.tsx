import type { Metadata } from "next";
import Eyebrow from "@/components/Eyebrow";
import Reveal from "@/components/anim/Reveal";
import SplitHeading from "@/components/anim/SplitHeading";
import SubmissionForm from "@/components/SubmissionForm";
import { colors } from "@/lib/theme";

export const metadata: Metadata = {
  title: "Apply | Stargate Education Consultants",
  description: "Submit your student application — take the first step toward studying in the UK.",
};

const fields = [
  { name: "fullName", label: "FULL NAME", type: "text" as const, placeholder: "Jane Doe", required: true },
  { name: "email", label: "EMAIL", type: "email" as const, placeholder: "jane@email.com", required: true },
  { name: "phone", label: "PHONE NUMBER", type: "tel" as const, placeholder: "+44 00 0000 0000", required: true },
  { name: "dob", label: "DATE OF BIRTH", type: "date" as const, required: true },
  { name: "gender", label: "GENDER", type: "select" as const, options: ["Male", "Female", "Other", "Prefer not to say"], required: true },
  { name: "address", label: "ADDRESS", type: "textarea" as const, placeholder: "Your full address", required: true, rows: 2 },
  { name: "ni_number", label: "NATIONAL INSURANCE NUMBER", type: "text" as const, placeholder: "QQ 12 34 56 A (if applicable)" },
  { name: "emergency_contact", label: "EMERGENCY CONTACT NUMBER", type: "tel" as const, placeholder: "+44 00 0000 0000", required: true },
];

export default function ApplyPage() {
  return (
    <div>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "90px 32px 100px" }}>
        <Reveal variant="fade" duration={0.7}>
          <Eyebrow>Student Application</Eyebrow>
        </Reveal>
        <SplitHeading delay={0.1} style={{ fontSize: 40, fontWeight: 800, margin: "0 0 20px" }}>
          Start Your Journey
        </SplitHeading>
        <Reveal delay={0.3}>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.muted, margin: "0 0 40px", maxWidth: 520 }}>
            Fill in the form below and a Stargate advisor will guide you through the next steps.
          </p>
        </Reveal>
        <SubmissionForm
          type="STUDENT_APPLICATION"
          fields={fields}
          submitLabel="SUBMIT APPLICATION"
          successTitle="Application Received!"
          successMessage="A Stargate advisor will be in touch within one business day to discuss your next steps."
        />
      </div>
    </div>
  );
}
