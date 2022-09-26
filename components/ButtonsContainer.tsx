import { saveHintCount } from '../hooks/hintCount'

type Props = {
    handleGuessClick: () => void
    handleHintCountClick: () => void
    gameOver: boolean
    hasHintsRemaining: boolean
}

export const ButtonsContainer = ({
    handleGuessClick,
    gameOver,
    handleHintCountClick,
    hasHintsRemaining,
}: Props) => {
    return (
        <div>
            <button
                className="w-full rounded py-1 px-6 border-2
        hover:bg-slate-50
        disabled:bg-slate-300 disabled:cursor-not-allowed"
                onClick={handleGuessClick}
                disabled={gameOver}>
                Guess
            </button>
            <button
                className="w-full rounded py-1 px-6 my-2 border-2 
        hover:bg-slate-50
        disabled:bg-slate-300 disabled:cursor-not-allowed"
                onClick={handleHintCountClick}
                disabled={gameOver || hasHintsRemaining}>
                Hint
            </button>
        </div>
    )
}
