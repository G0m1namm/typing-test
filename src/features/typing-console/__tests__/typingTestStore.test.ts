import { act } from 'react';
import { LogData, TypingStoreState } from '../store/types';
import { useTypingStore } from '../store/typingTestStore';
import { renderHook } from '@testing-library/react';

describe('TypingStore', () => {
  const initialState: TypingStoreState = {
    enteredText: '',
    typeLogs: [],
    deletedErrors: 0,
    startTime: null,
    endTime: null,
    status: "IDLE",
    wpm: 0,
    accuracy: 0,
    score: 0,
  };

  it('should initialize with correct defaults', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    const state = result.current;
    expect(state).toMatchObject(initialState);
  });

  it('should set entered text and start the test if startTime is null', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    const setEnteredText = result.current.setEnteredText;

    const initTimer = jest.fn();
    act(() => {
      setEnteredText('test', initTimer);
    });

    const { result: newStore } = renderHook(() => useTypingStore.getState());
    const updatedEnteredText = newStore.current.enteredText;
    const updatedStartTime = newStore.current.startTime;
    expect(updatedEnteredText).toBe('test');
    expect(updatedStartTime).not.toBeNull();
    expect(initTimer).toHaveBeenCalled();
  });

  it('should set entered text while startTime exists without calling startTest and callback', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    act(() => {
      result.current.startTest();
    });

    const initTimer = jest.fn();
    act(() => {
      result.current.setEnteredText('test2', initTimer);
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current.enteredText).toBe('test2');
    expect(initTimer).not.toHaveBeenCalled();
  });

  it('should start the test', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    act(() => {
      result.current.startTest();
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current.startTime).not.toBeNull();
    expect(updatedStore.current.status).toBe("RUNNING");
  });

  it('should set type logs', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    const newLog = { character: 'a', action: 'typing', word: 'test' } as LogData;
    act(() => {
      result.current.setTypeLogs(newLog);
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current.typeLogs).toEqual([newLog]);
  });

  it('should end the test and calculate results', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    act(() => {
      result.current.startTest();
    });

    const initialText = 'test';
    act(() => {
      result.current.endTest(initialText);
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current.endTime).not.toBeNull();
    expect(updatedStore.current.status).toBe("FINISHED");
    expect(updatedStore.current.wpm).toBeGreaterThanOrEqual(0);
    expect(updatedStore.current.accuracy).toBeGreaterThanOrEqual(0);
    expect(updatedStore.current.score).toBeGreaterThanOrEqual(0);
  });

  it('should reset the test', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    act(() => {
      result.current.startTest();
      result.current.setEnteredText('test');
      result.current.setTypeLogs({ character: 'a', action: 'typing', word: 'test' });
      result.current.endTest('test');
      result.current.resetTest('test');
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current).toMatchObject(initialState);
  });

  it('should not calculate WPM if startTime is null', () => {
    const { result } = renderHook(() => useTypingStore.getState());
    const initialText = 'test';
    act(() => {
      result.current.endTest(initialText);
    });

    const { result: updatedStore } = renderHook(() => useTypingStore.getState());
    expect(updatedStore.current.wpm).toBe(0);
  });
});
