'use-client'

import { useMemo } from 'react'
import { countries } from 'countries-list'
import ReactSelect from 'react-select'
import { useCapitalGameStore } from '../stores/capitalGameStore'

type CountrySelectProps = {
    gameOver: boolean
    handleGuessClick: () => void
}
export const CountrySelect = ({
    handleGuessClick,
    gameOver,
}: CountrySelectProps) => {
    const setSelectValue = useCapitalGameStore(
        ({ setSelectValue }) => setSelectValue
    )

    const options = useMemo(
        () =>
            [...new Set(Object.keys(countries))]
                .map(c => countries[c as keyof typeof countries].capital)
                .filter(el => el !== '')
                .sort()
                .map(capital => ({
                    value: capital,
                    label: capital,
                })),
        []
    )

    const onChange = (newValue: string) => {
        setSelectValue(newValue)
    }

    return (
        <form
            onSubmit={e => {
                e.preventDefault()
                handleGuessClick()
            }}>
            <div className="w-ful mb-1 dark:text-zinc-800 ">
                <ReactSelect
                    isDisabled={gameOver}
                    onChange={e => onChange(e?.value ?? '')}
                    options={options}
                />
            </div>
        </form>
    )
}
