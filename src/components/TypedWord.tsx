import { ElementRef, useCallback, useEffect, useRef } from "react";

interface TypedWordProps {
  word: string;
  correctCharClass?: string;
  incorrectCharClass?: string;
  inputText: string;
  onCompleteWord?: (errors: number) => void;
}

export const TypedWord = ({
  word,
  inputText,
  correctCharClass = "correct",
  incorrectCharClass = "incorrect",
  onCompleteWord,
}: TypedWordProps): JSX.Element => {
  const wordRef = useRef<ElementRef<"em">>(null);

  /**
   * Check the sum of all the elements with wrong class and
   * calls the callback if exists with the calculated amount
   */
  const checkWrongCharacters = useCallback(() => {
    const wrongCharCount = wordRef.current?.querySelectorAll(
      `.${incorrectCharClass}`
    );

    onCompleteWord?.(wrongCharCount?.length ?? 0);
  }, [onCompleteWord, incorrectCharClass]);

  // Execute only if
  useEffect(() => {
    if (onCompleteWord && word.length === inputText.length) {
      checkWrongCharacters();
    }
  }, [inputText, word, checkWrongCharacters, onCompleteWord]);

  if (!word) return <></>;

  return (
    <em ref={wordRef} className="current-word">
      {word.split("").map((char, index) => {
        const comparison = inputText.charAt(index).localeCompare(char);

        const charClass = `typed ${
          comparison === 0 ? correctCharClass : incorrectCharClass
        }`;

        return (
          <span
            className={inputText.charAt(index) && charClass}
            key={`${char}-${index}}`}
          >
            {char}
          </span>
        );
      })}{" "}
    </em>
  );
};
