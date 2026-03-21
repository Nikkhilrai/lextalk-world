import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

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
        const {
            amount: rawAmount,
            currency,
            passType,
            passCategory,
            paymentType,
            customerDetails,
            conferenceSlug,
            originalPrice,
            discountedPrice,
            registrationId,
            couponCode,
            couponDiscount,
        } = body;

        // Server-side coupon validation — if coupon provided, re-validate and recompute amount
        let finalAmount = rawAmount;
        let validatedCouponCode: string | null = couponCode || null;
        let validatedCouponDiscount: number | null = couponDiscount || null;

        if (couponCode) {
            const prismaClient2 = prisma as any;
            const coupon = await prismaClient2.delegateCoupon.findUnique({
                where: { code: couponCode.trim().toUpperCase() },
            });

            const now = new Date();
            const isValid = coupon &&
                coupon.isActive &&
                now >= new Date(coupon.validFrom) &&
                now <= new Date(coupon.validUntil) &&
                (coupon.maxUses === null || coupon.usedCount < coupon.maxUses);

            if (isValid) {
                const GST_RATE = 0.18;
                const basePrice = currency === "INR" ? (body.baseInrPrice || rawAmount) : (body.baseUsdPrice || rawAmount);
                const discounted = basePrice * (1 - coupon.discountPct / 100);
                finalAmount = Math.round(discounted * (1 + GST_RATE) * 100) / 100;
                validatedCouponCode = coupon.code;
                validatedCouponDiscount = coupon.discountPct;
            }
        }

        const amount = finalAmount;

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { error: "Invalid amount" },
                { status: 400 }
            );
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
            notes: {
                registrationId: registration.id,
                passType,
                passCategory,
                email: customerDetails.email,
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
