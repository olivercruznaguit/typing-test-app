import { faker } from '@faker-js/faker';
import './App.css';
import '@faker-js/faker'
import { useEffect, useMemo, useState } from 'react';
function App() {
  const generateWords = useMemo(() => faker.word.words(10), []);
  const arrayWords = generateWords.split(' ')
  const [activeWord, setActiveWord] = useState(arrayWords[0])
  const [inputValue, setInputValue] = useState('');

  const [startTime, setStartTime] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wpm, setWPM] = useState(0);

  useEffect(() => {
    if (activeWord === arrayWords[0]) {
      setStartTime(Date.now());
    }
  }, [activeWord]);

  const detectWord = (word: string) => {
    console.log("word: ", word);
    console.log("activeWord: ", activeWord);
    
    // If the word matches the activeWord
    if (word.trim() === activeWord) {
      // Find the index of the activeWord in the array
      const currentIndex = arrayWords.indexOf(activeWord);
      
      // Set the next word as the new activeWord
      const nextIndex = currentIndex + 1;
      if (nextIndex < arrayWords.length) {
        setActiveWord(arrayWords[nextIndex]);
        setInputValue("")
        setWordsTyped(wordsTyped + 1);
      } else {
        // Calculate WPM
        const endTime = Date.now();
        const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        setWPM(wpm);
      }
    }
  };

  const handleChange = (e: { target: { value: any; }; }) => {
    const word = e.target.value;
    setInputValue(word);
    detectWord(word);
  };

  return (
    <div className="App text-primary">
      <div>
        <h1 className='text-5xl font-mono'>
          typing tests 
         
        </h1>
        <div className='text-4xl font-mono w-auto bg-slate-400 m-10 p-10 leading-relaxed text-slate-900 tracking-wide'>
          {arrayWords.map((word, index) => (
            <span className={`${word === activeWord ? 'bg-green-300' : 'bg-slate-400'}`} key={index}>{word+" "}</span>
          ))} 
        </div> 
        <input className='text-slate-900 mt-10' type="text"
         onChange={handleChange} value={inputValue}  />
         {wpm > 0 && (
          <div>Words per minute: {wpm}</div>
        )}
      </div>
    </div>
  );
}

export default App;
