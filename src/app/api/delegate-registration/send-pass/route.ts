import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBangalorePassPDF, BangalorePassTitle } from "@/lib/bangalore-pass-puppeteer";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

function resolvePassTitle(passType: string, conferenceSlug: string): BangalorePassTitle {
    if (conferenceSlug?.includes("awardee") || passType?.includes("awardee")) return "AWARDEE";
    return "DELEGATE";
}

function passTypeName(pt: string) {
    const map: Record<string, string> = {
        "delegate": "Delegate Pass",
        "delegate-vip": "Delegate VIP Pass",
        "student": "Student Pass",
        "vendor-vip": "Vendor Pass",
        "corporate-counsel": "Corporate Counsel Pass",
        "standard-physical": "Standard Pass",
        "premium-physical": "Premium Pass",
        "exclusive-physical": "Exclusive Pass",
    };
    return map[pt] || pt.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

function passEmailHtml(firstName: string, ticketNumber: string, passType: string, passTitle: string) {
    const passName = passTypeName(passType);
    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 0;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr><td style="background:#0f172a;border-radius:12px 12px 0 0;padding:36px 40px;text-align:center;">
        <p style="margin:0 0 6px;color:#f59e0b;font-size:10px;font-weight:700;letter-spacing:0.25em;text-transform:uppercase;">LexTalk World · Bangalore 2026</p>
        <h1 style="margin:0;color:#fff;font-size:26px;font-weight:700;">Your Entry Pass is Ready</h1>
        <p style="margin:10px 0 0;color:#94a3b8;font-size:13px;">June 11, 2026 · Radisson Blu Atria, Bangalore</p>
      </td></tr>

      <!-- Amber bar -->
      <tr><td style="height:3px;background:linear-gradient(90deg,#f59e0b,#fbbf24,#f59e0b);"></td></tr>

      <!-- Body -->
      <tr><td style="background:#fff;padding:40px;border:1px solid #e2e8f0;border-top:none;">

        <p style="margin:0 0 8px;color:#0f172a;font-size:17px;font-weight:600;">Dear ${firstName},</p>
        <p style="margin:0 0 28px;color:#475569;font-size:15px;line-height:1.8;">
          Your entry pass for <strong>LexTalk World Bangalore 2026</strong> is attached to this email as a PDF.
          Please keep it ready — printed or on your phone — for check-in at the venue.
        </p>

        <!-- Pass details card -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#fffbeb;border:1px solid #fde68a;border-radius:12px;margin-bottom:28px;">
          <tr><td style="padding:22px 24px;">
            <p style="margin:0 0 14px;color:#92400e;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">Pass Details</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:6px 0;color:#64748b;font-size:13px;width:130px;border-bottom:1px solid #fef3c7;">Pass Type</td>
                <td style="padding:6px 0;color:#b45309;font-size:13px;font-weight:700;border-bottom:1px solid #fef3c7;">${passName}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-size:13px;border-bottom:1px solid #fef3c7;">Badge</td>
                <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:600;border-bottom:1px solid #fef3c7;">${passTitle}</td>
              </tr>
              <tr>
                <td style="padding:6px 0;color:#64748b;font-size:13px;">Pass ID</td>
                <td style="padding:6px 0;color:#0f172a;font-size:13px;font-weight:700;font-family:monospace;letter-spacing:0.05em;">${ticketNumber}</td>
              </tr>
            </table>
          </td></tr>
        </table>

        <!-- Instructions -->
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;margin-bottom:28px;">
          <tr><td style="padding:20px 24px;">
            <p style="margin:0 0 12px;color:#64748b;font-size:10px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;">On the Day</p>
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding:5px 0;vertical-align:top;width:18px;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:5px;"></div></td>
                <td style="padding:5px 0;color:#475569;font-size:13px;line-height:1.6;">Show this pass (printed or on mobile) at the registration desk</td>
              </tr>
              <tr>
                <td style="padding:5px 0;vertical-align:top;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:5px;"></div></td>
                <td style="padding:5px 0;color:#475569;font-size:13px;line-height:1.6;">Carry a <strong>valid photo ID</strong> for verification</td>
              </tr>
              <tr>
                <td style="padding:5px 0;vertical-align:top;"><div style="width:6px;height:6px;background:#f59e0b;border-radius:50%;margin-top:5px;"></div></td>
                <td style="padding:5px 0;color:#475569;font-size:13px;line-height:1.6;">Registration opens at <strong>9:00 AM IST</strong></td>
              </tr>
            </table>
          </td></tr>
        </table>

        <p style="margin:0 0 6px;color:#475569;font-size:14px;font-weight:600;">Need help?</p>
        <p style="margin:0;color:#475569;font-size:13px;line-height:1.7;">
          Write to <a href="mailto:kishan@lextalkworld.in" style="color:#f59e0b;text-decoration:none;font-weight:600;">kishan@lextalkworld.in</a> or call <strong>+91 931 189 9545</strong>
        </p>

        <p style="margin:24px 0 0;color:#0f172a;font-size:14px;line-height:1.7;">
          See you on June 11!<br><br>
          Warm regards,<br>
          <strong style="color:#f59e0b;">The LexTalk World Team</strong>
        </p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background:#0f172a;border-radius:0 0 12px 12px;padding:20px 40px;text-align:center;">
        <p style="margin:0 0 4px;color:#64748b;font-size:11px;">Organised by ClickAway Creators LLP | Managed by MantranexVista</p>
        <a href="https://lextalkworld.in" style="color:#f59e0b;font-size:12px;text-decoration:none;">lextalkworld.in</a>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
    try {
        const { registrationId } = await request.json();

        if (!registrationId) {
            return NextResponse.json({ error: "Missing registrationId" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findUnique({
            where: { id: registrationId },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        if (registration.paymentStatus !== "success") {
            return NextResponse.json({ error: "Pass can only be sent for confirmed (paid) registrations" }, { status: 400 });
        }

        if (registration.passType?.includes("virtual")) {
            return NextResponse.json({ error: "Entry pass not available for virtual attendees" }, { status: 400 });
        }

        const passTitle = resolvePassTitle(registration.passType, registration.conferenceSlug || "");

        // Generate Puppeteer PDF
        const pdfBuffer = await generateBangalorePassPDF({
            attendeeName: `${registration.firstName} ${registration.lastName}`,
            organization: registration.organization || "",
            designation: registration.designation || "",
            passTitle,
            passType: registration.passType,
            ticketNumber: registration.ticketNumber || registration.id,
        });

        // Send dedicated pass email
        await resend.emails.send({
            from: "LexTalk World <noreply@lextalkworld.in>",
            to: registration.email,
            subject: `Your Entry Pass — LexTalk World Bangalore 2026`,
            html: passEmailHtml(
                registration.firstName,
                registration.ticketNumber,
                registration.passType,
                passTitle,
            ),
            attachments: [{
                filename: `LexTalk-Bangalore-Pass-${registration.ticketNumber}.pdf`,
                content: pdfBuffer.toString("base64"),
                contentType: "application/pdf",
            }],
        });

        return NextResponse.json({ success: true, message: `Pass sent to ${registration.email}` });
    } catch (error: any) {
        console.error("Error sending Bangalore pass:", error);
        return NextResponse.json({ error: "Failed to send pass", details: error.message }, { status: 500 });
    }
}
