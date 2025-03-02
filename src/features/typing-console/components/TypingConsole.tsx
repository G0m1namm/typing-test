import { TypedWord } from "./TypedWord";
import type { TypingStoreState } from "../store/types";

type TypingConsoleProps = {
  words: string[];
} & Pick<TypingStoreState, "enteredText">;

export const TypingConsole: React.FC<TypingConsoleProps> = ({
  enteredText,
  words,
}) => {
  return (
    <h6>
      {words.map((word) =>
        word === words[0] ? (
          <TypedWord
            word={word}
            inputText={enteredText}
            key={`${word}-${word.length}`}
          />
        ) : (
          `${word} `
        )
      )}
    </h6>
  );
};
