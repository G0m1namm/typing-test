import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import "./App.css";
import { TypedWord } from "./components/TypedWord";

const App: React.FC = () => {
  const [typeTest] = useState("This is the sentence to type");
  const [words, setWords] = useState(typeTest.split(" "));
  const [enteredText, setEnteredText] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [started, setStarted] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [wordsPerMinute, setWordsPerMinute] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);

  const checkFinished = () => {
    if (!words.length) {
      if (startTime) {
        const timeMillis: number = new Date().getTime() - startTime.getTime();
        const wpm = calcWordsPerMinute(typeTest.length, timeMillis);
        setWordsPerMinute(wpm);
        setHasFinished(true);
      }
    }
  };

  useEffect(() => {
    if (words.length !== 0) return;
    checkFinished();
  }, [words, checkFinished]);

  const calcWordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

  const onWordChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (started) {
      setStarted(true);
      setStartTime(new Date());
    }
    setEnteredText(e.currentTarget.value.trim());
    if (enteredText === words[0]) {
      setCorrectCount(correctCount + 1);
      setEnteredText("");
      setWords(words.slice(1));
    }
  };

  const onRestartTest = () => {
    setWords(typeTest.split(" "));
    setStarted(false);
    setCorrectCount(0);
    setWordsPerMinute(0);
    setHasFinished(false);
  };

  return (
    <div className="App">
      <h1>
        {wordsPerMinute
          ? `You typed ${correctCount} words at ${wordsPerMinute} WPM.`
          : "Test Your Typing Speed, Scrub!"}
      </h1>
      <h3>
        {wordsPerMinute ? `Refresh to retake the test!` : `Type the following:`}
      </h3>
      <h6>
        {words.map((word, index) =>
          word === words[0] ? (
            <TypedWord
              word={word}
              inputText={enteredText}
              key={`${word}-${index}`}
            />
          ) : (
            word + " "
          )
        )}
      </h6>
      <div>
        <button onClick={onRestartTest}>Restart</button>
      </div>
      {!hasFinished && (
        <input name="text" value={enteredText} onChange={onWordChange} />
      )}
    </div>
  );
};

export default App;
