import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const regId = searchParams.get("regId");

        if (!regId) {
            return NextResponse.json({ success: false, error: "Missing registration ID" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        console.log(`DEBUG: Fetching details for identifier: ${regId}`);

        const registration = await prismaClient.delegateRegistration.findFirst({
            where: {
                OR: [
                    { id: regId },
                    { ticketId: regId },
                    { ticketNumber: regId }
                ]
            },
        });

        if (!registration) {
            console.error(`DEBUG: Details lookup failed: No record found for identifier ${regId}`);
            return NextResponse.json({ success: false, error: "Registration not found" }, { status: 404 });
        }

        console.log(`DEBUG: Found details for ${registration.firstName} ${registration.lastName}`);

        // Return only necessary fields for the confirmation page
        const safeRegistration = {
            id: registration.id,
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            passType: registration.passType,
            passCategory: registration.passCategory,
            ticketNumber: registration.ticketNumber,
            ticketId: registration.ticketId,
            paymentStatus: registration.paymentStatus,
        };

        return NextResponse.json({ success: true, registration: safeRegistration });
    } catch (error: any) {
        console.error("Error fetching registration details:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch details" }, { status: 500 });
    }
}
