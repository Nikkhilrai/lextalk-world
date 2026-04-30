import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";
import { generateBangalorePass } from "@/lib/bangalore-pass-generator";
import type { BangalorePassTitle } from "@/lib/bangalore-pass-generator";

function generateTicketNumber(conferenceSlug: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const prefix = conferenceSlug?.includes("bangalore") ? "LTW-BLR26-" : "LTW-DXB26-";
    let result = prefix;
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function resolvePassTitle(passType: string, conferenceSlug: string): BangalorePassTitle {
    if (conferenceSlug?.includes("awardee")) return "AWARDEE";
    if (passType?.includes("awardee")) return "AWARDEE";
    return "DELEGATE";
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            registrationId,
        } = body;

        // Verify signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || "")
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            const prismaClient = prisma as any;
            await prismaClient.delegateRegistration.update({
                where: { id: registrationId },
                data: { paymentStatus: "failed" },
            });
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        const prismaClient = prisma as any;

        // Idempotency check
        const existing = await prismaClient.delegateRegistration.findFirst({
            where: { razorpayPaymentId: razorpay_payment_id },
        });

        if (existing) {
            return NextResponse.json({
                success: true,
                ticketNumber: existing.ticketNumber,
                message: "Payment already processed",
            });
        }

        // Get conference slug from the registration to generate correct prefix
        const pendingReg = await prismaClient.delegateRegistration.findUnique({
            where: { id: registrationId },
        });
        const conferenceSlug = pendingReg?.conferenceSlug || "";

        // Generate unique ticket number with correct prefix
        let ticketNumber = generateTicketNumber(conferenceSlug);
        let attempts = 0;
        while (attempts < 5) {
            const exists = await prismaClient.delegateRegistration.findFirst({ where: { ticketNumber } });
            if (!exists) break;
            ticketNumber = generateTicketNumber(conferenceSlug);
            attempts++;
        }

        // Update registration as successful
        const registration = await prismaClient.delegateRegistration.update({
            where: { id: registrationId },
            data: {
                paymentStatus: "success",
                razorpayPaymentId: razorpay_payment_id,
                ticketNumber,
            },
        });

        // Notification
        await (prisma as any).notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `Ticket purchased by ${registration.firstName} ${registration.lastName} (${registration.passType})`,
                referenceId: registration.id,
                link: `/admin/registrations/${registration.id}`,
            }
        }).catch((err: any) => console.error("Notification error:", err));

        // Generate Bangalore PDF pass for physical attendees
        let bangalorePassPdf: Buffer | null = null;
        const isBangalorePhysical =
            conferenceSlug?.includes("bangalore") &&
            !registration.passType?.includes("virtual");

        if (isBangalorePhysical) {
            try {
                bangalorePassPdf = await generateBangalorePass({
                    attendeeName: `${registration.firstName} ${registration.lastName}`,
                    organization: registration.organization || "",
                    designation: registration.designation || "",
                    passTitle: resolvePassTitle(registration.passType, conferenceSlug),
                    passType: registration.passType,
                    ticketNumber,
                });
            } catch (pdfErr) {
                console.error("Failed to generate Bangalore pass PDF:", pdfErr);
            }
        }

        // Send confirmation email
        try {
            const emailResult = await sendDelegateConfirmationEmail({
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                passType: registration.passType,
                passCategory: registration.passCategory,
                ticketNumber: registration.ticketNumber,
                ticketId: registration.ticketId,
                conferenceSlug: registration.conferenceSlug || "",
                bangalorePassPdf: bangalorePassPdf ?? undefined,
            });

            if (emailResult.success) {
                await prismaClient.delegateRegistration.update({
                    where: { id: registration.id },
                    data: { emailSent: true },
                });
            }
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
        }

        return NextResponse.json({
            success: true,
            ticketNumber,
            registration: {
                id: registration.id,
                email: registration.email,
                passType: registration.passType,
                passCategory: registration.passCategory,
            },
        });
    } catch (error: any) {
        console.error("Error verifying delegate payment:", error);
        return NextResponse.json(
            { error: `Failed to verify payment: ${error.message}` },
            { status: 500 }
        );
    }
}
