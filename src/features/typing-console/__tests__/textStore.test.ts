import { useTextStore } from "../../../testing/test-utils";

describe('TextStore', () => {
  beforeEach(() => {
    useTextStore.getState().resetStore()
  });

  describe('Initial State', () => {
    it('should initialize with correct default values', () => {
      const state = useTextStore.getState();
      
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
        const currentIndex = useTextStore.getState().currentWordIndex;

        expect(currentIndex).toBe(0)
        useTextStore.getState().moveNextWord()

        const newIndex = useTextStore.getState().currentWordIndex;
        expect(newIndex).toBe(1)
      });
    });

    describe('getRemainingWords', () => {
        it('should return an array of all strings from initialText', () => {
            const initialText = useTextStore.getState().initialText;
            const remainingWords = useTextStore.getState().getRemainingWords() 
            
            const expectedArray = initialText.trim().split(" ");
            expect(remainingWords).toEqual(expectedArray)
        })
        
        it('should remove first item when currentWordIndex increase', () => {
            const initialRemainingWords = useTextStore.getState().getRemainingWords() 
            
            expect(initialRemainingWords.length).toBe(3)

            useTextStore.getState().moveNextWord()
            const remainingWords = useTextStore.getState().getRemainingWords()

            const expectedArray = initialRemainingWords.slice(1)
            
            expect(remainingWords).toEqual(expectedArray)
        })
    })

    describe('resetStore', () => {
      it('should restore initial state', () => {
        useTextStore.setState({
          currentWordIndex: 4,
          initialText: 'mock new data',
        });

        useTextStore.getState().resetStore();
        const state = useTextStore.getState();

        expect(state).toMatchObject({
          currentWordIndex: 0,
          initialText: "example mock data",
        });
      });
    });
  });
})