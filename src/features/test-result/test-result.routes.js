import express from "express";
import { createTestResultController } from "./test-result.controller.js";
import optionalAuth from "../../middlewares/optionalAuth.js";

const router = express.Router();

router.post("/result", optionalAuth, createTestResultController);

export default router;
