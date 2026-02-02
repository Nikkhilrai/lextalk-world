import { Resend } from "resend";
import { generateTicketPDF } from "./ticket-generator";

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
}

export async function sendDelegateConfirmationEmail(data: EmailData) {
    try {
        const fullName = `${data.firstName} ${data.lastName}`;
        console.log(`Attempting to send confirmation email to: ${data.email} (${fullName})`);

        // Generate PDF ticket for attachment
        const pdfBuffer = await generateTicketPDF({
            attendeeName: fullName,
            eventName: "LexTalk World Dubai 2026",
            eventDate: "13-14 May, 2026",
            eventVenue: "To be announced",
            passType: data.passType.replace(/-/g, ' ').toUpperCase(),
            ticketNumber: data.ticketNumber,
            ticketId: data.ticketId,
        });

        const html = `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; color: #1e293b;">
                <!-- Header -->
                <div style="background-color: #0f172a; padding: 40px 20px; text-align: center;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 28px; letter-spacing: 1px;">LEXTALK WORLD</h1>
                    <p style="color: #f59e0b; margin: 10px 0 0; font-size: 14px; font-weight: bold; text-transform: uppercase;">Dubai 2026 Ticket Confirmation</p>
                </div>

                <!-- Body -->
                <div style="padding: 40px 30px;">
                    <h2 style="color: #0f172a; margin-top: 0; font-size: 24px;">Dear ${data.firstName},</h2>
                    <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                        We are thrilled to confirm your registration for <strong>LexTalk World Global Legal Conference & Awards – Dubai 2026</strong>.
                    </p>
                    <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                        Your payment has been successfully processed, and your place at the premiere legal networking event of the year is secured.
                    </p>

                    <!-- Ticket Details Card -->
                    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 25px; margin: 30px 0;">
                        <h3 style="margin-top: 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 1px;">Your Registration Details</h3>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Attendee</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right;">${fullName}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Pass Type</td>
                                <td style="padding: 8px 0; color: #f59e0b; font-size: 14px; font-weight: bold; text-align: right;">${data.passType.replace(/-/g, ' ').toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Category</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right;">${data.passCategory.toUpperCase()}</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #64748b; font-size: 14px;">Ticket Number</td>
                                <td style="padding: 8px 0; color: #0f172a; font-size: 14px; font-weight: bold; text-align: right;">${data.ticketNumber}</td>
                            </tr>
                        </table>
                    </div>

                    <!-- Event Info -->
                    <div style="margin-bottom: 30px;">
                        <h3 style="margin-top: 0; font-size: 14px; color: #64748b; text-transform: uppercase;">Event Details</h3>
                        <p style="font-size: 15px; margin: 5px 0; color: #1e293b;">🗓 <strong>13-14 May, 2026</strong></p>
                        <p style="font-size: 15px; margin: 5px 0; color: #1e293b;">📍 <strong>To be announced</strong></p>
                    </div>

                    <p style="font-size: 16px; line-height: 1.6; color: #475569;">
                        We have attached your official ticket to this email. Please keep it handy (printed or digital) for a fast-track registration experience at the venue.
                    </p>

                    <div style="text-align: center; margin-top: 40px;">
                        <a href="https://lextalkworld.in/dubai-delegate-confirmation-2026?regId=${data.ticketId}" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: bold; font-size: 16px;">View Digital Ticket Online</a>
                    </div>
                </div>

                <!-- Footer -->
                <div style="background-color: #f8fafc; padding: 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; font-size: 14px; color: #64748b;">Need help? Contact our support team</p>
                    <p style="margin: 5px 0 0; font-size: 14px; color: #0f172a; font-weight: bold;">support@lextalkworld.in</p>
                    <div style="margin-top: 20px; font-size: 12px; color: #94a3b8;">
                        © 2026 LexTalk World. All rights reserved.
                    </div>
                </div>
            </div>
        `;

        await resend.emails.send({
            from: "LexTalk World <noreply@lextalkworld.in>",
            to: data.email,
            subject: `Your LexTalk World Dubai 2026 Ticket Confirmation - ${data.ticketNumber}`,
            html: html,
            attachments: [
                {
                    filename: `LexTalk-Ticket-${data.ticketNumber}.pdf`,
                    content: pdfBuffer,
                }
            ]
        });

        console.log(`Confirmation email sent successfully to ${data.email}`);
        return { success: true };
    } catch (error) {
        console.error("Failed to send confirmation email:", error);
        return { success: false, error: "Email delivery failed" };
    }
}
