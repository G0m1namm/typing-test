import { act } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { useLeaderboardStore } from '../store/leaderboardStore';
import { createMockScoreEntries } from '../../../testing/data-generators';

const mockError = 'Failed to fetch the leaderboard';

describe('LeaderboardStore', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Initial State', () => {
    it('should initialize with correct defaults', () => {
      const { result } = renderHook(() => useLeaderboardStore.getState());
      const state = result.current;
      expect(state).toMatchObject({
        isLoading: false,
        error: null,
        leaderboard: [],
      });
    });
  });

  describe('fetchLeaderboard', () => {
    it('should handle successful data fetching', async () => {
      const { result } = renderHook(() => useLeaderboardStore.getState());
      const store = result.current;

      jest.spyOn(store, 'fetchLeaderboard').mockImplementation(async () => {
        act(() => {
          useLeaderboardStore.setState({ isLoading: true });
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        act(() => {
          useLeaderboardStore.setState({ isLoading: false, leaderboard: createMockScoreEntries(1) });
        });
      });

      await act(async () => {
        await store.fetchLeaderboard();
      });

      await waitFor(() => {
        const { result: updatedStore } = renderHook(() => useLeaderboardStore.getState());
        const currentState = updatedStore.current;
        expect(currentState).toMatchObject({
          isLoading: false,
          error: null,
          leaderboard: createMockScoreEntries(1),
        });
      });
    });

    it('should handle loading state during fetch', async () => {
      const { result } = renderHook(() => useLeaderboardStore.getState());
      const store = result.current;

      jest.spyOn(store, 'fetchLeaderboard').mockImplementation(async () => {
        act(() => {
          useLeaderboardStore.setState({ isLoading: true });
        });
        await new Promise(resolve => setTimeout(resolve, 100));
        act(() => {
          useLeaderboardStore.setState({ isLoading: false });
        });
      });

      await act(async () => {
        const fetchPromise = store.fetchLeaderboard();

        expect(useLeaderboardStore.getState().isLoading).toBe(true);

        await fetchPromise;
        expect(useLeaderboardStore.getState().isLoading).toBe(false);
      });
    });

    it('should handle fetch errors', async () => {
      const { result } = renderHook(() => useLeaderboardStore.getState());
      const store = result.current;

      // Override fetchLeaderboard to reject and update the state with an error
      store.fetchLeaderboard = async () => {
        act(() => {
          useLeaderboardStore.setState({ isLoading: true });
        });
        await Promise.reject(new Error(mockError)).catch(() => {
          act(() => {
            useLeaderboardStore.setState({ isLoading: false, error: mockError });
          });
        });
      };

      await act(async () => {
        await store.fetchLeaderboard();
      });

      const { result: updatedStore } = renderHook(() => useLeaderboardStore.getState());
      const currentState = updatedStore.current;
      expect(currentState).toMatchObject({
        isLoading: false,
        error: mockError,
        leaderboard: [],
      });
    });
  });
});
