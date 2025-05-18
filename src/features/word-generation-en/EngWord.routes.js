// src/features/EngWord_API/engWord.routes.js
import express from "express";
import { generateWords, getQuote, generateParagraph } from "./EngWord.controller.js";

const router = express.Router();

// router.get("/", renderIndex);
router.post("/generate", generateWords);
router.get("/quote", getQuote);
router.get("/paragraph", generateParagraph)

export default router;
