
import prisma from "../../config/prisma.js";

const getUserProfile = async (email)=>{
     if (!email) throw new Error("User ID is required");
    const user = await prisma.user.findUnique({
        where: {email},
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