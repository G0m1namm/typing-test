import { create } from "zustand"
import { createSelectors } from "../../../utils/createSelectors"
import type { TextStore, TextStoreState } from "./types"

const initialState: TextStoreState = {
    initialText: 'Based on my analysis, a model of generative change emerged.',
    currentWordIndex: 0,
}

const useTextStoreBase = create<TextStore>()((set, get) => ({
    ...initialState,
    moveNextWord: () => {
        set(state => ({ currentWordIndex: state.currentWordIndex + 1 }))
    },
    getRemainingWords: () => {
        const { initialText, currentWordIndex } = get()
        const words = initialText.trim().split(' ')
        return words.slice(currentWordIndex)
    },
    resetStore: () => set({ currentWordIndex: 0 })
}))

export const useTextStore = createSelectors(useTextStoreBase)