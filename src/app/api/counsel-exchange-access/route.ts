import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Admin email(s) that receive new request notifications
const ADMIN_EMAILS = ["nikhil@mantranexvista.com", "abhishek@mantranexvista.com"];

function userConfirmationHtml(name: string) {
    const firstName = name.split(" ")[0];
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr><td style="background:linear-gradient(135deg,#1e293b 0%,#0f172a 100%);border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
          <p style="margin:0 0 8px 0;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;">The Counsel Exchange</p>
          <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;line-height:1.3;">Access Confirmation</h1>
        </td></tr>

        <!-- Gold bar -->
        <tr><td style="height:4px;background:linear-gradient(90deg,#f59e0b,#d97706,#f59e0b);"></td></tr>

        <!-- Body -->
        <tr><td style="background:#ffffff;padding:40px;border:1px solid #e2e8f0;border-top:none;">
          <p style="margin:0 0 20px;color:#1e293b;font-size:16px;line-height:1.6;">Dear <strong>${firstName}</strong>,</p>

          <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.8;">
            Thank you for submitting your request to join <strong>The Counsel Exchange</strong>.
          </p>

          <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.8;">
            Your access has been confirmed. Please find the Zoom meeting details below to join the session.
          </p>

          <!-- Session info box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:10px;margin-bottom:24px;">
            <tr><td style="padding:20px 24px;">
              <p style="margin:0 0 12px;color:#92400e;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Session Details</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#78350f;font-size:14px;width:120px;">Topic</td>
                  <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">AI, Patents &amp; Power: Who Owns Innovation</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#78350f;font-size:14px;">Date</td>
                  <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">22 April 2026</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#78350f;font-size:14px;">Time</td>
                  <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">4:30 PM IST · 60 Minutes</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#78350f;font-size:14px;">Format</td>
                  <td style="padding:6px 0;color:#1e293b;font-size:14px;font-weight:600;">Virtual · Zoom Meeting</td>
                </tr>
              </table>
            </td></tr>
          </table>

          <!-- Zoom Join Box -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;border-radius:10px;margin-bottom:28px;">
            <tr><td style="padding:24px;">
              <p style="margin:0 0 16px;color:#f59e0b;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Zoom Meeting Access</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;color:#94a3b8;font-size:13px;width:120px;">Meeting ID</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:13px;font-weight:700;font-family:monospace;">630 337 8211</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;color:#94a3b8;font-size:13px;">Passcode</td>
                  <td style="padding:6px 0;color:#ffffff;font-size:13px;font-weight:700;font-family:monospace;">k16jHn</td>
                </tr>
              </table>
              <div style="margin-top:20px;text-align:center;">
                <a href="https://us06web.zoom.us/j/6303378211?pwd=ZkAFkK1UEZWkLXyUq6dj2TUAGqOZTM.1"
                   style="display:inline-block;background:#f59e0b;color:#0f172a;padding:14px 32px;border-radius:8px;text-decoration:none;font-weight:800;font-size:15px;letter-spacing:0.02em;">
                  Join Zoom Meeting →
                </a>
              </div>
            </td></tr>
          </table>

          <p style="margin:0 0 8px;color:#475569;font-size:15px;line-height:1.8;">We look forward to your participation in this exchange.</p>

          <p style="margin:28px 0 0;color:#1e293b;font-size:15px;line-height:1.6;">
            Warm regards,<br>
            <strong style="color:#f59e0b;">LEXTALK WORLD APAC TEAM</strong>
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:24px 40px;text-align:center;">
          <p style="margin:0 0 6px;color:#94a3b8;font-size:12px;">© 2026 LexTalk World. All rights reserved.</p>
          <a href="https://lextalkworld.in" style="color:#f59e0b;font-size:12px;text-decoration:none;">www.lextalkworld.in</a>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminNotificationHtml(data: {
    name: string; email: string; phone: string;
    country: string; organization: string; designation: string; message?: string | null;
}) {
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <tr><td style="background:linear-gradient(135deg,#f59e0b 0%,#d97706 100%);border-radius:12px 12px 0 0;padding:28px 36px;">
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;">🔔 New Counsel Exchange Request</h1>
          <p style="margin:6px 0 0;color:rgba(255,255,255,0.85);font-size:13px;">${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
        </td></tr>

        <tr><td style="background:#ffffff;padding:32px 36px;border:1px solid #e2e8f0;border-top:none;">
          <table width="100%" cellpadding="0" cellspacing="0">
            ${[
                ["Name", data.name],
                ["Email", data.email],
                ["Phone", data.phone],
                ["Country", data.country],
                ["Organization", data.organization],
                ["Designation", data.designation],
            ].map(([label, value]) => `
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:14px;width:130px;">${label}</td>
              <td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#1e293b;font-size:14px;font-weight:600;">${value}</td>
            </tr>`).join("")}
            ${data.message ? `
            <tr>
              <td colspan="2" style="padding:16px 0 0;">
                <p style="margin:0 0 6px;color:#64748b;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;">Message</p>
                <p style="margin:0;padding:12px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0;color:#475569;font-size:14px;line-height:1.6;">${data.message}</p>
              </td>
            </tr>` : ""}
          </table>

          <div style="margin-top:28px;text-align:center;">
            <a href="https://lextalkworld.in/admin/counsel-exchange-access"
               style="display:inline-block;background:#1e293b;color:#ffffff;padding:12px 28px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px;">
              View in Admin Dashboard →
            </a>
          </div>
        </td></tr>

        <tr><td style="padding:20px;text-align:center;">
          <p style="margin:0;color:#94a3b8;font-size:11px;">Automated notification · LexTalk World</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, phone, country, organization, designation, message } = body;

        if (!name || !email || !phone || !country || !organization || !designation) {
            return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
        }

        const entry = await (prisma as any).counselExchangeRequest.create({
            data: { name, email, phone, country, organization, designation, message: message || null }
        });

        await prisma.notification.create({
            data: {
                type: "COUNSEL_EXCHANGE_REQUEST",
                message: `New access request from ${name} (${organization}) for Counsel Exchange`,
                referenceId: entry.id,
                link: "/admin/counsel-exchange-access",
            }
        }).catch(err => console.error("Notification error:", err));

        // These MUST be awaited. On Vercel the serverless function is frozen as
        // soon as the response returns, which silently discards un-awaited
        // promises — fire-and-forget meant these emails were never delivered.
        const [userMail, adminMail] = await Promise.allSettled([
            resend.emails.send({
                from: "LexTalk World <noreply@lextalkworld.in>",
                to: email,
                subject: "Access Confirmation | The Counsel Exchange",
                html: userConfirmationHtml(name),
            }),
            resend.emails.send({
                from: "LexTalk World <noreply@lextalkworld.in>",
                to: ADMIN_EMAILS,
                subject: `New Counsel Exchange Request — ${name} (${organization})`,
                html: adminNotificationHtml({ name, email, phone, country, organization, designation, message }),
            }),
        ]);
        // Resend resolves with { error } rather than throwing, so check both.
        if (userMail.status === "rejected") console.error("[counsel-exchange] user email threw:", userMail.reason);
        else if (userMail.value?.error) console.error("[counsel-exchange] user email REJECTED:", userMail.value.error);
        if (adminMail.status === "rejected") console.error("[counsel-exchange] admin email threw:", adminMail.reason);
        else if (adminMail.value?.error) console.error("[counsel-exchange] admin email REJECTED:", adminMail.value.error);

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Counsel exchange request error:", error);
        return NextResponse.json({ error: "Failed to submit request" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const entries = await (prisma as any).counselExchangeRequest.findMany({
            orderBy: { createdAt: "desc" }
        });
        return NextResponse.json(entries);
    } catch (error) {
        console.error("Fetch counsel exchange requests error:", error);
        return NextResponse.json({ error: "Failed to fetch requests" }, { status: 500 });
    }
}
