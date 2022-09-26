import { useState } from 'react'
import { daysIntoYear } from '../todays-utils/useTodays'

const KEY = 'guesses'

export const useLocalStorageGuesses = () => {
    const today = daysIntoYear(new Date()).toString()
    const [todaysLocalStorageGameState, setTodaysLocalStorageGameState] =
        useState(() => {
            if (typeof window === 'undefined') {
                return []
            }
            try {
                const currentGameState = localStorage.getItem(KEY)

                if (!currentGameState) {
                    return console.info('no local storage game state')
                }
                return JSON.parse(currentGameState)
            } catch (err) {
                console.log(err)
            }
        })
    // const todaysLocalStorageGameState = loadLocalStorageGameState()

    const setLocalStorageGameState = (gameState: GameStateSliceType[]) => {
        try {
            if (gameState.length === 0) {
                return console.log('exit early')
            }
            const valueToStore =
                gameState instanceof Function
                    ? gameState(todaysLocalStorageGameState)
                    : gameState
            // console.log('SET GAME STATE VALUE', valueToStore)
            if (typeof window !== 'undefined') {
                setTodaysLocalStorageGameState(valueToStore[today])
                const tempValue = {
                    [today]: valueToStore,
                }
                window.localStorage.setItem(KEY, JSON.stringify(tempValue))
            }
        } catch (err) {
            console.log(err)
        }
    }

    return { todaysLocalStorageGameState, setLocalStorageGameState }
}

// Hook
// export function useLocalStorageGuesses<T>(key: string, initialValue: T) {
//     // State to store our value
//     // Pass initial state function to useState so logic is only executed once
//     const [storedValue, setStoredValue] = useState<T>(() => {
//         if (typeof window === 'undefined') {
//             return initialValue
//         }
//         try {
//             // Get from local storage by key
//             const item = window.localStorage.getItem(key)
//             console.log({ item })

//             // Parse stored json or if none return initialValue
//             return item ? JSON.parse(item) : initialValue
//         } catch (error) {
//             // If error also return initialValue
//             console.log(error)
//             return initialValue
//         }
//     })
//     // Return a wrapped version of useState's setter function that ...
//     // ... persists the new value to localStorage.
//     const setValue = (value: T | ((val: T) => T)) => {
//         try {
//             // Allow value to be a function so we have same API as useState
//             const valueToStore =
//                 value instanceof Function ? value(storedValue) : value
//             // Save state
//             setStoredValue(valueToStore)
//             // Save to local storage
//             if (typeof window !== 'undefined') {
//                 window.localStorage.setItem(key, JSON.stringify(valueToStore))
//             }
//         } catch (error) {
//             // A more advanced implementation would handle the error case
//             console.log(error)
//         }
//     }
//     return [storedValue, setValue] as const
// }
