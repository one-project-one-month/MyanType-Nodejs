import authService from "./auth.service.js";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
    try {
   
        const {username, email, password} = req.body;
             

        const user = await authService.registerUser(username, email, password);
        res.status(200).json({message:"User Registered", user});
        
    } catch(error) {
        console.error(error.message);
        res.status(400).json({message: "error"});
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const { user }= await authService.loginUser(email, password);
        if(user.token) {
            
            // res.json(user);
            return {user, token};
        }else{
            res.status(400).json({message: "Invalid"});
        }
        // res.status(200).json({message:"Login Successfully!", token ,user});
   }catch(error){
    console.error(error.message);
    res.status(400).json({message:"Login error", error:error.message});
   }
}

    const authController ={
        register,
        login
    }
    export default authController;

//  const register = async (req, res)=>{
//     try{
        
//       const  {email} = req.body;
//       const{data:existingUser, error} =   await supabase
//       .from("users")
//       .select("*")
//       .eq("email", email)
//       .single();
      
//       if(existingUser) {
//         return res.status(400).json({message:"Already Account exist"});
//       }
      
//       const user = await authService.registerUser(req.body);
//       res.status(200).json({message:"User Registered", user});

//     }catch(error){
//         res.status(400).json({message:error.message});
//     }
// }

// const login = async (req, res)=>{
//     try {
//         const{email, password} = req.body;
//         const user = await authService.loginUser({email, password});
//         if(user){
//             return res.status(200).json({message:"User Login success",token: user.token, user});
//         }
//          return  res.status(400).json({message:"Invalid login"});

      
//     }catch(error) {
//         res.status(500).json({message:"login failed", error: error.message});
//     }
// }

// const logout = async(req, res)=>{
//     const error = await authService.logoutUser();
//     if(!error) {
//         return res.status(200).json({message:"logout success!"});
//     }

//     return res.status(400).json({message:"logout err"});
// }
// const authController ={
//     register,
//     login,
//     logout
// }
// export default authController;