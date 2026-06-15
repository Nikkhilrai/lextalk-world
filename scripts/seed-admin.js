
require('dotenv').config(); // Load env vars
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

async function main() {
    console.log("Connecting to database...");
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
        throw new Error("DATABASE_URL is missing in environment variables");
    }

    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    try {
        const email = "admin@lextalk.world";
        const password = process.env.ADMIN_PASSWORD || "LextalkAdmin2026!";

        console.log(`Checking admin user: ${email}`);

        // Check if admin already exists
        const existingAdmin = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (existingAdmin) {
            console.log("Admin user already exists.");
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.adminUser.update({
                where: { email },
                data: { password: hashedPassword },
            });
            console.log("Admin password updated.");
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await prisma.adminUser.create({
                data: {
                    email,
                    name: "Super Admin",
                    password: hashedPassword,
                    role: "superadmin"
                },
            });
            console.log(`Admin user created successfully.`);
        }
    } catch (error) {
        console.error("Error seeding admin:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
