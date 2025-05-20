import { Router } from "express";
import middleware from "../../middlewares/index.js"
import verifyToken from "../../middlewares/jwtVerify.js";
import authController from "./auth.controller.js";

const authRouter = Router();

authRouter
  .post("/register", middleware, authController.register)
  .post("/login",  middleware,verifyToken, authController.login)
  // .post("/logout", middleware, authController.logout);

export default authRouter;
