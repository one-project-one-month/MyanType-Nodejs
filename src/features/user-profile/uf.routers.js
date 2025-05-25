import { Router } from "express";
import verifyAccessToken from "../../middlewares/jwtVerify.js";
import userProfile from "./uf.controller.js";
// import refreshAccessToken from "../../middlewares/refreshVerify.js";

const userProfileRouter = Router();

userProfileRouter
    .get("/userProfile", verifyAccessToken, userProfile )

    export default userProfileRouter;