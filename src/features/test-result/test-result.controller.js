import { createTestResult } from "./test-result.service.js";
import { StatusCode } from "../../utils/StatusCode.js";
import pkg from "@prisma/client";
const { ModeType } = pkg;

export const createTestResultController = async (req, res) => {
  try {
    // const modeRaw = req.params.mode;

    const modeRaw = req.body.mode;
    if (!modeRaw) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Typing mode is required",
      });
    }

    const mode = modeRaw.toUpperCase();
    if (!Object.values(ModeType).includes(mode)) {
      return res.status(StatusCode.BadRequest).json({
        success: false,
        message: "Invalid typing mode",
      });
    }

    const userId = req.user?.id;

    if (!userId) {
      return res.status(StatusCode.OK).json({
        success: true,
        message: "Guest result processed (not saved)",
        result: { ...req.body, mode },
      });
    }

    const testResult = await createTestResult(req.body, userId, mode);

    return res.status(StatusCode.Created).json(testResult);
  } catch (error) {
    return res.status(StatusCode.InternalServerError).json({
      message: "Failed to create test result",
    });
  }
};
