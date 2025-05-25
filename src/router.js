import authRouter from "./features/auth/auth.routes.js";
import userProfileRouter from "./features/user-profile/uf.routers.js";
import { Router } from "express";
import WordRouter from "./features/word-generation/word.routes.js";
import testResultRouter from "./features/test-result/test-result.routes.js";
import leaderboardRouter from "./features/leaderboard/leaderboard.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/user-profile", userProfileRouter);
router.use("/", WordRouter);
router.use("/", testResultRouter);
router.use("/leaderboard", leaderboardRouter);

export default router;
