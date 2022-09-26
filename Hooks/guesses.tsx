import { dayOfYear } from '../todays-utils/useTodays'

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

export function loadGuesses(): Record<string, Guess[]> {
    if (typeof window === 'undefined') {
        return defaultGuesses
    }
    const storedGuesses = localStorage.getItem(GAME_SLICE_KEY)
    if (storedGuesses != null) {
        return JSON.parse(storedGuesses)
    } else {
        localStorage.setItem(GAME_SLICE_KEY, JSON.stringify(defaultGuesses))
        return defaultGuesses
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
