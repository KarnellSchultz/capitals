import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Guess } from '../utils/localStorageHelpers/guesses'
// import { useCopyToClipboard } from '../hooks/useCopyToClipboard'

import { useState } from 'react'

type CopiedValue = string | null
type CopyFn = (text: string) => Promise<boolean> // Return success

function useCopyToClipboard(): [CopiedValue, CopyFn] {
    const [copiedText, setCopiedText] = useState<CopiedValue>(null)

    const copy: CopyFn = async text => {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported')
            return false
        }

        // Try to save to clipboard then save it in the state if worked
        try {
            await navigator.clipboard.writeText(text)
            setCopiedText(text)
            return true
        } catch (error) {
            console.warn('Copy failed', error)
            setCopiedText(null)
            return false
        }
    }

    return [copiedText, copy]
}

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

        const url = `🌐  https://capitals-phi.vercel.app/ 🌐 \n`

        return url + returnValue
    }

    const handleShareClick = () => {
        copyToClipboard(formatGameStateToShare(gameStateSlices))
    }
    return (
        <div ref={parent as any}>
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
                disabled={gameOver || !hasHintsRemaining}>
                Hint
            </button>
            <div>
                {gameOver ? (
                    <button
                        className="w-full rounded py-1 px-6 border-2
                    hover:bg-slate-50
                    disabled:bg-slate-300 disabled:cursor-not-allowed"
                        onClick={handleShareClick}>
                        Share
                    </button>
                ) : null}
            </div>
        </div>
    )
}
