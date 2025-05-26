import prisma from "../src/config/prisma.js";

import { faker } from "@faker-js/faker";
import { hash } from "bcrypt";

async function main() {
  await prisma.testResult.deleteMany();
  await prisma.theme.deleteMany();
  await prisma.userStats.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < 15; i++) {
     const password = "password";
     const userPassword = await hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        username: faker.internet.username(),
        email: faker.internet.email(),
        // password: faker.internet.password(),
        password:userPassword,
        profilePicture: faker.image.avatar(),
        createdAt: faker.date.past(),
      },
    });

    // Create 10–30 test results for each user
    const testResultsCount = faker.number.int({ min: 10, max: 30 });

    const testResults = await Promise.all(
      Array.from({ length: testResultsCount }).map(() =>
        prisma.testResult.create({
          data: {
            userId: user.id,
            mode: faker.helpers.arrayElement(["TIME", "WORDS", "QUOTE"]),
            language: faker.helpers.arrayElement(["en", "mm"]),
            timeLimit: faker.helpers.arrayElement([15, 60]),
            wordLimit: faker.number.int({ min: 10, max: 100 }),

            wpm: faker.number.int({ min: 40, max: 150 }),
            raw: faker.number.int({ min: 100, max: 300 }),
            accuracy: faker.number.int({ min: 85, max: 100 }),
            charactersTyped: faker.number.int({ min: 500, max: 1500 }),
            correct: faker.number.int({ min: 400, max: 1400 }),
            incorrect: faker.number.int({ min: 10, max: 50 }),
            extra: faker.number.int({ min: 5, max: 20 }),
            miss: faker.number.int({ min: 5, max: 20 }),
            consistency: faker.number.int({ min: 50, max: 100 }),
            timeTaken: faker.number.int({ min: 10, max: 60 }),
            createdAt: faker.date.recent(),
          },
        })
      )
    );

    const stats = {
      testsCompleted: testResults.length,
      highest15sWpm: faker.number.int({ min: 80, max: 160 }),
      accuracy15s: faker.number.int({ min: 85, max: 100 }),
      highest60sWpm: faker.number.int({ min: 80, max: 160 }),
      accuracy60s: faker.number.int({ min: 85, max: 100 }),
    };

    await prisma.userStats.create({
      data: {
        userId: user.id,
        ...stats,
      },
    });

    // Create a random theme
    await prisma.theme.create({
      data: {
        userId: user.id,
        name: faker.color.human(),
        settings: {
          background: faker.color.rgb(),
          text: faker.color.rgb(),
          accent: faker.color.rgb(),
        },
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seed complete!");
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    return prisma.$disconnect();
  });
