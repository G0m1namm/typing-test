import { create } from "zustand"
import { createSelectors } from "../../utils/createSelectors"
import { ScoreDataStore, ScoreDataStoreState } from "./types"
import { createScore } from "../api/createScore"


const initialState: ScoreDataStoreState = {
    isLoading: false,
    error: null
}

const useScoreDataBase = create<ScoreDataStore>()((set) => ({
    ...initialState,
    savesScore: async (results) => {
        set({isLoading: true, error: null})

        try {
            await createScore({data: results})
            set({isLoading: false})
        } catch (error) {
            console.error("Failed to save score:", error);
            set({ 
              error: "Failed to save your score", 
              isLoading: false 
            });
        }
    }
}))

export const useScoreDataStore = createSelectors(useScoreDataBase)