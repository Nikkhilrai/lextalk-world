import { Resend } from "resend";
import { NextResponse } from "next/server";
import TicketEmail from "@/components/emails/TicketEmail";

function generateTicketId(): string {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    return `LTW-2026-${timestamp}-${random}`;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            customerName,
            email,
            phone,
            organization,
            designation,
            passType,
            amount,
            transactionId,
        } = body;

        // Validate required fields
        if (!email || !customerName) {
            return NextResponse.json(
                { error: "Missing required fields: email and customerName" },
                { status: 400 }
            );
        }

        // Check for API key
        if (!process.env.RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured");
            return NextResponse.json(
                {
                    error: "Email service not configured",
                    ticketId: generateTicketId(),
                    success: false,
                    emailSent: false
                },
                { status: 500 }
            );
        }

        const ticketId = generateTicketId();

        // Initialize Resend with the API key
        const resend = new Resend(process.env.RESEND_API_KEY);

        // Send email with ticket
        const { data, error } = await resend.emails.send({
            from: "LexTalk World <tickets@lextalkworld.in>",
            to: [email],
            subject: `Your LexTalk World Dubai 2026 Conference Pass - ${passType}`,
            react: TicketEmail({
                customerName,
                email,
                phone,
                organization,
                designation,
                passType,
                ticketId,
                amount: `$${amount}`,
                transactionId,
            }),
        });

        if (error) {
            console.error("Resend Error:", error);
            return NextResponse.json(
                { error: error.message, ticketId, emailSent: false },
                { status: 500 }
            );
        }

        console.log("Email sent successfully:", data);

        return NextResponse.json({
            success: true,
            ticketId,
            emailSent: true,
            messageId: data?.id,
        });

    } catch (error) {
        console.error("Send Confirmation Error:", error);
        return NextResponse.json(
            { error: "Failed to send confirmation email" },
            { status: 500 }
        );
    }
}
