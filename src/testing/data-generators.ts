import { StateCreator } from 'zustand';
import type { ScoreDataStore, ScoreEntry } from '../shared/store/types';
import type { TextStore, TypingStore, LogData } from '../features/typing-console/store/types';
import type { LeaderboardStore } from '../features/leaderboard/store/types';

export const createMockScoreEntry = (): ScoreEntry => ({
  id: 2,
  score: 100,
  accuracy: 0.5,
  firstStrikeAccuracy: 0.5,
  username: 'jhon_doe',
  words: 10,
  wpm: 10,
});

export const createMockScoreEntries = (count: number): ScoreEntry[] => {
  return Array.from({ length: count }, () => createMockScoreEntry());
};

export const createMockTypeLog = (logData: Partial<LogData> = {}): LogData => {
  const defaultLog: LogData = {
    action: 'typing',
    character: 'a',
    word: 'example',
  };

  return { ...defaultLog, ...logData };
};

export const createMockTypeLogs = (count: number, logData: Partial<LogData> = {}): LogData[] => {
  return Array.from({ length: count }, () => createMockTypeLog(logData));
};

// Mock data generator for TypingStore
export const createMockTypingStore: StateCreator<TypingStore> = (set) => ({
  enteredText: '',
  typeLogs: [],
  deletedErrors: 0,
  startTime: null,
  endTime: null,
  status: "IDLE",
  wpm: 0,
  accuracy: 0,
  score: 0,
  setEnteredText: (text) => set({ enteredText: text }),
  setTypeLogs: (newLog) => set((state) => ({ typeLogs: [...state.typeLogs, newLog] })),
  startTest: () => set({ startTime: Date.now(), endTime: null, status: "ACTIVE" }),
  endTest: () => set({ endTime: Date.now(), status: "FINISHED" }),
  resetTest: () => set({
    enteredText: '',
    typeLogs: [],
    deletedErrors: 0,
    startTime: null,
    endTime: null,
    status: "IDLE",
    wpm: 0,
    accuracy: 0,
    score: 0,
  }),
});

// Mock data generator for ScoreDataStore
export const createMockScoreDataStore: StateCreator<ScoreDataStore> = (set) => ({
  isLoading: false,
  error: null,
  savesScore: async () => {
    set({ isLoading: true });
    set({ isLoading: false });
  },
});

// Mock data generator for TextStore
export const createMockTextStore: StateCreator<TextStore> = (set) => ({
  initialText: 'example mock data',
  currentWordIndex: 0,
  moveNextWord: () => set((state) => ({ currentWordIndex: state.currentWordIndex + 1 })),
  getRemainingWords: () => ['example', 'mock', 'data'],
  resetStore: () => set({initialText: 'example mock data', currentWordIndex: 0, })
});

// Mock data generator for LeaderboardStore
export const createMockLeaderboardStore: StateCreator<LeaderboardStore> = (set) => ({
  isLoading: false,
  error: null,
  leaderboard: [],
  fetchLeaderboard: async () => {
    set({ isLoading: true });
    await new Promise(resolve => setTimeout(resolve, 100));
    set({ isLoading: false, leaderboard: createMockScoreEntries(2) });
  },
});
