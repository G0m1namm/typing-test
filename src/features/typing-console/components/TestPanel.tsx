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

const time = new Date();
time.setSeconds(time.getSeconds() + 120); // Expire in 2min

export const TestPanel: React.FC = () => {
  const resetTest = useTypingStore.use.resetTest();
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const endTest = useTypingStore.use.endTest();
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const resetTextStore = useTextStore.use.resetStore();
  const initialText = useTextStore.use.initialText();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const [username, setUsername] = useState("");
  const accuracy = useTypingStore.use.accuracy();
  const score = useTypingStore.use.score();
  const saveScore = useScoreDataStore.use.savesScore();
  const resetScoreState = useScoreDataStore.use.resetStore();
  const wordsPerMinute = useTypingStore.use.wpm();
  const correctWordsCount = currentWordIndex;
  const defaultUsername = `Anonym${Date.now()}`;
  const toast = useToast();

  const saveScoreSuccess = useScoreDataStore.use.success();
  const saveScoreError = useScoreDataStore.use.error();
  const isSaveScoreLoading = useScoreDataStore.use.isLoading();

  const words = useMemo(
    () => getRemainingWords(),
    [getRemainingWords, currentWordIndex]
  );
  const hasFinished = useMemo(() => status === "FINISHED", [status]);

  const onExpireHandler = useCallback(() => {
    endTest(initialText);
  }, [initialText, endTest]);

  const { seconds, minutes, start, restart } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onExpireHandler(),
    autoStart: false,
  });

  useEffect(() => {
    if (words.length === 0) {
      endTest(initialText);
    }
  }, [words.length, endTest, initialText]);

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
