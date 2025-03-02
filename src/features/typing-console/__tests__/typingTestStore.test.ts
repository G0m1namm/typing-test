import { useTextStore, useTypingStore } from '../../../testing/test-utils';

describe('TypingStore', () => {
  // Reset store before each test for isolation
  beforeEach(() => {
    useTypingStore.getState().resetTest();
    useTextStore.getState().resetStore()
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const state = useTypingStore.getState();
      
      const expectedState = {
        enteredText: '',
        typeLogs: [],
        deletedErrors: 0,
        startTime: null,
        endTime: null,
        status: 'IDLE',
        wpm: 0,
        accuracy: 0,
        score: 0,
      };

      expect(state).toMatchObject(expectedState);
    });
  });

  describe('Actions', () => {
    describe('startTest', () => {
      it('should set start time and update status', () => {
        const beforeStart = Date.now();
        useTypingStore.getState().startTest();
        const { startTime, status } = useTypingStore.getState();

        expect(startTime).toBeGreaterThanOrEqual(beforeStart);
        expect(status).toBe('ACTIVE');
      });
    });

    describe('endTest', () => {
      it('should set end time and final status', () => {
        // First start the test properly
        useTypingStore.getState().startTest();
        const initialText = useTextStore.getState().initialText;
        const beforeEnd = Date.now();
        useTypingStore.getState().endTest(initialText);
        const { endTime, status } = useTypingStore.getState();

        expect(endTime).toBeGreaterThanOrEqual(beforeEnd);
        expect(status).toBe('FINISHED');
      });
    });

    describe('resetTest', () => {
      it('should restore initial state', () => {
        // Modify state first
        useTypingStore.setState({
          enteredText: 'test',
          status: "IDLE",
          startTime: Date.now()
        });

        useTypingStore.getState().resetTest();
        const state = useTypingStore.getState();

        expect(state).toMatchObject({
          enteredText: '',
          status: 'IDLE',
          startTime: null,
        });
      });
    });
  });
});
