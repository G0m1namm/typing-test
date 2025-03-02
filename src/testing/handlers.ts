import { http, HttpResponse } from 'msw';
import { ScoreEntry } from '../shared/store/types';

let leaderboard: ScoreEntry[] = [
  { id: 1, username: "Alice", score: 100, accuracy: 0.6, firstStrikeAccuracy: 0.5, wpm: 20, words: 50 },
  { id: 2, username: "Bob", score: 90, accuracy: 0.8, firstStrikeAccuracy: 0.78, wpm: 20, words: 300 },
];

/**
 * handlers - An array of request handlers for MSW (Mock Service Worker).
 *
 * These handlers intercept HTTP requests during testing and respond with mock data.
 */
export const handlers = [
  /**
   * POST /leaderboard
   *
   * Handler to create a new score entry:
   * - Reads the JSON body from the request.
   * - Generates a new id based on the current number of leaderboard entries.
   * - Merges the new id with the incoming data to form a complete score entry.
   * - Appends the new entry to the leaderboard.
   * - Returns the newly created entry with a 201 status.
   */
  http.post(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, async ({ request }) => {
    const data = await request.json() as Omit<ScoreEntry, 'id'>;
    const newEntry = { id: leaderboard.length + 1, ...data };
    leaderboard.push(newEntry);
    return HttpResponse.json(newEntry, { status: 201 });
  }),

  /**
   * GET /leaderboard
   *
   * Handler to retrieve the leaderboard:
   * - Optionally sorts the leaderboard based on a query parameter "_sort".
   * - If _sort is "score", the leaderboard is sorted in descending order by score.
   * - Returns the processed leaderboard with a 200 status.
   */
  http.get(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, ({ request }) => {
    const url = new URL(request.url);
    const sort = url.searchParams.get("_sort");
    let data = [...leaderboard];
    if (sort === "score") {
      data.sort((a, b) => b.score - a.score);
    }
    return HttpResponse.json(data, { status: 200 });
  }),
];
