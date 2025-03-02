import { TypedWord } from "./TypedWord";
import type { TypingStoreState } from "../store/types";
import { Box, Heading } from "@chakra-ui/react";

type TypingConsoleProps = {
  words: string[];
} & Pick<TypingStoreState, "enteredText">;

export const TypingConsole: React.FC<TypingConsoleProps> = ({
  enteredText,
  words,
}) => {
  return (
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
  );
};
