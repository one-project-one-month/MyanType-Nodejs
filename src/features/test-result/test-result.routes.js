import express from "express";
import { createTestResultController } from "./test-result.controller.js";
import optionalAuth from "../../middlewares/optionalAuth.js";
import optionalRefreshAccessToken from "../../middlewares/optionalrefreshVerify.js";

const router = express.Router();

router.post(
  "/",
  optionalRefreshAccessToken,
  optionalAuth,
  createTestResultController
);

export default router;
