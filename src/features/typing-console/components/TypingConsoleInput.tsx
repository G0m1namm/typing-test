import { type ChangeEvent, type KeyboardEvent } from "react";
import { useTypingStore } from "../store/typingTestStore";
import { useTypingTest } from "../hooks/useTypingTest";
import { Box, Input } from "@chakra-ui/react";

interface TypingInputProps {
  onStart: () => void;
}

/**
 * TypingInput Component
 *
 * A controlled input component that handles user typing during the typing test.
 * It manages word progression, input validation, and logging of user actions.
 *
 * @param {TypingInputProps} props - Component props
 * @param {() => void} props.onStart - Callback function to trigger when typing starts
 */
export const TypingInput: React.FC<TypingInputProps> = ({ onStart }) => {
  const { enteredText, status, handleInputChange, handleWordComplete, words } =
    useTypingTest();
  const setTypeLogs = useTypingStore.use.setTypeLogs();

  const currentWord = words[0] ?? "";

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e.target.value, onStart);
  };

  const onKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      handleWordComplete(currentWord);
      e.preventDefault();
    } else if (e.key === "Backspace") {
      setTypeLogs({ action: "delete", character: "", word: currentWord });
    } else if (e.key.length === 1) {
      setTypeLogs({ action: "typing", character: e.key, word: currentWord });
    }
  };

  if (status === "FINISHED") return null;

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
