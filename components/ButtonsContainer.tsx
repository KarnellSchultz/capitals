import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCopyToClipboard } from '../Hooks/useCopyToClipboard'
import type { Guess } from '../utils/localStorageHelpers/guesses'

type Props = {
    handleGuessClick: () => void
    handleHintCountClick: () => void
    gameOver: boolean
    hasHintsRemaining: boolean
    gameStateSlices: Guess[]
}

export const ButtonsContainer = ({
    handleGuessClick,
    gameOver,
    handleHintCountClick,
    hasHintsRemaining,
    gameStateSlices,
}: Props) => {
    const [parent] = useAutoAnimate()
    const [_, copyToClipboard] = useCopyToClipboard()

    const formatGameStateToShare = (gameState: Guess[]): string => {
        const tempValue = gameState.map(({ hintCount, isCorrect }) => {
            const emoji = isCorrect ? '🎉' : '🚫'
            return { emoji, hintCount }
        })

        let returnValue = ''

        for (let index = 0; index < tempValue.length; index++) {
            const element = tempValue[index]
            const str = `${element.emoji} ${element.hintCount} \n`
            returnValue += str
        }

        const url = `\n` + '🌐 https://capitals-magellan.vercel.app/ 🌐'

        return returnValue + url
    }

    const handleShareClick = () => {
        copyToClipboard(formatGameStateToShare(gameStateSlices))
    }

    return (
        <div ref={parent as any}>
            <button
                className="w-full rounded py-1 px-6 my-1 border-2
                disabled:bg-zinc-300 disabled:cursor-not-allowed
                hover:bg-zinc-200 hover:border-zinc-300
                "
                onClick={handleGuessClick}
                disabled={gameOver}>
                Guess
            </button>
            <button
                className="w-full rounded py-1 px-6 my-1 border-2
                disabled:bg-zinc-300 disabled:cursor-not-allowed
                hover:bg-zinc-200 hover:border-zinc-300
                "
                onClick={handleHintCountClick}
                disabled={gameOver || !hasHintsRemaining}>
                Hint
            </button>
            <div>
                {gameOver ? (
                    <button
                        className="w-full rounded py-1 px-6 border-2
                    disabled:bg-slate-300 disabled:cursor-not-allowed
                    bg-lime-500 hover:bg-lime-400
                    "
                        onClick={handleShareClick}>
                        Share
                    </button>
                ) : null}
            </div>
        </div>
    )
}
