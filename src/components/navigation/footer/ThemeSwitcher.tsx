'use client'

import { Monitor, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'

import { cn, generateReactKey } from '@/lib/utils'

const THEME_OPTIONS = [
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
] as const

const emptySubscribe = () => () => {}

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  )

  return (
    <div className="flex items-center gap-1 rounded-full p-1">
      {THEME_OPTIONS.map((option, index) => {
        const isActive = mounted && theme === option.value

        return (
          <button
            key={generateReactKey('theme', option.value, index)}
            className={cn(
              'rounded-full p-2 transition-colors',
              isActive ? 'bg-muted/50' : 'text-muted-foreground hover:text-foreground',
            )}
            onClick={() => setTheme(option.value)}
            type="button"
          >
            <option.Icon aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
