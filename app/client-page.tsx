'use client'

import { GameStatus, useCapitalGameStore } from '../stores/capitalGameStore'
import { HintDetails } from '../components/HintDetails'
import { CountrySelect } from '../components/Select'
import { Heading } from '../components/Heading'
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

const MAX_GUESSES = 6
export const runtime = 'experimental-edge' // 'node.js' (default) | 'experimental-edge'

export function CapitalsGame() {
    const country = useCapitalGameStore(({ country }) => country)
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
    } = useCapitalGameStore(
        ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            setIsCorrect,
            gameStatus,
            setGameStatus,
        }) => ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            setIsCorrect,
            gameStatus,
            setGameStatus,
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

            const isGameOver =
                !hasGuessesRemaining ||
                isLoser ||
                isWinner ||
                !hasHintsRemaining

            setGameStatus(isGameOver ? GameStatus.LOSER : GameStatus.PLAYING)
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
            <Heading name={country.name} emoji={country.emoji} />
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
