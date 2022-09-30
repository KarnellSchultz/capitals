import Link from 'next/link'
import { CapitalsLogo } from './CapitalsLogo'

export const Footer = () => {
    return (
        <div
            className="h-12 w-full my-4 font-bold dark:border-b-slate-200
            flex justify-center items-center">
            <div className="flex flex-col items-center">
                <CapitalsLogo size="SMALL" />
                <Link href={'https://karnellschultz.com/'}>
                    <a className="underline underline-offset-2">
                        Made with ❤️ by Karnell Schultz
                    </a>
                </Link>
            </div>
        </div>
    )
}
