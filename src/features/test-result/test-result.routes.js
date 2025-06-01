import express from "express";
import { createTestResultController } from "./test-result.controller.js";
import optionalAuth from "../../middlewares/optionalAuthWithRefresh.js";
import optionalAuthWithRefresh from "../../middlewares/optionalAuthWithRefresh.js";

const router = express.Router();

router.post(
  "/",
  optionalAuthWithRefresh,
  optionalAuth,
  createTestResultController
);

export default router;
