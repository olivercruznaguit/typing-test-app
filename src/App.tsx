import { faker } from "@faker-js/faker";
import "./App.css";
import "@faker-js/faker";
import { useEffect, useMemo, useState } from "react";
import Nav from "./Nav";
import WordsDisplay from "./WordsDisplay";

function App() {
  const [isRestarted, setIsRestarted] = useState(false);
  const generateWords = useMemo(
    () => faker.word.words({ count: { min: 25, max: 30 } }),
    [isRestarted]
  );
  const [arrayWords, setArrayWords] = useState<string[]>(
    generateWords.split(" ")
  );
  const [activeWord, setActiveWord] = useState(arrayWords[0]);
  const [inputValue, setInputValue] = useState("");

  const [startTime, setStartTime] = useState(0);
  const [wordsTyped, setWordsTyped] = useState(0);
  const [wpm, setWPM] = useState(0);
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown === 1) {
          clearInterval(interval);
          startTypingTest();
          return 0;
        } else {
          return prevCountdown - 1;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  useEffect(() => {
    setArrayWords(generateWords.split(" "));
    setActiveWord(generateWords.split(" ")[0]);
  }, [generateWords]);

  const startTypingTest = () => {
    setIsRestarted(false);
    setActiveWord(arrayWords[0]);
    setStartTime(Date.now());
  };

  const detectWord = (word: string) => {
    if (word === activeWord) {
      const currentIndex = arrayWords.indexOf(activeWord);

      const nextIndex = currentIndex + 1;
      if (nextIndex < arrayWords.length) {
        setActiveWord(arrayWords[nextIndex]);
        setInputValue("");
        setWordsTyped(wordsTyped + 1);
      } else {
        const endTime = Date.now();
        const timeElapsed = (endTime - startTime) / 1000;
        const wpm = Math.round((wordsTyped / timeElapsed) * 60);
        setWPM(wpm);
      }
    }
  };

  const handleChange = (e: { target: { value: any } }) => {
    const word = e.target.value;
    setInputValue(word);
    detectWord(word);
  };

  const handleRestart = () => {
    setIsRestarted(true);
    setInputValue("");
    setWordsTyped(0);
    setWPM(0);
    setStartTime(Date.now());
    setCountdown(3);
  };

  return (
    <div className="App text-primary justify-center content-center">
      <Nav />
      <div className="flex flex-col content-center">
        <WordsDisplay
          countDown={countdown}
          arrayWords={arrayWords}
          activeWord={activeWord}
        />
        <div className="mt-10">
          <input
            className="text-slate-900"
            type="text"
            onChange={handleChange}
            placeholder="Type here"
            value={inputValue}
          />
        </div>
      </div>
      <div className="absolute left-0 ml-10 bottom-0 mb-10 bg-white text-slate-900 rounded-[10px] px-2 py-3">
        <div className="text-xl font-mono">WPM: {wpm !== 0 ? (wpm) : "--" }</div>
      </div>
      <div className="absolute right-0 mr-10 bottom-0 mb-10">
        <button onClick={handleRestart}>Restart</button>
      </div>
    </div>
  );
}

export default App;
