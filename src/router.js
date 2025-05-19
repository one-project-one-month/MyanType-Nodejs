import authRouter from "./features/auth/auth.routes.js";
import { Router } from "express";
import engWordRouter from "./features/word-generation-en/EngWord.routes.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/engword", engWordRouter);

export default router;