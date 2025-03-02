import { Box, Button, Fade, VStack } from "@chakra-ui/react";
import { TypingConsoleTitle } from "./TypingConsoleTitle";
import { TypingConsole } from "./TypingConsole";
import { TypingInput } from "./TypingConsoleInput";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { useEffect, useMemo } from "react";

export const TestPanel: React.FC = () => {
  const onRestartTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
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
  }, [words.length, endTest, initialText]);

  return (
    <VStack>
      <TypingConsoleTitle />
      <Fade in={status !== "FINISHED"}>
        <TypingConsole words={words} enteredText={enteredText} />
      </Fade>
      <Box>
        <Button variant="solid" type="button" onClick={onRestartTest}>
          Restart
        </Button>
      </Box>
      <TypingInput />
    </VStack>
  );
};
