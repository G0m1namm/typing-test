interface TypedWordProps {
  word: string;
  correctCharClass?: string;
  incorrectCharClass?: string;
  inputText: string;
}

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
        const comparison = inputText.charAt(index).localeCompare(char);

        const charClass = `typed ${
          comparison === 0 ? correctCharClass : incorrectCharClass
        }`;

        return (
          <span
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
