import { DarkModeSwitch } from './dark-mode-switch'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings for the Capitals game.',
}

export default function SettingsPage() {
    return (
        <div>
            <h2 className="text-2xl text-center my-4">Settings</h2>

            <div className="flex justify-between my-6 ">
                <div className="text-lg">Dark mode</div>
                <DarkModeSwitch />
            </div>
            <div className="text-center">🚧🚧under construction🚧🚧</div>
        </div>
    )
}
