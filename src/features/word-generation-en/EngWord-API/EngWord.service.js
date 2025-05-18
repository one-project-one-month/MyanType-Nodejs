// src/features/EngWord_API/engWord.service.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load and parse paragraph.json
const dataPath = path.join(__dirname, "paragraph.json");
const paragraphData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

if (!paragraphData || !paragraphData.paragraph) {
  throw new Error("paragraph.json must contain a 'paragraph' property.");
}

const wordsArray = paragraphData.paragraph.split(/\s+/);
const maxWords = wordsArray.length;

function getMaxWords() {
  return maxWords;
}

function generateParagraph(wordCount) {
  if (wordCount <= 0 || wordCount > maxWords) {
    throw new Error(`Please enter a number between 1 and ${maxWords}`);
  }

  // Fisher-Yates shuffle
  const shuffled = [...wordsArray];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, wordCount).join(" ");
}

export default { getMaxWords, generateParagraph };
