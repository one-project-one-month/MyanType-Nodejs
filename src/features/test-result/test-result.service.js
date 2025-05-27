import prisma from "../../config/prisma.js";

export const createTestResult = async (data, userId, mode) => {
  try {
    if (
      userId == null ||
      mode == null ||
      data.language == null ||
      data.wpm == null ||
      data.raw == null ||
      data.accuracy == null ||
      data.charactersTyped == null ||
      data.correct == null ||
      data.incorrect == null ||
      data.extra == null ||
      data.miss == null ||
      data.consistency == null ||
      data.timeTaken == null ||
      (mode === "WORDS" && data.wordLimit == null) ||
      (mode === "TIME" && data.timeLimit == null)
    ) {
      throw new Error("Missing required fields for mode: " + mode);
    }

    const testResult = await prisma.testResult.create({
      data: {
        userId,
        mode,
        language: data.language,
        timeLimit: mode === "TIME" ? data.timeLimit : null,
        wordLimit: mode === "WORDS" ? data.wordLimit : null,
        wpm: data.wpm,
        raw: data.raw,
        accuracy: data.accuracy,
        charactersTyped: data.charactersTyped,
        correct: data.correct,
        incorrect: data.incorrect,
        extra: data.extra,
        miss: data.miss,
        consistency: data.consistency,
        timeTaken: data.timeTaken,
      },
    });
    const testsCompleted = await prisma.testResult.count({
        where: {userId}
    });
    const best15s = await prisma.testResult.findFirst({
        where:{
            userId,
            timeLimit:15,
        },
        orderBy:{
            wpm:'desc',
        },
    });

    const best60s = await prisma.testResult.findFirst({
        where:{
            userId,
            timeLimit:60,
        },
        orderBy:{
            wpm:'desc',
        },
    });
    await prisma.UserStats.upsert({
    where: { userId },
    update: {
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
    create: {
      userId,
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
  });

    return testResult;
  } catch (error) {
    console.error("Failed to create test result:", error.message);
    throw new Error("Could not save test result. Please try again.");
  }
};
