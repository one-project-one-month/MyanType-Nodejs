import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if(token) {
    return res.status(200).json({message: "have token"});
    // console.log
  }
  return res.status(400).json({message: "Don't have token"});
  // if (!token) {
  //    return res.status(403).json({error: "Unauthorized"});
  // }
  // try{
  //    const decoded = jwt.verify(token, process.env.JWT_SECRET);
  //     req.userId = decoded.userId;
  // next();
  // }catch{
  //   return res.status(401).json({error: "Unauthorized Invalid or expired token"});
  // }
  
 
}
export default verifyToken;