import { getLeaderboard } from "./leaderboard.service.js";
import { LanguageType } from "@prisma/client";
import { StatusCode } from "../../utils/StatusCode.js";

export const leaderboardController = async (req, res) => {
  const { lang, time } = req.params;

  const validLangs = [LanguageType.en, LanguageType.mm];
  const validTimes = ["15", "60"];

  if (!validLangs.includes(lang.toLowerCase()) || !validTimes.includes(time)) {
    return res
      .status(StatusCode.NotFound)
      .json({ error: "Leaderboard not found" });
  }

  try {
    const results = await getLeaderboard(lang, time);
    return res.status(StatusCode.OK).json({ data: results });
  } catch (error) {
    console.error("Failed to fetch leaderboard:", error);
    return res
      .status(StatusCode.InternalServerError)
      .json({ error: "Internal server error" });
  }
};
