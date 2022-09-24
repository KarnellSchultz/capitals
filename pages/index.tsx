
import { Nav } from '../Components/Nav'
import { useCapitalGameStore } from '../stores/capitalGameStore'
import { HintDetails } from '../Components/HintDetails'
import { CountrySelect } from '../Components/Select'
import { Heading } from '../Components/Heading'
import { ButtonsContainer } from '../Components/ButtonsContainer'
import { GuessGridContainer } from '../Components/GuessGridContainer'

const MAX_GUESSES = 6

export default function CapitalsGame() {
    const country = useCapitalGameStore(({ country }) => country)
    const hintCount = useCapitalGameStore(({ hintCount }) => hintCount)
    const incrementHintCount = useCapitalGameStore(
        ({ incrementHintCount }) => incrementHintCount
    )
    const setGameStateSlices = useCapitalGameStore(
        ({ setGameStateSlices }) => setGameStateSlices
    )

    const guesses = useCapitalGameStore(({ guesses }) => guesses)
    const setGuesses = useCapitalGameStore(({ setGuesses }) => setGuesses)
    const selectValue = useCapitalGameStore(({ selectValue }) => selectValue)
    // const gameStatus = useCapitalGameStore(({ gameStatus }) => gameStatus)
    const gameStateSlices = useCapitalGameStore(
        ({ gameStateSlices }) => gameStateSlices
    )

    const guessCount = guesses.length
    const hasGuessesRemaining = MAX_GUESSES > guessCount
    const isCorrect = guesses.includes(country.capital.toLocaleLowerCase())
    const isLoser = !isCorrect && guessCount === MAX_GUESSES
    const gameOver = !hasGuessesRemaining || isCorrect || isLoser

    const hasHintsRemaining = country.capital.length <= hintCount

    const handleGuessClick = () => {
        // add more validation
        if (!selectValue) return
        if (guesses.includes(selectValue.toLocaleLowerCase())) return

        setGuesses(selectValue)
        setGameStateSlices()
    }

    return (
        <div className="w-full p-8">
            <Nav />
            <Heading name={country.name} emoji={country.emoji} />
            <HintDetails />
            <GuessGridContainer />
            <CountrySelect />
            <ButtonsContainer
                gameOver={gameOver}
                handleGuessClick={handleGuessClick}
                hasHintsRemaining={hasHintsRemaining}
                incrementHintCount={incrementHintCount}
            />
        </div>
    )
}
