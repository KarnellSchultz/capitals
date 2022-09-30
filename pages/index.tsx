import { useCapitalGameStore } from '../stores/capitalGameStore'
import { HintDetails } from '../components/HintDetails'
import { CountrySelect } from '../components/Select'
import { Heading } from '../components/Heading'
import { ButtonsContainer } from '../components/ButtonsContainer'
import { GuessGridContainer } from '../components/GuessGridContainer'
import { useEffect } from 'react'
import { dayOfYear } from '../utils/todayUtils'
import {
    loadHintCount,
    saveHintCount,
} from '../utils/localStorageHelpers/hintCount'
import { loadGuesses, saveGuesses } from '../utils/localStorageHelpers/guesses'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MAX_GUESSES = 6

export default function CapitalsGame() {
    const country = useCapitalGameStore(({ country }) => country)
    const [hintCount, setHintCount] = useCapitalGameStore(
        ({ hintCount, setHintCount }) => [hintCount, setHintCount]
    )
    // const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus)
    const {
        selectValue,
        gameStateSlices,
        setGameStateSlices,
        isCorrect,
        setIsCorrect,
    } = useCapitalGameStore(
        ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            isCorrect,
            setIsCorrect,
        }) => ({
            selectValue,
            gameStateSlices,
            setGameStateSlices,
            isCorrect,
            setIsCorrect,
        })
    )

    // Load game state from localStorage
    useEffect(() => {
        const { count } = loadHintCount()
        setHintCount(count)
    }, [setHintCount])
    useEffect(() => {
        const storedGuesses = loadGuesses()
        setGameStateSlices(storedGuesses[dayOfYear])
    }, [setGameStateSlices])

    const guessCount = new Set([...gameStateSlices]).size
    const hasGuessesRemaining = MAX_GUESSES > guessCount
    const isLoser = !isCorrect && guessCount === MAX_GUESSES
    const hasHintsRemaining = country.capital.length >= hintCount
    const gameOver =
        !hasGuessesRemaining || !hasHintsRemaining || isCorrect || isLoser

    const isCorrectCheck = (capital: string, value: string) => {
        return (
            value.toLocaleLowerCase().trim() ===
            capital.toLocaleLowerCase().trim()
        )
    }

    const handleGuessClick = () => {
        const storedGuesses = loadGuesses()
        const guessArray = storedGuesses[dayOfYear].map(({ guess }) =>
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

        if (validatedAnswer) {
            toast(`🎉  Magellan would be proud  🎉`)
        }
        setIsCorrect(validatedAnswer)

        const newSlice = [
            ...storedGuesses[dayOfYear],
            {
                hintCount,
                guess: selectValue,
                guesses: [...guessArray, selectValue],
                isCorrect: validatedAnswer,
            },
        ]

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
        <div className="">
            <Heading name={country.name} emoji={country.emoji} />
            <HintDetails capital={country.capital} hintCount={hintCount} />
            <GuessGridContainer gameSliceData={gameStateSlices} />
            <CountrySelect />
            <ButtonsContainer
                gameOver={gameOver}
                handleGuessClick={handleGuessClick}
                hasHintsRemaining={hasHintsRemaining}
                gameStateSlices={gameStateSlices}
                handleHintCountClick={() => handleHintCountClick()}
            />

            <ToastContainer
                style={{ textAlign: 'center' }}
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                icon
            />
        </div>
    )
}
