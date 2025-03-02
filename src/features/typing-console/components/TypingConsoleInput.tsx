import { type ChangeEvent, type KeyboardEvent, useMemo } from "react";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { Box, Input } from "@chakra-ui/react";

/**
 * TypingInput Component
 * 
 * A controlled input component that handles user typing during the typing test.
 * It manages word progression, input validation, and logging of user actions.
 * 
 * @param {Object} props - Component props
 * @param {() => void} props.onStart - Callback function to trigger when typing starts
 */
export const TypingInput: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  // Typing Test Store hooks for managing typing state and logging
  const setEnteredText = useTypingStore.use.setEnteredText();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const logger = useTypingStore.use.setTypeLogs();

  // Text Store hooks for managing word progression and validation
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const moveNextWord = useTextStore.use.moveNextWord();
  const currentWordIndex = useTextStore.use.currentWordIndex();

  /**
   * Memoized remaining words to prevent unnecessary recalculations
   * Updates only when getRemainingWords changes or currentWordIndex changes
   */
  const remainingWords = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );

  /**
   * Memoized current word that needs to be typed
   * Falls back to 0 if no words remain
   */
  const currentWord = useMemo(() => remainingWords[0] ?? 0, [remainingWords]);

  /**
   * Handles input change events
   * Updates the entered text and triggers the test start if necessary
   *
   * @param {ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEnteredText(e.target.value, () => onStart());
  };

  /**
   * Handles keydown events
   * Manages:
   * - Space key: Word completion validation and progression
   * - Backspace: Logging deletion actions
   * - Character keys: Logging typing actions
   *
   * @param {KeyboardEvent<HTMLInputElement>} e - Keyboard event
   */
  const onKeyDownChange = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === " ") {
      // Validate word completion and move to next word if correct
      if (enteredText.trim() === currentWord) {
        moveNextWord();
        setEnteredText("");
      }
      e.preventDefault(); // Prevent space from adding to input
    } else if (e.key === "Backspace") {
      // Log deletion actions
      logger({ action: "delete", character: "", word: currentWord });
    } else if (e.key.length === 1) {
      // Log character typing actions
      logger({ action: "typing", character: e.key, word: currentWord });
    }
  };

  // Don't render anything if the test is finished
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
