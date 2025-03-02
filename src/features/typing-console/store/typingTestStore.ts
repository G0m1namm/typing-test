import { create } from "zustand"
import { subscribeWithSelector } from 'zustand/middleware'
import calculateScore, { calcAccuracyAndDeletions, calcWordsPerMinute } from "../lib/testCalculations"
import { createSelectors } from "../../../utils/createSelectors"
import type { TypingStore, TypingStoreState, LogData } from "./types"

const initialState: TypingStoreState = {
    enteredText: '',
    typeLogs: [],
    deletedErrors: 0,
    startTime: null,
    endTime: null,
    status: "IDLE",
    wpm: 0,
    accuracy: 0,
    score: 0,
}

const useTypingStoreBase = create<TypingStore>()(
    subscribeWithSelector((set, get) => ({
        ...initialState,
        setEnteredText: (text, initTimer) => {
            const { startTime, startTest } = get()
            if (!startTime) {
                startTest();
                initTimer?.();
            }
            set({ enteredText: text.trim() })
        },
        setTypeLogs: (newLog: LogData) => set((state) => ({ typeLogs: [...state.typeLogs, newLog] })),
        startTest: () => set({ startTime: Date.now(), endTime: null, status: "ACTIVE" }),
        endTest: (initialText: string) => {
            const endTime = Date.now();
            const { startTime, typeLogs } = get()

            const initialTime = startTime as number;
            const calculatedWPM = calcWordsPerMinute(initialText.length, endTime - initialTime)
            set({ wpm: calculatedWPM })

            const { finalAccuracy, deletedErrorCount } = calcAccuracyAndDeletions(typeLogs)
            const score = calculateScore(initialText.length, calculatedWPM, finalAccuracy, deletedErrorCount)
            set({
                endTime,
                status: "FINISHED",
                typeLogs: [],
                accuracy: finalAccuracy,
                deletedErrors: deletedErrorCount,
                score: +score.toFixed(2)
            })
        },
        resetTest: () => set(initialState)
    })))

export const useTypingStore = createSelectors(useTypingStoreBase)