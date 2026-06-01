import nodemailer from "nodemailer";

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) return null;

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendNotificationEmail(
  subject: string,
  html: string
): Promise<boolean> {
  const transporter = getTransporter();
  if (!transporter) return false;

  const from = process.env.SMTP_FROM || process.env.SMTP_USER;
  const to = process.env.NOTIFY_EMAIL;

  if (!from || !to) return false;

  try {
    await transporter.sendMail({ from, to, subject, html });
    return true;
  } catch (error) {
    console.error("Email send failed:", error);
    return false;
  }
}

export function formatLeadNotification(data: {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  source?: string;
}): string {
  return `
    <h2>Neue Anfrage — Stickwerk-Studio</h2>
    <table style="border-collapse:collapse;width:100%;max-width:600px;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${data.name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">E-Mail</td><td style="padding:8px;">${data.email}</td></tr>
      ${data.phone ? `<tr><td style="padding:8px;font-weight:bold;">Telefon</td><td style="padding:8px;">${data.phone}</td></tr>` : ""}
      ${data.source ? `<tr><td style="padding:8px;font-weight:bold;">Quelle</td><td style="padding:8px;">${data.source}</td></tr>` : ""}
    </table>
    ${data.message ? `<h3>Nachricht:</h3><p style="white-space:pre-wrap;">${data.message}</p>` : ""}
    <hr />
    <p style="color:#666;font-size:12px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || ""}/admin/leads">Zum Admin-Dashboard</a>
    </p>
  `;
}
