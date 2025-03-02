interface TypedWordProps {
  word: string;
  correctCharClass?: string;
  incorrectCharClass?: string;
  inputText: string;
}

/**
 * TypedWord Component
 *
 * Renders a word character by character, highlighting each character based on whether
 * it was typed correctly or incorrectly. Each character is wrapped in a span with
 * appropriate styling classes.
 *
 * @component
 * @example
 * ```tsx
 * <TypedWord
 *   word="hello"
 *   inputText="hel"
 *   correctCharClass="green"
 *   incorrectCharClass="red"
 * />
 * ```
 */
export const TypedWord = ({
  word,
  inputText,
  correctCharClass = "correct",
  incorrectCharClass = "incorrect",
}: TypedWordProps): JSX.Element => {
  if (!word) return <></>;

  return (
    <em className="current-word">
      {word.split("").map((char, index) => {
        // Compare the input character with the target character
        // Returns: -1 if input < target, 0 if equal, 1 if input > target
        const comparison = inputText.charAt(index).localeCompare(char);

        // Construct the class name based on whether the character was typed correctly
        const charClass = `typed ${
          comparison === 0 ? correctCharClass : incorrectCharClass
        }`;

        return (
          <span
            // Only apply the class if there is an input character at this position
            className={inputText.charAt(index) && charClass}
            key={`${char}-${index}`}
          >
            {char}
          </span>
        );
      })}{" "}
    </em>
  );
};
