 import { Router } from "express";
 import  getLeaderboard  from "./leaderboard.controller.js";
 
 const leaderboardRouter= Router();

 leaderboardRouter.get('/leaderboard',getLeaderboard.getLeaderbroad15s);
 leaderboardRouter.get('/UserBest15s',getLeaderboard.getUserBest15s);

 export default leaderboardRouter;