
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder_key");

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            ticketNumber,
            ticketPdfUrl,
            buyerName,
            buyerEmail,
            organization,
            designation,
            passType,
            amount,
            currency = "USD",
            paymentId,
            orderDate,
        } = body;

        // Check if Resend is configured
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured");
            return NextResponse.json(
                { error: "Email service not configured" },
                { status: 500 }
            );
        }

        // Fetch PDF from dynamic download endpoint
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.in";
        let pdfBase64 = "";

        try {
            const pdfResponse = await fetch(`${baseUrl}/api/tickets/${ticketNumber}/download`);
            if (pdfResponse.ok) {
                const pdfBuffer = await pdfResponse.arrayBuffer();
                pdfBase64 = Buffer.from(pdfBuffer).toString("base64");
            } else {
                console.error("Failed to fetch PDF:", pdfResponse.status);
            }
        } catch (pdfErr) {
            console.error("Error fetching PDF for email:", pdfErr);
        }

        const formattedDate = new Date(orderDate || Date.now()).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric"
        });

        // Currency symbol
        const currencySymbol = currency === "INR" ? "₹" : "$";

        // Create HTML email template
        const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation - LexTalk World</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f5f6f7;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f6f7; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                    
                    <!-- Header -->
                    <tr>
                        <td style="background: linear-gradient(135deg, #0B1429 0%, #1F2937 100%); padding: 40px 30px; text-align: center;">
                            <h1 style="color: #F2C32E; margin: 0; font-size: 28px; font-weight: bold;">LexTalk World</h1>
                            <p style="color: #ffffff; margin: 10px 0 0; font-size: 14px;">Conference Registration</p>
                        </td>
                    </tr>

                    <!-- Success Banner -->
                    <tr>
                        <td style="background-color: #45B589; padding: 20px 30px; text-align: center;">
                            <p style="color: #ffffff; margin: 0; font-size: 18px; font-weight: bold;">✓ Payment Successful</p>
                            <p style="color: #ffffff; margin: 5px 0 0; font-size: 14px;">Your booking is confirmed</p>
                        </td>
                    </tr>

                    <!-- Main Content -->
                    <tr>
                        <td style="padding: 40px 30px;">
                            <p style="margin: 0 0 20px; font-size: 16px; color: #1F2937;">Dear ${buyerName},</p>
                            
                            <p style="margin: 0 0 30px; font-size: 15px; line-height: 24px; color: #4B5563;">
                                Thank you for registering for the <strong>Dubai 2026 Legal Conference</strong>. Your payment has been successfully processed and your conference pass is confirmed.
                            </p>

                            <!-- Transaction Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td colspan="2" style="background-color: #F3F4F6; padding: 15px 20px; border-bottom: 1px solid #E5E7EB;">
                                        <h2 style="margin: 0; font-size: 16px; color: #1F2937; font-weight: 600;">Transaction Details</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%;">Order Number</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">#${ticketNumber}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Date of Purchase</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">${formattedDate}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Payment Method</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">Razorpay</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; color: #6B7280; font-size: 14px;">Payment Reference</td>
                                    <td style="padding: 12px 20px; color: #1F2937; font-size: 14px; font-family: monospace; font-size: 12px;">${paymentId?.substring(0, 20) || 'N/A'}</td>
                                </tr>
                            </table>

                            <!-- Order Summary -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td colspan="3" style="background-color: #F3F4F6; padding: 15px 20px; border-bottom: 1px solid #E5E7EB;">
                                        <h2 style="margin: 0; font-size: 16px; color: #1F2937; font-weight: 600;">Order Summary</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; font-weight: 500;">${passType}</td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; text-align: center;">x 1</td>
                                    <td style="padding: 15px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px; text-align: right; font-weight: 500;">${currencySymbol}${amount?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td colspan="2" style="padding: 15px 20px; color: #1F2937; font-size: 15px; font-weight: 600;">Total</td>
                                    <td style="padding: 15px 20px; color: #1F2937; font-size: 16px; font-weight: 700; text-align: right;">${currencySymbol}${amount?.toLocaleString()} ${currency}</td>
                                </tr>
                            </table>

                            <!-- Attendee Info -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; border: 1px solid #E5E7EB; border-radius: 6px; overflow: hidden;">
                                <tr>
                                    <td colspan="2" style="background-color: #F3F4F6; padding: 15px 20px; border-bottom: 1px solid #E5E7EB;">
                                        <h2 style="margin: 0; font-size: 16px; color: #1F2937; font-weight: 600;">Attendee Information</h2>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px; width: 40%;">Name</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">${buyerName}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Email</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">${buyerEmail}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #6B7280; font-size: 14px;">Organization</td>
                                    <td style="padding: 12px 20px; border-bottom: 1px solid #E5E7EB; color: #1F2937; font-size: 14px;">${organization || 'N/A'}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 12px 20px; color: #6B7280; font-size: 14px;">Designation</td>
                                    <td style="padding: 12px 20px; color: #1F2937; font-size: 14px;">${designation || 'N/A'}</td>
                                </tr>
                            </table>

                            <!-- Event Details -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #FEF3C7; border: 1px solid #F59E0B; border-radius: 6px; padding: 20px;">
                                <tr>
                                    <td>
                                        <h3 style="margin: 0 0 10px; font-size: 16px; color: #92400E; font-weight: 600;">Event Details</h3>
                                        <p style="margin: 0 0 5px; color: #78350F; font-size: 14px;"><strong>Event:</strong> Dubai 2026 Legal Conference</p>
                                        <p style="margin: 0 0 5px; color: #78350F; font-size: 14px;"><strong>Dates:</strong> May 13-14, 2026</p>
                                        <p style="margin: 0; color: #78350F; font-size: 14px;"><strong>Venue:</strong> Dubai, UAE</p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Ticket Attachment Notice -->
                            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px; background-color: #DBEAFE; border: 1px solid #3B82F6; border-radius: 6px; padding: 20px;">
                                <tr>
                                    <td>
                                        <h3 style="margin: 0 0 10px; font-size: 16px; color: #1E40AF; font-weight: 600;">Your Conference Pass</h3>
                                        <p style="margin: 0; color: #1E3A8A; font-size: 14px; line-height: 22px;">
                                            Your conference pass is attached to this email as a PDF. Please download and save it to your device. 
                                            You'll need to present the QR code on your ticket at the registration desk for entry.
                                        </p>
                                    </td>
                                </tr>
                            </table>

                            <!-- Support Info -->
                            <p style="margin: 0 0 10px; font-size: 14px; color: #4B5563; line-height: 22px;">
                                If you have any questions or need assistance, please don't hesitate to contact our support team at 
                                <a href="mailto:info@lextalkworld.in" style="color: #3B82F6; text-decoration: none; font-weight: 500;">info@lextalkworld.in</a>
                            </p>

                            <p style="margin: 30px 0 0; font-size: 14px; color: #4B5563;">
                                We look forward to welcoming you at the Dubai 2026 Legal Conference!
                            </p>

                            <p style="margin: 20px 0 0; font-size: 14px; color: #4B5563;">
                                Best regards,<br>
                                <strong>The LexTalk World Team</strong>
                            </p>
                        </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                        <td style="background-color: #F3F4F6; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
                            <p style="margin: 0 0 10px; font-size: 12px; color: #6B7280;">
                                This is an automated confirmation email. Please do not reply to this message.
                            </p>
                            <p style="margin: 0; font-size: 12px; color: #9CA3AF;">
                                © ${new Date().getFullYear()} LexTalk World. All rights reserved.
                            </p>
                        </td>
                    </tr>

                </table>
            </td>
        </tr>
    </table>
</body>
</html>
        `;

        // Prepare email options
        const emailOptions: any = {
            from: "LexTalk World <noreply@lextalkworld.in>",
            to: [buyerEmail],
            subject: `Payment Confirmation - Dubai 2026 Conference Pass (${ticketNumber})`,
            html: htmlEmail,
        };

        // Attach PDF if we got it
        if (pdfBase64) {
            emailOptions.attachments = [
                {
                    filename: `${ticketNumber}.pdf`,
                    content: pdfBase64,
                },
            ];
        }

        // Send email with Resend
        const { data, error } = await resend.emails.send(emailOptions);

        if (error) {
            console.error("Error sending email:", error);
            return NextResponse.json(
                { error: "Failed to send email", details: error },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            emailId: data?.id,
        });
    } catch (error) {
        console.error("Error in email receipt:", error);
        return NextResponse.json(
            { error: "Failed to send email receipt" },
            { status: 500 }
        );
    }
}
