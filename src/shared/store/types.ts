export type ScoreEntry = {
    id?: number,
    username: string,
    score: number
    accuracy: number
    firstStrikeAccuracy: number
    wpm: number
    words: number
}

export type ScoreDataStoreState = {
    isLoading: boolean,
    error: string | null,
    success: boolean
}


export type ScoreDataStoreActions = {
    savesScore: (results: ScoreEntry) => Promise<void>,
    resetStore: () => void,
}

export type ScoreDataStore = ScoreDataStoreState & ScoreDataStoreActions