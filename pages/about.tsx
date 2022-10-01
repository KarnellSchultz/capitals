import Link from 'next/link'
import React from 'react'
import { HintDetails } from '../components/HintDetails'

export default function aboutPage() {
    return (
        <div>
            <h2 className="text-2xl text-center my-4">About</h2>
            <ul>
                <li>Guess the Capital in 6 guesses.</li>
                <li>Each guess must be a valid country.</li>
                <li>
                    A correct guess will see a 🎉 emoji. An incorrect guess will
                    see an 🚫.
                </li>
            </ul>
            <div className="my-4">
                <h2 className="text-2xl">Correct Example</h2>
                <div className="w-full grid gap-1 grid-cols-7 pb-1 text-center">
                    <div className="col-span-5 flex justify-center border-2 h-9 items-center rounded uppercase">
                        <p>Addis Ababa</p>
                    </div>
                    <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                        3
                    </div>
                    <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                        <div>🎉</div>
                    </div>
                </div>
            </div>
            <div className="my-4">
                <h2 className="text-2xl">Incorrect Example</h2>
                <div className="w-full grid gap-1 grid-cols-7 pb-1 text-center">
                    <div className="col-span-5 flex justify-center border-2 h-9 items-center rounded uppercase">
                        <p>Tampa</p>
                    </div>
                    <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                        4
                    </div>
                    <div className="flex items-center justify-center border-2 h-9 col-span-1 rounded">
                        <div>🚫</div>
                    </div>
                </div>
            </div>
            <div>
                <h2 className="text-2xl my-2">Hints</h2>
                <ul>
                    <li>
                        Each time you click the Hint button you will get a to
                        see a new letter of the capital.
                    </li>
                    <li>
                        The percentage is the percent of the capital being
                        shown.
                    </li>
                </ul>
                <div className="my-2">
                    <HintDetails capital="Stockholm" hintCount={6} />
                </div>
            </div>
            <div>
                <h2 className="text-2xl text-center mt-4">Happy guessing!</h2>
            </div>
        </div>
    )
}
