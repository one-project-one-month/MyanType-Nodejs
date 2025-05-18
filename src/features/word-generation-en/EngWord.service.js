// src/features/EngWord_API/engWord.service.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const quotesData = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'quotes.json'), 'utf8')
);
const quotes = quotesData.quotes || [];

const quoteRanges = {
  short: [1, 30],
  medium: [31, 80],
  long: [81, 150],
  thicc: [151, 250],
};


// random
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

function generateRandomWords(wordCount) {
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

export function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function getShuffledParagraph() {
  const words = paragraphData.paragraph.split(/\s+/);
  const shuffled = shuffleArray([...words]);
  return shuffled.join(' ');
}

// quotes
export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getQuoteByType(type) {
  const [minWords, maxWords] = quoteRanges[type] || [];
  if (!minWords) return [];

  return quotes.filter(q => {
    const wordCount = q.trim().split(/\s+/).length;
    return wordCount >= minWords && wordCount <= maxWords;
  });
}

export default { getMaxWords, generateRandomWords };