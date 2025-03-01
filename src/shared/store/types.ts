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
}


export type ScoreDataStoreActions = {
    savesScore: (results: ScoreEntry) => Promise<void>,
}

export type ScoreDataStore = ScoreDataStoreState & ScoreDataStoreActions