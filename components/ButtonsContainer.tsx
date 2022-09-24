type Props = {
    handleGuessClick: () => void
    incrementHintCount: () => void
    gameOver: boolean
    hasHintsRemaining: boolean
}

export const ButtonsContainer = ({
    handleGuessClick,
    gameOver,
    incrementHintCount,
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
                onClick={incrementHintCount}
                disabled={gameOver || hasHintsRemaining}>
                Hint
            </button>
        </div>
    )
}
