import { useCapitalGameStore } from '../stores/capitalGameStore'
import { HintDetails } from '../components/HintDetails'
import { CountrySelect } from '../components/Select'
import { Heading } from '../components/Heading'
import { ButtonsContainer } from '../components/ButtonsContainer'
import { GuessGridContainer } from '../components/GuessGridContainer'
import { useGameSlices } from '../hooks/useGameSlices'
import { useEffect } from 'react'
import { dayOfYear } from '../todays-utils/useTodays'
import { loadHintCount, saveHintCount } from '../hooks/hintCount'
import { loadGuesses, saveGuesses } from '../hooks/guesses'

const MAX_GUESSES = 6

export default function CapitalsGame() {
    const country = useCapitalGameStore(({ country }) => country)
    const [hintCount, setHintCount] = useCapitalGameStore(
        ({ hintCount, setHintCount }) => [hintCount, setHintCount]
    )
    // const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus)
    const { selectValue, gameStateSlices, setGameStateSlices } =
        useCapitalGameStore(
            ({ selectValue, gameStateSlices, setGameStateSlices }) => ({
                selectValue,
                gameStateSlices,
                setGameStateSlices,
            })
        )

    // saveHintCount(2)
    const { count } = loadHintCount()

    // saveGuesses({ guess: 'hello' })
    const data = loadGuesses()
    const slices = [data[dayOfYear]]

    useEffect(() => {
        //load hint count into game state
        const { count } = loadHintCount()
        setHintCount(count)
    }, [setHintCount])
    useEffect(() => {
        //load slices count into game state
        const storedGuesses = loadGuesses()
        setGameStateSlices(storedGuesses[dayOfYear])
    }, [setGameStateSlices])

    const guessCount = new Set([...gameStateSlices]).size
    const hasGuessesRemaining = MAX_GUESSES > guessCount
    const isCorrect = selectValue.includes(country.capital.toLocaleLowerCase())
    const isLoser = !isCorrect && guessCount === MAX_GUESSES
    const gameOver = !hasGuessesRemaining || isCorrect || isLoser

    const hasHintsRemaining = country.capital.length <= count

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

        const newSlice = [
            ...storedGuesses[dayOfYear],
            {
                hintCount: 0,
                guess: selectValue,
                guesses: [...guessArray, selectValue],
                isCorrect:
                    selectValue.toLocaleLowerCase().trim() ===
                    country.capital.toLocaleLowerCase().trim(),
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
        <div className="w-full px-8">
            <Heading name={country.name} emoji={country.emoji} />
            <HintDetails />
            <GuessGridContainer gameSliceData={gameStateSlices} />
            <CountrySelect />
            <ButtonsContainer
                gameOver={gameOver}
                handleGuessClick={handleGuessClick}
                hasHintsRemaining={hasHintsRemaining}
                handleHintCountClick={handleHintCountClick}
            />
        </div>
    )
}
