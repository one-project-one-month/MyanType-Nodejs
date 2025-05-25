import prisma from "../../config/prisma.js";

export const getLeaderboard = async (language, timeLimit) => {
  try {
    const allResults = await prisma.testResult.findMany({
      where: {
        mode: "TIME",
        language,
        timeLimit: parseInt(timeLimit),
      },
      orderBy: {
        wpm: "desc",
      },
      select: {
        wpm: true,
        accuracy: true,
        raw: true,
        consistency: true,
        createdAt: true,
        userId: true,
        user: {
          select: {
            username: true,
            profilePicture: true,
          },
        },
      },
    });

    // Deduplicate by userId, keeping only the first (highest WPM)
    const uniqueResultsMap = new Map();
    for (const result of allResults) {
      if (!uniqueResultsMap.has(result.userId)) {
        uniqueResultsMap.set(result.userId, result);
      }
    }

    // Convert the map values to an array
    const uniqueResults = Array.from(uniqueResultsMap.values());

    return uniqueResults;
  } catch (error) {
    console.error(
      `Failed to fetch ${language} ${timeLimit}s leaderboard:`,
      error
    );
    throw new Error("Could not retrieve leaderboard data.");
  }
};
