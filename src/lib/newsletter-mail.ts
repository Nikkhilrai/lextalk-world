const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM = { name: "LexTalk World", email: "newsletter@lextalkworld.in" };
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.in";

export function buildNewsletterHtml(params: {
    subject: string;
    htmlContent: string;
    recipientName: string;
    unsubscribeToken: string;
    previewText?: string;
}): string {
    const { subject, htmlContent, recipientName, unsubscribeToken, previewText } = params;
    const unsubscribeUrl = `${BASE_URL}/unsubscribe?token=${unsubscribeToken}`;
    // Only use the name if it looks like a real name (not an email username like "nikkhhilrai")
    const firstName = recipientName?.split(" ")[0] || "";
    const looksLikeName = firstName.length > 0 && /[A-Z]/.test(firstName);
    const greeting = looksLikeName ? `Hi ${firstName},` : "Hi there,";
    const preheader = previewText || "This week's top reads on law, AI & data privacy from LexTalk World.";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<!-- Preheader text: hidden but shows in inbox preview -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0f172a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">LexTalk World</p>
        <p style="margin:0 0 10px;color:#94a3b8;font-size:10px;font-weight:600;letter-spacing:0.15em;text-transform:uppercase;">APAC &amp; Middle East</p>
        <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">${subject}</h1>
      </td></tr>

      <!-- Amber bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b);"></td></tr>

      <!-- Body -->
      <tr><td style="background:#ffffff;padding:36px 40px;border:1px solid #e2e8f0;border-top:none;">
        <p style="margin:0 0 20px;color:#0f172a;font-size:16px;font-weight:600;">${greeting}</p>
        <div style="color:#475569;font-size:15px;line-height:1.8;">
          ${htmlContent}
        </div>
      </td></tr>

      <!-- Divider -->
      <tr><td style="height:1px;background:#e2e8f0;"></td></tr>

      <!-- Footer -->
      <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:24px 40px;border:1px solid #e2e8f0;border-top:none;text-align:center;">
        <p style="margin:0 0 4px;color:#0f172a;font-size:13px;font-weight:700;">LexTalk World &nbsp;·&nbsp; <span style="font-weight:400;color:#94a3b8;">The Global Platform for Legal Professionals</span></p>

        <!-- Social links -->
        <p style="margin:12px 0;">
          <a href="https://www.linkedin.com/company/lextalkworld-apac-me/" style="display:inline-block;margin:0 5px;padding:6px 12px;background:#0a66c2;color:#ffffff;font-size:11px;font-weight:700;text-decoration:none;border-radius:4px;">LinkedIn</a>
          <a href="https://x.com/LextalkWorldME" style="display:inline-block;margin:0 5px;padding:6px 12px;background:#000000;color:#ffffff;font-size:11px;font-weight:700;text-decoration:none;border-radius:4px;">X</a>
          <a href="https://www.instagram.com/lextalkworldapacandme/" style="display:inline-block;margin:0 5px;padding:6px 12px;background:#e1306c;color:#ffffff;font-size:11px;font-weight:700;text-decoration:none;border-radius:4px;">Instagram</a>
          <a href="https://www.facebook.com/profile.php?id=61585120593750" style="display:inline-block;margin:0 5px;padding:6px 12px;background:#1877f2;color:#ffffff;font-size:11px;font-weight:700;text-decoration:none;border-radius:4px;">Facebook</a>
          <a href="https://www.youtube.com/@LextalkWorldAPACandME" style="display:inline-block;margin:0 5px;padding:6px 12px;background:#ff0000;color:#ffffff;font-size:11px;font-weight:700;text-decoration:none;border-radius:4px;">YouTube</a>
        </p>

        <p style="margin:0;color:#94a3b8;font-size:10px;line-height:1.8;">
          You're receiving this because you engaged with LexTalk World. &nbsp;
          <a href="${unsubscribeUrl}" style="color:#f59e0b;text-decoration:underline;">Unsubscribe</a>
          &nbsp;·&nbsp;
          <a href="https://lextalkworld.in" style="color:#94a3b8;text-decoration:none;">lextalkworld.in</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function sendNewsletterEmail(params: {
    to: string;
    name: string;
    subject: string;
    htmlContent: string;
    unsubscribeToken: string;
    previewText?: string;
}): Promise<{ success: boolean; error?: string }> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return { success: false, error: "BREVO_API_KEY not configured" };

    const html = buildNewsletterHtml({
        subject: params.subject,
        htmlContent: params.htmlContent,
        recipientName: params.name,
        unsubscribeToken: params.unsubscribeToken,
        previewText: params.previewText,
    });

    const unsubscribeUrl = `${BASE_URL}/unsubscribe?token=${params.unsubscribeToken}`;

    try {
        const res = await fetch(BREVO_API_URL, {
            method: "POST",
            headers: {
                "accept": "application/json",
                "content-type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                sender: FROM,
                to: [{ email: params.to, name: params.name || params.to }],
                replyTo: { email: "hello@lextalkworld.in", name: "LexTalk World" },
                subject: params.subject,
                htmlContent: html,
                headers: {
                    "List-Unsubscribe": `<${unsubscribeUrl}>`,
                    "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
                },
            }),
        });

        if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            const msg = (body as any)?.message || `Brevo error ${res.status}`;
            return { success: false, error: msg };
        }

        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
