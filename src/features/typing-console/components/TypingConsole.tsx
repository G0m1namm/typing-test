import { TypedWord } from "./TypedWord";
import { TypingInput } from "./TypingConsoleInput";
import { Box, Heading, VStack } from "@chakra-ui/react";

interface TypingConsoleProps {
  words: string[];
  enteredText: string;
  onStart: () => void;
}

/**
 * TypingConsole Component
 *
 * Displays the typing test interface including:
 * - Words to be typed in a scrollable container
 * - Current word being typed with real-time feedback
 * - Input field for user typing
 *
 * @param props - Component props
 * @param props.words - Array of words to be typed
 * @param props.enteredText - Current text entered by user
 * @param props.onStart - Callback for when typing starts
 *
 * @example
 * ```tsx
 * <TypingConsole
 *   words={['hello', 'world']}
 *   enteredText="hel"
 *   onStart={() => console.log('Started typing')}
 * />
 * ```
 */
export const TypingConsole: React.FC<TypingConsoleProps> = ({
  enteredText,
  words,
  onStart,
}) => {
  return (
    <VStack spacing={4} width="full">
      <Box
        p="4"
        bg="gray.50"
        rounded="md"
        w="70vw"
        h={{ base: "200px", md: "150px" }}
        maxW="1000px"
        overflowX="hidden"
        overflowY="auto"
      >
        <Heading as="h6">
          {words.map((word, index) =>
            word === words[0] ? (
              <TypedWord
                word={word}
                inputText={enteredText}
                key={`${word}-${index}-${word.length}`}
              />
            ) : (
              `${word} `
            ),
          )}
        </Heading>
      </Box>
      <TypingInput onStart={onStart} />
    </VStack>
  );
};
