import express from "express";
import { createTestResultController } from "./test-result.controller.js";
import verifyOrRefreshToken from "../../middlewares/verifyOrRefreshToken.js";
verifyOrRefreshToken;

const router = express.Router();

router.post("/", verifyOrRefreshToken, createTestResultController);

export default router;
