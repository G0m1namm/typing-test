import { apiFetch, type ApiResponse } from "../../lib/apiClient";
import type { ScoreEntry } from "../store/types";

/**
 * createScore
 *
 * Sends a POST request to create a new score entry on the leaderboard.
 *
 * This function uses the apiFetch utility to send the provided score data 
 * to the backend API endpoint. The request URL is built using the 
 * REACT_APP_API_BASE_URL environment variable, ensuring the correct base for the
 * current environment. The submitted data is stringified to JSON format along 
 * with the proper Content-Type header.
 *
 * @param {Object} params - The parameters for creating a score.
 * @param {ScoreEntry} params.data - The score data to be sent to the API.
 * @returns {Promise<ApiResponse<ScoreEntry>>} A promise that resolves to an API response containing the created ScoreEntry.
 */
export const createScore = ({ data }: { data: ScoreEntry }): Promise<ApiResponse<ScoreEntry>> => {
    return apiFetch<ScoreEntry>(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}