import {
  Button,
  Input,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import type { TestStatus } from "../store/types";

interface TypingControlsProps {
  status: TestStatus;
  username: string;
  onUsernameChange: (username: string) => void;
  onSaveScore: (username: string) => Promise<void>;
  onRestart: () => void;
  isSaveScoreLoading: boolean;
  saveScoreError: string | null;
  saveScoreSuccess: boolean;
}

/**
 * TypingControls Component
 * 
 * Manages the control panel for the typing test, including:
 * - Username input for score saving
 * - Save score button
 * - Restart test button
 * - Error messages
 */
export const TypingControls: React.FC<TypingControlsProps> = ({
  status,
  username,
  onUsernameChange,
  onSaveScore,
  onRestart,
  isSaveScoreLoading,
  saveScoreError,
  saveScoreSuccess,
}) => {
  return (
    <VStack spacing={4} width="full" maxW="400px">
      {status === "FINISHED" && (
        <VStack width="full">
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              value={username}
              onChange={(e) => onUsernameChange(e.target.value)}
              isDisabled={saveScoreSuccess}
            />
            <FormHelperText>
              Your username will appear on the leaderboard
            </FormHelperText>
          </FormControl>

          <Button
            colorScheme="blue"
            width="full"
            onClick={() => onSaveScore(username)}
            isLoading={isSaveScoreLoading}
            isDisabled={saveScoreSuccess}
          >
            Save Score
          </Button>

          {saveScoreError && (
            <Alert status="error">
              <AlertIcon />
              <AlertDescription>{saveScoreError}</AlertDescription>
            </Alert>
          )}
        </VStack>
      )}

      <Button
        variant="outline"
        colorScheme="gray"
        width="full"
        onClick={onRestart}
      >
        Restart Test
      </Button>
    </VStack>
  );
};
