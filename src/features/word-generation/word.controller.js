import { generateRandomENWordsParagraph } from "./word.service.js";
import { generateRandomMMWordsParagraph } from "./word.service.js";
import { getRandomQuote } from "./word.service.js";
import { generateENParagraphByTime } from "./word.service.js";
import { generateMMParagraphByTime } from "./word.service.js";

// generating paragraph by word limit
export const generateWords = async (req, res) => {
    const wordCount = parseInt(req.query.count);
    const lang = req.query.lang?.toLowerCase();
    console.log(wordCount);
    
    if (isNaN(wordCount) || wordCount < 0) {
        return res.status(404).json({ error: "Invalid Input"});
        
    }

    if (!lang || (lang !== 'en' && lang !== 'mm')) {
        return res.status(400).json({ error: "Invalid language parameter."})
    }

    try {
        let paragraph;
        if (lang === 'en') {
            paragraph = generateRandomENWordsParagraph(wordCount);
        } else if (lang === 'mm') {
            paragraph = await generateRandomMMWordsParagraph(wordCount)
        }
        res.json( {paragraph} );
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to generate paragraph"});
        
    }
}

// generating random  paragraph for time limit 
export const generateByTime = async (req, res) => {
    const time = parseInt(req.query.time);
    const lang = req.query.lang?.toLowerCase();

    if (isNaN(time) || time <= 0) {
        return res.status(400).json({ error: "Invalid time input" });
    }

    if (!lang || (lang !== 'en' && lang !== 'mm')) {
        return res.status(400).json({ error: "Invalid language parameter."})
    }

    try {
        let paragraph;
        if (lang === 'en') {
            paragraph = generateENParagraphByTime(time);
        } else if(lang === 'mm') {
            paragraph = await generateMMParagraphByTime(time);
        }
        res.json({ paragraph });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to generate paragraph"});
        
    }
}

// random quote for all button 
export const getQuote = (req, res) => {
    const quote = getRandomQuote();
    res.json(quote);
}

// random quote for specific author
// export const getQuoteByAuthor = (req, res) => {
//     const author = req.query.author;
//     if (!author) {
//         return res.status(404).json({ error: "Author name is requiered."});
//     }
//     const result = getRandomQuoteByAuthor(author);
//     res.json(result);
// }