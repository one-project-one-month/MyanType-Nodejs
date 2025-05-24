import getUserProfile from "./uf.service.js";

const userProfile = async (req, res) =>{
    try{
        const email = req.body.email;
        const data = await getUserProfile(email);
        res.status(200).json({message: "Success", data});
    }catch(error){
        console.error(error.message);
        res.status(400).json({message: "error"});
    }
}
export default userProfile;