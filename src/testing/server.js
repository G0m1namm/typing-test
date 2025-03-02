import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// Setup the MSW server with the defined handlers
export const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => {
  // Mock Zustand stores here using jest.mock
  jest.mock('../shared/store/scoreDataStore', () => ({
    useScoreDataStore: () => ({
      isLoading: false,
      error: null,
      savesScore: jest.fn(),
    }),
  }));

  jest.mock('../features/typing-console/store/typingTestStore', () => ({
    useTypingStore: () => ({
      enteredText: '',
      typeLogs: [],
      deletedErrors: 0,
      startTime: null,
      endTime: null,
      status: "IDLE",
      wpm: 0,
      accuracy: 0,
      score: 0,
      setEnteredText: jest.fn(),
      setTypeLogs: jest.fn(),
      startTest: jest.fn(),
      endTest: jest.fn(),
      resetTest: jest.fn()
    }),
  }));

  jest.mock('../features/typing-console/store/textStore', () => ({
    useTextStore: () => ({
      initialText: 'Mock text',
      currentWordIndex: 0,
      moveNextWord: jest.fn(),
      getRemainingWords: jest.fn()
    }),
  }));

  jest.mock('../features/leaderboard/store/leaderboardStore', () => ({
    useLeaderboardStore: () => ({
      isLoading: false,
      error: null,
      leaderboard: [],
      fetchLeaderboard: jest.fn()
    }),
  }));

  server.listen();
});

// Reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished
afterAll(() => server.close());
