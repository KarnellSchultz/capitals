import Link from 'next/link'
import { CapitalsLogo } from './CapitalsLogo'

export const Nav = () => {
    return (
        <nav
            className="h-12 w-full px-2 mt-2 border-b-2 font-bold dark:border-b-slate-200
      flex justify-between items-center ">
            <div className="text-2xl">
                <Link href={'/about'}>
                    <a href="">❓</a>
                </Link>
            </div>
            <Link href={'/'}>
                <a href="">
                    <CapitalsLogo size="LARGE" />
                </a>
            </Link>
            <div className="text-2xl">
                <Link href={'/settings'}>
                    <a href="">🔧</a>
                </Link>
            </div>
        </nav>
    )
}
