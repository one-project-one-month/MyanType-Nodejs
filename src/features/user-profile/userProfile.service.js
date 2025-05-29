import prisma from "../../config/prisma.js";

const getUserProfile = async (id) => {
  const testsCompleted = await prisma.testResult.count({
    where: { userId: id },
  });
  const best15s = await prisma.testResult.findFirst({
    where: {
      userId: id,
      timeLimit: 15,
    },
    orderBy: {
      wpm: "desc",
    },
  });

  const best60s = await prisma.testResult.findFirst({
    where: {
      userId: id,
      timeLimit: 60,
    },
    orderBy: {
      wpm: "desc",
    },
  });

  await prisma.userStats.upsert({
    where: { userId: id },
    update: {
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
    create: {
      userId: id,
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
  });

  //  if (!email) throw new Error("User email is required");
  // const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      username: true,
      profilePicture: true,
      createdAt: true,
      testResults: {
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          userId: true,
          mode: true,
          wpm: true,
          accuracy: true,
          createdAt: true,
          timeLimit: true,
          wordLimit: true,
          raw: true,
          charactersTyped: true,
          correct: true,
          incorrect: true,
          extra: true,
          miss: true,
          consistency: true,
          timeTaken: true,
        },
      },
      stats: {
        select: {
          user: {
            username: true,
          },
          userId: true,
          testsCompleted: true,
          highest15sWpm: true,
          highest60sWpm: true,
          accuracy15s: true,
          accuracy60s: true,
        },
      },
    },
  });
  if (!user) throw new Error("User not found");

  return user;
};
export default getUserProfile;
