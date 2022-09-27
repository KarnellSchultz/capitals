import { dayOfYear } from '../todayUtils'

type HintCountWithKey = {
    [key: number]: {
        count: number
    }
}

type HintCount = {
    count: number
}

const defaultCount = {
    [dayOfYear]: { count: 0 },
}

const HINT_COUNT_KEY = 'hint-count-key'

export function loadHintCount(): HintCount {
    if (typeof window === 'undefined') return defaultCount[dayOfYear]
    const storedHintCount = localStorage.getItem(HINT_COUNT_KEY)

    if (storedHintCount != null && JSON.parse(storedHintCount)[dayOfYear]) {
        return JSON.parse(storedHintCount)[dayOfYear]
    } else {
        localStorage.setItem(HINT_COUNT_KEY, JSON.stringify(defaultCount))
        return defaultCount[dayOfYear]
    }
}

export function saveHintCount(count: number) {
    if (typeof window === 'undefined') return {}
    // const storedCount: HintCountWithKey = loadHintCount()

    localStorage.setItem(
        HINT_COUNT_KEY,
        JSON.stringify({
            [dayOfYear]: {
                count,
            },
        })
    )
}
