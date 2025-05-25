import { Router } from "express";
import authController from "./auth.controller.js";
import refreshAccessToken from "../../middlewares/refreshVerify.js";

const authRouter = Router();

authRouter
  .post("/register", authController.register)
  .post("/login", authController.login)
  .post("/refresh-token", refreshAccessToken)
  .post("/logout", authController.logout)

export default authRouter;
