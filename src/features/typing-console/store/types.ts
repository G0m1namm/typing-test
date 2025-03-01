export type LogData = {
    action: "typing" | "delete",
    character: string,
    word: string
}

export type TestStatus = "IDLE" | "ACTIVE" | "FINISHED"

export type TypingStoreState = {
    enteredText: string,
    typeLogs: LogData[],
    errors: number,
    startTime: number | null,
    endTime: number | null,
    status: TestStatus,
    wpm: number,
    accuracy: number
}

export type TypingStoreActions = {
    setEnteredText: (text: string) => void,
    setTypeLogs: (log: LogData) => void,
    startTest: () => void,
    endTest: (initialText: string) => void,
    resetTest: () => void,
}

export type TypingStore = TypingStoreState & TypingStoreActions

export type TextStoreState = {
    initialText: string,
    currentWordIndex: number,
}

export type TextStoreActions = {
    moveNextWord: () => void,
    getRemainingWords: () => string[],
}

export type TextStore = TextStoreState & TextStoreActions