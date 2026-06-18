'use client'

import { useTheme } from 'next-themes'

import { MonitorIcon, MoonIcon, SunIcon } from '@/components/common/Icons'
import { useMounted } from '@/hooks/useMounted'
import { cn, generateReactKey } from '@/lib/utils'

const THEME_OPTIONS = [
  { value: 'system', label: 'System', Icon: MonitorIcon },
  { value: 'light', label: 'Light', Icon: SunIcon },
  { value: 'dark', label: 'Dark', Icon: MoonIcon },
] as const

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme()
  const mounted = useMounted()

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
          >
            <option.Icon className="h-4 w-4" aria-hidden />
            <span className="sr-only">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}
