// components/ThemeSync.tsx
'use client'

import { useEffect } from 'react'
import { useAppSelector } from '@/lib/store/hooks'

export default function ThemeSync() {
    const isDarkMode = useAppSelector(state => state.ui.isDarkMode)

    useEffect(() => {
        const root = document.documentElement
        if (isDarkMode) {
            root.classList.add('dark')
        } else {
            root.classList.remove('dark')
        }
    }, [isDarkMode])

    return null
}