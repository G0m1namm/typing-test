import React, { useEffect, useMemo } from "react";
import "./App.css";
import { TypingInput } from "./features/typing-console/components/TypingConsoleInput";
import { useTypingStore } from "./features/typing-console/store/typingTestStore";
import { TypingConsoleTitle } from "./features/typing-console/components/TypingConsoleTitle";
import { TypingConsole } from "./features/typing-console/components/TypingConsole";
import { useTextStore } from "./features/typing-console/store/textStore";

const App: React.FC = () => {
  const onRestartTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const endTest = useTypingStore.use.endTest();
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const initialText = useTextStore.use.initialText();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const words = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );

  useEffect(() => {
    if (words.length === 0) {
      endTest(initialText);
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
