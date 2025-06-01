import { Router } from "express";
import userProfile from "./userProfile.controller.js";
import verifyOrRefreshToken from "../../middlewares/verifyOrRefreshToken.js";

const userProfileRouter = Router();

userProfileRouter.get("/", verifyOrRefreshToken, userProfile);

export default userProfileRouter;
