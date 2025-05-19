import * as generateEng from 'random-words';
// import quotes from 'quotesy';

// generating paragraph by word limit
export function generateRandomWordsParagraph(wordCount) {
    if (!wordCount) {
        wordCount = 10;
    }
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// generating random paragraph for time limit 
export function generateParagraphByTime (timeInSeconds) {
    if (!timeInSeconds || isNaN(timeInSeconds) || timeInSeconds <= 0) {
        return null;
    }

    const timeInMinutes = timeInSeconds / 60;
    const wordCount =  Math.floor(timeInMinutes * 400)
    const words = generateEng.generate(wordCount);
    return words.join(" ");
}

// generating quotes
// function getQuoteCategory(wordCount) {
//     if (wordCount <= 20) 
//         return 'short';
//     if (wordCount <= 60) 
//         return 'medium';
//     if (wordCount <= 120)
//         return 'long'
//     return 'thicc';
// }

// fetching a random quote
// export function getRandomQuote() {
//     return quotes.random();
// }

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