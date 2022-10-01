import Head from 'next/head'
import { ToastContainer } from 'react-toastify'
import { Footer } from './Footer'
import { Nav } from './Nav'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
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
                <title>Capitals Magellan</title>
            </Head>
            <div className="grid sm:gap-4 sm:grid-cols-8 h-screen">
                <div
                    className="sm:col-start-2 sm:col-span-6 md:col-start-3 md:col-span-4 mx-4
                flex flex-col">
                    <Nav />
                    <div className="h-full">{children}</div>
                    <Footer />
                </div>
                <ToastContainer
                    style={{ textAlign: 'center' }}
                    position="top-center"
                    autoClose={5000}
                    newestOnTop={false}
                    rtl={false}
                    closeOnClick
                    hideProgressBar
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    icon
                />
            </div>
        </>
    )
}

export { Layout }
