import authRouter from "./features/auth/auth.routes.js";
import { Router } from "express";
import WordRouter from "./features/word-generation-en/word.routes.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/engword", WordRouter);

export default router;