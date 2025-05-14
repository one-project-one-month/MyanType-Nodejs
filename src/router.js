import authRouter from "./features/auth/auth.routes.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);

export default router;
