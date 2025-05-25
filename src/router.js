import authRouter from "./features/auth/auth.routes.js";
import { Router } from "express";
import WordRouter from "./features/word-generation/word.routes.js";
import testResultRouter from "./features/test-result/test-result.routes.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/", WordRouter);
router.use("/", testResultRouter);

export default router;
