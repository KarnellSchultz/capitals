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
    const [setHintCount] = useCapitalGameStore(({ setHintCount }) => [
        setHintCount,
    ])
    const selectValue = useCapitalGameStore(({ selectValue }) => selectValue)
    const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus)

    const { gameSliceData, updateGameSlices } = useGameSlices()

    // saveHintCount(2)
    const { count } = loadHintCount()

    // saveGuesses({ guess: 'hello' })
    const data = loadGuesses()

    const guessCount = 0
    const hasGuessesRemaining = MAX_GUESSES > guessCount
    const isCorrect = selectValue.includes(country.capital.toLocaleLowerCase())
    const isLoser = !isCorrect && guessCount === MAX_GUESSES
    const gameOver = !hasGuessesRemaining || isCorrect || isLoser

    const hasHintsRemaining = country.capital.length <= count

    const handleGuessClick = () => {
        // add more validation
        if (!selectValue) return
        if (selectValue.includes(selectValue.toLocaleLowerCase())) return

        const { guesses } = loadGuesses()
        saveGuesses({
            hintCount: 0,
            guess: selectValue,
            guesses: [
                ...(gameSliceData[gameSliceData.length - 1]?.guesses ?? []),
                selectValue,
            ],
            isCorrect:
                selectValue.toLocaleLowerCase().trim() ===
                country.capital.toLocaleLowerCase().trim(),
        })
    }

    const handleHintCountClick = () => {
        const { count } = loadHintCount()
        saveHintCount(count + 1)
    }

    return (
        <div className="w-full px-8">
            <Heading name={country.name} emoji={country.emoji} />
            <HintDetails />
            {/* <GuessGridContainer gameSliceData={gameSliceData} /> */}
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
