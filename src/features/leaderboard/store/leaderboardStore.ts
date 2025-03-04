import { create } from "zustand";
import type { LeaderboardStore, LeaderboardStoreState } from "./types";
import { getLeaderboard } from "../api/getLeaderboard";
import { createSelectors } from "../../../utils/createSelectors";

const initialState: LeaderboardStoreState = {
  isLoading: false,
  error: null,
  leaderboard: [],
};

/**
 * Creates the base store using zustand.
 * The store provides state management for the leaderboard feature.
 */
const useLeaderboardBase = create<LeaderboardStore>()((set) => ({
  ...initialState,
  fetchLeaderboard: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await getLeaderboard();

      if (result.error) {
        throw new Error(result.error);
      }

      set({ leaderboard: result.data ?? [], isLoading: false, error: null });
    } catch (error) {
      set({
        error: "Failed to fetch the leaderboard",
        isLoading: false,
        leaderboard: [],
      });
    }
  },
}));

// Enhance the base store with selectors for easier state selection and export it.
export const useLeaderboardStore = createSelectors(useLeaderboardBase);
