'use client'

import { useState } from 'react'
import Switch from 'react-switch'

export default function SettingsPage() {
    const [checked, setChecked] = useState(false)

    const handleChange = () => {
        setChecked(!checked)
    }

    return (
        <div>
            <h2 className="text-2xl text-center my-4">Settings</h2>

            <div className="flex justify-between my-6 ">
                <div className="text-lg">Dark mode</div>
                <Switch onChange={handleChange} checked={checked} />
            </div>
            <div className="text-center">🚧🚧under construction🚧🚧</div>
        </div>
    )
}
