import type { ScoreEntry } from '../shared/store/types';

/**
 * createMockScoreEntry
 *
 * Generates a single mock score entry.
 * This mock is used primarily for testing purposes, such as when testing API calls that
 * save a score, or for populating the leaderboard with sample data.
 *
 * @returns {ScoreEntry} A mock score entry with preset values.
 */
export const createMockScoreEntry = (): ScoreEntry => ({
  score: 100,
  accuracy: 0.5,
  firstStrikeAccuracy: 0.5,
  username: 'jhon_doe',
  words: 10,
  wpm: 10,
});

/**
 * createMockScoreEntries
 *
 * Generates an array of mock score entries.
 * This function creates the specified number of score entries by repeatedly
 * calling createMockScoreEntry and assigning a fixed id for each entry.
 *
 * @param count - The number of mock score entries to generate.
 * @returns {ScoreEntry[]} An array of mock score entries.
 */
export const createMockScoreEntries = (count: number): ScoreEntry[] => {
  return Array.from({ length: count }, () => ({ ...createMockScoreEntry(), id: 2 }));
};