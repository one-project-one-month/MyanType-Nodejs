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

    return testResult;
  } catch (error) {
    console.error("Failed to create test result:", error.message);
    throw new Error("Could not save test result. Please try again.");
  }
};
