// src/features/EngWord_API/engWord.controller.js
// import engWordService from "./EngWord.service.js";
// import { getRandomQuote, getQuoteByType, getShuffledParagraph } from "./EngWord.service.js";
import { generateRandomWordsParagraph } from "./EngWord.service.js";

// export const renderIndex = (req, res) => {
//   const maxWords = engWordService.getMaxWords();
//   res.render("EngWord_API/index", { maxWords });
// };


// random words
// export const generateWords = (req, res) => {
//   try {
//     console.log("Request body received:", req.body); 

//     const { wordCount } = req.body;

//     if (!wordCount || isNaN(wordCount)) {
//       return res.status(400).json({ error: "Invalid word count." });
//     }

//     const result = engWordService.generateRandomWords(Number(wordCount));
//     res.json({ paragraph: result });
//   } catch (err) {
//     console.error("Error:", err.message); // Log error
//     res.status(400).json({ error: err.message });
//   }
// };

// quotes
// export const getQuote = (req, res) => {
//   const type = req.query.type;

//   if (type === 'all') {
//     const quote = getRandomQuote();
//     return res.json({ quote });
//   }

//   const filtered = getQuoteByType(type);

//   if (!filtered.length) {
//     return res.json({ quote: 'No quotes available for this category.' });
//   }

//   const quote = filtered[Math.floor(Math.random() * filtered.length)];
//   res.json({ quote });
// };

// random paragraph for time limit 
// export const generateParagraph = (req, res) => {
//   try{
//       const paragraph = getShuffledParagraph();
//       console.log("Request paragraph received:", req.body); 
//       res.json({ paragraph });
//     } catch (err) {
//       console.log(err);
//       res.status(400).json({ error: err.message });
//     }
// }

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