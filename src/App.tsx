import React, { useEffect, useMemo } from "react";
import "./App.css";
import { TypedWord } from "./components/TypedWord";
import { TypingInput } from "./features/typing-console/components/TypingInput";
import { useTypingStore } from "./features/typing-console/store";

const App: React.FC = () => {
  const onRestartTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const endTest = useTypingStore.use.endTest();
  const wordsPerMinute = useTypingStore.use.wpm();
  const accuracy = useTypingStore.use.accuracy();
  const getRemainingWords = useTypingStore.use.getRemainingWords();
  const currentWordIndex = useTypingStore.use.currentWordIndex();
  const words = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );

  useEffect(() => {
    if (words.length === 0) {
      endTest();
    }
  }, [words.length, endTest]);

  return (
    <div className="App">
      <h1>
        {wordsPerMinute
          ? `You typed ${0} words at ${wordsPerMinute} WPM. Accuracy: ${accuracy}%`
          : "Test Your Typing Speed, Scrub!"}
      </h1>
      <h3>
        {wordsPerMinute ? `Refresh to retake the test!` : `Type the following:`}
      </h3>
      <h6>
        {words.map((word) =>
          word === words[0] ? (
            <TypedWord word={word} inputText={enteredText} key={`${word}`} />
          ) : (
            word + " "
          )
        )}
      </h6>
      <div>
        <button onClick={onRestartTest}>Restart</button>
      </div>
      <TypingInput />
    </div>
  );
};

export default App;
