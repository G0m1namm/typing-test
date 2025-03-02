import { apiFetch, type ApiResponse } from "../../lib/apiClient";
import type { ScoreEntry } from "../store/types";

export const createScore = ({ data }: { data: ScoreEntry }): Promise<ApiResponse<ScoreEntry>> => {
    return apiFetch<ScoreEntry>(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}