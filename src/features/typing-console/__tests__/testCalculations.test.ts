import { calculateScore, calcAccuracyAndDeletions, calcWordsPerMinute } from "../lib/testCalculations";
import { LogData } from "../store/types";

describe('Test Calculation Helpers', () => {

    it("Test calcWordsPerMinute", () => {
        const charsTyped = 110;
        const millis = 1000 * 60 * 2; // 2min
        const score = calcWordsPerMinute(charsTyped, millis);
        const expectedScore = Math.floor(charsTyped / 5 / (millis / 60000))

        expect(score).toBe(expectedScore);
    });

    it("Test calcAccuracyAndDeletions", () => {
        const initialText = "do it";
        const logs: LogData[] = [
            { action: "typing", character: "d", word: "do" },
            { action: "typing", character: "o", word: "do" },
            { action: "typing", character: "i", word: "it" },
            { action: "typing", character: "t", word: "it" },
            { action: "delete", character: "", word: "it" },
            { action: "typing", character: "t", word: "it" }
        ]
        const accuracyAndDeletions = calcAccuracyAndDeletions(logs)
        const expectedAccuracyAndDeletions = {
            finalAccuracy: 100,
            deletedErrorCount: 0
        }
        expect(accuracyAndDeletions).toEqual(expectedAccuracyAndDeletions)
    });

    it("Test calculateScore", () => {
        const words = 3;
        const wpm = 15;
        const accuracy = 100;
        const deletions = 90;
        const score = calculateScore(words, wpm, accuracy, deletions);
        const expectedScore = (words * wpm * accuracy) - deletions;

        expect(score).toBe(expectedScore);
    });
})