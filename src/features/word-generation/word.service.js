import * as generateEng from 'random-words';
import quotes from 'quotesy';
import translate from 'google-translate-api-x';

// Regular expression to validate Myanmar script (allows Myanmar characters, spaces, and common punctuation)
const MYANMAR_REGEX = /^[\u1000-\u109F\s.,!?]+$/;

// Expanded list of fallback Myanmar words for variety
const FALLBACK_WORDS = [
    'စကားလုံး', // word
    'အရာဝတ္ထု', // object
    'အကြောင်းအရာ', // subject
    'အချက်အလက်', // information
    'သင်ခန်းစာ', // lesson
    'ဗဟုသုတ', // knowledge
    'လူသား', // human
    'သဘာဝ', // nature
    'ပန်းသီး', // apple
    'စာအုပ်', // book
    'ကျောင်း', // school
    'မိသားစု', // family
    'သူငယ်ချင်း', // friend
    'အချိန်', // time
    'ရာသီ', // season
    'မြို့', // city
    'အိမ်', // house
    'အလုပ်', // work
    'စိတ်ကူး', // idea
    'အနာဂတ်' // future
];

// In-memory cache for translations
const translationCache = new Map();

// Helper function to get a random fallback word
function getRandomFallbackWord() {
    return FALLBACK_WORDS[Math.floor(Math.random() * FALLBACK_WORDS.length)];
}

// Generating paragraph by English word limit
export function generateRandomENWordsParagraph(wordCount) {
    if (!wordCount) {
        wordCount = 10;
    }
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// Generating paragraph by Myanmar word limit
export async function generateRandomMMWordsParagraph(wordCount) {
    if (!wordCount) {
        wordCount = 10;
    }
    const words = generateEng.generate(wordCount);

    // Check cache first
    const cachedWords = words.map((word) => translationCache.get(word) || null);
    const wordsToTranslate = words.filter((_, i) => !cachedWords[i]);
    const indicesToTranslate = words.map((_, i) => i).filter((i) => !cachedWords[i]);

    let translatedWords = [];
    if (wordsToTranslate.length > 0) {
        try {
            const res = await translate(wordsToTranslate, { from: 'en', to: 'my' });
            translatedWords = res.map((result, index) => {
                const originalWord = wordsToTranslate[index];
                if (MYANMAR_REGEX.test(result.text)) {
                    translationCache.set(originalWord, result.text);
                    return result.text;
                } else {
                    console.error(`Invalid translation for "${originalWord}": ${result.text}`);
                    return getRandomFallbackWord();
                }
            });
        } catch (err) {
            console.error(`Batch translation failed: ${err.message}`);
            translatedWords = wordsToTranslate.map(() => getRandomFallbackWord());
        }
    }

    // Combine cached and translated words in original order
    const finalWords = words.map((_, i) => {
        const cacheIndex = indicesToTranslate.indexOf(i);
        return cacheIndex === -1 ? cachedWords[i] : translatedWords[cacheIndex];
    });
    return finalWords.join(' ');
}

// Generating random English paragraph for time limit
export function generateENParagraphByTime(timeInSeconds) {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        return null;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wordCount = Math.floor(timeInMinutes * 400);
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// Generating random Myanmar paragraph for time limit
export async function generateMMParagraphByTime(timeInSeconds) {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        return null;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wordCount = Math.floor(timeInMinutes * 200); 
    return generateRandomMMWordsParagraph(wordCount);
}

// Generating quotes
export function getRandomQuote() {
    return quotes.random();
}