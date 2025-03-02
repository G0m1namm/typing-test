import { http, HttpResponse } from 'msw';
import { ScoreEntry } from '../shared/store/types';

let leaderboard: ScoreEntry[] = [
  { id: 1, username: "Alice", score: 100, accuracy: 0.6, firstStrikeAccuracy: 0.5, wpm: 20, words: 50 },
  { id: 2, username: "Bob", score: 90, accuracy: 0.8, firstStrikeAccuracy: 0.78, wpm: 20, words: 300 },
];

export const handlers = [
  // POST /leaderboard to create a score entry
  http.post(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, async ({ request }) => {
    const data = await request.json() as Omit<ScoreEntry, 'id'>;
    const newEntry = { id: leaderboard.length + 1, ...data };
    leaderboard.push(newEntry);
    return HttpResponse.json(newEntry, { status: 201 });
  }),

  // GET /leaderboard to return the leaderboard (sorted when _sort=score is provided)
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
