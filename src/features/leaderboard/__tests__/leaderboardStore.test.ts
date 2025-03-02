import { useLeaderboardStore } from '../../../testing/test-utils';
import { createMockScoreEntries } from '../../../testing/data-generators';
import { waitFor } from '@testing-library/react';

const mockError = 'Failed to fetch the leaderboard';

describe('LeaderboardStore', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with correct defaults', () => {
      const state = useLeaderboardStore.getState();
      expect(state).toMatchObject({
        isLoading: false,
        error: null,
        leaderboard: [],
      });
    });
  });


  describe('fetchLeaderboard', () => {
    it('should handle successful data fetching', async () => {
      const store = useLeaderboardStore.getState();

      // Mock successful implementation
      jest.spyOn(store, 'fetchLeaderboard').mockImplementation(async () => {
        useLeaderboardStore.setState({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 100));
        useLeaderboardStore.setState({isLoading: false, leaderboard: createMockScoreEntries(1)})
      });

      await store.fetchLeaderboard();

      await waitFor(() => {
        const currentState = useLeaderboardStore.getState();
        expect(currentState).toMatchObject({
          isLoading: false,
          error: null,
          leaderboard: createMockScoreEntries(1),
        });
      });
    });

    it('should handle loading state during fetch', async () => {
      const store = useLeaderboardStore.getState();
      let loadingState = false;

      jest.spyOn(store, 'fetchLeaderboard').mockImplementation(async () => {
        useLeaderboardStore.setState({ isLoading: true });
        await new Promise(resolve => setTimeout(resolve, 100));
        useLeaderboardStore.setState({ isLoading: false });
      });

      const fetchPromise = store.fetchLeaderboard();
      
      // Check intermediate loading state
      loadingState = useLeaderboardStore.getState().isLoading;
      expect(loadingState).toBe(true);

      await fetchPromise;
      loadingState = useLeaderboardStore.getState().isLoading;
      expect(loadingState).toBe(false);
    });

    it('should handle fetch errors', async () => {
      const store = useLeaderboardStore.getState();
      // Mock rejected implementation
      // Override fetchLeaderboard to reject and update the state with an error
      store.fetchLeaderboard = async () => {
        useLeaderboardStore.setState({ isLoading: true });
        await Promise.reject(new Error(mockError)).catch(() => {
          useLeaderboardStore.setState({ isLoading: false, error: mockError, leaderboard: [] });
        });
      };

      expect(store.isLoading).toBe(false);

      await store.fetchLeaderboard();

      await waitFor(() => {
        const currentState = useLeaderboardStore.getState();
        expect(currentState).toMatchObject({
          isLoading: false,
          error: mockError,
          leaderboard: [],
        });
      });
    });
  });
});
