import { Box } from "@chakra-ui/react";
interface TimerProps {
  seconds: number;
  minutes: number;
}

/**
 * TypingConsoleTimer Component
 *
 * Displays the elapsed time in mm:ss format for the typing test.
 * Used to show the user how long they've been typing.
 *
 * @example
 * ```tsx
 * <TypingConsoleTimer minutes={1} seconds={30} /> // displays "1:30"
 * ```
 */
export const TypingConsoleTimer: React.FC<TimerProps> = ({
  seconds,
  minutes,
}) => {
  return (
    <Box fontSize="xl">
      <span>{minutes}</span>:<span>{seconds}</span>
    </Box>
  );
};
