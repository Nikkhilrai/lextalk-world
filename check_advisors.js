const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();

async function checkData() {
  try {
    const count = await prisma.advisor.count();
    console.log("Advisor count:", count);
    const advisors = await prisma.advisor.findMany();
    console.log("Advisors JSON:", JSON.stringify(advisors, null, 2));
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

checkData();
