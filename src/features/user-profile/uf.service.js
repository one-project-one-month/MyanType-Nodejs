
import prisma from "../../config/prisma.js";

const getUserProfile = async (id) =>{
    //  if (!email) throw new Error("User email is required");
    // const userId = req.user.id;
    const user = await prisma.user.findUnique({
        where: {id},
        select: {
            username: true, 
            profilePicture: true,
            createdAt: true,
            stats: true,
            testResults: {
                orderBy: {createdAt: 'desc'},
                take: 5,
                select: {
                    mode: true,
                    wpm: true,
                    accuracy: true,
                    consistency: true,
                    createdAt : true,
                    timeLimit: true,
                    wordLimit: true,
                }

            }
        }
    });
    return user;
}
export default getUserProfile;