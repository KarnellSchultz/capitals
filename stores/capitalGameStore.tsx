import { Country } from 'countries-list'
import create from 'zustand'
import { getTodaysCountry } from '../todays-utils/useTodays'

export enum GameStatus {
    PLAYING = 'PLAYING',
    COMPLETE = 'COMPLETE',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

export type GameStatusType = keyof typeof GameStatus
export type GameStateSliceType = {
    guesses: string[]
    guess: string
    hintCount: number
    isCorrect: boolean
}

export type CapitalGameStore = {
    gameStatus: GameStatusType
    country: Country
    guesses: string[]
    hintCount: number
    gameStateSlices: GameStateSliceType[]
    setCountry: (country: Country) => void
    incrementHintCount: () => void
    setGameStateSlices: () => void
    setGameStatus: (gameStatus: GameStatusType) => void
    setGuesses: (guess: string) => void
}

export const useCapitalGameStore = create<CapitalGameStore>(set => ({
    country: getTodaysCountry(),
    gameStatus: GameStatus.PLAYING,
    guesses: [],
    hintCount: 0,
    gameStateSlices: [],
    setCountry: country => set(state => ({ ...state, country })),
    incrementHintCount: () =>
        set(state => ({ ...state, hintCount: state.hintCount + 1 })),
    setGameStateSlices: () =>
        set(state => {
            const currentGuess =
                [...state.guesses].pop()?.toLocaleLowerCase().trim() || ''
            const isCorrect =
                currentGuess === state?.country.capital.toLocaleLowerCase()
            return {
                ...state,
                gameStateSlices: [
                    ...state.gameStateSlices,
                    {
                        guesses: state.guesses,
                        hintCount: state.hintCount,
                        isCorrect,
                        guess: currentGuess,
                    },
                ],
            }
        }),
    setHintCount: () =>
        set(state => ({ ...state, hintCount: state.hintCount + 1 })),

    setGameStatus: (gameStatus: GameStatusType) =>
        set(state => ({
            ...state,
            gameStatus,
        })),
    setGuesses: guess =>
        set(state => ({
            ...state,
            guesses: [...state.guesses, guess.toLocaleLowerCase().trim()],
        })),
}))
