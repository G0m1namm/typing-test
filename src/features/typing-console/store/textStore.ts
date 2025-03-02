import { create } from "zustand"
import { createSelectors } from "../../../utils/createSelectors"
import type { TextStore, TextStoreState } from "./types"

const initialState: TextStoreState = {
    initialText: 'The model depicts the processes of cognitive change—metacognitive awareness, ideological becoming, internalization, and generativity—that take place. As teachers (and their students) move toward generativity, their internal changes are reflected in their discourses and practices. Phase 1 emphasizes the use of reflection through the narrativization of experiences that motivate increased metacognitive awareness concerning the role of literacies in teachers’ lives and in the lives of others. Engagement with this reflection results in an increased sense of personal awakening.',
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
    resetStore: () => set(initialState)
}))

export const useTextStore = createSelectors(useTextStoreBase)