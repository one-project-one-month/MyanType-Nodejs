import prisma from "../../config/prisma.js";
import { hash } from "bcrypt";
import jwt from "jsonwebtoken";
// import ENV from "../../config/ENV.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

const registerUser = async (username, email, password) =>{

    const existingUser = await prisma.user.findUnique({
        where: {email}
    });
    if(existingUser) {
        throw new Error("Email already exists");
        
    }
    const userPassword = await hash(password, 10);
    const user = await prisma.user.create({
        data: {
            username,
            email,
            password: userPassword,
        },
    });
    console.log("Insert successful");
    return user;
}

const loginUser = async (email, password)=>{
    const user = await prisma.user.findUnique({
        where:{email}
    });
    if(!user){
       throw new Error("User Not found");
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword) {
        throw new Error("Invalid Password");
    }
    const token = jwt.sign({id:user.id, email: user.email}, process.env.JWT_SECRET, {expiresIn: "1h"});

    return {token, user};
    
}

const authService ={
    registerUser,
    loginUser
}
export default authService;

// const registerUser = async ({username, email, password}) =>{
 
//     const { data: authData, error: authError } = await supabase.auth.signUp({
//     email,
//     password,
   
//   });
  

//   if (authError) {
//     console.error(authError.message);
//     return null;
//   }
//   // const { user } = authData;
  

//     const{data, error} = await supabase
//     .from("users")
//     .insert([{username, email, password}])
//     .select()
//     .single();
    
//     if(error){
//       console.error(error.message);
//     }
//     return data;

// }
// const loginUser = async ({email, password}) => {
//     const{data, error} = await supabase
//     .auth.signInWithPassword({ email, password });

//  if(error) {
//    console.error(error.message);
//     return null;
//  }
// //  const token = generateToken(user);
//     return data;
 
    
// }

// const logoutUser = async()=> {
//     const {error} = await supabase.auth.signOut();

//     if(error){
//       throw error;
//     }
//     return true;

// }

//  const authService = {
//     registerUser,
//     loginUser,
//     logoutUser
//  };

// export default authService;