import Link from 'next/link'
import { CapitalsLogo } from './CapitalsLogo'

export const Footer = () => {
    return (
        <div
            className="h-12 w-full my-4 font-bold
            flex justify-center items-center">
            <div className="flex items-center">
                <div className="mx-1">❤️</div>
                <CapitalsLogo size="SMALL" />
                <div className="mx-1">-</div>
                <Link passHref href="https://ko-fi.com/karnell">
                    <a className="underline underline-offset-2 ">
                        Buy me a ☕️
                    </a>
                </Link>
            </div>
        </div>
    )
}
