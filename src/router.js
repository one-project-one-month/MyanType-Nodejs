import authRouter from "./features/auth/auth.routes.js";
import { Router } from "express";
import WordRouter from "./features/word-generation/word.routes.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/word", WordRouter);

export default router;