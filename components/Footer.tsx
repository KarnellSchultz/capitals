import Link from 'next/link'
import { CapitalsLogo } from './CapitalsLogo'

export const Footer = () => {
    return (
        <div
            className="h-12 w-full my-1 font-bold
            flex justify-center items-center">
            <div className="flex items-center">
                <div className="mx-1">❤️</div>
                <CapitalsLogo size="SMALL" />
                <div className="mx-1">-</div>
                <Link passHref href="https://ko-fi.com/karnell">
                    Buy me a ☕️
                </Link>
            </div>
        </div>
    )
}
