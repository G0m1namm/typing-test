import { useCallback } from "react";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";

export const useTypingTest = () => {
  // Typing store hooks
  const enteredText = useTypingStore.use.enteredText();
  const setEnteredText = useTypingStore.use.setEnteredText();
  const status = useTypingStore.use.status();

  // Text store hooks
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const moveNextWord = useTextStore.use.moveNextWord();
  const currentWordIndex = useTextStore.use.currentWordIndex();

  const handleInputChange = useCallback((text: string, onStart?: () => void) => {
    setEnteredText(text, onStart);
  }, [setEnteredText]);

  const handleWordComplete = useCallback((word: string) => {
    if (enteredText.trim() === word) {
      moveNextWord();
      setEnteredText('');
    }
  }, [enteredText, moveNextWord, setEnteredText]);

  return {
    enteredText,
    status,
    currentWordIndex,
    words: getRemainingWords(),
    handleInputChange,
    handleWordComplete
  };
};
