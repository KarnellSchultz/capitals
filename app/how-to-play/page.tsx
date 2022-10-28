import { HintDetails } from '../../components/HintDetails'
import { MyLink } from '../../components/MyLink'
import { Spacer } from '../../components/Spacer'

export default function howToPlay() {
    return (
        <div>
            <h2 className="text-2xl text-center my-4">How To Play</h2>
            <ul>
                <li>Guess the Capital in 6 guesses.</li>
                <li>Each guess must be a valid capital.</li>
                <li>A correct guess will see an 🎉. </li>
                <li>An incorrect guess will see an 🚫.</li>
            </ul>
            <Spacer />
            <hr />
            <div className="my-4">
                <h2 className="text-2xl text-center">Correct Example</h2>
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
                <p>The user guessed the correct answer and used 3 hints.</p>
            </div>
            <div className="my-4">
                <h2 className="text-2xl text-center">Incorrect Example</h2>
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
                <p>
                    The user guessed an incorrect answer and has used four
                    hints.
                </p>
            </div>
            <hr />
            <div>
                <h2 className="text-2xl my-2 text-center">Hints</h2>
                <ul>
                    <li>
                        Each time you guess you get a new letter of the capital
                    </li>
                    <Spacer />
                    <li>
                        The percentage is the percent of the capital being
                        shown.
                    </li>
                </ul>
                <div className="my-2">
                    <HintDetails capital="Stockholm" hintCount={6} />
                    <p>
                        The user clicked the hint button six times and can see
                        67% of the capital.
                    </p>
                </div>
            </div>
            <hr />
            <Spacer />
            <div>
                <h2 className="text-2xl text-center">Inspiration</h2>
                <p>
                    My geography loving group chat named
                    <MyLink href="https://en.wikipedia.org/wiki/Ferdinand_Magellan">
                        &quot;Young Magellan&apos;s&quot;
                    </MyLink>
                    loved playing
                    <MyLink href="https://worldle.teuteuf.fr/">Worldle</MyLink>
                    by
                    <MyLink href="https://twitter.com/teuteuf">@teuteuf</MyLink>
                    so much that I decided to make a game inspired by it.
                </p>
            </div>
            <Spacer />

            <Spacer />
            <hr />
            <h2 className="text-2xl text-center">Thanks</h2>
            <div>
                Thanks to the young Magellan&#39;s group chat. Olle, Pontus, and
                CP.
            </div>
            <Spacer />
            <hr />
            <div>
                <hr />
                <Spacer />
                <p>
                    Made by
                    <MyLink href="https://karnellschultz.com/about">
                        Karnell Schultz
                    </MyLink>
                    -
                    <MyLink href="https://github.com/KarnellSchultz/capitals">
                        source code here
                    </MyLink>
                </p>
            </div>
            <div>
                <Spacer />
                <h2 className="text-2xl text-center ">Happy guessing!</h2>
            </div>
            <Spacer />
        </div>
    )
}
