import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";
import { triggerDelegateSync } from "@/lib/sheets-sync";
import { mumbaiFixedPrice } from "@/lib/mumbai-pass-prices";
import { isOpenConference, quotePass } from "@/lib/delegate-pricing";
import { checkCoupon, consumeCoupon } from "@/lib/delegate-coupons";

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

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const {
            passType,
            passCategory,
            customerDetails,
            conferenceSlug,
            couponCode,
        } = body;

        if (!isOpenConference(conferenceSlug)) {
            return NextResponse.json({ error: "Registration for this event is closed." }, { status: 403 });
        }

        // Fixed-price paid passes can only be issued after payment.
        if (mumbaiFixedPrice(conferenceSlug, passType)) {
            return NextResponse.json({ error: "This pass requires payment." }, { status: 403 });
        }

        const currency = conferenceSlug === "singapore-2027" ? "SGD" : "INR";
        if (!quotePass(conferenceSlug, passType, currency).ok) {
            return NextResponse.json({ error: "Unknown pass type" }, { status: 400 });
        }

        // A free pass needs a valid 100% coupon, checked here and not only in the browser.
        // The usage limit is enforced when the use is counted, below.
        const check = await checkCoupon(couponCode, passType, conferenceSlug, { ignoreUsageLimit: true });
        if (!check.ok || check.coupon.discountPct < 100) {
            return NextResponse.json({ error: "A valid 100% coupon is required for a free pass." }, { status: 403 });
        }

        if (!customerDetails?.email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        // Check for existing registration (idempotency)
        const existing = await prisma.delegateRegistration.findFirst({
            where: {
                email: customerDetails.email,
                passType,
                conferenceSlug,
                paymentStatus: "success",
            },
        });

        if (existing) {
            return NextResponse.json({
                success: true,
                ticketNumber: existing.ticketNumber,
                message: "Already registered",
            });
        }

        // Generate unique ticket number
        let ticketNumber = generateTicketNumber(conferenceSlug);
        let attempts = 0;
        while (attempts < 5) {
            const exists = await prisma.delegateRegistration.findFirst({
                where: { ticketNumber },
            });
            if (!exists) break;
            ticketNumber = generateTicketNumber(conferenceSlug);
            attempts++;
        }

        if (!(await consumeCoupon(check.coupon.code, check.coupon.maxUses))) {
            return NextResponse.json({ error: "This coupon has reached its usage limit." }, { status: 403 });
        }

        // Create free registration
        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.create({
            data: {
                firstName: customerDetails.firstName,
                lastName: customerDetails.lastName,
                email: customerDetails.email,
                phone: customerDetails.phone || null,
                organization: customerDetails.organization || null,
                designation: customerDetails.designation || null,
                country: customerDetails.country,
                passType,
                passCategory,
                conferenceSlug,
                originalPrice: 0,
                discountedPrice: 0,
                currency: "FREE",
                couponCode: check.coupon.code,
                couponDiscount: check.coupon.discountPct,
                paymentType: "free",
                paymentStatus: "success",
                ticketNumber,
            },
        });

        // Create notification
        await prismaClient.notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `Free ticket registered by ${customerDetails.firstName} ${customerDetails.lastName}`,
                referenceId: registration.id,
                link: `/admin/delegate-registrations`,
            }
        }).catch((err: any) => console.error("Notification error:", err));

        // Trigger confirmation email
        try {
            const emailResult = await sendDelegateConfirmationEmail({
                firstName: registration.firstName,
                lastName: registration.lastName,
                email: registration.email,
                passType: registration.passType,
                passCategory: registration.passCategory,
                ticketNumber: registration.ticketNumber,
                ticketId: registration.ticketId,
                conferenceSlug,
            });

            if (emailResult.success) {
                await prismaClient.delegateRegistration.update({
                    where: { id: registration.id },
                    data: { emailSent: true },
                });
            }
        } catch (emailError) {
            console.error("Failed to send initial free confirmation email:", emailError);
        }

        triggerDelegateSync();

        return NextResponse.json({
            success: true,
            id: registration.id,
            ticketNumber,
            registration: {
                id: registration.id,
                email: registration.email,
                passType: registration.passType,
            },
        });
    } catch (error: any) {
        console.error("Error registering free pass:", error);
        return NextResponse.json(
            { error: "Failed to register" },
            { status: 500 }
        );
    }
}
