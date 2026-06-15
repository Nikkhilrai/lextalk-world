import { config } from 'dotenv';
config();

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hash } from "bcryptjs";

async function main() {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

    if (!connectionString) {
        console.error("No database connection string found!");
        process.exit(1);
    }

    console.log("Initializing Prisma...");
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const email = "admin@lextalk.world";
    const password = "LextalkAdmin2026!";

    console.log(`Resetting password for ${email}...`);

    const hashedPassword = await hash(password, 12);

    const user = await prisma.adminUser.upsert({
        where: { email },
        update: {
            password: hashedPassword,
            role: "super_admin",
            name: "Super Admin"
        },
        create: {
            email,
            password: hashedPassword,
            role: "super_admin",
            name: "Super Admin"
        }
    });

    console.log("Success! Admin user updated:", user.email);
    console.log("Password set to:", password);

    // Clear login attempts to reset rate limit
    await prisma.loginAttempt.deleteMany({
        where: { email }
    });
    console.log("Cleared login attempts/rate limits.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });
