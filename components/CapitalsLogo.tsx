export const CapitalsLogoSize = {
    SMALL: 'SMALL',
    LARGE: 'LARGE',
} as const

type CapitalsLogoProps = {
    size: typeof CapitalsLogoSize[keyof typeof CapitalsLogoSize]
}
export const CapitalsLogo = ({ size }: CapitalsLogoProps) => (
    <h1
        className={` ${
            size === CapitalsLogoSize.LARGE ? 'text-4xl' : 'text-1xl'
        }  uppercase`}>
        Capita
        <span className="text-blue-500 dark:text-pink-800">l</span>s
    </h1>
)
