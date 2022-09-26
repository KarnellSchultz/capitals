import { dayOfYear } from '../todays-utils/useTodays'

const GAME_SLICE_KEY = 'guesses'

export type StoredGameSliceType = {
    [key: number]: {
        guess: string
        guesses: string[]
        hintCount: number
        isCorrect: boolean
        day?: number
    }
}

export function loadGuesses() {
    if (typeof window === 'undefined') return {}
    const storedGuesses = localStorage.getItem(GAME_SLICE_KEY)
    return storedGuesses != null ? JSON.parse(storedGuesses) : {}
}

export function saveGuesses(newGuess: StoredGameSliceType) {
    if (typeof window === 'undefined') return {}

    const storedGuesses = loadGuesses()
    console.log(storedGuesses)

    // console.log({ storedGuesses, newGuess })


    localStorage.setItem(
        GAME_SLICE_KEY,
        JSON.stringify({
            [dayOfYear]: [storedGuesses, newGuess],
        })
    )
}
