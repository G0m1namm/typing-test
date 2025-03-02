import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { useState } from "react";
import { useScoreDataStore } from "../../../shared/store/scoreDataStore";
import { ScoreEntry } from "../../../shared/store/types";

export const TypingConsoleTitle: React.FC = () => {
  const status = useTypingStore.use.status();
  const accuracy = useTypingStore.use.accuracy();
  const score = useTypingStore.use.score();
  const saveScore = useScoreDataStore.use.savesScore();
  const wordsPerMinute = useTypingStore.use.wpm();
  const currentWordIndex = useTextStore.use.currentWordIndex();
  const correctWordsCount = currentWordIndex;
  const [username, setUsername] = useState("");
  const defaultUsername = `Anonym${Date.now()}`;

  const onSaveScoreHandler = async () => {
    const data: ScoreEntry = {
      id: Date.now(),
      accuracy,
      score,
      username: username || defaultUsername,
      firstStrikeAccuracy: accuracy,
      wpm: wordsPerMinute,
      words: correctWordsCount,
    };

    await saveScore(data);
  };
  return (
    <>
      <h1>
        {status === "FINISHED"
          ? `You typed ${correctWordsCount} words at ${wordsPerMinute} WPM. Accuracy: ${accuracy.toFixed(
              2
            )}%`
          : "Test Your Typing Speed, Scrub!"}
      </h1>
      {status === "FINISHED" && (
        <div>
          <input
            type="text"
            name="usename"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={onSaveScoreHandler}>Save</button>
        </div>
      )}
      <h3>
        {status === "FINISHED"
          ? `Refresh to retake the test!`
          : `Type the following:`}
      </h3>
    </>
  );
};
