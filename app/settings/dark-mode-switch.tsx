'use client'
import { useEffect, useState } from 'react'
import Switch from 'react-switch'

export const DarkModeSwitch = () => {
    const [checked, setChecked] = useState(false)
    const theme = !checked ? 'dark' : 'light'

    const handleChange = () => {
        window.localStorage.setItem('theme', theme)
        setChecked(!checked)
    }

    useEffect(() => {
        const localStorageTheme = window.localStorage.getItem('theme')
        if (localStorageTheme === 'dark') {
            setChecked(true)
        }
        if (localStorageTheme === 'light') {
            setChecked(false)
        }
    }, [])

    return <Switch onChange={handleChange} checked={checked} />
}
