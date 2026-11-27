import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";
import { isOpenConference, quotePass } from "@/lib/delegate-pricing";
import { checkCoupon } from "@/lib/delegate-coupons";

export async function POST(request: NextRequest) {
    try {
        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            return NextResponse.json(
                { error: "Payment gateway not configured" },
                { status: 500 }
            );
        }

        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const body = await request.json();
        // Any price, amount or discount sent by the browser is ignored.
        const {
            currency,
            passType,
            passCategory,
            customerDetails,
            conferenceSlug,
            registrationId,
            couponCode,
        } = body;

        if (!isOpenConference(conferenceSlug)) {
            return NextResponse.json({ error: "Registration for this event is closed." }, { status: 403 });
        }

        let quote = quotePass(conferenceSlug, passType, currency);
        if (!quote.ok) {
            return NextResponse.json({ error: quote.error }, { status: 400 });
        }

        let validatedCouponCode: string | null = null;
        let validatedCouponDiscount: number | null = null;
        if (couponCode && quote.couponsAllowed) {
            const check = await checkCoupon(couponCode, passType, conferenceSlug);
            if (!check.ok) {
                return NextResponse.json({ error: check.error }, { status: 400 });
            }
            validatedCouponCode = check.coupon.code;
            validatedCouponDiscount = check.coupon.discountPct;
            quote = quotePass(conferenceSlug, passType, currency, check.coupon.discountPct);
            if (!quote.ok) {
                return NextResponse.json({ error: quote.error }, { status: 400 });
            }
        }

        const { originalPrice, discountedPrice, amount } = quote;
        const paymentType = currency === "INR" ? "india" : "international";

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
        }

        if (registrationId) {
            const current = await (prisma as any).delegateRegistration.findUnique({ where: { id: registrationId } });
            if (!current) {
                return NextResponse.json({ error: "Registration not found. Please start again." }, { status: 404 });
            }
            // A paid registration must never be reopened or rewritten.
            if (current.paymentStatus === "success") {
                return NextResponse.json({ error: "This registration is already paid." }, { status: 409 });
            }
        }

        const prismaClient = prisma as any;
        let registration;

        if (registrationId) {
            // Update existing registration record
            registration = await prismaClient.delegateRegistration.update({
                where: { id: registrationId },
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
                    originalPrice,
                    discountedPrice,
                    currency,
                    paymentType,
                    paymentStatus: "pending",
                    couponCode: validatedCouponCode,
                    couponDiscount: validatedCouponDiscount,
                },
            });
        } else {
            // Fallback: check if a pending one exists for this email/conference
            const existing = await prismaClient.delegateRegistration.findFirst({
                where: {
                    email: customerDetails.email,
                    conferenceSlug,
                    paymentStatus: "pending"
                }
            });

            if (existing) {
                registration = await prismaClient.delegateRegistration.update({
                    where: { id: existing.id },
                    data: {
                        firstName: customerDetails.firstName,
                        lastName: customerDetails.lastName,
                        phone: customerDetails.phone || null,
                        organization: customerDetails.organization || null,
                        designation: customerDetails.designation || null,
                        country: customerDetails.country,
                        passType,
                        passCategory,
                        originalPrice,
                        discountedPrice,
                        currency,
                        paymentType,
                        couponCode: validatedCouponCode,
                        couponDiscount: validatedCouponDiscount,
                    }
                });
            } else {
                // Create new record
                registration = await prismaClient.delegateRegistration.create({
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
                        originalPrice,
                        discountedPrice,
                        currency,
                        paymentType,
                        paymentStatus: "pending",
                        couponCode: validatedCouponCode,
                        couponDiscount: validatedCouponDiscount,
                    },
                });
            }
        }

        // Increment coupon usedCount if a coupon was applied
        if (validatedCouponCode) {
            await (prisma as any).delegateCoupon.updateMany({
                where: { code: validatedCouponCode },
                data: { usedCount: { increment: 1 } },
            }).catch((err: any) => console.error("Coupon increment error:", err));
        }

        // Create notification for pending ticket purchase
        await prismaClient.notification.create({
            data: {
                type: "TICKET_PURCHASE",
                message: `New ticket purchase attempt by ${customerDetails.firstName} ${customerDetails.lastName} (${passType} - ${paymentType})`,
                referenceId: registration.id,
                link: `/admin/registrations/${registration.id}`,
            }
        }).catch((err: any) => console.error("Notification error:", err));

        // Create Razorpay order
        const options = {
            amount: Math.round(amount * 100), // Convert to smallest unit
            currency,
            receipt: `del_${registration.id.slice(-8)}`,
            // Only the server can write these. Payment verification issues exactly this pass.
            notes: {
                registrationId: registration.id,
                passType,
                passCategory: passCategory || "individual",
                email: customerDetails.email,
                conferenceSlug,
                originalPrice: String(originalPrice),
                discountedPrice: String(discountedPrice),
                couponCode: validatedCouponCode ?? "",
                couponDiscount: validatedCouponDiscount === null ? "" : String(validatedCouponDiscount),
            },
        };

        const order = await razorpay.orders.create(options);

        // Update registration with order ID
        await prismaClient.delegateRegistration.update({
            where: { id: registration.id },
            data: { razorpayOrderId: order.id },
        });

        return NextResponse.json({
            orderId: order.id,
            registrationId: registration.id,
            amount: order.amount,
            currency: order.currency,
            keyId: process.env.RAZORPAY_KEY_ID,
        });
    } catch (error: any) {
        console.error("DEBUG: Full error object:", error);
        console.error("Error creating delegate order:", error.message, error.stack);
        // Check specifically for Prisma errors
        if (error.code) {
            console.error("Prisma Error Code:", error.code);
        }
        return NextResponse.json(
            { error: `Failed to create order: ${error.message}` },
            { status: 500 }
        );
    }
}
