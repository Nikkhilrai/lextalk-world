const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

function createPrismaClient() {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

const realAdvisors = [
    {
        name: "Dr. Lalit Bhasin",
        role: "President",
        company: "Society of Indian Law Firms, India",
        image: "/advisory/Dr_ Lalit Bhasin.avif",
        order: 1
    },
    {
        name: "Yasser Aboismail",
        role: "Regional General Counsel",
        company: "Director Legal, Commercial/Contracts and Compliance at Thales",
        image: "/advisory/Yasser Aboismail.avif",
        order: 2
    },
    {
        name: "Monica Romelina Sijabat",
        role: "Professor",
        company: "Faculty of Economics & Business, University of Indonesia",
        image: "/advisory/Monica.avif",
        order: 3
    },
    {
        name: "Karen Lee",
        role: "Chair",
        company: "Association of Corporate Counsel Australia Legal Technology and Innovation Committee",
        image: "/advisory/KarenLee.avif",
        order: 4
    },
    {
        name: "Gaurav Mediratta",
        role: "Group General Counsel",
        company: "Landmark Group",
        image: "/advisory/Gaurav.avif",
        order: 5
    },
    {
        name: "Dr. G.V. Rao",
        role: "Senior Advocate, Supreme Court of India",
        company: "Vice-President, Indian Society of International Law",
        image: "/advisory/Dr_ G_V_ RAO.avif",
        order: 6
    },
    {
        name: "Piyush Gupta",
        role: "Head Counsel",
        company: "Etihad Airways",
        image: "/advisory/Piyush Gupta.avif",
        order: 7
    },
    {
        name: "Raghvendra Verma",
        role: "Chairman and Chapter Head Dubai",
        company: "ICSI Middle East",
        image: "/advisory/Raghvendra verma.avif",
        order: 8
    },
    {
        name: "Bhavin Mehta",
        role: "VP - Global Anti-Corruption Compliance",
        company: "Monitoring and Assurance, Mastercard, UAE",
        image: "/advisory/Bhavin Mehta.avif",
        order: 9
    }
];

async function seed() {
    console.log("Cleaning old advisors...");
    await prisma.advisor.deleteMany({});

    console.log("Seeding real advisors...");
    for (const advisor of realAdvisors) {
        await prisma.advisor.create({
            data: advisor
        });
        console.log(`Created: ${advisor.name}`);
    }
    console.log("Done!");
}

seed()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
