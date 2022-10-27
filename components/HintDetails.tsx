'use client'

import CountUp from 'react-countup'
import { useAutoAnimate } from '@formkit/auto-animate/react'

type HintDetailsProps = {
    capital: string
    hintCount: number
}
export const HintDetails = ({ capital, hintCount }: HintDetailsProps) => {
    const [parent] = useAutoAnimate()

    const hintedWord = capital.substring(0, hintCount)

    const percentOfWordShown = Math.round((hintCount / capital.length) * 100)

    return (
        <div className="w-full grid gap-1 grid-cols-7 pb-1 h-9 text-center">
            <div
                ref={parent as any}
                className="flex items-center justify-center border-2 col-span-5 rounded ">
                {[...hintedWord].map((letter, index) => (
                    <div key={`${letter}-${index}`}>
                        {' '}
                        {letter === ' ' ? ' _ ' : letter}{' '}
                    </div>
                ))}
            </div>
            <div className="flex items-center justify-center border-2 col-span-1 rounded">
                <CountUp end={hintCount} duration={1} />
            </div>
            <div className="flex items-center justify-center border-2 col-span-1 rounded">
                <CountUp end={percentOfWordShown} duration={1} />%
            </div>
        </div>
    )
}
