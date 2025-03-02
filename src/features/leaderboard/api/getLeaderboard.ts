import { apiFetch, type ApiResponse } from "../../../lib/apiClient"
import type { ScoreEntry } from "../../../shared/store/types"

export const getLeaderboard = (): Promise<ApiResponse<ScoreEntry[]>> => {
    return apiFetch<ScoreEntry[]>(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`)
}