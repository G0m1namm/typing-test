import { create } from "zustand"
import type { LeaderboardStore, LeaderboardStoreState } from "./types"
import { getLeaderboard } from "../api/getLeaderboard"
import { createSelectors } from "../../../utils/createSelectors"


const initialState: LeaderboardStoreState = {
    isLoading: false,
    error: null,
    leaderboard: []
}

const useLeaderboardBase = create<LeaderboardStore>()((set) => ({
    ...initialState,
    fetchLeaderboard: async () => {
        set({ isLoading: true, error: null })

        try {
            const result = await getLeaderboard()

            if (result.error) {
                throw new Error(result.error)
            }

            set({ leaderboard: result.data ?? [], isLoading: false, error: null })
        } catch (error) {
            set({
                error: "Failed to fetch the leaderboard",
                isLoading: false,
                leaderboard: []
            });
        }
    }
}))

export const useLeaderboardStore = createSelectors(useLeaderboardBase)