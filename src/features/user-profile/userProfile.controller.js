import getUserProfile from "./userProfile.service.js";

const userProfile = async (req, res) =>{
    try{
        const id = req.user.id;
        const user = await getUserProfile(id);
        // const timeLimits= user.testResults.map(result => result.timeLimit);
        // const wpms = user.testResults.map(result=> result.wpm);

        // res.status(200).json({message: "Success", timeLimits, wpms});
        const data = user.testResults.map(result=>result);
        const stats = user.stats;
        // res.redirect('localhost:3000/api/v1/user-profile/userProfile');
        res.status(200).json({message:"success", data, stats});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "error"});
    }
}
export default userProfile;