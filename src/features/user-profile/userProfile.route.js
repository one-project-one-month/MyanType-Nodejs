import { Router } from "express";
import verifyAccessToken from "../../middlewares/jwtVerify.js";
import userProfile from "./userProfile.controller.js";
// import refreshAccessToken from "../../middlewares/refreshVerify.js";
import verifyOrRefreshToken from "../../middlewares/verifyOrRefreshToken.js";

const userProfileRouter = Router();

userProfileRouter.get("/", verifyOrRefreshToken, userProfile);

export default userProfileRouter;
