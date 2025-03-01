import React, { useEffect, useMemo } from "react";
import "./App.css";
import { TypingInput } from "./features/typing-console/components/TypingConsoleInput";
import { useTypingStore } from "./features/typing-console/store/store";
import { TypingConsoleTitle } from "./features/typing-console/components/TypingConsoleTitle";
import { TypingConsole } from "./features/typing-console/components/TypingConsole";

const App: React.FC = () => {
  const onRestartTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const endTest = useTypingStore.use.endTest();
  const wordsPerMinute = useTypingStore.use.wpm();
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
      <TypingConsoleTitle />
      <TypingConsole words={words} enteredText={enteredText} />
      <div>
        <button onClick={onRestartTest}>Restart</button>
      </div>
      <TypingInput />
    </div>
  );
};

export default App;
