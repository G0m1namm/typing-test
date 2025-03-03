// Importing the LogData type that defines the structure for each log entry.
import type { LogData } from "../store/types";

/**
 * Calculates the words per minute (WPM).
 *
 * This function computes words per minute based on the total characters typed.
 * It assumes that one word consists of roughly 5 characters.
 *
 * @param charsTyped - The total number of characters typed.
 * @param millis - The elapsed time in milliseconds.
 * @returns The calculated words per minute, rounded down to the nearest whole number.
 */
export const calcWordsPerMinute = (
  charsTyped: number,
  millis: number,
): number => Math.floor(charsTyped / 5 / (millis / 60000));

/**
 * Calculates the final typing accuracy and count of deleted errors.
 *
 * This function processes an array of log entries, where each log represents a typing or delete action.
 *
 * - For a "typing" action:
 *   1. It checks if the typed character matches the expected character for the current word.
 *   2. It maintains a counter for all characters typed and correctly typed ones.
 *   3. It tracks correctness in an errorStatus array.
 *
 * - For a "delete" action:
 *   1. It removes the last character of the current typed word.
 *   2. It checks if the character being deleted was previously marked as an error.
 *   3. If an error was deleted, it increments the deleted error count.
 *
 * Finally, the function computes the final accuracy as a percentage of correct characters over the total.
 *
 * @param logs - An array of LogData entries representing user actions during the typing test.
 * @returns An object containing:
 *   - finalAccuracy: the overall typing accuracy percentage.
 *   - deletedErrorCount: the number of typing errors that were corrected via deletion.
 */
export const calcAccuracyAndDeletions = (
  logs: LogData[],
): {
  finalAccuracy: number;
  deletedErrorCount: number;
} => {
  let correctChars: number = 0; // Counter for correctly typed characters.
  let totalChars: number = 0; // Counter for total typed characters.
  let deletedErrorCount: number = 0; // Counter for errors that were corrected via deletion.
  let currentWord: string = ""; // The word that is currently being tracked.
  let currentTypedWord: string = ""; // The current string of characters typed for the active word.
  let errorStatus: boolean[] = []; // Tracks error status for each typed character: true for error, false for correct.

  // Process each log entry to determine accuracy and count deleted errors.
  for (const log of logs) {
    if (log.action === "typing") {
      // Reset the currentTypedWord when a new word is encountered.
      if (log.word !== currentWord) {
        currentWord = log.word;
        currentTypedWord = "";
      }

      totalChars++; // Increment total characters count.
      currentTypedWord += log.character; // Append the new character to the current word.

      // Determine the expected character at the current position in currentWord.
      const expectedChar = currentWord[currentTypedWord.length - 1];
      const isCorrect = log.character === expectedChar;

      // Record whether the character typed was in error (true if error, false if correct).
      errorStatus.push(!isCorrect);

      // Increment correctly typed characters if the current character is correct.
      if (isCorrect) {
        correctChars++;
      }
    } else if (log.action === "delete") {
      // For a delete action, remove the last character only if there is one.
      if (currentTypedWord.length > 0) {
        currentTypedWord = currentTypedWord.slice(0, -1);
        // If the deleted character was previously marked as an error, count it.
        if (errorStatus.length > 0 && errorStatus.pop() === true) {
          deletedErrorCount++;
        }
      }
    }
  }

  // Calculate final accuracy as a percentage. If no characters were typed, assume 100% accuracy.
  const finalAccuracy =
    totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 100;

  return {
    finalAccuracy,
    deletedErrorCount,
  };
};

/**
 * Calculates the final score for the typing test.
 *
 * The score is computed using the formula:
 *   (words * wpm * accuracy) - deletes
 *
 * where:
 *   - words: Total words typed during the test.
 *   - wpm: Words per minute rate.
 *   - accuracy: Final typing accuracy percentage (after corrections).
 *   - deletes: Total deletions that act as a penalty.
 *
 * @param words - The number of words typed during the test.
 * @param wpm - The words per minute achieved.
 * @param accuracy - The final accuracy percentage after correcting errors.
 * @param deletes - The number of deletions made which are subtracted as a penalty.
 * @returns The calculated score as a numeric value.
 */
export const calculateScore = (
  words: number, // Total number of words typed.
  wpm: number, // Words per minute (speed).
  accuracy: number, // Accuracy percentage after corrections.
  deletes: number, // Number of corrections (deletions) made.
) => {
  let calculatedScore = words * wpm * accuracy - deletes;
  return calculatedScore;
};

export default calculateScore;
