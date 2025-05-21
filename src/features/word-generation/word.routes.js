// src/features/EngWord_API/engWord.routes.js
import express from "express";
import { generateWords } from './word.controller.js';
import { generateByTime } from "./word.controller.js";
import { getQuote } from "./word.controller.js";

const router = express.Router();

router.get('/generate', generateWords); // for word generator with word count
router.get('/quote', getQuote); // for random quote generation
router.get('/time', generateByTime); // for  word generator with time limit

export default router;