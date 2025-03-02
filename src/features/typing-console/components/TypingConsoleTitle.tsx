import { useTypingStore } from "../store/typingTestStore";
import { useTextStore } from "../store/textStore";
import { useState } from "react";
import { useScoreDataStore } from "../../../shared/store/scoreDataStore";
import type { ScoreEntry } from "../../../shared/store/types";
import { Fade, Heading } from "@chakra-ui/react";

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
      
      <Fade in={status === "FINISHED"} unmountOnExit>
        <input
          type="text"
          name="usename"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="button" onClick={onSaveScoreHandler}>
          Save
        </button>
      </Fade>
      <Heading as="h4" fontSize="lg">
        {status === "FINISHED"
          ? "Refresh to retake the test!"
          : "Type the following:"}
      </Heading>
    </>
  );
};
