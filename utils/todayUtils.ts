import { countries } from 'countries-list'
import { FORCED_COUNTRIES_2023 } from './forced-countries'

export function daysIntoYear(date: any) {
    return (
        (Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) -
            Date.UTC(date.getFullYear(), 0, 0)) /
        24 /
        60 /
        60 /
        1000
    )
}

export const dayOfYear = daysIntoYear(new Date())
export const dayOfYearString = daysIntoYear(new Date()).toString()

export function getTodaysCountry() {
    return countries[FORCED_COUNTRIES_2023[dayOfYear]]
}


