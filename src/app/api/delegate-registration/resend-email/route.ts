import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendDelegateConfirmationEmail } from "@/lib/delegate-mail";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { regId } = body;

        if (!regId) {
            return NextResponse.json({ success: false, error: "Missing registration ID" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findUnique({
            where: { id: regId },
        });

        if (!registration) {
            return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
        }

        if (registration.paymentStatus !== "success" && registration.paymentType !== "free") {
            return NextResponse.json({ success: false, error: "Cannot send ticket for unpaid registration" }, { status: 400 });
        }

        // Trigger email
        const emailResult = await sendDelegateConfirmationEmail({
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            passType: registration.passType,
            passCategory: registration.passCategory,
            ticketNumber: registration.ticketNumber,
            ticketId: registration.ticketId,
        });

        if (emailResult.success) {
            // Update emailSent status
            await prismaClient.delegateRegistration.update({
                where: { id: regId },
                data: { emailSent: true },
            });
            return NextResponse.json({ success: true, message: "Email resent successfully" });
        } else {
            return NextResponse.json({ success: false, error: "Failed to deliver email" }, { status: 500 });
        }
    } catch (error: any) {
        console.error("Error in resend-email route:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
