import { create } from "zustand"
import { createSelectors } from "../../../utils/createSelectors"
import type { TextStore, TextStoreState } from "./types"

const initialState: TextStoreState = {
    initialText: 'Based on my analysis, a model of generative change emerged.',
    currentWordIndex: 0,
}

/**
 * useTextStoreBase - Base store created using zustand.
 *
 * This store manages the text-related state for the typing test, and includes actions to update this state:
 * 
 * Actions:
 *  - moveNextWord: Advances the current word index, moving to the next word.
 *  - getRemainingWords: Returns the words that have not been typed yet.
 *  - resetStore: Resets the current word index back to the start (0), effectively restarting the test.
 */
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

// Enhancing the base store with selectors for improved state access and exporting the final text store.
export const useTextStore = createSelectors(useTextStoreBase)