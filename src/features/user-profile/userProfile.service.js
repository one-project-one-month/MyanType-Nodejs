
// import { tr } from "@faker-js/faker";
import prisma from "../../config/prisma.js";

const getUserProfile = async (id) =>{
    //  if (!email) throw new Error("User email is required");
    // const userId = req.user.id;
    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            // userId:true,
            username: true, 
            profilePicture: true,
            createdAt: true,
            // stats: true,
            testResults: {
                orderBy: {createdAt: 'desc'},
                take: 5,
                select: {
                    userId: true,
                    mode: true,
                    wpm: true,
                    accuracy: true,
                    consistency: true,
                    createdAt : true,
                    timeLimit: true,
                    wordLimit: true,
                    raw:true,
                    charactersTyped:true,
                    correct:true,
                    incorrect:true,
                    extra:true,
                    miss:true,
                    consistency:true,
                    timeTaken:true
                }

            },
            stats: {
               
                select: {
                    userId:true,
                    testsCompleted:true,
                    highest15sWpm:true,
                    highest60sWpm:true,
                    accuracy15s:true,
                    accuracy60s:true,
                }
            ,}
        }
    });
    // const userStatsCreate = await prisma.userStats.create({
    //     where: {userId: id},
    //     data: {
    //         testsCompleted:0,
    //     highest15sWpm: 0,
    //     accuracy15s:  0,
    //     highest60sWpm:  0,
    //     accuracy60s: 0,
    //     }
    // })
    const testsCompleted = await prisma.testResult.count({
        where: {userId:id},
    });
    const best15s = await prisma.testResult.findFirst({
        where:{
            userId:id,
            timeLimit:15,
        },
        orderBy:{
            wpm:'desc',
        },
    });

    const best60s = await prisma.testResult.findFirst({
        where:{
            userId:id,
            timeLimit:60,
        },
        orderBy:{
            wpm:'desc',
        },
    });
    await prisma.UserStats.upsert({
    where: { userId:id },
    update: {
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
    create: {
      userId:id,
      testsCompleted,
      highest15sWpm: best15s?.wpm ?? 0,
      accuracy15s: best15s?.accuracy ?? 0,
      highest60sWpm: best60s?.wpm ?? 0,
      accuracy60s: best60s?.accuracy ?? 0,
    },
  });
    
    return user;
}
export default getUserProfile;