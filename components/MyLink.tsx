type Props = {
    children: React.ReactNode
    href: string
}
export function MyLink({ children, href }: Props) {
    return (
        <span>
            &nbsp;
            <a
                className="underline underline-offset-2"
                target="_blank"
                rel="noreferrer"
                href={href}>
                {children}
            </a>
            &nbsp;
        </span>
    )
}
