const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const FROM = { name: "LexTalk World", email: "newsletter@lextalkworld.in" };
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.com";

export function buildNewsletterHtml(params: {
    subject: string;
    htmlContent: string;
    recipientName: string;
    unsubscribeToken: string;
}): string {
    const { subject, htmlContent, recipientName, unsubscribeToken } = params;
    const unsubscribeUrl = `${BASE_URL}/unsubscribe?token=${unsubscribeToken}`;
    const greeting = recipientName ? `Hi ${recipientName.split(" ")[0]},` : "Hi there,";

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0f172a;border-radius:12px 12px 0 0;padding:32px 40px;text-align:center;">
        <p style="margin:0 0 6px;color:#f59e0b;font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">LexTalk World</p>
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
      <tr><td style="background:#f8fafc;border-radius:0 0 12px 12px;padding:24px 40px;border:1px solid #e2e8f0;border-top:none;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="text-align:center;">
              <p style="margin:0 0 8px;color:#0f172a;font-size:13px;font-weight:700;">LexTalk World</p>
              <p style="margin:0 0 12px;color:#94a3b8;font-size:11px;">The Global Platform for Legal Professionals</p>
              <p style="margin:0;color:#94a3b8;font-size:10px;line-height:1.8;">
                You're receiving this because you engaged with LexTalk World.<br>
                <a href="${unsubscribeUrl}" style="color:#f59e0b;text-decoration:underline;">Unsubscribe</a>
                &nbsp;·&nbsp;
                <a href="https://lextalkworld.com" style="color:#94a3b8;text-decoration:none;">lextalkworld.com</a>
              </p>
            </td>
          </tr>
        </table>
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
}): Promise<{ success: boolean; error?: string }> {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) return { success: false, error: "BREVO_API_KEY not configured" };

    const html = buildNewsletterHtml({
        subject: params.subject,
        htmlContent: params.htmlContent,
        recipientName: params.name,
        unsubscribeToken: params.unsubscribeToken,
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
