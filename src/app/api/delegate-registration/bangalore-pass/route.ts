import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateBangalorePass, BangalorePassTitle } from "@/lib/bangalore-pass-generator";

function resolvePassTitle(passType: string, conferenceSlug: string): BangalorePassTitle {
    if (conferenceSlug?.includes("awardee")) return "AWARDEE";
    if (passType?.includes("awardee")) return "AWARDEE";
    return "DELEGATE";
}

export async function GET(request: NextRequest) {
    try {
        const ticketNumber = request.nextUrl.searchParams.get("ticketNumber");
        const ticketId = request.nextUrl.searchParams.get("ticketId");

        if (!ticketNumber && !ticketId) {
            return NextResponse.json({ error: "Missing ticketNumber or ticketId" }, { status: 400 });
        }

        const prismaClient = prisma as any;
        const registration = await prismaClient.delegateRegistration.findFirst({
            where: ticketNumber
                ? { ticketNumber }
                : { OR: [{ ticketId }, { id: ticketId }] },
        });

        if (!registration) {
            return NextResponse.json({ error: "Registration not found" }, { status: 404 });
        }

        // Only generate for physical passes
        if (registration.passType?.includes("virtual")) {
            return NextResponse.json({ error: "Entry pass not available for virtual attendees" }, { status: 400 });
        }

        const passTitle = resolvePassTitle(registration.passType, registration.conferenceSlug || "");

        const pdfBuffer = await generateBangalorePass({
            attendeeName: `${registration.firstName} ${registration.lastName}`,
            organization: registration.organization || "",
            designation: registration.designation || "",
            passTitle,
            passType: registration.passType,
            ticketNumber: registration.ticketNumber || registration.id,
        });

        const response = new NextResponse(new Uint8Array(pdfBuffer));
        response.headers.set("Content-Type", "application/pdf");
        response.headers.set(
            "Content-Disposition",
            `attachment; filename=LexTalk-Bangalore-Pass-${registration.ticketNumber || registration.id}.pdf`
        );
        return response;
    } catch (error: any) {
        console.error("Error generating Bangalore pass:", error);
        return NextResponse.json({ error: "Failed to generate pass", details: error.message }, { status: 500 });
    }
}
