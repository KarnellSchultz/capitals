import Link from 'next/link'

export const Nav = () => {
    return (
        <nav
            className="h-12 w-full px-2 mt-2 border-b-2 font-bold dark:border-b-slate-200
      flex justify-between items-center ">
            <div>
                <Link href={'/about'}>
                    <a href="">❓</a>
                </Link>
            </div>
            <Link href={'/'}>
                <h1 className="text-4xl uppercase">
                    Capita
                    <span className="text-lime-700">l</span>s
                </h1>
            </Link>
            <div>
                <Link href={'/settings'}>
                    <a href="">🔧</a>
                </Link>
            </div>
        </nav>
    )
}
