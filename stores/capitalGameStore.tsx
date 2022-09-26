import { Country } from 'countries-list'
import create from 'zustand'
import { defaultGuesses, Guess } from '../hooks/guesses'
import { getTodaysCountry } from '../todays-utils/useTodays'

export enum GameStatus {
    PLAYING = 'PLAYING',
    COMPLETE = 'COMPLETE',
    SUCCESS = 'SUCCESS',
    FAIL = 'FAIL',
}

export type GameStatusType = keyof typeof GameStatus

export type CapitalGameStore = {
    gameStatus: GameStatusType
    setGameStatus: (gameStatus: GameStatusType) => void
    country: Country
    setCountry: (country: Country) => void
    hintCount: number
    setHintCount: (count: number) => void
    incrementHintCount: () => void
    selectValue: string
    setSelectValue: (value: string) => void
    setGameStateSlices: (guesses: Guess[]) => void
    gameStateSlices: Guess[]
}

export const useCapitalGameStore = create<CapitalGameStore>(set => ({
    country: getTodaysCountry(),
    setCountry: country => set(state => ({ ...state, country })),
    gameStatus: GameStatus.PLAYING,
    hintCount: 0,
    incrementHintCount: () =>
        set(state => ({ ...state, hintCount: state.hintCount + 1 })),
    setHintCount: count => set(state => ({ ...state, hintCount: count })),
    setGameStatus: (gameStatus: GameStatusType) =>
        set(state => ({
            ...state,
            gameStatus,
        })),
    selectValue: '',
    setSelectValue: value => set(state => ({ ...state, selectValue: value })),
    setGameStateSlices: guesses =>
        set(state => ({ ...state, gameStateSlices: guesses })),
    gameStateSlices: [],
}))
