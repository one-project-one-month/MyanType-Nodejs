import { Router } from "express";
import { leaderboardController } from "./leaderboard.controller.js";

const leaderboardRouter = Router();

leaderboardRouter.get("/:lang/:time", leaderboardController);

export default leaderboardRouter;
