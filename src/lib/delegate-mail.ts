import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key_for_dev");

if (!process.env.RESEND_API_KEY) {
    console.warn("WARNING: RESEND_API_KEY is missing in environmental variables. Emails will not be delivered.");
}

interface EmailData {
    firstName: string;
    lastName: string;
    email: string;
    passType: string;
    passCategory: string;
    ticketNumber: string;
    ticketId: string;
    conferenceSlug?: string;
    bangalorePassPdf?: Buffer;
}

function passDisplayName(passType: string): string {
    const map: Record<string, string> = {
        "student": "Student Pass",
        "delegate": "Delegate Pass",
        "delegate-vip": "Delegate VIP Pass",
        "vendor-vip": "Vendor Pass",
        "corporate-counsel": "Corporate Counsel Exclusive Pass",
    };
    return map[passType] || passType.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function bangaloreEmailHtml(data: EmailData): string {
    const fullName = `${data.firstName} ${data.lastName}`;
    const passName = passDisplayName(data.passType);
    const hasPass = !!data.bangalorePassPdf;

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0f172a;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#f59e0b;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">LexTalk World · Bangalore Edition</p>
        <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.3;">Your Pass is Confirmed ✓</h1>
        <p style="margin:10px 0 0;color:#94a3b8;font-size:13px;">Conference &amp; Exhibition — June 11, 2026</p>
      </td></tr>

      <!-- Gold bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b);"></td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:40px;border:1px solid #e2e8f0;border-top:none;">

        <p style="margin:0 0 8px;color:#0f172a;font-size:17px;font-weight:600;">Dear ${data.firstName},</p>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.8;">
          You're in. Your delegate pass for <strong>LexTalk World Conference &amp; Exhibition — Bangalore 2026</strong> has been confirmed.
          ${hasPass ? "Your <strong>entry pass is attached</strong> to this email — please bring a printed or digital copy on the day." : ""}
        </p>

        <!-- Registration Details -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;color:#64748b;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Registration Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;width:140px;border-bottom:1px solid #f1f5f9;">Event</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #f1f5f9;">LexTalk World | Bangalore Edition</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">Date</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #f1f5f9;">Thursday, June 11, 2026</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">Venue</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #f1f5f9;">Radisson Blu Atria Bangalore, 1 Palace Rd, Bengaluru 560001</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">Attendee</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #f1f5f9;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;border-bottom:1px solid #f1f5f9;">Pass Type</td>
                <td style="padding:7px 0;color:#f59e0b;font-size:13px;font-weight:700;border-bottom:1px solid #f1f5f9;">${passName}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;">Confirmation ID</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:700;font-family:monospace;letter-spacing:0.05em;">${data.ticketNumber}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        ${hasPass ? `
        <!-- Entry Pass notice -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:1px solid #fde68a;border-radius:10px;margin-bottom:28px;">
          <tr><td style="padding:18px 24px;">
            <p style="margin:0 0 6px;color:#92400e;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Your Entry Pass</p>
            <p style="margin:0;color:#78350f;font-size:13px;line-height:1.6;">
              Your personalised entry pass with QR code is <strong>attached to this email</strong> as a PDF.<br>
              Please present it (printed or on mobile) at the registration desk on June 11.
            </p>
          </td></tr>
        </table>
        ` : ""}

        <!-- What happens next -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;color:#92400e;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">What Happens Next</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;vertical-align:top;width:20px;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:6px;"></div></td>
                <td style="padding:6px 0;color:#78350f;font-size:13px;line-height:1.6;">You'll receive the <strong>detailed agenda 2 weeks</strong> before the event</td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:6px;"></div></td>
                <td style="padding:6px 0;color:#78350f;font-size:13px;line-height:1.6;">A <strong>reminder with logistics details</strong> will follow 5 days prior</td>
              </tr>
              <tr>
                <td style="padding:6px 0;vertical-align:top;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:6px;"></div></td>
                <td style="padding:6px 0;color:#78350f;font-size:13px;line-height:1.6;">Your <strong>delegate kit</strong> will be available at check-in</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <!-- Questions -->
        <p style="margin:0 0 6px;color:#475569;font-size:14px;font-weight:600;">Questions?</p>
        <p style="margin:0 0 28px;color:#475569;font-size:13px;line-height:1.7;">
          Write to <a href="mailto:kishan@lextalkworld.in" style="color:#f59e0b;text-decoration:none;font-weight:600;">kishan@lextalkworld.in</a> or call <strong>+91 931 189 9545</strong>
        </p>

        <p style="margin:0;color:#0f172a;font-size:14px;line-height:1.7;">
          We look forward to seeing you in Bangalore.<br><br>
          Warm regards,<br>
          <strong style="color:#f59e0b;">The LexTalk World Team</strong>
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#64748b;font-size:11px;">Organised by ClickAway Creators LLP | Managed by MantranexVista</p>
        <a href="https://lextalkworld.in" style="color:#f59e0b;font-size:12px;text-decoration:none;">lextalkworld.in</a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function dubaiEmailHtml(data: EmailData): string {
    const fullName = `${data.firstName} ${data.lastName}`;
    const passName = passDisplayName(data.passType);

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <tr><td style="background:#0f172a;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#f59e0b;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">LexTalk World · Dubai 2026</p>
        <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">Ticket Confirmation</h1>
      </td></tr>

      <tr><td style="height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b);"></td></tr>

      <tr><td style="background:#ffffff;padding:40px;border:1px solid #e2e8f0;border-top:none;">
        <p style="margin:0 0 8px;color:#0f172a;font-size:17px;font-weight:600;">Dear ${data.firstName},</p>
        <p style="margin:0 0 24px;color:#475569;font-size:15px;line-height:1.8;">
          We are thrilled to confirm your registration for <strong>LexTalk World Global Legal Conference &amp; Awards – Dubai 2026</strong>.
        </p>

        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 14px;color:#64748b;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Your Registration Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;width:140px;">Attendee</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:600;text-align:right;">${fullName}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;">Pass Type</td>
                <td style="padding:7px 0;color:#f59e0b;font-size:13px;font-weight:700;text-align:right;">${passName}</td>
              </tr>
              <tr>
                <td style="padding:7px 0;color:#64748b;font-size:13px;">Ticket Number</td>
                <td style="padding:7px 0;color:#0f172a;font-size:13px;font-weight:700;text-align:right;font-family:monospace;">${data.ticketNumber}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:0 0 24px;color:#475569;font-size:14px;line-height:1.8;">
          Your official ticket is attached to this email. Please keep it handy for check-in at the venue.
        </p>

        <div style="text-align:center;margin-top:32px;">
          <a href="https://lextalkworld.in/dubai-delegate-confirmation-2026?regId=${data.ticketId}"
             style="display:inline-block;background:#0f172a;color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;">
            View Digital Ticket →
          </a>
        </div>
      </td></tr>

      <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#64748b;font-size:11px;">© 2026 LexTalk World. All rights reserved.</p>
        <a href="https://lextalkworld.in" style="color:#f59e0b;font-size:12px;text-decoration:none;">lextalkworld.in</a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function sendDelegateConfirmationEmail(data: EmailData) {
    try {
        const fullName = `${data.firstName} ${data.lastName}`;
        const isBangalore = data.conferenceSlug?.includes("bangalore");

        console.log(`Sending confirmation email to: ${data.email} (${fullName}) — ${data.conferenceSlug}`);

        const subject = isBangalore
            ? `Your entry pass is confirmed — LexTalk World Bangalore, June 11 ✓`
            : `Your LexTalk World Dubai 2026 Ticket Confirmation — ${data.ticketNumber}`;

        const html = isBangalore ? bangaloreEmailHtml(data) : dubaiEmailHtml(data);

        const attachments = [];
        if (isBangalore && data.bangalorePassPdf) {
            attachments.push({
                filename: `LexTalk-Bangalore-Pass-${data.ticketNumber}.pdf`,
                content: data.bangalorePassPdf.toString("base64"),
                contentType: "application/pdf",
            });
        }

        await resend.emails.send({
            from: "LexTalk World <noreply@lextalkworld.in>",
            to: data.email,
            subject,
            html,
            ...(attachments.length > 0 ? { attachments } : {}),
        });

        console.log(`Confirmation email sent successfully to ${data.email}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
        return { success: false, error: "Email delivery failed" };
    }
}
