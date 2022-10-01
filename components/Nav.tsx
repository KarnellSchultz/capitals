import Link from 'next/link'
import { CapitalsLogo } from './CapitalsLogo'

export const Nav = () => {
    return (
        <nav
            className="h-12 w-full px-2 mt-2 border-b-2 font-bold dark:border-b-slate-200
      flex justify-between items-center ">
            <div className="text-2xl">
                <Link href={'/about'} passHref>
                    <a href="">❓</a>
                </Link>
            </div>
            <Link href={'/'} passHref>
                <a href="">
                    <CapitalsLogo size="LARGE" />
                </a>
            </Link>
            <div className="text-2xl">
                <Link href={'/settings'} passHref>
                    <a href="">🔧</a>
                </Link>
            </div>
        </nav>
    )
}
