import authRouter from "./features/auth/auth.routes.js";
import userProfileRouter from "./features/user-profile/uf.routers.js";
import { Router } from "express";
import WordRouter from "./features/word-generation/word.routes.js";


const router = Router();

router.use("/auth", authRouter);
router.use("/word", WordRouter);
router.use("/user-profile", userProfileRouter);

export default router;