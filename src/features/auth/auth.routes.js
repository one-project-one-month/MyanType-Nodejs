import { Router } from "express";
import middleware from "../../middlewares/index.js"
import verifyAccessToken from "../../middlewares/jwtVerify.js";
import authController from "./auth.controller.js";
import refreshAccessToken from "../../middlewares/refreshVerify.js";

const authRouter = Router();

authRouter
  .post("/register", middleware, authController.register)
  .post("/login",  middleware, authController.login)
  .post("/refresh-token", refreshAccessToken)
  .post("/logout", authController.logout)

export default authRouter;
