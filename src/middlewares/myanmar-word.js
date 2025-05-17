import router from 'express';
import fs from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const configPath = join(
  dirname(fileURLToPath(import.meta.url)),
  '/MyanmarWord.json'
);

const myanmarWord =  fs.readFileSync(configPath, 'utf8'); 
const myanmarRouter = router();

myanmarRouter.get("/time",(req,res)=>{
    
        const lines = myanmarWord.split();
        const words = lines.flatMap(line => line.split(' ')); // if one space find , one index of array increse
    
     res.json(words.join(' '))

})

myanmarRouter.get('/random',(req,res) =>{
    
    const lines= myanmarWord.split('/n');
    const words = lines.flatMap(line => line.split(' '));

for (let i = words.length - 1; i > 0; i--) {

  const j = Math.floor(Math.random() * (i+1)); // Random number between 1 and 100
  
  [words[i],words[j]]=[words[j],words[i]]
}
    const cleanedWord =words.join(' ')
     res.json(cleanedWord);
})

export default myanmarRouter;