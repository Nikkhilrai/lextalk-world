import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";

// POST /api/admin/confirm-manual-payment
// Body: { secret, email, conferenceSlug? }
// Marks pending registration as success, assigns ticket number, sends confirmation email

function generateTicketNumber(conferenceSlug: string): string {
    const prefix = conferenceSlug?.includes("bangalore") ? "LTW-BLR26-" : conferenceSlug?.includes("mumbai") ? "LTW-MUM26-" : "LTW-DXB26-";
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let suffix = "";
    for (let i = 0; i < 6; i++) suffix += chars[Math.floor(Math.random() * chars.length)];
    return prefix + suffix;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { secret, email, conferenceSlug } = body;

        if (!secret || secret !== process.env.SETUP_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const prismaClient = prisma as any;

        const where: any = { email: { equals: email, mode: "insensitive" } };
        if (conferenceSlug) where.conferenceSlug = conferenceSlug;

        const registration = await prismaClient.delegateRegistration.findFirst({
            where,
            orderBy: { createdAt: "desc" },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found for this email" }, { status: 404 });
        }

        // Generate unique ticket number
        let ticketNumber = registration.ticketNumber;
        if (!ticketNumber) {
            let attempts = 0;
            while (attempts < 5) {
                const candidate = generateTicketNumber(registration.conferenceSlug || "");
                const existing = await prismaClient.delegateRegistration.findUnique({ where: { ticketNumber: candidate } });
                if (!existing) { ticketNumber = candidate; break; }
                attempts++;
            }
        }

        // Mark as success
        await prismaClient.delegateRegistration.update({
            where: { id: registration.id },
            data: {
                paymentStatus: "success",
                ticketNumber,
                emailSent: false,
            },
        });

        // Send confirmation email
        const emailResult = await sendDelegateConfirmationEmail({
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            passType: registration.passType,
            passCategory: registration.passCategory,
            ticketNumber,
            ticketId: registration.ticketId,
            conferenceSlug: registration.conferenceSlug || "",
        });

        if (emailResult.success) {
            await prismaClient.delegateRegistration.update({
                where: { id: registration.id },
                data: { emailSent: true },
            });
        }

        // Trigger Google Sheets sync
        try {
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://lextalkworld.in";
            await fetch(`${baseUrl}/api/admin/sync-to-sheets`, { method: "POST" });
        } catch (_) {}

        return NextResponse.json({
            success: true,
            ticketNumber,
            emailSent: emailResult.success,
            name: `${registration.firstName} ${registration.lastName}`,
            email: registration.email,
            passType: registration.passType,
            conference: registration.conferenceSlug,
        });

    } catch (error: any) {
        console.error("confirm-manual-payment error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
