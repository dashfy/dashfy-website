'use client'

import { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

import { SplashScreen } from './SplashScreen'

type SplashPhase = 'visible' | 'exiting' | 'hidden'

interface SplashScreenWrapperProps {
  durationMs?: number
  fadeMs?: number
  children: React.ReactNode
}

export const SplashScreenWrapper = ({
  durationMs = 2_000,
  fadeMs = 400,
  children,
}: SplashScreenWrapperProps) => {
  const [phase, setPhase] = useState<SplashPhase>('visible')

  useEffect(() => {
    const exitTimer = setTimeout(() => setPhase('exiting'), durationMs)
    const hideTimer = setTimeout(() => setPhase('hidden'), durationMs + fadeMs)

    return () => {
      clearTimeout(exitTimer)
      clearTimeout(hideTimer)
    }
  }, [durationMs, fadeMs])

  return (
    <>
      {children}
      {phase !== 'hidden' && (
        <div
          aria-hidden={phase === 'exiting'}
          className={cn(
            'transition-opacity ease-out motion-reduce:transition-none',
            phase === 'exiting' && 'pointer-events-none opacity-0',
          )}
          style={{ transitionDuration: `${fadeMs}ms` }}
        >
          <SplashScreen />
        </div>
      )}
    </>
  )
}
