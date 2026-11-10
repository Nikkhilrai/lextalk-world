import { prisma } from "@/lib/prisma";
import { NominationsTable, type NominationRow } from "./NominationsTable";

// Loaded on the server so the data never goes through a public API —
// /admin/* is behind the admin login (middleware).
export const dynamic = "force-dynamic";

export default async function AdminNominationsPage() {
    const rows = await prisma.nomination.findMany({ orderBy: { createdAt: "desc" } });

    const data: NominationRow[] = rows.map(n => {
        const fr = (n.formResponse ?? {}) as Record<string, any>;
        return {
            id: n.id,
            type: n.type,
            category: n.category,
            name: n.nomineeName,
            email: n.nomineeEmail,
            phone: n.nominatorPhone ?? "",
            status: n.status,
            createdAt: n.createdAt.toISOString(),
            event: typeof fr.eventName === "string" ? fr.eventName : "Legal Honor Global 2026 (Dubai form)",
            // New (Mumbai) nominations keep answers under `answers`; older ones stored the raw form.
            answers: (fr.answers ?? fr) as Record<string, unknown>,
            // Older test records used a single `file`; current ones keep a `files` list.
            files: Array.isArray(fr.files) ? fr.files : fr.file ? [fr.file] : [],
            payment: fr.payment ?? null,
        };
    });

    return <NominationsTable rows={data} />;
}
