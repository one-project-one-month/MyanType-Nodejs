import prisma from "../src/config/prisma.js";

async function main() {
  await prisma.testResult.deleteMany();
  await prisma.testSession.deleteMany();
  await prisma.challenge.deleteMany();
  await prisma.customText.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.user.deleteMany();
}

main()
  .then(async () => {
    console.log("Database cleanup complete.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("Error during cleanup:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
