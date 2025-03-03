import "@testing-library/jest-dom";
import { renderHook, screen } from '@testing-library/react';
import { Leaderboard } from '../components/Leaderboard';
import { useLeaderboardStore } from '../store/leaderboardStore';
import { ScoreEntry } from '../../../shared/store/types';
import { createMockScoreEntries } from '../../../testing/data-generators';
import { render } from '../../../testing/test-utils';
import { LeaderboardStore } from '../store/types';

const mockStore: LeaderboardStore = {
  leaderboard: [],
  isLoading: false,
  error: null,
  fetchLeaderboard: jest.fn(),
};

jest.mock('../store/leaderboardStore', () => ({
  useLeaderboardStore: {
    use: {
      leaderboard: () => mockStore.leaderboard,
      isLoading: () => mockStore.isLoading,
      error: () => mockStore.error,
      fetchLeaderboard: () => mockStore.fetchLeaderboard,
    }
  }
}));

const mockData: ScoreEntry[] = createMockScoreEntries(2);

describe('Leaderboard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset mock store to default values
    mockStore.leaderboard = [];
    mockStore.isLoading = false;
    mockStore.error = null;
    mockStore.fetchLeaderboard = jest.fn();
  });

  describe('Store Integration', () => {
    it('initializes with correct default values', () => {
      const { result } = renderHook(() => ({
        leaderboard: useLeaderboardStore.use.leaderboard(),
        isLoading: useLeaderboardStore.use.isLoading(),
        error: useLeaderboardStore.use.error()
      }));

      expect(result.current.leaderboard).toEqual([]);
      expect(result.current.isLoading).toBe(false);
      expect(result.current.error).toBeNull();
    });

    it('calls fetchLeaderboard on mount', () => {
      render(<Leaderboard />);
      expect(mockStore.fetchLeaderboard).toHaveBeenCalledTimes(1);
    });
  });

  describe('UI States', () => {
    it('shows loading spinner when fetching data', () => {
      mockStore.isLoading = true;
      render(<Leaderboard />);

      expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });
    
    it('shows error message when fetch fails', () => {
        mockStore.error = 'Failed to fetch';
        render(<Leaderboard />);
        expect(screen.getByText(`Error: Failed to fetch`)).toBeInTheDocument();
      });
  
      it('shows empty state message when no data', () => {
        render(<Leaderboard />);
        expect(screen.getByText('Empty Results')).toBeInTheDocument();
      });
  
      it('displays leaderboard data in correct order', () => {
        mockStore.leaderboard = mockData;
        render(<Leaderboard />);
        
        const rows = screen.getAllByTestId(/score-/i,{exact: false});
        expect(rows).toHaveLength(2);
        expect(rows[1]).toHaveTextContent("jhon_doe");
        expect(rows[1]).toHaveTextContent('0.5');
        expect(rows[1]).toHaveTextContent('10');
        expect(rows[1]).toHaveTextContent('100');
      });
  });
});
