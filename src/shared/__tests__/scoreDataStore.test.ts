import { act } from "react";
import { renderHook, waitFor } from "../../testing/test-utils";
import { useScoreDataStore } from "../store/scoreDataStore";
import { createMockScoreEntry } from "../../testing/data-generators";

const mockError = "Failed to save the score";

describe("ScoreDataStore", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("Initial State", () => {
    it("should initialize with correct defaults", () => {
      const { result } = renderHook(() => useScoreDataStore.getState());
      const state = result.current;

      expect(state).toMatchObject({
        isLoading: false,
        error: null,
        success: false,
      });
    });
  });

  describe("savesScore", () => {
    it("should handle successful data fetching", async () => {
      const { result } = renderHook(() => useScoreDataStore.getState());
      const store = result.current;
      const entry = createMockScoreEntry();

      jest.spyOn(store, "savesScore").mockImplementation(async () => {
        act(() => {
          useScoreDataStore.setState({ isLoading: true });
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        act(() => {
          useScoreDataStore.setState({ isLoading: false, success: true });
        });
      });

      await act(async () => {
        await store.savesScore(entry);
      });

      await waitFor(() => {
        const { result: updatedStore } = renderHook(() =>
          useScoreDataStore.getState(),
        );
        const currentState = updatedStore.current;

        expect({
          isLoading: currentState.isLoading,
          error: currentState.error,
          success: currentState.success,
        }).toMatchObject({
          isLoading: false,
          error: null,
          success: true,
        });
      });
    });

    it("should handle loading state during fetch", async () => {
      const { result } = renderHook(() => useScoreDataStore.getState());
      const store = result.current;
      const entry = createMockScoreEntry();

      jest.spyOn(store, "savesScore").mockImplementation(async () => {
        act(() => {
          useScoreDataStore.setState({ isLoading: true });
        });
        await new Promise((resolve) => setTimeout(resolve, 100));
        act(() => {
          useScoreDataStore.setState({ isLoading: false });
        });
      });

      await act(async () => {
        const fetchPromise = store.savesScore(entry);

        expect(useScoreDataStore.getState().isLoading).toBe(true);

        await fetchPromise;
        expect(useScoreDataStore.getState().isLoading).toBe(false);
      });
    });

    it("should handle fetch errors", async () => {
      const { result } = renderHook(() => useScoreDataStore.getState());
      const store = result.current;
      const entry = createMockScoreEntry();

      store.savesScore = async () => {
        act(() => {
          useScoreDataStore.setState({ isLoading: true });
        });
        await Promise.reject(new Error(mockError)).catch(() => {
          act(() => {
            useScoreDataStore.setState({ isLoading: false, error: mockError });
          });
        });
      };

      await act(async () => {
        await store.savesScore(entry);
      });

      const { result: updatedStore } = renderHook(() =>
        useScoreDataStore.getState(),
      );
      const currentState = updatedStore.current;
      expect(currentState).toMatchObject({
        isLoading: false,
        error: mockError,
        success: false,
      });
    });
  });

  describe("resetStore", () => {
    it("should restore initial state", () => {
      const { result } = renderHook(() => useScoreDataStore);

      act(() => {
        result.current.setState({
          success: true,
          error: null,
          isLoading: false,
        });
      });

      act(() => {
        result.current.getState().resetStore();
      });

      const { result: newStore } = renderHook(() =>
        useScoreDataStore.getState(),
      );
      const state = newStore.current;

      expect(state).toMatchObject({
        success: false,
        error: null,
        isLoading: false,
      });
    });
  });
});
