import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            type,
            category,
            nominatorEmail,
            nominatorPhone,
            nomineeName,
            nomineeEmail,
            formResponse,
        } = body;

        // Basic validation
        if (!type || !category || !nominatorEmail || !nomineeName) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Create Nomination Record (Pending Payment)
        const nomination = await prisma.nomination.create({
            data: {
                type,
                category,
                nominatorEmail,
                nominatorPhone,
                nomineeName,
                nomineeEmail,
                formResponse: formResponse ?? {},
                status: "PENDING_PAYMENT",
            },
        });

        return NextResponse.json({
            succes: true,
            nominationId: nomination.id
        });

    } catch (error) {
        console.error("Nomination error:", error);
        return NextResponse.json(
            { error: "Failed to submit nomination" },
            { status: 500 }
        );
    }
}
