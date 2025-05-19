import prisma from "../src/config/prisma.js";
import { hash } from "bcrypt";
import { customAlphabet } from "nanoid";

const generateChallengeCode = customAlphabet(
  "1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  6
);

const main = async () => {
  const userPassword = await hash("password", 10);

  // Create first user
  const user1 = await prisma.user.create({
    data: {
      username: "Test User 1",
      email: "test1@gmail.com",
      password: userPassword,
    },
  });
  console.log("User 1 created");

  // Create second user
  const user2 = await prisma.user.create({
    data: {
      username: "Test User 2",
      email: "test2@gmail.com",
      password: userPassword,
    },
  });
  console.log("User 2 created");

  // Create custom texts for user1
  const customText1 = await prisma.customText.create({
    data: {
      content: "This is a custom typing text.",
      createdById: user1.id,
    },
  });

  const customText2 = await prisma.customText.create({
    data: {
      content: "Another sample text for typing practice.",
      createdById: user1.id,
    },
  });

  console.log("Custom texts created");

  // Create theme for user1
  const theme = await prisma.theme.create({
    data: {
      name: "Dark Theme",
      settings: {
        background: "#1e1e1e",
        textColor: "#ffffff",
        accentColor: "#ff4081",
      },
      userId: user1.id,
    },
  });

  // Create test sessions
  const user1Session = await prisma.testSession.create({
    data: {
      userId: user1.id,
      mode: "WORDS",
      wordLimit: 50,
      customTextId: customText1.id,
    },
  });

  const user2Session = await prisma.testSession.create({
    data: {
      userId: user2.id,
      mode: "TIME",
      timeLimit: 60,
      customTextId: customText2.id,
    },
  });

  console.log("Test sessions created");

  // Create test result for user1 session
  await prisma.testResult.create({
    data: {
      testSessionId: user1Session.id,
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

  // Create challenge invited by user1, invited user2
  const code = generateChallengeCode();
  await prisma.challenge.create({
    data: {
      code: code,
      inviterId: user1.id,
      inviteeId: user2.id, // assign invitee (user2)
      status: "PENDING",
      customTextId: customText1.id,
      inviterSessionId: user1Session.id,
      inviteeSessionId: user2Session.id,
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
