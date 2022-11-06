import { Footer } from '../components/Footer'
import { Nav } from '../components/Nav'

import 'react-toastify/dist/ReactToastify.css'
import '../styles/globals.css'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <html lang="en">
            <body className="grid sm:gap-4 sm:grid-cols-8 h-screen bg-white dark:bg-zinc-900 dark:text-zinc-300">
                <div
                    className=" sm:col-start-2 sm:col-span-6 md:col-start-3 md:col-span-4 mx-4
                flex flex-col">
                    <Nav />
                    <section className="h-full">{children}</section>
                    <Footer />
                </div>
            </body>
        </html>
    )
}
