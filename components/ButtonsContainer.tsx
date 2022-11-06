'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import { toast } from 'react-toastify'
import { useCopyToClipboard } from '../Hooks/useCopyToClipboard'
import type { Guess } from '../utils/localStorageHelpers/guesses'
import { dayOfYear } from '../utils/todayUtils'

type ButtonsContainerProps = {
    handleGuessClick: () => void
    hasHintsRemaining?: boolean
    gameStateSlices: Guess[]
    gameOver: boolean
}

export const ButtonsContainer = ({
    handleGuessClick,
    gameOver,
    gameStateSlices,
}: ButtonsContainerProps) => {
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

        const gameResultStr = `Capitals-Magellan 🌍 \n#${dayOfYear} ${gameState.length}/6 \n`

        const url = `\n` + 'https://capitals.nellzus.se'

        return gameResultStr + returnValue + url
    }

    const handleShareClick = () => {
        copyToClipboard(formatGameStateToShare(gameStateSlices))
        toast.success('Copied results to clipboard')
    }

    return (
        <div ref={parent as any}>
            <button
                className="w-full rounded py-1 px-6 my-1 border-2 dark:border-zinc-300
                disabled:bg-zinc-300 disabled:cursor-not-allowed
                hover:bg-zinc-200 hover:border-zinc-300
                dark:hover:bg-zinc-700 dark:hover:text-white
                "
                onClick={handleGuessClick}
                disabled={gameOver}>
                Guess
            </button>
            <div hidden={!gameOver}>
                <button
                    className="w-full rounded py-1 px-6 border-2
                    disabled:bg-slate-300 disabled:cursor-not-allowed
                    dark:bg-emerald-700 hover:dark:bg-emerald-800 dark:hover:text-white
                    bg-lime-500 hover:bg-lime-400"
                    onClick={handleShareClick}>
                    Share
                </button>
            </div>
        </div>
    )
}
