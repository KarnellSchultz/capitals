import { useMemo } from 'react'
import { countries } from 'countries-list'
import ReactSelect from 'react-select'
import { useCapitalGameStore } from '../stores/capitalGameStore'

export const CountrySelect = () => {
    const setSelectValue = useCapitalGameStore(
        ({ setSelectValue }) => setSelectValue
    )

    const options = useMemo(
        () =>
            [...new Set(Object.keys(countries))]
                .map(c => {
                    return {
                        value: countries[c as keyof typeof countries].capital,
                        label: countries[c as keyof typeof countries].capital,
                    }
                })
                .filter(el => el.value !== ''),
        []
    )

    const onChange = (newValue: string) => {
        setSelectValue(newValue)
    }

    return (
        <div className="w-ful mb-1">
            <ReactSelect
                onChange={e => onChange(e?.value ?? '')}
                options={options}
            />
        </div>
    )
}
