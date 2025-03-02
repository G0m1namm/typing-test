import { rest } from 'msw';

let leaderboard = [
  { id: 1, name: 'Alice', score: 100 },
  { id: 2, name: 'Bob', score: 90 },
  // ...initial data if needed...
];

export const handlers = [
  // New: POST /leaderboard to create a score entry
  rest.post(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, async (req, res, ctx) => {
    const data = await req.json();
    const newEntry = { id: leaderboard.length + 1, ...data };
    leaderboard.push(newEntry);
    return res(
      ctx.status(201),
      ctx.json(newEntry)
    );
  }),

  // New: GET /leaderboard to return the leaderboard (sorted when _sort=score is provided)
  rest.get(`${process.env.REACT_APP_API_BASE_URL}/leaderboard`, (req, res, ctx) => {
    const sort = req.url.searchParams.get('_sort');
    let data = [...leaderboard];
    if (sort === 'score') {
      data.sort((a, b) => b.score - a.score);
    }
    return res(
      ctx.status(200),
      ctx.json(data)
    );
  }),
];
