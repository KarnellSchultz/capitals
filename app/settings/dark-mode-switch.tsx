'use client'
import { useState } from 'react'
import Switch from 'react-switch'

export const DarkModeSwitch = () => {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
    }
    return <Switch onChange={handleChange} checked={checked} />
}
