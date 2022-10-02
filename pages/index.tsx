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
import 'react-toastify/dist/ReactToastify.css'

const MAX_GUESSES = 6

export default function CapitalsGame() {
    const country = useCapitalGameStore(({ country }) => country)
    const [hintCount, setHintCount] = useCapitalGameStore(
        ({ hintCount, setHintCount }) => [hintCount, setHintCount]
    )

    const {
        selectValue,
        gameStateSlices,
        setGameStateSlices,
        isCorrect,
        setIsCorrect,
        gameStatus,
        setGameStatus,
    } = useCapitalGameStore(
        ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            isCorrect,
            setIsCorrect,
            gameStatus,
            setGameStatus,
        }) => ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            isCorrect,
            setIsCorrect,
            gameStatus,
            setGameStatus,
        })
    )

    const checkGameStatus = useCallback(
        (guesses: Guess[]) => {
            const guessCount = new Set([...guesses]).size
            const hasGuessesRemaining = MAX_GUESSES > guessCount
            const hasHintsRemaining =
                new Set([...country.capital]).size >= hintCount
            const isLoser =
                !guesses.some(guess => guess.isCorrect === true) &&
                !hasGuessesRemaining
            const isWinner = guesses.some(guess => guess.isCorrect === true)
            const isGameOver =
                !hasGuessesRemaining ||
                isLoser ||
                isWinner ||
                !hasHintsRemaining

            setGameStatus(
                isGameOver ? GameStatus.GAME_OVER : GameStatus.PLAYING
            )
        },
        [country.capital, hintCount, setGameStatus]
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
        checkGameStatus(storedGuesses)
    }, [checkGameStatus, gameStateSlices])

    const guessCount = new Set([...gameStateSlices]).size
    const hasHintsRemaining = new Set([...country.capital]).size >= hintCount

    const isCorrectCheck = (capital: string, value: string) => {
        return (
            value.toLocaleLowerCase().trim() ===
            capital.toLocaleLowerCase().trim()
        )
    }

    const handleGuessClick = () => {
        const storedGuesses = loadGuesses()
        const guessArray = storedGuesses.map(({ guess }) =>
            guess.toLocaleLowerCase()
        )
        // add more validation
        if (!selectValue) return
        if (
            guessCount > 0 &&
            guessArray.includes(selectValue.toLocaleLowerCase())
        ) {
            return
        }

        const validatedAnswer = isCorrectCheck(country.capital, selectValue)
        if (validatedAnswer) toast.success(`🎉  Magellan would be proud  🎉`)

        const newSlice = [
            ...storedGuesses,
            {
                hintCount,
                guess: selectValue,
                guesses: [...guessArray, selectValue],
                isCorrect: validatedAnswer,
            },
        ]

        setIsCorrect(validatedAnswer)
        setGameStateSlices(newSlice)
        saveGuesses(newSlice)
    }

    const handleHintCountClick = () => {
        const { count } = loadHintCount()
        const newCount = count + 1
        setHintCount(newCount)
        saveHintCount(newCount)
    }

    return (
        <>
            <Heading name={country.name} emoji={country.emoji} />
            <HintDetails capital={country.capital} hintCount={hintCount} />
            <GuessGridContainer gameSliceData={gameStateSlices} />
            <CountrySelect />
            <ButtonsContainer
                gameOver={gameStatus === GameStatus.GAME_OVER}
                handleGuessClick={handleGuessClick}
                hasHintsRemaining={hasHintsRemaining}
                gameStateSlices={gameStateSlices}
                handleHintCountClick={() => handleHintCountClick()}
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
