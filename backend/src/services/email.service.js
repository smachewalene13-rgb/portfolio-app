import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";

const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "smachewalene13@gmail.com";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: { user, pass },
    });
    return transporter;
  }

  return null;
}

export const emailService = {
  async sendContactNotification({ name, email, subject, message }) {
    const activeTransporter = getTransporter();

    if (!activeTransporter) {
      logger.info(
        `📧 [Contact Alert] New inquiry received!\n` +
          `   From:    ${name} <${email}>\n` +
          `   Subject: ${subject || "(No Subject)"}\n` +
          `   Message: ${message.slice(0, 100)}${message.length > 100 ? "..." : ""}\n` +
          `   ℹ Configure SMTP in .env to receive real-time email delivery.`
      );
      return { sent: false, reason: "SMTP not configured (logged to console)" };
    }

    try {
      const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: NOTIFICATION_EMAIL,
        replyTo: `"${name}" <${email}>`,
        subject: `🔔 New Portfolio Message: ${subject || "General Inquiry"} from ${name}`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0f1117; color: #f3f4f6; border-radius: 12px; border: 1px solid #2d3748;">
            <div style="border-bottom: 1px solid #2d3748; padding-bottom: 16px; margin-bottom: 20px;">
              <span style="background: #8b5cf6; color: #ffffff; padding: 4px 10px; border-radius: 9999px; font-size: 11px; text-transform: uppercase; font-weight: bold; letter-spacing: 0.05em;">New Inquiry</span>
              <h2 style="color: #ffffff; margin: 12px 0 4px 0; font-size: 20px;">You received a message on your portfolio</h2>
              <p style="color: #9ca3af; font-size: 13px; margin: 0;">Received on ${new Date().toLocaleString()}</p>
            </div>

            <div style="background: #1a202c; padding: 16px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #2d3748;">
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Sender:</strong> <span style="color: #c4b5fd;">${name}</span></p>
              <p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #a78bfa; text-decoration: underline;">${email}</a></p>
              ${subject ? `<p style="margin: 0 0 8px 0; font-size: 14px;"><strong>Subject:</strong> ${subject}</p>` : ""}
            </div>

            <div style="background: #111827; padding: 18px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin-bottom: 24px;">
              <p style="margin: 0; color: #e5e7eb; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
            </div>

            <div style="text-align: center;">
              <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your message on my portfolio")}" 
                 style="display: inline-block; background: #8b5cf6; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 14px;">
                Reply to ${name}
              </a>
            </div>

            <p style="color: #6b7280; font-size: 11px; text-align: center; margin-top: 24px; border-top: 1px solid #2d3748; padding-top: 16px;">
              Sent automatically from your Full-Stack Portfolio Application.
            </p>
          </div>
        `,
      };

      const info = await activeTransporter.sendMail(mailOptions);
      logger.info(`✓ Instant email alert sent to ${NOTIFICATION_EMAIL}: ${info.messageId}`);
      return { sent: true, messageId: info.messageId };
    } catch (error) {
      logger.error("Failed to send email notification:", error.message);
      return { sent: false, error: error.message };
    }
  },
};

export default emailService;
