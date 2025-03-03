import { TypedWord } from "./TypedWord";
import { TypingInput } from "./TypingConsoleInput";
import { Box, Heading, VStack } from "@chakra-ui/react";

interface TypingConsoleProps {
  words: string[];
  enteredText: string;
  onStart: () => void;
}

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
            )
          )}
        </Heading>
      </Box>
      <TypingInput onStart={onStart} />
    </VStack>
  );
};
