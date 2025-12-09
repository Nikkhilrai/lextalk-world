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

// Hardcoded data from AdvisoryBoard.tsx
const advisors = [
    {
        name: "Dr. A. P. J. Abdul Kalam",
        role: "Former President of India",
        company: "Government of India",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/A._P._J._Abdul_Kalam.jpg/800px-A._P._J._Abdul_Kalam.jpg",
        order: 1
    },
    {
        name: "Mr. Soli Sorabjee",
        role: "Former Attorney General of India",
        company: "Supreme Court of India",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Soli_Sorabjee.jpg/800px-Soli_Sorabjee.jpg",
        order: 2
    },
    {
        name: "Mr. Fali S. Nariman",
        role: "Senior Advocate",
        company: "Supreme Court of India",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Fali_Nariman.jpg/800px-Fali_Nariman.jpg",
        order: 3
    }
];

async function seed() {
    console.log("Seeding advisors...");
    for (const advisor of advisors) {
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
