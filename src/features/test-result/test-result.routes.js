import express from "express";
import { createTestResultController } from "./test-result.controller.js";
import optionalAuthWithRefresh from "../../middlewares/optionalAuthWithRefresh.js";
verifyOrRefreshToken;

const router = express.Router();

router.post("/", optionalAuthWithRefresh, createTestResultController);

export default router;
