import { Router } from "express";
import verifyAccessToken from "../../middlewares/jwtVerify.js";
import userProfile from "./userProfile.controller.js";
// import refreshAccessToken from "../../middlewares/refreshVerify.js";

const userProfileRouter = Router();

userProfileRouter.get("/", verifyAccessToken, userProfile);

export default userProfileRouter;
