import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: '🤡 Not Found - Capitals Magellan',
    description: 'Page not found but you can get back to the game.',
}

export default function NotFound() {
    return (
        <div className="h-full grid content-center ">
            <h2 className="text-2xl text-center my-4">
                oops, page was not found{' '}
            </h2>
            <button
                className="w-full rounded py-1 px-6 border-2 disabled:bg-slate-300 disabled:cursor-not-allowed first-letter
    dark:bg-emerald-700 hover:dark:bg-emerald-800 dark:hover:text-white
    bg-lime-500 hover:bg-lime-400">
                <Link href="/">Back to the Game</Link>
            </button>
        </div>
    )
}
