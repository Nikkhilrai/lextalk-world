import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// POST /api/delegate-registration/check-in
// Body: { ticketNumber, checkedInBy? }
// Marks a delegate as checked in at the door
export async function POST(req: NextRequest) {
    try {
        const { ticketNumber, checkedInBy } = await req.json();

        if (!ticketNumber) {
            return NextResponse.json({ success: false, error: "Ticket number required" }, { status: 400 });
        }

        const registration = await prisma.delegateRegistration.findUnique({
            where: { ticketNumber },
        });

        if (!registration) {
            return NextResponse.json({ success: false, error: "Invalid ticket — not found" }, { status: 404 });
        }

        if (registration.paymentStatus !== "success") {
            return NextResponse.json({ success: false, error: "Payment not confirmed for this ticket" }, { status: 400 });
        }

        if (registration.passType?.includes("virtual")) {
            return NextResponse.json({ success: false, error: "Virtual pass — not valid for physical entry" }, { status: 400 });
        }

        // Already checked in — return warning with original check-in time
        if (registration.checkedInAt) {
            return NextResponse.json({
                success: false,
                alreadyCheckedIn: true,
                checkedInAt: registration.checkedInAt,
                attendee: {
                    name: `${registration.firstName} ${registration.lastName}`,
                    organization: registration.organization,
                    passType: registration.passType,
                    ticketNumber: registration.ticketNumber,
                },
            }, { status: 200 });
        }

        const now = new Date();
        const updated = await prisma.delegateRegistration.update({
            where: { ticketNumber },
            data: {
                checkedInAt: now,
                checkedInBy: checkedInBy || "Staff",
            },
        });

        return NextResponse.json({
            success: true,
            checkedInAt: updated.checkedInAt,
            attendee: {
                name: `${updated.firstName} ${updated.lastName}`,
                organization: updated.organization,
                designation: updated.designation,
                passType: updated.passType,
                ticketNumber: updated.ticketNumber,
            },
        });
    } catch (err) {
        console.error("Check-in error:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

// DELETE /api/delegate-registration/check-in
// Body: { ticketNumber }
// Undo a check-in (admin only)
export async function DELETE(req: NextRequest) {
    try {
        const { ticketNumber } = await req.json();

        if (!ticketNumber) {
            return NextResponse.json({ success: false, error: "Ticket number required" }, { status: 400 });
        }

        await prisma.delegateRegistration.update({
            where: { ticketNumber },
            data: { checkedInAt: null, checkedInBy: null },
        });

        return NextResponse.json({ success: true });
    } catch (err) {
        console.error("Undo check-in error:", err);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
