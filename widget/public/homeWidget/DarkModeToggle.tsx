// components/DarkModeToggle.tsx  ← component riêng, nhỏ gọn
'use client'

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { toggleDarkMode } from '@/lib/store/slices/uiSlice'
import { Button } from '@/components/ui/button'

export default function DarkModeToggle() {
    const dispatch = useAppDispatch()
    const isDarkMode = useAppSelector(state => state.ui.isDarkMode)

    return (
        <Button
            className={`${isDarkMode ? 'text-white' : 'text-black'} rounded-full`}
            variant="outline"
            onClick={() => dispatch(toggleDarkMode())}
        >
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
    )
}