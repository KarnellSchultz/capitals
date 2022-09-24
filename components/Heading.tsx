type Props = { name: string; emoji: string }
export const Heading = ({ name, emoji }: Props) => {
    return (
        <div className="">
            <h2 className="text-3xl my-4 text-center font-bold text-gray-700 uppercase">
                {name}
            </h2>
            <h3 className="text-3xl text-center my-4">{emoji}</h3>
        </div>
    )
}
