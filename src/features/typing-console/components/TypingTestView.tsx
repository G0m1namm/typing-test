import { VStack, Heading } from "@chakra-ui/react";
import { TypingConsole } from "./TypingConsole";
import { TypingMetrics } from "./TypingMetrics";
import { TypingControls } from "./TypingControls";
import { TypingConsoleTimer } from "./TypingConsoleTimer";
import type { TestStatus } from "../store/types";

interface TypingTestViewProps {
  words: string[];
  enteredText: string;
  status: TestStatus;
  accuracy: number;
  wordsPerMinute: number;
  currentWordIndex: number;
  timer: {
    seconds: number;
    minutes: number;
  };
  username: string;
  onUsernameChange: (username: string) => void;
  onSaveScore: (username: string) => Promise<void>;
  onRestart: () => void;
  onStart: () => void;
  isSaveScoreLoading: boolean;
  saveScoreError: string | null;
  saveScoreSuccess: boolean;
  isTestComplete: boolean;
}

/**
 * TypingTestView Component
 *
 * Presentation component for the typing test interface.
 * Follows the presenter pattern, receiving all data and callbacks as props.
 *
 * Features:
 * - Displays typing console with words to type
 * - Shows real-time metrics (accuracy, WPM)
 * - Displays timer
 * - Handles test controls (start, restart)
 * - Manages score saving interface
 *
 * @example
 * ```tsx
 * <TypingTestView
 *   words={['hello', 'world']}
 *   enteredText="hel"
 *   status="IN_PROGRESS"
 *   // ... other props
 * />
 * ```
 */
export const TypingTestView: React.FC<TypingTestViewProps> = ({
  words,
  enteredText,
  status,
  accuracy,
  wordsPerMinute,
  currentWordIndex,
  timer,
  username,
  onUsernameChange,
  onSaveScore,
  onRestart,
  onStart,
  isSaveScoreLoading,
  saveScoreError,
  saveScoreSuccess,
  isTestComplete,
}) => {
  return (
    <VStack spacing={4}>
      <Heading as="h4" fontSize="lg">
        {isTestComplete
          ? "Test completed! Save your score below."
          : "Type the following:"}
      </Heading>
      <TypingMetrics
        accuracy={accuracy}
        wordsPerMinute={wordsPerMinute}
        wordCount={currentWordIndex}
      />
      <TypingConsoleTimer seconds={timer.seconds} minutes={timer.minutes} />
      <TypingConsole
        words={words}
        enteredText={enteredText}
        onStart={onStart}
      />
      <TypingControls
        status={status}
        username={username}
        onUsernameChange={onUsernameChange}
        onSaveScore={onSaveScore}
        onRestart={onRestart}
        isSaveScoreLoading={isSaveScoreLoading}
        saveScoreError={saveScoreError}
        saveScoreSuccess={saveScoreSuccess}
      />
    </VStack>
  );
};
