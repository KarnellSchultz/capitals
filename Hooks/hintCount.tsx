import { dayOfYear } from '../todays-utils/useTodays'

type HintCount = {
    day: number
    count: number
}
const HINT_COUNT_KEY = 'hint-count-key'

export function loadHintCount(): HintCount {
    if (typeof window === 'undefined') return {count:0, day:0}
    const storedHintCount = localStorage.getItem(HINT_COUNT_KEY)
    return storedHintCount != null ? JSON.parse(storedHintCount) : {}
}

export function saveHintCount(count: number) {
    if (typeof window === 'undefined') return {}
    const storedCount = loadHintCount()

    localStorage.setItem(
        HINT_COUNT_KEY,
        JSON.stringify({
            day: dayOfYear,
            count,
        })
    )
}
