import { useToast } from "@chakra-ui/react";
import { useScoreDataStore } from "../../../shared/store/scoreDataStore";
import { useTextStore } from "../store/textStore";
import { useTypingStore } from "../store/typingTestStore";
import { useCallback, useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import { TypingTestView } from "../components/TypingTestView";

/**
 * Calculate initial time for the typing test timer
 * @returns {Date} Date object set to 30 seconds from now
 */
const getInitialTime = () => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 120); // 2min === 120sec
  return time;
};

/**
 * TypingTestContainer
 *
 * Container component that handles all the business logic for the typing test:
 * - State management through multiple stores
 * - Timer control and test completion logic
 * - Score calculation and submission
 * - Toast notifications for user feedback
 * - Test restart functionality
 *
 * Pattern: Container/Presenter pattern where this container handles logic
 * while TypingTestView handles the presentation
 */
export const TypingTestContainer: React.FC = () => {
  // Store hooks setup
  const enteredText = useTypingStore.use.enteredText();
  const status = useTypingStore.use.status();
  const accuracy = useTypingStore.use.accuracy();
  const score = useTypingStore.use.score();
  const wordsPerMinute = useTypingStore.use.wpm();
  const endTest = useTypingStore.use.endTest();
  const resetTest = useTypingStore.use.resetTest();

  // Get text store values
  const getRemainingWords = useTextStore.use.getRemainingWords();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const initialText = useTextStore.use.initialText();
  const resetTextStore = useTextStore.use.resetStore();

  // Get score data store values
  const saveScore = useScoreDataStore.use.savesScore();
  const resetScoreStore = useScoreDataStore.use.resetStore();
  const saveScoreSuccess = useScoreDataStore.use.success();
  const saveScoreError = useScoreDataStore.use.error();
  const isSaveScoreLoading = useScoreDataStore.use.isLoading();

  const toast = useToast();
  const [username, setUsername] = useState("");
  const [isTestComplete, setIsTestComplete] = useState(false);

  // Timer configuration
  const { seconds, minutes, start, restart, pause } = useTimer({
    expiryTimestamp: getInitialTime(),
    onExpire: () => handleTestComplete("TIME_UP"),
    autoStart: false,
  });

  const words = getRemainingWords();

  /**
   * Handles test completion from different triggers:
   * - Timer expiration
   * - All words completed
   * - Manual end
   */
  const handleTestComplete = useCallback(
    (reason: "TIME_UP" | "WORDS_COMPLETE" | "MANUAL") => {
      if (isTestComplete) return; // Prevent multiple completions

      setIsTestComplete(true);
      pause(); // Stop the timer
      endTest(initialText);

      // Log completion reason if needed
      console.log(`Test completed: ${reason}`);
    },
    [isTestComplete, pause, endTest, initialText],
  );

  /**
   * Monitors words completion to end test when all words are typed
   */
  useEffect(() => {
    if (words.length === 0 && status !== "FINISHED") {
      handleTestComplete("WORDS_COMPLETE");
    }
  }, [words.length, status, handleTestComplete]);

  /**
   * Shows success toast when score is saved successfully
   */
  useEffect(() => {
    if (saveScoreSuccess) {
      toast({
        title: "Score saved successfully",
        description: "Check the leaderboard to see your ranking!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [saveScoreSuccess, toast]);

  /**
   * Saves the current test score with user information
   * Generates anonymous username if none provided
   *
   * @param username - User-provided username for the score entry
   */
  const handleSaveScore = useCallback(
    async (username: string) => {
      const scoreEntry = {
        id: Date.now(),
        accuracy,
        score,
        username: username || `Anonym${Date.now()}`,
        firstStrikeAccuracy: accuracy,
        wpm: wordsPerMinute,
        words: currentWordIndex,
      };

      await saveScore(scoreEntry);
    },
    [accuracy, score, wordsPerMinute, currentWordIndex, saveScore],
  );

  /**
   * Resets the test to initial state:
   * - Resets timer
   * - Clears typing progress
   * - Resets all stores
   */
  const handleRestart = useCallback(() => {
    const newTime = getInitialTime();
    restart(newTime, false);
    resetTest(initialText);
    resetTextStore();
    resetScoreStore();
    setIsTestComplete(false);
  }, [restart, resetTest, resetTextStore, resetScoreStore]);

  /**
   * Starts the typing test timer
   */
  const handleStart = useCallback(() => {
    start();
  }, [start]);

  return (
    <TypingTestView
      words={getRemainingWords()}
      enteredText={enteredText}
      status={status}
      accuracy={accuracy}
      wordsPerMinute={wordsPerMinute}
      currentWordIndex={currentWordIndex}
      timer={{ seconds, minutes }}
      username={username}
      onUsernameChange={setUsername}
      onSaveScore={handleSaveScore}
      onRestart={handleRestart}
      onStart={handleStart}
      isSaveScoreLoading={isSaveScoreLoading}
      saveScoreError={saveScoreError}
      saveScoreSuccess={saveScoreSuccess}
      isTestComplete={isTestComplete}
    />
  );
};
