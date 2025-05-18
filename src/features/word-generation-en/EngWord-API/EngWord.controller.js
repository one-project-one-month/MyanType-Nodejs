// src/features/EngWord_API/engWord.controller.js
import engWordService from "./EngWord.service.js";

export const renderIndex = (req, res) => {
  const maxWords = engWordService.getMaxWords();
  res.render("EngWord_API/index", { maxWords });
};

export const generate = (req, res) => {
  try {
    const { wordCount } = req.body;

    if (!wordCount || isNaN(wordCount)) {
      return res.status(400).json({ error: "Invalid word count." });
    }

    const result = engWordService.generateParagraph(Number(wordCount));
    res.json({ paragraph: result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
