import Head from 'next/head'
import { NextRouter, useRouter } from 'next/router'
import { Footer } from './Footer'
import { Nav } from './Nav'

type LayoutProps = {
    children: React.ReactNode
}

const getTitle = (route: NextRouter) => {
    if (route.pathname === '/') return 'Capitals Magellan'
    return route.pathname
        .replaceAll('-', ' ')
        .replaceAll('/', '')
        .split(' ')
        .map(word => word.charAt(0).toLocaleUpperCase() + word.slice(1) + ' ')
        .join(' ')
}

const Layout = ({ children }: LayoutProps) => {
    const router = useRouter()

    return (
        <>
            <Head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest"></link>
                <meta
                    name="description"
                    content="Capital game to guess the worlds capitals"
                />
                <title>{getTitle(router)}</title>
            </Head>

            <div className="grid sm:gap-4 sm:grid-cols-8 h-screen">
                <div
                    className="sm:col-start-2 sm:col-span-6 md:col-start-3 md:col-span-4 mx-4
                flex flex-col">
                    <Nav />
                    <div className="h-full">{children}</div>
                    <Footer />
                </div>
            </div>
        </>
    )
}

export { Layout }
