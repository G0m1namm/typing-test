import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'
import { calcAccuracyAndDeletions, calcWordsPerMinute } from "./lib/testCalculations"
import { createSelectors } from "../../utils/createSelectors"

export type LogData = {
    action: "typing" | "delete",
    character: string,
    word: string
}

type TypingStoreState = {
    initialText: string,
    enteredText: string,
    typeLogs: LogData[],
    errors: number,
    startTime: number | null,
    endTime: number | null,
    isActive: boolean,
    wpm: number,
    currentWordIndex: number,
    accuracy: number
}
type TypingStoreActions = {
    setEnteredText: (text: string) => void,
    setTypeLogs: (log: LogData) => void,
    startTest: () => void,
    endTest: () => void,
    resetTest: () => void,
    moveNextWord: () => void,
    getRemainingWords: () => string[],
}

type TypingStore = TypingStoreState & TypingStoreActions

const useTypingStoreBase = create<TypingStore>()(
    subscribeWithSelector((set, get) => ({
        initialText: 'This is the sentence to type',
        enteredText: '',
        typeLogs: [],
        errors: 0,
        startTime: null,
        endTime: null,
        isActive: true,
        wpm: 0,
        currentWordIndex: 0,
        accuracy: 0,
        setEnteredText: (text) => {
            const { startTime, startTest } = get()
            if (!startTime) {
                startTest();
            }
            set({ enteredText: text.trim() })
        },
        setTypeLogs: (newLog) => {
            const { typeLogs } = get()
            set({ typeLogs: [...typeLogs, newLog] })
        },
        startTest: () => set({ startTime: Date.now(), endTime: null }),
        endTest: () => {
            const endTime = Date.now();
            const { initialText, startTime, typeLogs } = get()

            if (startTime) {
                const calculatedWPM = calcWordsPerMinute(initialText.length, endTime - startTime)
                set({ wpm: calculatedWPM })
            }

            const calculations = calcAccuracyAndDeletions(typeLogs)
            set({ accuracy: calculations.finalAccuracy })
            set({ endTime, isActive: false, typeLogs: [] })
        },
        resetTest: () => set({ typeLogs: [], startTime: null, endTime: null, errors: 0, isActive: true }),
        moveNextWord: () => {
            set(state => ({ currentWordIndex: state.currentWordIndex + 1 }))
        },
        getRemainingWords: () => {
            const { initialText, currentWordIndex } = get()
            const words = initialText.trim().split(' ')
            return words.slice(currentWordIndex)
        }
    })))

export const useTypingStore = createSelectors(useTypingStoreBase)