import type { ScoreEntry } from '../shared/store/types';

// Mock single score entry for savesScore in ScoreDataStore
export const createMockScoreEntry = (): ScoreEntry => ({
  score: 100,
  accuracy: 0.5,
  firstStrikeAccuracy: 0.5,
  username: 'jhon_doe',
  words: 10,
  wpm: 10,
});

export const createMockScoreEntries = (count: number): ScoreEntry[] => {
  return Array.from({ length: count }, () => ({ ...createMockScoreEntry(), id: 2 }));
};