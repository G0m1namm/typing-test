import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'
import { calcAccuracyAndDeletions, calcWordsPerMinute } from "../lib/testCalculations"
import { createSelectors } from "../../../utils/createSelectors"
import { TypingStore, TypingStoreState } from "./types"

const initialState: TypingStoreState = {
    initialText: 'This is the sentence to type',
    enteredText: '',
    typeLogs: [],
    errors: 0,
    startTime: null,
    endTime: null,
    status: "IDLE",
    wpm: 0,
    currentWordIndex: 0,
    accuracy: 0,
}

const useTypingStoreBase = create<TypingStore>()(
    subscribeWithSelector((set, get) => ({
        ...initialState,
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
                set({ wpm: calculatedWPM ?? 0 })
            }

            const { finalAccuracy, deletedErrorCount } = calcAccuracyAndDeletions(typeLogs)
            set({
                endTime,
                status: "FINISHED",
                typeLogs: [],
                accuracy: finalAccuracy,
                errors: deletedErrorCount
            })
        },
        resetTest: () => set(initialState),
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