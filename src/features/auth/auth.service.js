import User from '../../../';
import jwt from "jsonwebtoken";



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