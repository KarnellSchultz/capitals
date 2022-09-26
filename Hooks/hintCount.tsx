import { dayOfYear } from '../todays-utils/useTodays'

type HintCountWithKey = {
    [key: number]: {
        count: number
    }
}

type HintCount = {
    count: number
}

const HINT_COUNT_KEY = 'hint-count-key'
const defaultCount = {
    [dayOfYear]: { count: 0 },
}

export function loadHintCount(): HintCount {
    if (typeof window === 'undefined') return defaultCount[dayOfYear]
    const storedHintCount = localStorage.getItem(HINT_COUNT_KEY)
    const returnValue =
        storedHintCount != null ? JSON.parse(storedHintCount) : defaultCount
    return returnValue[dayOfYear]
}

export function saveHintCount(count: number) {
    if (typeof window === 'undefined') return {}
    const storedCount: HintCountWithKey = loadHintCount()

    localStorage.setItem(
        HINT_COUNT_KEY,
        JSON.stringify({
            [dayOfYear]: {
                count,
            },
        })
    )
}
