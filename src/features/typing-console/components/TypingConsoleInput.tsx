import { ChangeEvent, KeyboardEvent, useMemo } from "react";
import { useTypingStore } from "../store/store";

export const TypingInput = () => {
  const setEnteredText = useTypingStore.use.setEnteredText();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const getRemainingWords = useTypingStore.use.getRemainingWords();
  const moveNextWord = useTypingStore.use.moveNextWord();
  const currentWordIndex = useTypingStore.use.currentWordIndex();
  const logger = useTypingStore.use.setTypeLogs();
  const remainingWords = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const currentWord = useMemo(() => remainingWords[0] ?? 0, [remainingWords]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value);
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
    <div>
      <input
        type="text"
        name="text"
        value={enteredText}
        onChange={onInputChange}
        onKeyDown={onKeyDownChange}
      />
    </div>
  );
};
