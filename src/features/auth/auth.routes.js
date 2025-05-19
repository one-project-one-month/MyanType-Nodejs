import { Router } from "express";
import authController from "./auth.controller.js"
import middleware from "../../middlewares/index.js";
import verifyToken from "../../middlewares/jwtVerify.js";

const authRouter = Router();

authRouter
  .post("/register", middleware,authController.register)
  .post("/login",  middleware,authController.login)
  .post("/logout", middleware, authController.logout);

export default authRouter;
