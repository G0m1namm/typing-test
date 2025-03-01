import { LogData } from "../store/types";

export const calcWordsPerMinute = (charsTyped: number, millis: number): number =>
    Math.floor(charsTyped / 5 / (millis / 60000));

export const calcAccuracyAndDeletions = (initialText: string, logs: LogData[]) => {
    let currentTypedWord = "";
    let deletedErrorCount = 0;
    let errorStatus = [];

    for (const log of logs) {
        if (log.action === "typing") {
            currentTypedWord += log.character
            const expectedChar = log.word[currentTypedWord.length - 1]

            errorStatus.push(Boolean(log.character !== expectedChar));
        }
        if (log.action === "delete") {
            if (currentTypedWord.length > 0) {
                currentTypedWord = currentTypedWord.slice(0, -1);

                if (errorStatus.length > 0 && errorStatus.pop() === true) {
                    deletedErrorCount++
                }
            }
        }
    }

    const finalAccuracy = ((currentTypedWord.length) / initialText.length) * 100;

    return {
        finalAccuracy,
        deletedErrorCount
    }
}

export const calculateScore = (
    words: number, // How many words the user types for the duration of the test
    wpm: number, // How many words per minute the user types for the duration of the test
    accuracy: number, // How accurate the user is after corrections are taken into account (if the user makes 10 typing errors, but corrects all the errors by deleting and retyping, the accuracy should be 100%)
    deletes: number // How accurate the user is before corrections are taken into account
  ) => {
    let calculatedScore = 0;
    calculatedScore = ( words * wpm * accuracy ) - deletes;
    return calculatedScore;
  };
  
  export default calculateScore;