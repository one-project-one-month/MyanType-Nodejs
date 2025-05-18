// src/features/EngWord_API/engWord.routes.js
import express from "express";
import { renderIndex, generate } from "./EngWord.controller.js";

const router = express.Router();

router.get("/", renderIndex);
router.post("/generate", generate);

export default router;
