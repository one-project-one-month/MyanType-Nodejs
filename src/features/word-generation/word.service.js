import * as generateEng from 'random-words';
import quotes from 'quotesy';
import translate from 'google-translate-api-x';

// generating paragraph by eng word limit
export function generateRandomENWordsParagraph(wordCount) {
    if (!wordCount) {
        wordCount = 10;
    }
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// generating paragraph by mm word limit
export async function generateRandomMMWordsParagraph(wordCount) {
    if (!wordCount) {
        wordCount = 10;
    }
    const words = generateEng.generate(wordCount);

    const translateWords = await Promise.all(
        words.map(word =>
            translate(word, { from: 'en', to: 'my'})
                .then(res=> res.text)
                .catch(() => word)
            )
        )
    return translateWords.join(' ');
} 

// generating random en paragraph for time limit 
export function generateENParagraphByTime (timeInSeconds) {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        return null;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wordCount =  Math.floor(timeInMinutes * 400)
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// generating random mm paragraph for time limit 
export async function generateMMParagraphByTime (timeInSeconds) {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        return null;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wordCount =  Math.floor(timeInMinutes * 400)
    const words = generateEng.generate(wordCount);
        const translateWords = await Promise.all(
        words.map(word =>
            translate(word, { from: 'en', to: 'my'})
                .then(res=> res.text)
                .catch(() => word)
            )
        )
    return translateWords.join(' ');
}

// generating quotes
// fetching a random quote
export function getRandomQuote() {
    return quotes.random();
}

// fetching quote by author name
// export function getRandomQuoteByAuthor(author) {
//     const matchName = quotes.search(author);
//     return matchName.filter(a => a.author.toLowerCase().includes(author.toLowerCase()));
// }

// fetching quote by category 
// export function getRandomQuotebyCategory(category) {
//     const lowerCategory = category.toLowerCase();
    
    // creating an arry of quotes since it can't fetch all quotes from quotesy
//     const quoteArray = Array.from({length: 30}, () => quotes.random());

    // fetching quotes based on category from the array above
//     const filtered = quoteArray.filter(q => {
//         const wordCount =  q.text.split(/\s+/).length;
//         return getQuoteCategory(wordCount) === lowerCategory;
//     });
    
//     if (filtered.length === 0) {
//         return { text: "No quotes found for this category", author: "System"};
//     }

    // returning one random quote from the array
//     return filtered[Math.floor(Math.random() * filtered.length)]
// }