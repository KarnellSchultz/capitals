import { dayOfYear } from '../todayUtils'

const GAME_SLICE_KEY = 'guesses'

export type Guess = {
    guess: string
    guesses: string[]
    hintCount: number
    isCorrect: boolean
    day?: number
}

export const defaultGuesses = {
    [dayOfYear]: [],
}

export function loadGuesses(): Guess[] {
    if (typeof window === 'undefined') {
        return defaultGuesses[dayOfYear]
    }
    const storedGuesses = localStorage.getItem(GAME_SLICE_KEY)

    // clean this code up
    if (storedGuesses != null && JSON.parse(storedGuesses)) {
        return JSON.parse(storedGuesses)[dayOfYear]
    } else {
        localStorage.setItem(GAME_SLICE_KEY, JSON.stringify(defaultGuesses))
        return defaultGuesses[dayOfYear]
    }
}

export function saveGuesses(newGuess: Guess[]) {
    if (typeof window === 'undefined') return {}
    const storedGuesses = loadGuesses()
    localStorage.setItem(
        GAME_SLICE_KEY,
        JSON.stringify({
            [dayOfYear.toString()]: newGuess,
        })
    )
}
