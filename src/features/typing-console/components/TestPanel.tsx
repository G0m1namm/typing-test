import {
  Box,
  Button,
  Fade,
  Input,
  VStack,
  FormControl,
  FormLabel,
  FormHelperText,
  Alert,
  AlertIcon,
  AlertDescription,
  useToast,
} from "@chakra-ui/react";
import { TypingConsoleTitle } from "./TypingConsoleTitle";
import { TypingConsole } from "./TypingConsole";
import { TypingInput } from "./TypingConsoleInput";
import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ScoreEntry } from "../../../shared/store/types";
import { useScoreDataStore } from "../../../shared/store/scoreDataStore";
import { useTimer } from "react-timer-hook";
import { TypingConsoleTimer } from "./TypingConsoleTimer";

// Set initial timer duration to 2 minutes from now
const time = new Date();
time.setSeconds(time.getSeconds() + 120); // Expire in 2min

/**
 * TestPanel Component
 *
 * Main component that orchestrates the typing test functionality.
 * Manages the test state, user input, scoring, and test completion actions.
 */
export const TestPanel: React.FC = () => {
  // Store hooks for managing test state
  const resetTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const endTest = useTypingStore.use.endTest();

  // Text store hooks for managing displayed text
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const resetTextStore = useTextStore.use.resetStore();
  const initialText = useTextStore.use.initialText();
  const currentWordIndex = useTextStore.use.currentWordIndex();

  // Local state for username input
  const [username, setUsername] = useState("");

  // Performance metrics hooks
  const accuracy = useTypingStore.use.accuracy();
  const score = useTypingStore.use.score();
  const wordsPerMinute = useTypingStore.use.wpm();
  const correctWordsCount = currentWordIndex;

  // Score saving related hooks
  const saveScore = useScoreDataStore.use.savesScore();
  const resetScoreState = useScoreDataStore.use.resetStore();
  const saveScoreSuccess = useScoreDataStore.use.success();
  const saveScoreError = useScoreDataStore.use.error();
  const isSaveScoreLoading = useScoreDataStore.use.isLoading();

  // Fallback username for anonymous users
  const defaultUsername = `Anonym${Date.now()}`;
  const toast = useToast();

  // Memoized values to prevent unnecessary re-renders
  const words = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const hasFinished = useMemo(() => status === "FINISHED", [status]);

  /**
   * Handler for timer expiration
   * Ends the test when the timer reaches zero
   */
  const onExpireHandler = useCallback(() => {
    endTest(initialText);
  }, [initialText, endTest]);

  // Timer hook configuration
  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onExpireHandler(),
    autoStart: false,
  });

  /**
   * Effect to end test when all words are typed
   */
  useEffect(() => {
    if (words.length === 0) {
      endTest(initialText);
    }
  }, [words.length, endTest, initialText]);

  /**
   * Effect to show success toast when score is saved
   */
  useEffect(() => {
    if (saveScoreSuccess) {
      toast({
        title: "Score saved successfully",
        description: "Check the leaderboard chart to check if you got there!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [saveScoreSuccess]);

  /**
   * Handles saving the test score
   * Creates a score entry with test results and saves it to the store
   */
  const onSaveScoreHandler = async () => {
    const data: ScoreEntry = {
      id: Date.now(),
      accuracy,
      score,
      username: username || defaultUsername,
      firstStrikeAccuracy: accuracy,
      wpm: wordsPerMinute,
      words: correctWordsCount,
    };

    await saveScore(data);
  };

  /**
   * Handles restarting the test
   * Resets timer, test state, text store, and score state
   */
  const onRestartTestHandler = () => {
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120); // Expire in 2min
    restart(time, false);
    resetTest();
    resetTextStore();
    resetScoreState();
  };

  return (
    <VStack>
      <TypingConsoleTitle />
      <Fade in={saveScoreSuccess || hasFinished} unmountOnExit>
        <VStack mt="3">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="usename"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormHelperText>
              The username is going to show in Leaderboards chart.
            </FormHelperText>
          </FormControl>

          <Button
            isLoading={isSaveScoreLoading}
            type="button"
            onClick={onSaveScoreHandler}
            colorScheme="blue"
            disabled={saveScoreSuccess}
          >
            Save score
          </Button>

          {saveScoreError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{saveScoreError}</AlertDescription>
            </Alert>
          )}
        </VStack>
      </Fade>
      <TypingConsoleTimer seconds={seconds} minutes={minutes} />
      <Fade in={!hasFinished} unmountOnExit>
        <TypingConsole words={words} enteredText={enteredText} />
      </Fade>
      <Box>
        <Button variant="solid" type="button" onClick={onRestartTestHandler}>
          Restart test
        </Button>
      </Box>
      <TypingInput onStart={() => start()} />
    </VStack>
  );
};
