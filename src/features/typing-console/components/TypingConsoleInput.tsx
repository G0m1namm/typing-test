import { type ChangeEvent, type KeyboardEvent, useMemo } from "react";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { Box, Input } from "@chakra-ui/react";

export const TypingInput: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  // Typing Test Store
  const setEnteredText = useTypingStore.use.setEnteredText();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const logger = useTypingStore.use.setTypeLogs();

  // Text Store
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const moveNextWord = useTextStore.use.moveNextWord();
  const currentWordIndex = useTextStore.use.currentWordIndex();

  const remainingWords = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const currentWord = useMemo(() => remainingWords[0] ?? 0, [remainingWords]);

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value, () => onStart());
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

  if (status === "FINISHED") return <></>;

  return (
    <Box>
      <Input
        type="text"
        name="text"
        value={enteredText}
        onChange={onInputChange}
        onKeyDown={onKeyDownChange}
        placeholder="Start typing here ..."
        autoFocus={true}
      />
    </Box>
  );
};
