import { create } from "zustand"
import { createSelectors } from "../../../utils/createSelectors"
import { TextStore } from "./types"

const initialState = {
    initialText: 'This is the sentence to type',
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
    }
}))

export const useTextStore = createSelectors(useTextStoreBase)