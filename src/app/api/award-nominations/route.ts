import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
    MUMBAI_2026_NOMINATION, NominationAnswers, cleanAnswers, nominationCategory, validateNomination,
} from "@/lib/nominations/mumbai-2026";
import { nominationToken, sendNominationReceivedEmails } from "@/lib/nominations/server";

/**
 * Saves a Mumbai 2026 award nomination (status PENDING_PAYMENT) and emails the
 * nominee and the team. Payment happens afterwards via ./[id]/order + ./[id]/verify.
 */
export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => null);
        if (!body || typeof body !== "object") {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        // Honeypot — hidden from people, filled by bots.
        if (typeof body.hp === "string" && body.hp.trim() !== "") {
            return NextResponse.json({ error: "Invalid request" }, { status: 400 });
        }

        if (body.event !== MUMBAI_2026_NOMINATION.event) {
            return NextResponse.json({ error: "Unknown event" }, { status: 400 });
        }

        const raw = (body.answers ?? {}) as NominationAnswers;
        const errors = validateNomination(raw);
        if (Object.keys(errors).length > 0) {
            return NextResponse.json({ error: "Please complete the required fields.", errors }, { status: 400 });
        }

        const answers = cleanAnswers(raw);
        const name = `${answers.firstName} ${answers.lastName}`.trim();
        const category = nominationCategory(answers);

        const nomination = await prisma.nomination.create({
            data: {
                type: answers.nominateAs!,
                category,
                nominatorEmail: answers.email!,
                nominatorPhone: answers.phone,
                nomineeName: name,
                nomineeEmail: answers.email!,
                status: "PENDING_PAYMENT",
                formResponse: {
                    event: MUMBAI_2026_NOMINATION.event,
                    eventName: MUMBAI_2026_NOMINATION.eventName,
                    answers,
                    submittedAt: new Date().toISOString(),
                },
            },
        });

        await prisma.notification.create({
            data: {
                type: "AWARD_NOMINATION",
                message: `New Mumbai 2026 nomination: ${name} — ${category}`,
                referenceId: nomination.id,
                link: "/admin/nominations",
            },
        }).catch(err => console.error("[award-nominations] notification error:", err));

        await sendNominationReceivedEmails({ id: nomination.id, name, email: answers.email!, category, answers });

        return NextResponse.json({ id: nomination.id, token: nominationToken(nomination.id) });
    } catch (error) {
        console.error("[award-nominations] create failed:", error);
        return NextResponse.json({ error: "Could not save your nomination. Please try again." }, { status: 500 });
    }
}
