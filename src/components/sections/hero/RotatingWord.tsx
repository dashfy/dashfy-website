'use client'

import { useEffect, useState } from 'react'

import { cn, generateReactKey } from '@/lib/utils'

interface RotatingWordItem {
  word: string
  color: string
}

const WORDS: readonly RotatingWordItem[] = [
  { word: 'developers', color: 'var(--muted-foreground)' },
  { word: 'builders', color: 'oklch(0.72 0.16 160)' },
  { word: 'engineers', color: 'oklch(0.74 0.15 90)' },
  { word: 'teams', color: 'oklch(0.68 0.18 310)' },
  { word: 'everything', color: 'oklch(0.72 0.16 200)' },
] as const

const ROTATE_INTERVAL_MS = 6_000

export const RotatingWord = () => {
  const [state, setState] = useState<{ index: number; prev: number | null }>({
    index: 0,
    prev: null,
  })

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setState((state) => ({ index: (state.index + 1) % WORDS.length, prev: state.index }))
    }, ROTATE_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <span className="relative inline-block overflow-hidden align-bottom" aria-hidden>
        <span className="invisible">{WORDS[state.index].word}</span>
        {WORDS.map((item, index) => (
          <span
            key={generateReactKey('word', item.word)}
            className={cn(
              'absolute top-0 left-0 whitespace-nowrap',
              index === state.index
                ? 'animate-word-in'
                : index === state.prev
                  ? 'animate-word-out'
                  : 'opacity-0',
            )}
            style={{ color: item.color }}
          >
            {item.word}
          </span>
        ))}
      </span>
      <span className="sr-only">{WORDS[state.index].word}</span>
    </>
  )
}
