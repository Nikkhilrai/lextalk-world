import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const keywords = [
    "apoorva", "abhishek gourav", "deepalakshmi", "sergey", "saurabh anand",
    "sushma shankar", "akshay", "krishna chellapilla", "kaushik",
    "adarika", "sivaramakrishnan", "udit mehta"
];

const match = (name: string) => keywords.some(k => name.toLowerCase().includes(k));

async function main() {
    const [leads, delegates, agenda] = await Promise.all([
        prisma.lead.findMany({ select: { firstName: true, lastName: true, email: true } }),
        (prisma as any).delegateRegistration.findMany({
            where: { paymentStatus: "success" },
            select: { firstName: true, lastName: true, email: true }
        }),
        (prisma as any).agendaDownload.findMany({ select: { fullName: true, email: true } }),
    ]);

    console.log("\n=== LEADS ===");
    const foundLeads = leads.filter((r: any) => match(r.firstName + " " + r.lastName));
    foundLeads.length ? foundLeads.forEach((r: any) => console.log(`  ${r.firstName} ${r.lastName} — ${r.email}`)) : console.log("  None found");

    console.log("\n=== DELEGATES ===");
    const foundDelegates = (delegates as any[]).filter(r => match(r.firstName + " " + r.lastName));
    foundDelegates.length ? foundDelegates.forEach(r => console.log(`  ${r.firstName} ${r.lastName} — ${r.email}`)) : console.log("  None found");

    console.log("\n=== AGENDA DOWNLOADS ===");
    const foundAgenda = (agenda as any[]).filter(r => match(r.fullName || ""));
    foundAgenda.length ? foundAgenda.forEach(r => console.log(`  ${r.fullName} — ${r.email}`)) : console.log("  None found");

    await prisma.$disconnect();
}

main().catch(console.error);
