import { Box } from "@chakra-ui/react";

export const TypingConsoleTimer: React.FC<{
  seconds: number;
  minutes: number;
}> = ({ seconds, minutes }) => {
  return (
    <Box fontSize="xl">
      <span>{minutes}</span>:<span>{seconds}</span>
    </Box>
  );
};
