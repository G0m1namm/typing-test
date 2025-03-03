import { apiFetch, type ApiResponse } from "../../../lib/apiClient";
import type { ScoreEntry } from "../../../shared/store/types";

/**
 * Makes an API request to fetch the leaderboard.
 *
 * @returns {Promise<ApiResponse<ScoreEntry[]>>} A promise that resolves to an API response containing an array of ScoreEntry objects.
 */
export const getLeaderboard = (): Promise<ApiResponse<ScoreEntry[]>> => {
  return apiFetch<ScoreEntry[]>(
    `${process.env.REACT_APP_API_BASE_URL}/leaderboard?_sort=score`,
  );
};
