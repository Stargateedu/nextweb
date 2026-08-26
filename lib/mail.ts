import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const FROM = `"Stargate Education Consultants" <${process.env.SMTP_USER}>`;
const ADMIN = process.env.ADMIN_EMAIL!;
const LOGO = "https://stargateeducationconsultants.com/images/footerlogo.png";

function logoHeader(): string {
  return `<tr><td style="background:#121214;padding:36px 32px;text-align:center">
    <img src="${LOGO}" alt="Stargate Education Consultants" width="220" style="display:block;margin:0 auto;max-width:220px;height:auto" />
  </td></tr>`;
}

function parseDetails(details: string): Record<string, string> {
  const pairs: Record<string, string> = {};
  details.split("|").forEach((segment) => {
    const idx = segment.indexOf(":");
    if (idx > 0) {
      pairs[segment.slice(0, idx).trim()] = segment.slice(idx + 1).trim();
    }
  });
  return pairs;
}

function detailsTable(pairs: Record<string, string>): string {
  return Object.entries(pairs)
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 14px;font-size:13px;font-weight:600;color:#5a5a5c;text-transform:uppercase;letter-spacing:0.5px;border-bottom:1px solid #EDEAE3;width:40%;vertical-align:top">${k}</td>
        <td style="padding:10px 14px;font-size:14px;color:#121214;border-bottom:1px solid #EDEAE3">${v}</td>
      </tr>`
    )
    .join("");
}

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F5F1EB;font-family:Arial,Helvetica,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F1EB;padding:32px 16px">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
${body}
<!-- Footer -->
<tr><td style="padding:28px 32px;text-align:center;font-size:12px;color:#5a5a5c;line-height:1.6">
  <p style="margin:0 0 4px">Stargate Education Consultants</p>
  <p style="margin:0 0 4px">London, United Kingdom</p>
  <p style="margin:0"><a href="https://stargateeducationconsultants.com" style="color:#D4AF37;text-decoration:none">stargateeducationconsultants.com</a></p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function contactTemplate(name: string, pairs: Record<string, string>): string {
  return wrap(`
    ${logoHeader()}
    <tr><td style="background:#ffffff;padding:40px 32px">
      <h2 style="margin:0 0 8px;font-size:22px;color:#121214;font-weight:700">Thank You, ${name}!</h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5a5a5c">
        We've received your message and our team will get back to you within 24 hours.
      </p>
      <div style="background:#F5F1EB;padding:20px;margin-bottom:24px">
        <p style="margin:0;font-size:13px;font-weight:700;color:#121214;letter-spacing:0.5px;margin-bottom:12px">YOUR MESSAGE DETAILS</p>
        <table width="100%" cellpadding="0" cellspacing="0">${detailsTable(pairs)}</table>
      </div>
      <p style="margin:0;font-size:14px;color:#5a5a5c;line-height:1.6">
        If you need immediate assistance, you can reach us directly at
        <a href="mailto:info@stargateeducationconsultants.com" style="color:#D4AF37;font-weight:600">info@stargateeducationconsultants.com</a>
      </p>
    </td></tr>
    <tr><td style="background:#D4AF37;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;font-weight:700;color:#121214;letter-spacing:0.5px">Your future starts with the right guidance</p>
    </td></tr>
  `);
}

function studentTemplate(name: string, pairs: Record<string, string>): string {
  return wrap(`
    ${logoHeader()}
    <tr><td style="background:#D4AF37;padding:24px 32px;text-align:center">
      <h2 style="margin:0;font-size:20px;font-weight:800;color:#121214;letter-spacing:0.5px">APPLICATION RECEIVED</h2>
    </td></tr>
    <tr><td style="background:#ffffff;padding:40px 32px">
      <h2 style="margin:0 0 8px;font-size:22px;color:#121214;font-weight:700">Welcome, ${name}!</h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5a5a5c">
        Thank you for applying to study in the UK through Stargate Education Consultants. Your application is now being reviewed by our admissions team.
      </p>
      <div style="border-left:4px solid #D4AF37;padding:16px 20px;background:#FFFDF5;margin-bottom:24px">
        <p style="margin:0;font-size:14px;font-weight:700;color:#121214;margin-bottom:4px">What happens next?</p>
        <ol style="margin:8px 0 0;padding-left:18px;font-size:14px;color:#5a5a5c;line-height:1.8">
          <li>Our admissions team will review your details</li>
          <li>You'll receive a call within 2 business days</li>
          <li>We'll guide you through course options and next steps</li>
        </ol>
      </div>
      <div style="background:#F5F1EB;padding:20px;margin-bottom:24px">
        <p style="margin:0;font-size:13px;font-weight:700;color:#121214;letter-spacing:0.5px;margin-bottom:12px">APPLICATION SUMMARY</p>
        <table width="100%" cellpadding="0" cellspacing="0">${detailsTable(pairs)}</table>
      </div>
      <p style="margin:0;font-size:13px;color:#5a5a5c;line-height:1.6">
        Please ensure all details above are correct. If anything needs updating, reply to this email.
      </p>
    </td></tr>
    <tr><td style="background:#121214;padding:20px 32px;text-align:center">
      <p style="margin:0;font-size:13px;font-weight:700;color:#D4AF37">Taking Admissions 2026 &mdash; Apply Today</p>
    </td></tr>
  `);
}

function agentTemplate(name: string, pairs: Record<string, string>): string {
  return wrap(`
    <tr><td style="background:#121214;padding:36px 32px">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <img src="${LOGO}" alt="Stargate Education Consultants" width="180" style="display:block;max-width:180px;height:auto" />
          </td>
          <td style="text-align:right;vertical-align:middle">
            <span style="font-size:12px;font-weight:700;color:#D4AF37;letter-spacing:1px;border:1px solid #D4AF37;padding:6px 14px">PARTNER PROGRAMME</span>
          </td>
        </tr>
      </table>
    </td></tr>
    <tr><td style="background:#ffffff;padding:40px 32px">
      <h2 style="margin:0 0 8px;font-size:22px;color:#121214;font-weight:700">Hi ${name},</h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5a5a5c">
        Thank you for your interest in becoming a Stargate recruitment partner. We're excited to review your enquiry and explore how we can work together.
      </p>
      <div style="background:#121214;padding:24px;margin-bottom:24px;text-align:center">
        <p style="margin:0;font-size:13px;color:#B8B8B8;letter-spacing:1px">EARN UP TO</p>
        <p style="margin:4px 0;font-size:42px;font-weight:800;color:#D4AF37">£500</p>
        <p style="margin:0;font-size:14px;font-weight:700;color:#ffffff;letter-spacing:0.5px">PER STUDENT ENROLLED</p>
      </div>
      <div style="background:#F5F1EB;padding:20px;margin-bottom:24px">
        <p style="margin:0;font-size:13px;font-weight:700;color:#121214;letter-spacing:0.5px;margin-bottom:12px">YOUR ENQUIRY DETAILS</p>
        <table width="100%" cellpadding="0" cellspacing="0">${detailsTable(pairs)}</table>
      </div>
      <p style="margin:0;font-size:14px;color:#5a5a5c;line-height:1.6">
        Our partnerships team will review your application and reach out within 3 business days with next steps.
      </p>
    </td></tr>
    <tr><td style="background:#D4AF37;padding:16px 32px;text-align:center">
      <p style="margin:0;font-size:12px;font-weight:700;color:#121214">Guidance &bull; Opportunity &bull; Success</p>
    </td></tr>
  `);
}

function jobTemplate(name: string, pairs: Record<string, string>): string {
  return wrap(`
    ${logoHeader()}
    <tr><td style="background:#ffffff;padding:40px 32px">
      <div style="display:inline-block;background:#F5F1EB;padding:6px 14px;font-size:11px;font-weight:700;color:#5a5a5c;letter-spacing:1px;margin-bottom:16px">CAREERS</div>
      <h2 style="margin:0 0 8px;font-size:22px;color:#121214;font-weight:700">Thank You, ${name}!</h2>
      <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#5a5a5c">
        We've received your job application at Stargate Education Consultants. We appreciate your interest in joining our team.
      </p>
      <div style="border:2px solid #D4AF37;padding:20px;margin-bottom:24px;text-align:center">
        <p style="margin:0 0 4px;font-size:13px;color:#5a5a5c">Application status</p>
        <p style="margin:0;font-size:16px;font-weight:800;color:#D4AF37;letter-spacing:0.5px">UNDER REVIEW</p>
      </div>
      <div style="background:#F5F1EB;padding:20px;margin-bottom:24px">
        <p style="margin:0;font-size:13px;font-weight:700;color:#121214;letter-spacing:0.5px;margin-bottom:12px">APPLICATION DETAILS</p>
        <table width="100%" cellpadding="0" cellspacing="0">${detailsTable(pairs)}</table>
      </div>
      <p style="margin:0;font-size:14px;color:#5a5a5c;line-height:1.6">
        If your profile matches an open position, our HR team will contact you to schedule an interview. We'll keep your application on file for future opportunities as well.
      </p>
    </td></tr>
    <tr><td style="background:#121214;padding:20px 32px;text-align:center">
      <p style="margin:0;font-size:13px;color:#B8B8B8">Building futures, one student at a time</p>
    </td></tr>
  `);
}

function adminNotification(
  type: string,
  name: string,
  pairs: Record<string, string>
): string {
  const labels: Record<string, string> = {
    CONTACT: "New Contact Message",
    STUDENT_APPLICATION: "New Student Application",
    AGENT_ENQUIRY: "New Partner Enquiry",
    JOB_APPLICATION: "New Job Application",
  };
  const label = labels[type] || type;

  return wrap(`
    ${logoHeader()}
    <tr><td style="background:#D4AF37;padding:14px 32px;text-align:center">
      <p style="margin:0;font-size:14px;font-weight:800;color:#121214;letter-spacing:0.5px">${label.toUpperCase()}</p>
    </td></tr>
    <tr><td style="background:#ffffff;padding:32px">
      <p style="margin:0 0 16px;font-size:15px;color:#121214"><strong>${name}</strong> submitted a form on the website.</p>
      <table width="100%" cellpadding="0" cellspacing="0">${detailsTable(pairs)}</table>
      <div style="margin-top:24px;text-align:center">
        <a href="https://stargateeducationconsultants.com/admin/submissions" style="display:inline-block;background:#121214;color:#D4AF37;padding:14px 32px;font-size:13px;font-weight:700;letter-spacing:0.5px;text-decoration:none">VIEW IN ADMIN PANEL</a>
      </div>
    </td></tr>
  `);
}

const SUBJECT: Record<string, string> = {
  CONTACT: "We've received your message — Stargate Education Consultants",
  STUDENT_APPLICATION:
    "Application Received — Stargate Education Consultants",
  AGENT_ENQUIRY:
    "Partner Enquiry Received — Stargate Education Consultants",
  JOB_APPLICATION:
    "Job Application Received — Stargate Education Consultants",
};

const ADMIN_SUBJECT: Record<string, string> = {
  CONTACT: "New Contact Submission",
  STUDENT_APPLICATION: "New Student Application",
  AGENT_ENQUIRY: "New Partner Enquiry",
  JOB_APPLICATION: "New Job Application",
};

export async function sendSubmissionEmails(
  type: string,
  name: string,
  details: string
) {
  const pairs = parseDetails(details);
  const recipientEmail = pairs["email"] || pairs["Email"] || pairs["EMAIL"];

  const templateFn: Record<
    string,
    (n: string, p: Record<string, string>) => string
  > = {
    CONTACT: contactTemplate,
    STUDENT_APPLICATION: studentTemplate,
    AGENT_ENQUIRY: agentTemplate,
    JOB_APPLICATION: jobTemplate,
  };

  const html = (templateFn[type] || contactTemplate)(name, pairs);

  const promises: Promise<unknown>[] = [];

  if (recipientEmail) {
    promises.push(
      transporter.sendMail({
        from: FROM,
        to: recipientEmail,
        subject: SUBJECT[type] || "Thank you — Stargate Education Consultants",
        html,
      })
    );
  }

  if (ADMIN) {
    promises.push(
      transporter.sendMail({
        from: FROM,
        to: ADMIN,
        subject: `[Stargate] ${ADMIN_SUBJECT[type] || "New Submission"} — ${name}`,
        html: adminNotification(type, name, pairs),
      })
    );
  }

  await Promise.allSettled(promises);
}
