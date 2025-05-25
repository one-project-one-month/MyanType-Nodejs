import prisma from "../src/config/prisma.js";
import { hash } from "bcrypt";

async function main() {
  const usersData = [
    {
      username: "alice123",
      email: "alice@example.com",
      password: "password123",
      profilePicture: null,
    },
    {
      username: "bob456",
      email: "bob@example.com",
      password: "password123",
      profilePicture: null,
    },
    {
      username: "charlie789",
      email: "charlie@example.com",
      password: "password123",
      profilePicture: null,
    },
    {
      username: "dana321",
      email: "dana@example.com",
      password: "password123",
      profilePicture: null,
    },
    {
      username: "eve654",
      email: "eve@example.com",
      password: "password123",
      profilePicture: null,
    },
  ];

  for (const userData of usersData) {
    const hashedPassword = await hash(userData.password, 10);
    const user = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        stats: {
          create: {
            testsCompleted: 15,
            totalTypingTime: 1200,
            highest15sWpm: 95,
            accuracy15s: 97.5,
            highest60sWpm: 105,
            accuracy60s: 96.1,
          },
        },
        themes: {
          create: {
            name: "Ocean Blue",
            settings: {
              background: "#1e3a8a",
              text: "#f1f5f9",
            },
          },
        },
        testResults: {
          create: [
            {
              mode: "TIME",
              language: "English",
              timeLimit: 15,
              wordLimit: null,
              wpm: 93,
              raw: 310,
              accuracy: 96.3,
              charactersTyped: 305,
              correct: 290,
              incorrect: 10,
              extra: 3,
              miss: 2,
              consistency: 85,
              timeTaken: 15,
            },
            {
              mode: "WORDS",
              language: "Myanmar",
              timeLimit: null,
              wordLimit: 50,
              wpm: 88,
              raw: 270,
              accuracy: 94.5,
              charactersTyped: 265,
              correct: 250,
              incorrect: 12,
              extra: 1,
              miss: 2,
              consistency: 80,
              timeTaken: 30,
            },
            {
              mode: "QUOTE",
              language: "English",
              timeLimit: null,
              wordLimit: null,
              wpm: 100,
              raw: 330,
              accuracy: 98.0,
              charactersTyped: 320,
              correct: 310,
              incorrect: 5,
              extra: 2,
              miss: 1,
              consistency: 90,
              timeTaken: 20,
            },
          ],
        },
      },
    });

    console.log(`Created user: ${user.username}`);
  }
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
