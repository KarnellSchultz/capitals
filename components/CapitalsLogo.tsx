export const CapitalsLogoSize = {
    SMALL: 'SMALL',
    LARGE: 'LARGE',
} as const

type Props = {
    size: typeof CapitalsLogoSize[keyof typeof CapitalsLogoSize]
}
export const CapitalsLogo = ({ size }: Props) => (
    <h1
        className={` ${
            size === CapitalsLogoSize.LARGE ? 'text-4xl' : 'text-1xl'
        }  uppercase`}>
        Capita
        <span className="text-lime-700">l</span>s
    </h1>
)
