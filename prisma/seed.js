import prisma from "../src/config/prisma.js";
import { hash } from "bcrypt";
import { customAlphabet } from "nanoid";

const generateChallengeCode = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

const main = async () => {
  const userPassword = await hash("password", 10);
  const user = await prisma.user.create({
    data: {
      username: "Test User",
      email: "test@gmail.com",
      password: userPassword,
    },
  });
  console.log("User created");

  const customText1 = await prisma.customText.create({
    data: {
      content: "This is a custom typing text.",
      createdById: user.id,
    },
  });

  const customText2 = await prisma.customText.create({
    data: {
      content: "Another sample text for typing practice.",
      createdById: user.id,
    },
  });

  console.log("Custom texts created");

  const theme = await prisma.theme.create({
    data: {
      name: "Dark Theme",
      settings: {
        background: "#1e1e1e",
        textColor: "#ffffff",
        accentColor: "#ff4081",
      },
      userId: user.id,
    },
  });

  const userSession = await prisma.testSession.create({
    data: {
      userId: user.id,
      mode: "WORDS",
      wordLimit: 50,
      customTextId: customText1.id,
    },
  });

  const anonymousSession = await prisma.testSession.create({
    data: {
      mode: "TIME",
      timeLimit: 60,
      customTextId: customText2.id,
    },
  });

  console.log("Test sessions created");

  // Create test result for one session
  await prisma.testResult.create({
    data: {
      testSessionId: userSession.id,
      wpm: 72.5,
      raw: 90,
      accuracy: 96.3,
      charactersTyped: 250,
      correct: 240,
      incorrect: 10,
      extra: 3,
      miss: 5,
      consistency: 85,
      timeTaken: 60,
    },
  });

  console.log("Test result created");

  const code = generateChallengeCode();
  await prisma.challenge.create({
    data: {
      code: code,
      inviterId: user.id,
      status: "PENDING",
      customTextId: customText1.id,
      inviterSessionId: userSession.id,
    },
  });

  console.log("Challenge created");
};

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
