import { useCallback, useEffect, useState } from 'react'
import { dayOfYear } from '../todays-utils/useTodays'

const GAME_SLICE_KEY = 'guesses'

export type StoredGameSliceType = {
    guess: string
    guesses: string[]
    hintCount: number
    isCorrect: boolean
    day?: number
}

const defaultGameSlice = [
    {
        guess: '',
        guesses: [],
        hintCount: 0,
        isCorrect: false,
        day: dayOfYear,
    },
]

const loadGameSlices = () => {
    if (typeof window === 'undefined') return { defaultGameSlice }
    const storedGamedSlices = localStorage.getItem(GAME_SLICE_KEY)

    // if (storedGamedSlices === null) {
    //     localStorage.setItem(GAME_SLICE_KEY, JSON.stringify(defaultGameSlice))
    // }

    const gameSliceData =
        storedGamedSlices != null
            ? JSON.parse(storedGamedSlices)
            : defaultGameSlice
    return gameSliceData
}

export const useGameSlices = () => {
    const [gameSliceData, setGameSliceData] = useState<StoredGameSliceType[]>(
        loadGameSlices()
    )

    const updateGameSlices = (newSliceData: StoredGameSliceType) => {
        const updateGameSliceData = [newSliceData]

        console.log('SETTING SLICES WITH:', gameSliceData, newSliceData)
        setGameSliceData(updateGameSliceData)
        localStorage.setItem(
            GAME_SLICE_KEY,
            JSON.stringify(updateGameSliceData)
        )
    }
    return {
        gameSliceData,
        updateGameSlices,
    }
}

