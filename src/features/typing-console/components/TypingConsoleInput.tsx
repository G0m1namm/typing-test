import { type ChangeEvent, type KeyboardEvent, useCallback, useMemo } from "react";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { TypingConsoleTimer } from "./TypingConsoleTimer";
import { useTimer } from "react-timer-hook";

const time = new Date();
time.setSeconds(time.getSeconds() + 30); // Expire in 2min

export const TypingInput = () => {
  // Typing Test Store
  const setEnteredText = useTypingStore.use.setEnteredText();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const logger = useTypingStore.use.setTypeLogs();
  const endTest = useTypingStore.use.endTest();

  // Text Store
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const moveNextWord = useTextStore.use.moveNextWord();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const initialText = useTextStore.use.initialText();

  const remainingWords = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const currentWord = useMemo(() => remainingWords[0] ?? 0, [remainingWords]);

  const onExpireHandler = useCallback(() => {
    endTest(initialText);
  }, [initialText, endTest]);

  const { seconds, minutes, start } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onExpireHandler(),
    autoStart: false,
  });

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value, () => start());
  };

  const onKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      if (enteredText.trim() === currentWord) {
        moveNextWord();
        setEnteredText("");
      }
      e.preventDefault();
    } else if (e.key === "Backspace") {
      logger({ action: "delete", character: "", word: currentWord });
    } else if (e.key.length === 1) {
      logger({ action: "typing", character: e.key, word: currentWord });
    }
  };

  if (status !== "IDLE") return <></>;

  return (
    <>
      <TypingConsoleTimer seconds={seconds} minutes={minutes} />
      <div>
        <input
          type="text"
          name="text"
          value={enteredText}
          onChange={onInputChange}
          onKeyDown={onKeyDownChange}
        />
      </div>
    </>
  );
};
