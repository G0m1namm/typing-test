export interface LogData {
  action: "typing" | "delete";
  character: string;
  word: string;
}

export type TestStatus = "IDLE" | "RUNNING" | "FINISHED";

export type TypingStoreState = {
  enteredText: string;
  typeLogs: LogData[];
  deletedErrors: number;
  startTime: number | null;
  endTime: number | null;
  status: TestStatus;
  wpm: number;
  accuracy: number;
  score: number;
};

export type TypingStoreActions = {
  setEnteredText: (text: string, callback?: () => void) => void;
  setTypeLogs: (log: LogData) => void;
  startTest: () => void;
  endTest: (initialText: string) => void;
  resetTest: (initialText: string) => void;
};

export type TypingStore = TypingStoreState & TypingStoreActions;

export type TextStoreState = {
  initialText: string;
  currentWordIndex: number;
};

export type TextStoreActions = {
  moveNextWord: () => void;
  getRemainingWords: () => string[];
  resetStore: () => void;
};

export type TextStore = TextStoreState & TextStoreActions;
