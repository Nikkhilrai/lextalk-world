
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        // 1. Create/Update Conference
        const conference = await prisma.conference.upsert({
            where: { slug: "dubai-2026" },
            update: {},
            create: {
                name: "LexTalk World Dubai 2026",
                slug: "dubai-2026",
                location: "Dubai, UAE",
                venue: "TBD",
                startDate: new Date("2026-03-01"), // Approximate
                endDate: new Date("2026-03-02"),
                status: "active",
                description: "LexTalk World Dubai Conference 2026",
            },
        });

        // 2. Create/Update Ticket Types
        const ticketTypes = [
            { type: "standard", name: "Standard Pass", price: 1200 },
            { type: "premium", name: "Premium Pass", price: 1500 },
            { type: "exclusive", name: "Exclusive Pass", price: 2000 },
        ];

        for (const t of ticketTypes) {
            await prisma.ticketType.upsert({
                where: {
                    // Since there is no unique constraint on (conferenceId, type) or name alone easily exposed in `where`,
                    // we rely on finding it first or using an ID if known.
                    // But `findFirst` isn't supported in upsert `where` unless unique.
                    // Upsert requires a unique constraint.
                    // TicketType doesn't have a composite unique constraint in schema on (conferenceId, type).
                    // So we must use findFirst then create/update.
                    id: "placeholder" // Intentionally invalid to force check below
                },
                update: {},
                create: {
                    conferenceId: conference.id,
                    type: t.type,
                    name: t.name,
                    price: t.price,
                    currency: "USD",
                },
            }).catch(async (e) => {
                // Upsert failed because we can't identify by unique ID easily?
                // Actually, upsert is hard without unique key.
                // Let's use standard find/create logic.
            });
        }

        // Correct approach for non-unique-constraint models:
        for (const t of ticketTypes) {
            const existing = await prisma.ticketType.findFirst({
                where: {
                    conferenceId: conference.id,
                    type: t.type
                }
            });

            if (existing) {
                await prisma.ticketType.update({
                    where: { id: existing.id },
                    data: {
                        name: t.name,
                        price: t.price,
                        currency: "USD"
                    }
                });
            } else {
                await prisma.ticketType.create({
                    data: {
                        conferenceId: conference.id,
                        type: t.type,
                        name: t.name,
                        price: t.price,
                        currency: "USD"
                    }
                });
            }
        }

        return NextResponse.json({ success: true, message: "Database seeded successfully" });
    } catch (error) {
        console.error("Seeding error:", error);
        return NextResponse.json({ error: "Seeding failed", details: String(error) }, { status: 500 });
    }
}
