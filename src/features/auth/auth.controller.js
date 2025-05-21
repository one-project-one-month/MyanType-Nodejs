import authService from "./auth.service.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
const register = async (req, res) => {
    try {
   
        const {username, email, password} = req.body;
        const user = await authService.registerUser(username, email, password);
        res.status(201).json({message:"User Registered", user});
        
    } catch(error) {
        console.error(error.message);
        res.status(400).json({message: "error"});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const { user, accessToken, refreshToken }= await authService.loginUser(email, password);
        if(user) {
            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure:true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure:true,
                sameSite: "Strict",
                maxAge: 7 * 24 * 60 * 60 * 1000,

            });
            
            // res.json(user);
            res.status(200).json({message:"Login Successfully!",user, accessToken, refreshToken});

            
        }else{
            res.status(400).json({message: "Invalid"});
        }
        // res.status(200).json({message:"Login Successfully!", token ,user});
   }catch(error){
    console.error(error.message);
    res.status(400).json({message:"Login error", error:error.message});
   }
}

const logout = async (req, res) =>{
        
    try{
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(200).json({message: "Logout successfully"});

    } catch(error){
        return res.status(400).json({message: error.message})
    }
    }

    const authController ={
        register,
        login,
        logout
    }
    export default authController;

