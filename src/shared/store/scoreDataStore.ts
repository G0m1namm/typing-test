import { create } from "zustand"
import { createSelectors } from "../../utils/createSelectors"
import type { ScoreDataStore, ScoreDataStoreState } from "./types"
import { createScore } from "../api/createScore"


const initialState: ScoreDataStoreState = {
    isLoading: false,
    error: null,
    success: false
}

const useScoreDataBase = create<ScoreDataStore>()((set) => ({
    ...initialState,
    savesScore: async (results) => {
        set({isLoading: true, error: null})

        try {
            const result = await createScore({ data: results })

            if (result.error) {
                throw new Error(result.error)
            }
            set({ isLoading: false, success: true })
        } catch (error) {
            console.error("Failed to save score:", error);
            set({ 
              error: "Failed to save your score", 
                isLoading: false,
                success: false
            });
        }
    },
    resetStore: () => set(initialState)
}))

export const useScoreDataStore = createSelectors(useScoreDataBase)