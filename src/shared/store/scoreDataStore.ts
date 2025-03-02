import { create } from "zustand"
import { createSelectors } from "../../utils/createSelectors"
import type { ScoreDataStore, ScoreDataStoreState } from "./types"
import { createScore } from "../api/createScore"


const initialState: ScoreDataStoreState = {
    isLoading: false,
    error: null,
    success: false
}

/**
 * useScoreDataBase - Base store created using zustand.
 *
 * This store manages the state related to saving scores.
 * It includes actions to attempt saving a score entry via an API call and resetting the store.
 */
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

// Export the store enhanced with selectors to facilitate easier state access from components.
export const useScoreDataStore = createSelectors(useScoreDataBase)