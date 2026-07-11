'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

import { ExternalLink } from '@/components/common/ExternalLink'
import { PlayIcon } from '@/components/common/Icons'
import { siteConfig } from '@/config/site'
import { cn, generateReactKey } from '@/lib/utils'

const SCREENSHOT_VARIANTS = [1, 2, 3, 4] as const
const SLIDE_INTERVAL_MS = 6_000

export const DashboardPreview = ({ className, ...props }: React.ComponentProps<'div'>) => {
  const [dismissed, setDismissed] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      return
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SCREENSHOT_VARIANTS.length)
    }, SLIDE_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPaused])

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    setDismissed(true)
    event.currentTarget.blur()
  }

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleReset = () => {
    setIsPaused(false)

    if (dismissed) {
      setDismissed(false)
    }
  }

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-md border border-border bg-card shadow-2xl',
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleReset}
      {...props}
    >
      <div className="flex h-12 items-center gap-2 border-b border-border bg-muted/50 px-4 py-2">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-red-500" aria-hidden />
          <span className="size-3 rounded-full bg-yellow-500" aria-hidden />
          <span className="size-3 rounded-full bg-green-500" aria-hidden />
        </div>
        <ExternalLink
          className="mx-4 flex flex-1 items-center gap-2 rounded-md border border-border bg-background/20 px-3 py-1 text-sm text-muted-foreground transition-colors hover:bg-background/40 hover:text-foreground"
          href={siteConfig.links.demo}
          onClick={handleClick}
        >
          <span className="flex-1">{siteConfig.links.demo}</span>
        </ExternalLink>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {SCREENSHOT_VARIANTS.map((variant, index) => (
            <div key={generateReactKey('screenshot', variant)} className="relative w-full shrink-0">
              <Image
                alt={`${siteConfig.name} dashboard preview ${variant} (light mode)`}
                className={cn(
                  'block h-auto w-full transition-opacity duration-300 dark:hidden',
                  !dismissed && 'group-focus-within:opacity-40 group-hover:opacity-40',
                )}
                height={1080}
                loading={index === 0 ? undefined : 'lazy'}
                priority={index === 0}
                sizes="(max-width: 768px) 0px, (max-width: 1280px) 80vw, 1100px"
                src={`/brand/dashfy-screenshot_0${variant}-light.png`}
                width={1920}
              />
              <Image
                alt={`${siteConfig.name} dashboard preview ${variant} (dark mode)`}
                className={cn(
                  'hidden h-auto w-full transition-opacity duration-300 dark:block',
                  !dismissed && 'group-focus-within:opacity-40 group-hover:opacity-40',
                )}
                height={1080}
                loading={index === 0 ? undefined : 'lazy'}
                priority={index === 0}
                sizes="(max-width: 768px) 0px, (max-width: 1280px) 80vw, 1100px"
                src={`/brand/dashfy-screenshot_0${variant}-dark.png`}
                width={1920}
              />
            </div>
          ))}
        </div>

        <div
          className={cn(
            'pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300',
            !dismissed && 'group-focus-within:opacity-100 group-hover:opacity-100',
          )}
        >
          <div className="relative">
            <span
              className="absolute inset-0 animate-ping rounded-full bg-primary/40"
              aria-hidden
            />
            <ExternalLink
              aria-label="Live demo"
              className="pointer-events-auto relative flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-border/50 transition hover:scale-105 focus-visible:scale-105 focus-visible:outline-hidden sm:size-20"
              href={siteConfig.links.demo}
              onClick={handleClick}
            >
              <PlayIcon className="ml-1 size-7 fill-current sm:size-8" aria-hidden />
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  )
}
