 import prisma from "../../config/prisma.js";
 

const Leaderboard15s = async () => {
  const results = await prisma.testResult.findMany({
    where: {
      mode: "TIME",
      timeLimit: 15,
      userId: { not: null }
    },
    orderBy: { wpm: 'desc' },
    select: {
      wpm: true,
      accuracy: true,
      user: { select: { username: true } },
      createdAt: true
    }
  });

  return results;
};
const Leaderboard60s = async () => {
  return prisma.testResult.findMany({
    where: {
      mode: "TIME",
      timeLimit: 60,
      userId: { not: null }
    },
    orderBy: { wpm: 'desc' },
    select: {
      wpm: true,
      accuracy: true,
      user: { select: { username: true } },
      createdAt: true
    }
  })
};
 const UserBest15s = async (userId) => {
  return prisma.testResult.findFirst({
    where: {
      userId,
      mode: "TIME",
      timeLimit: 15
    },
    orderBy: { wpm: 'desc' },
    select: {
      wpm: true,
      accuracy: true,
      createdAt: true
    }
  });
};
 const UserBest60s = async (userId) => {
  return prisma.testResult.findFirst({
    where: {
      userId,
      mode: "TIME",
      timeLimit: 60
    },
    orderBy: { wpm: 'desc' },
    select: {
      wpm: true,
      accuracy: true,
      createdAt: true
    }
  });
};
const leaderboard = {
    Leaderboard15s,
    Leaderboard60s,
    UserBest15s,
    UserBest60s
}
export default leaderboard;