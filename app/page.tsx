export const config = {
    runtime: 'edge',
}

import { Heading } from '../components/Heading'
import { getTodaysCountry } from '../utils/todayUtils'
import { CapitalsGame } from './client-page'

export default function page() {
    const country = getTodaysCountry()
    return (
        <CapitalsGame country={country}>
            <Heading name={country.name} emoji={country.emoji} />
        </CapitalsGame>
    )
}
