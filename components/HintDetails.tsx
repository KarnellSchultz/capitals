import CountUp from 'react-countup'
import autoAnimate from '@formkit/auto-animate'
import { useCapitalGameStore } from '../stores/capitalGameStore'
import { useEffect, useRef } from 'react'

export const HintDetails = () => {
    const capital = useCapitalGameStore(({ country }) => country.capital)
    const hintCount = useCapitalGameStore(({ hintCount }) => hintCount)

    const hintedWord = capital.substring(0, hintCount)

    const percentOfWordShown = Math.round((hintCount / capital.length) * 100)

    const parent = useRef(null)
    useEffect(() => {
        parent.current && autoAnimate(parent.current)
    }, [parent])

    return (
        <div className="w-full grid gap-1 grid-cols-7 pb-1 h-9 text-center">
            <div
                ref={parent}
                className="flex items-center justify-center border-2 col-span-5 rounded ">
                {[...hintedWord].map(letter => (
                    <div key={letter}> {letter === ' ' ? ' _ ' : letter} </div>
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
