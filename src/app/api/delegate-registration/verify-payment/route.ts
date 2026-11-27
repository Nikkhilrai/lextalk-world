import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";
import { generateBangalorePassPDF, BangalorePassTitle } from "@/lib/bangalore-pass-puppeteer";
import { triggerDelegateSync } from "@/lib/sheets-sync";

function generateTicketNumber(conferenceSlug: string): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const prefix = conferenceSlug?.includes("bangalore")
        ? "LTW-BLR26-"
        : conferenceSlug?.includes("mumbai")
            ? "LTW-BOM26-"
            : conferenceSlug?.includes("singapore")
                ? "LTW-SIN27-"
                : "LTW-DXB26-";
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

async function fetchOrder(orderId: string) {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });
    for (let attempt = 1; ; attempt++) {
        try {
            return await razorpay.orders.fetch(orderId);
        } catch (err) {
            if (attempt === 3) throw err;
            await new Promise(r => setTimeout(r, 700 * attempt));
        }
    }
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

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || typeof registrationId !== "string") {
            return NextResponse.json({ error: "Missing payment details" }, { status: 400 });
        }
        if (!process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
        }

        const prismaClient = prisma as any;

        // Verify signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            // Only the pending attempt for this very order can be marked failed.
            await prismaClient.delegateRegistration.updateMany({
                where: { id: registrationId, razorpayOrderId: razorpay_order_id, paymentStatus: "pending" },
                data: { paymentStatus: "failed" },
            });
            return NextResponse.json(
                { error: "Invalid payment signature" },
                { status: 400 }
            );
        }

        // The order was created by our server for one registration and one pass.
        const order: any = await fetchOrder(razorpay_order_id);
        const notes = order?.notes ?? {};
        if (notes.registrationId !== registrationId) {
            console.error(`Payment ${razorpay_payment_id} does not belong to registration ${registrationId}`);
            return NextResponse.json({ error: "This payment does not match the registration" }, { status: 400 });
        }

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
        if (!pendingReg) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }
        if (pendingReg.paymentStatus === "success") {
            console.warn(`Second payment ${razorpay_payment_id} for paid registration ${registrationId}: check for a refund`);
            return NextResponse.json({
                success: true,
                ticketNumber: pendingReg.ticketNumber,
                message: "Registration already paid",
            });
        }
        const conferenceSlug: string = notes.conferenceSlug || pendingReg.conferenceSlug || "";

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
            // Record what was paid for. The form can be edited after an order is made,
            // so the pass and price come from the order, not from the saved draft.
            data: {
                paymentStatus: "success",
                razorpayPaymentId: razorpay_payment_id,
                razorpayOrderId: razorpay_order_id,
                ticketNumber,
                conferenceSlug,
                passType: notes.passType || pendingReg.passType,
                passCategory: notes.passCategory || pendingReg.passCategory,
                currency: order.currency,
                paymentType: order.currency === "INR" ? "india" : "international",
                ...(notes.originalPrice ? { originalPrice: Number(notes.originalPrice) } : {}),
                ...(notes.discountedPrice ? { discountedPrice: Number(notes.discountedPrice) } : {}),
                ...("couponCode" in notes
                    ? { couponCode: notes.couponCode || null, couponDiscount: notes.couponDiscount ? Number(notes.couponDiscount) : null }
                    : {}),
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
                bangalorePassPdf = await generateBangalorePassPDF({
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

        triggerDelegateSync();

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
