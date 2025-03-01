import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";

export const TypingConsoleTitle: React.FC = () => {
  const status = useTypingStore.use.status();
  const accuracy = useTypingStore.use.accuracy();
  const wordsPerMinute = useTypingStore.use.wpm();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const correctWordsCount = currentWordIndex;

  return (
    <>
      <h1>
        {status === "FINISHED"
          ? `You typed ${correctWordsCount} words at ${wordsPerMinute} WPM. Accuracy: ${accuracy}%`
          : "Test Your Typing Speed, Scrub!"}
      </h1>
      <h3>
        {wordsPerMinute ? `Refresh to retake the test!` : `Type the following:`}
      </h3>
    </>
  );
};
