import { useState } from "react";

interface Props {
  countDown: number;
  arrayWords: string[];
  activeWord: string;
}
const WordsDisplay: React.FC<Props> = ({countDown, arrayWords, activeWord}) => {


  return (
    <>
      <div className="m-10">
        <div className="text-4xl font-mono w-auto bg-slate-400 p-5 leading-relaxed text-slate-900 tracking-wide">
          {countDown > 0 ? (
            <h1 className="text-5xl font-mono">{countDown}</h1>
          ) : (
            <>
              {arrayWords.map((word: string, index: number) => (
                <span
                  className={`${
                    word === activeWord ? "bg-green-300" : "bg-slate-400"
                  }`}
                  key={index}
                >
                  {word + " "}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default WordsDisplay;
