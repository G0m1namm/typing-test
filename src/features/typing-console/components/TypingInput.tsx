import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import { useTypingStore } from "../store";

export const TypingInput = () => {
  const setEnteredText = useTypingStore.use.setEnteredText();
  const isActive = useTypingStore.use.isActive();
  const getRemainingWords = useTypingStore.use.getRemainingWords();
  const moveNextWord = useTypingStore.use.moveNextWord();
  const currentWordIndex = useTypingStore.use.currentWordIndex();
  const logger = useTypingStore.use.setTypeLogs();
  const remainingWords = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const currentWord = useMemo(() => remainingWords[0] ?? 0, [remainingWords]);
  const [inputText, setInputText] = useState("");

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setEnteredText(e.target.value);
  };

  const onKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      if (inputText.trim() === currentWord) {
        moveNextWord();
        setEnteredText("");
        setInputText("");
      }
      e.preventDefault();
    } else if (e.key === "Backspace") {
      logger({ action: "delete", character: "", word: currentWord });
    } else {
      logger({ action: "typing", character: e.key, word: currentWord });
    }
  };

  if (!isActive) return <></>;

  return (
    <div>
      <input
        type="text"
        name="text"
        value={inputText}
        onChange={onInputChange}
        onKeyDown={onKeyDownChange}
      />
    </div>
  );
};
