const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const subs = await prisma.subscriber.count();
  const leads = await prisma.lead.count();
  console.log({ subs, leads });
}
main().catch(console.error).finally(() => prisma.$disconnect());
