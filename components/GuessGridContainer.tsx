'use client'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import type { Guess } from '../utils/localStorageHelpers/guesses'

export type GuessGridItemProps = {
    guess: string
    hintCount: number
    isCorrect: boolean
}
export const GuessGridItem = ({ guess, hintCount, isCorrect }: GuessGridItemProps) => {
    return (
        <>
            <div className="col-span-5 flex text-sm  justify-center border-2 h-9 items-center rounded uppercase">
                {guess}
            </div>
            <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                {hintCount}
            </div>
            <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                <div>{isCorrect ? '🎉' : '🚫'}</div>
            </div>
        </>
    )
}

const EmptyGridItem = () => (
    <div className="h-9 col-span-7 bg-slate-200 border-2 rounded"></div>
)

export const GuessGridContainer = ({
    gameSliceData,
}: {
    gameSliceData: Guess[]
}) => {
    const [parentOne] = useAutoAnimate()

    const gridItemsArray = new Array(6 - gameSliceData.length).fill(null)
    const guessData = [...gameSliceData, ...gridItemsArray]

    return (
        <div
            ref={parentOne as any}
            className="w-full grid gap-1 grid-cols-7 pb-1 text-center ">
            {guessData.map((slice, idx) => {
                if (slice === null) return <EmptyGridItem key={idx} />

                const { guess, hintCount, isCorrect } = slice

                return (
                    <GuessGridItem
                        key={`${guess}-idx-${hintCount}`}
                        guess={guess}
                        hintCount={hintCount}
                        isCorrect={isCorrect}
                    />
                )
            })}
        </div>
    )
}
