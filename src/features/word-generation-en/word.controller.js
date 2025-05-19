import { generateRandomWordsParagraph } from "./word.service.js";
// import { getRandomQuote, getRandomQuotebyCategory } from "./word.service.js";
import { generateParagraphByTime } from "./word.service.js";

// generating paragraph by word limit
export const generateWords = (req, res) => {
    const wordCount = parseInt(req.query.count);
    console.log(wordCount);
    
    if (isNaN(wordCount) || wordCount < 0) {
        return res.status(404).json({ error: "Invalid Input"});
        
    }

    const paragraph = generateRandomWordsParagraph(wordCount);
    res.json({ paragraph });
}

// generating random paragraph for time limit 
export const generateByTime = (req, res) => {
    const time = parseInt(req.query.time);

    if (isNaN(time) || time <= 0) {
        return res.status(400).json({ error: "Invalid time input" });
    }

    const paragraph = generateParagraphByTime(time);
    if (!paragraph) {
            return res.status(500).json({ error: "Failed to generate paragraph" });
    }

    res.json({ paragraph });
}

// random quote for all button 
// export const getQuote = (req, res) => {
//     const quote = getRandomQuote();
//     res.json(quote);
// }

// random quote for specific author
// export const getQuoteByAuthor = (req, res) => {
//     const author = req.query.author;
//     if (!author) {
//         return res.status(404).json({ error: "Author name is requiered."});
//     }
//     const result = getRandomQuoteByAuthor(author);
//     res.json(result);
// }

// random quote by category
// export const getQuoteByCategory = (req, res) => {
//     const category = req.query.category;
//     const quotes = getRandomQuotebyCategory(category);
//     res.json(quotes);
// }