import { useCapitalGameStore } from '../stores/capitalGameStore'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useLocalStorageGuesses } from '../hooks/useLocalStorage'
import { daysIntoYear } from '../todays-utils/useTodays'
import { StoredGameSliceType, useGameSlices } from '../hooks/useGameSlices'
import { useEffect, useState } from 'react'

export type GuessGridItemProps = {
    guess: string
    hintCount: number
    isCorrect: boolean
}
const GuessGridItem = ({ guess, hintCount, isCorrect }: GuessGridItemProps) => {
    return (
        <>
            <div className="col-span-5 flex justify-center border-2 h-9 items-center rounded uppercase">
                {guess}
            </div>
            <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                {hintCount}
            </div>
            <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                <div>{isCorrect ? '🟩' : '🟥 '}</div>
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
    gameSliceData: StoredGameSliceType[]
}) => {
    const [parentOne] = useAutoAnimate()

    // SSR workaround
    const [data, setData] = useState<StoredGameSliceType[]>([])
    useEffect(() => {
        setData(gameSliceData)
    }, [gameSliceData])

    const gridItemsArray = new Array(6 - data.length).fill(null)
    const guessData = [...data, ...gridItemsArray]

    return (
        <div
            ref={parentOne as any}
            className="w-full grid gap-1 grid-cols-7 pb-1 text-center">
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
