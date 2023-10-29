'use client'

import { GameStatus, useCapitalGameStore } from '../stores/capitalGameStore'
import { HintDetails } from '../components/HintDetails'
import { CountrySelect } from '../components/Select'
import { ButtonsContainer } from '../components/ButtonsContainer'
import { GuessGridContainer } from '../components/GuessGridContainer'
import { useCallback, useEffect } from 'react'
import {
    loadHintCount,
    saveHintCount,
} from '../utils/localStorageHelpers/hintCount'
import {
    Guess,
    loadGuesses,
    saveGuesses,
} from '../utils/localStorageHelpers/guesses'

import { toast, ToastContainer } from 'react-toastify'
import { countriesList } from '../constants/countries'
import { Country } from 'countries-list'

const MAX_GUESSES = 6
export const runtime = 'experimental-edge'

type Props = {
    country: Country
    children: React.ReactNode
}

export function CapitalsGame({ country, children }: Props) {
    const [hintCount, setHintCount] = useCapitalGameStore(
        ({ hintCount, setHintCount }) => [hintCount, setHintCount]
    )

    const {
        selectValue,
        gameStateSlices,
        setGameStateSlices,
        setIsCorrect,
        gameStatus,
        setGameStatus,
        toasterTheme,
        setToasterTheme
    } = useCapitalGameStore(({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            setIsCorrect,
            gameStatus,
            setGameStatus,
            toasterTheme,
            setToasterTheme,
        }) => ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            setIsCorrect,
            gameStatus,
            setGameStatus,toasterTheme,
            setToasterTheme,
        })
    )

    const checkGameStatus = useCallback(
        (guesses: Guess[], hintCount: number) => {
            const guessCount = new Set([...guesses]).size
            const hasGuessesRemaining = MAX_GUESSES > guessCount
            const hasHintsRemaining =
                new Set([...country.capital]).size >= hintCount

            //Winner
            const isWinner = guesses.some(guess => guess.isCorrect === true)
            if (isWinner) return setGameStatus(GameStatus.WINNER)

            //Loser
            const isLoser =
                (!guesses.some(guess => guess.isCorrect === true) &&
                    !hasGuessesRemaining) ||
                !hasHintsRemaining
            if (isLoser) {
                return setGameStatus(GameStatus.LOSER)
            }

            //Playing or Loser
            const isGameOver = new Set([
                !hasGuessesRemaining,
                !hasHintsRemaining,
                isLoser,
                isWinner,
            ]).has(true)

            setGameStatus(!isGameOver ? GameStatus.PLAYING : GameStatus.LOSER)
        },
        [country.capital, setGameStatus]
    )

    // Load game state from localStorage
    useEffect(() => {
        const { count } = loadHintCount()
        setHintCount(count)
    }, [setHintCount])

    useEffect(() => {
        const storedGuesses = loadGuesses()
        setGameStateSlices(storedGuesses)
    }, [setGameStateSlices])
    useEffect(() => {
        const storedGuesses = loadGuesses()
        checkGameStatus(storedGuesses, hintCount)
    }, [checkGameStatus, gameStateSlices, hintCount])
    useEffect(() => {
        if (gameStatus === GameStatus.LOSER) toast.info(country.capital)
    }, [country.capital, gameStatus])

    useEffect(() => {
    const toasterTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light'
        setToasterTheme(toasterTheme)
    }, [setToasterTheme])

    const guessCount = new Set([...gameStateSlices]).size
    const hasHintsRemaining = new Set([...country.capital]).size >= hintCount

    const isCorrectCheck = (capital: string, value: string) => {
        return (
            value.toLocaleLowerCase().trim() ===
            capital.toLocaleLowerCase().trim()
        )
    }

    const handleGuessClick = () => {
        const { count } = loadHintCount()
        const newCount = count + 1
        const storedGuesses = loadGuesses()
        const guessArray = storedGuesses.map(({ guess }) =>
            guess.toLocaleLowerCase()
        )
        // todo add more validation
        if (!selectValue) return
        if (
            guessCount > 0 &&
            guessArray.includes(selectValue.toLocaleLowerCase())
        ) {
            return
        }

        const validatedAnswer = isCorrectCheck(country.capital, selectValue)
        if (validatedAnswer) toast.success(`🎉  Magellan would be proud  🎉`)

        const selectedCountryDetails = countriesList.find(
            country => country.capital === selectValue
        )

        const newSlice = [
            ...storedGuesses,
            {
                hintCount,
                guess: `${selectValue} - ${selectedCountryDetails?.name}  ${selectedCountryDetails?.emoji}`,
                guesses: [...guessArray, selectValue],
                isCorrect: validatedAnswer,
            },
        ]

        // handle hintCounts
        if (!validatedAnswer) {
            setHintCount(newCount)
            saveHintCount(newCount)
        }

        setIsCorrect(validatedAnswer)
        // handle gameState
        setGameStateSlices(newSlice)
        saveGuesses(newSlice)
    }

    const gameOver =
        gameStatus === GameStatus.LOSER || gameStatus === GameStatus.WINNER


    return (
        <>
            {children}
            <HintDetails capital={country.capital} hintCount={hintCount} />
            <GuessGridContainer gameSliceData={gameStateSlices} />
            <CountrySelect
                gameOver={gameOver}
                handleGuessClick={handleGuessClick}
            />
            <ButtonsContainer
                gameOver={gameOver}
                handleGuessClick={handleGuessClick}
                hasHintsRemaining={hasHintsRemaining}
                gameStateSlices={gameStateSlices}
            />
            <ToastContainer
                style={{ textAlign: 'center' }}
                theme={toasterTheme}
                position="top-center"
                autoClose={3000}
                newestOnTop={false}
                rtl={false}
                closeOnClick
                hideProgressBar
                pauseOnFocusLoss
                draggable
                pauseOnHover
                icon
            />
        </>
    )
}
