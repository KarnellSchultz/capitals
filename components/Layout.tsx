import { Nav } from './Nav'

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="grid sm:gap-4 sm:grid-cols-8">
            <div
                className="sm:col-start-2 sm:col-span-6 md:col-start-3 md:col-span-4 ">
                <Nav />
                {children}
            </div>
        </div>
    )
}

export { Layout }
