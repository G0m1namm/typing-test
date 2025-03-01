export type LogData = {
    action: "typing" | "delete",
    character: string,
    word: string
}

export type TestStatus = "IDLE" | "ACTIVE" | "FINISHED"

export type TypingStoreState = {
    initialText: string,
    enteredText: string,
    typeLogs: LogData[],
    errors: number,
    startTime: number | null,
    endTime: number | null,
    status: TestStatus,
    wpm: number,
    currentWordIndex: number,
    accuracy: number
}

export type TypingStoreActions = {
    setEnteredText: (text: string) => void,
    setTypeLogs: (log: LogData) => void,
    startTest: () => void,
    endTest: () => void,
    resetTest: () => void,
    moveNextWord: () => void,
    getRemainingWords: () => string[],
}

export type TypingStore = TypingStoreState & TypingStoreActions