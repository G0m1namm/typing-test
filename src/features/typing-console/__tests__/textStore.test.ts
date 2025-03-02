import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useTextStore } from "../store/textStore";

describe('TextStore', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useTextStore);
    result.current.getState().resetStore()
    result.current.setState({ initialText: "example mock data" })
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const { result } = renderHook(() => useTextStore);
      const state = result.current.getState();
      
      const expectedState = {
        initialText: "example mock data",
        currentWordIndex: 0
      };

      expect(state).toMatchObject(expectedState);
    });
  });

  describe('Actions', () => {
    describe('moveNextWord', () => {
      it('should increment by 1 the currentWordIndex value', () => {
        const { result } = renderHook(() => useTextStore.getState());
        const currentIndex = result.current.currentWordIndex;

        expect(currentIndex).toBe(0);

        act(() => {
          result.current.moveNextWord();
        });

        const { result: newStore } = renderHook(() => useTextStore.getState());
        const newIndex = newStore.current.currentWordIndex;
        expect(newIndex).toBe(1);
      });
    });

    describe('getRemainingWords', () => {
      it('should return an array of all strings from initialText', () => {
        const { result } = renderHook(() => useTextStore.getState());
        const initialText = result.current.initialText;
        const remainingWords = result.current.getRemainingWords();

        const expectedArray = initialText.trim().split(" ");
        expect(remainingWords).toEqual(expectedArray);
      });

      it('should remove first item when currentWordIndex increases', () => {
        const { result } = renderHook(() => useTextStore.getState());
        const initialRemainingWords = result.current.getRemainingWords();

        expect(initialRemainingWords.length).toBe(3);

        act(() => {
          result.current.moveNextWord();
        });

        const { result: newStore } = renderHook(() => useTextStore.getState());
        const remainingWords = newStore.current.getRemainingWords();

        const expectedArray = initialRemainingWords.slice(1);

        expect(remainingWords).toEqual(expectedArray);
      });
    });

    describe('resetStore', () => {
      it('should restore initial state', () => {
        const { result } = renderHook(() => useTextStore);

        act(() => {
          result.current.setState({
            currentWordIndex: 4,
          });
        });

        act(() => {
          result.current.getState().resetStore();
        });


        const { result: newStore } = renderHook(() => useTextStore.getState());
        const state = newStore.current;

        expect(state.currentWordIndex).toBe(0);
      });
    });
  });
});