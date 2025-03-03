import type { ScoreEntry } from "../../../shared/store/types";

export type LeaderboardStoreState = {
  isLoading: boolean;
  error: string | null;
  leaderboard: ScoreEntry[];
};

export type LeaderboardStoreActions = {
  fetchLeaderboard: () => Promise<void>;
};

export type LeaderboardStore = LeaderboardStoreState & LeaderboardStoreActions;
