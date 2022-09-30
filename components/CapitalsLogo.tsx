export const CapitalsLogoSize = {
    SMALL: 'SMALL',
    LARGE: 'LARGE',
} as const

type Props = {
    size: typeof CapitalsLogoSize[keyof typeof CapitalsLogoSize]
}
export const CapitalsLogo = ({ size }: Props) => (
    <h1
        className={`text-${
            size === CapitalsLogoSize.LARGE ? '4' : '1'
        }xl uppercase cursor-pointer`}>
        Capita
        <span className="text-lime-700">l</span>s
    </h1>
)
