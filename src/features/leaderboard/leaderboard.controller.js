 import leaderboard from "./leaderboard.service.js"
 
 
 const getLeaderbroad15s= async (req,res) => {

     const results = await leaderboard.Leaderboard15s();
     res.json(results)

 }
 
 const getLeaderbroad60s = async (req,res) => {
     const results = await leaderboard.Leaderboard60s();
     res.json(results)
 }
const getUserBest15s = async (req,res) => {
     const results = await leaderboard.UserBest15s(1);
     res.json(results)
}
const getUserBest60s = async (req,res) => {
     const results = await leaderboard.UserBest60s();
     res.json(results);
}
const getLeaderboard = {
     getLeaderbroad15s,
     getLeaderbroad60s,
     getUserBest15s,
     getUserBest60s
}
export default getLeaderboard;