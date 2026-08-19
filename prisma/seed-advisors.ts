import { prisma } from "../src/lib/prisma";

const boardMembers = [
    {
        name: "Dr. Lalit Bhasin",
        role: "President",
        company: "Society of Indian Law Firms, India",
        image: "/advisory/Dr_Lalit_Bhasin.avif",
        linkedin: "#",
        order: 1
    },
    {
        name: "Yasser Aboismail",
        role: "Regional General Counsel",
        company: "Director Legal, Commercial/Contracts and Compliance at Thales",
        image: "/advisory/Yasser_Aboismail.avif",
        linkedin: "#",
        order: 2
    },
    {
        name: "Monica Romelina Sijabat",
        role: "Professor",
        company: "Faculty of Economics & Business, University of Indonesia",
        image: "/advisory/Monica.avif",
        linkedin: "#",
        order: 3
    },
    {
        name: "Karen Lee",
        role: "Chair",
        company: "Association of Corporate Counsel Australia Legal Technology and Innovation Committee",
        image: "/advisory/KarenLee.avif",
        linkedin: "#",
        order: 4
    },
    {
        name: "Gaurav Mediratta",
        role: "Group General Counsel",
        company: "Landmark Group",
        image: "/advisory/Gaurav.avif",
        linkedin: "#",
        order: 5
    },
    {
        name: "Dr. G.V. Rao",
        role: "Senior Advocate, Supreme Court of India",
        company: "Vice-President, Indian Society of International Law",
        image: "/advisory/Dr_G_V_RAO.avif",
        linkedin: "#",
        order: 6
    },
    {
        name: "Piyush Gupta",
        role: "Head Counsel",
        company: "Etihad Airways",
        image: "/advisory/Piyush_Gupta.avif",
        linkedin: "#",
        order: 7
    },
    {
        name: "Raghvendra Verma",
        role: "Chairman and Chapter Head Dubai",
        company: "ICSI Middle East",
        image: "/advisory/Raghvendra_Verma.avif",
        linkedin: "#",
        order: 8
    },
    {
        name: "Bhavin Mehta",
        role: "VP - Global Anti-Corruption Compliance",
        company: "Monitoring and Assurance, Mastercard, UAE",
        image: "/advisory/Bhavin_Mehta.avif",
        linkedin: "#",
        order: 9
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const member of boardMembers) {
        // Upsert to avoid duplicates if re-run (matching by name is imperfect but sufficient here)
        // Since schema doesn't have unique name, we'll just create. 
        // In a real scenario, we might want to clean up first or check existence.
        // For now, let's just create.
        const advisor = await prisma.advisor.create({
            data: member,
        });
        console.log(`Created advisor with id: ${advisor.id}`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
