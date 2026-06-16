'use client'

import Image from 'next/image'
import { Dialog } from 'radix-ui'
import { useState } from 'react'

import { XIcon, ZoomInIcon } from '@/components/common/Icons'
import { cn } from '@/lib/utils'

interface ScreenshotItem {
  label: string
  lightSrc: string
  darkSrc: string
}

const SCREENSHOTS: readonly ScreenshotItem[] = [
  {
    label: 'GitHub Dashboard',
    lightSrc: '/brand/dashfy-screenshot_01-light.png',
    darkSrc: '/brand/dashfy-screenshot_01-dark.png',
  },
  {
    label: 'NBA Dashboard',
    lightSrc: '/brand/dashfy-screenshot_02-light.png',
    darkSrc: '/brand/dashfy-screenshot_02-dark.png',
  },
  {
    label: 'System Monitor',
    lightSrc: '/brand/dashfy-screenshot_03-light.png',
    darkSrc: '/brand/dashfy-screenshot_03-dark.png',
  },
  {
    label: 'Market Prices',
    lightSrc: '/brand/dashfy-screenshot_04-light.png',
    darkSrc: '/brand/dashfy-screenshot_04-dark.png',
  },
] as const

interface ScreenshotCardProps extends ScreenshotItem {
  eager?: boolean
  onClick: () => void
}

const ScreenshotCard = ({ label, lightSrc, darkSrc, eager, onClick }: ScreenshotCardProps) => {
  return (
    <button
      aria-label={`Open ${label} screenshot`}
      className="group/card w-[280px] shrink-0 cursor-pointer focus-visible:outline-hidden sm:w-[360px] md:w-[440px] lg:w-[520px]"
      type="button"
      onClick={onClick}
    >
      <div className="relative aspect-16/10 overflow-hidden rounded border border-border bg-card shadow-xl transition-transform duration-300 ease-out group-hover/card:scale-[1.015] group-focus-visible/card:ring-2 group-focus-visible/card:ring-ring motion-reduce:transition-none motion-reduce:group-hover/card:scale-100">
        <Image
          alt={label}
          className="object-cover transition-transform duration-500 ease-out select-none group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 dark:hidden"
          draggable={false}
          fill
          loading={eager ? 'eager' : 'lazy'}
          quality={100}
          sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 440px, 520px"
          src={lightSrc}
        />
        <Image
          alt={label}
          className="hidden object-cover transition-transform duration-500 ease-out select-none group-hover/card:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover/card:scale-100 dark:block"
          draggable={false}
          fill
          loading={eager ? 'eager' : 'lazy'}
          quality={100}
          sizes="(max-width: 640px) 280px, (max-width: 768px) 360px, (max-width: 1024px) 440px, 520px"
          src={darkSrc}
        />

        <span
          aria-hidden
          className="absolute inset-0 bg-background/30 opacity-0 transition-opacity duration-200 group-hover/card:opacity-100 motion-reduce:transition-none"
        />

        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-200 group-hover/card:opacity-100 motion-reduce:transition-none"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/90 px-3 py-1.5 text-sm font-medium text-foreground shadow-lg backdrop-blur">
            <ZoomInIcon className="size-4" />
            View
          </span>
        </span>

        <span className="absolute right-3 bottom-3 rounded bg-primary/80 px-2 py-1 text-xs font-medium tracking-wide text-primary-foreground backdrop-blur">
          {label}
        </span>
      </div>
    </button>
  )
}

export const ScreenshotsMarquee = () => {
  const track = [...SCREENSHOTS, ...SCREENSHOTS, ...SCREENSHOTS]
  const [activeScreenshot, setActiveScreenshot] = useState<ScreenshotItem | null>(null)

  return (
    <div className="group/screenshots-marquee relative w-full overflow-hidden py-8 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-40"
      />

      <div
        className={cn(
          'animate-scroll flex space-x-6 will-change-transform group-hover/screenshots-marquee:paused md:space-x-8',
          activeScreenshot && 'paused',
        )}
        style={{ animationDuration: '50s', width: 'max-content' }}
      >
        {track.map((item, index) => (
          <ScreenshotCard
            key={`${item.label}-${index}`}
            darkSrc={item.darkSrc}
            eager={index < SCREENSHOTS.length}
            label={item.label}
            lightSrc={item.lightSrc}
            onClick={() => setActiveScreenshot(item)}
          />
        ))}
      </div>

      <Dialog.Root
        open={!!activeScreenshot}
        onOpenChange={(open) => {
          if (!open) {
            setActiveScreenshot(null)
          }
        }}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="data-[state=open]:animate-fade-in-blur fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" />
          <Dialog.Content
            className="fixed inset-0 z-50 flex items-center justify-center p-6 sm:p-12"
            onClick={(event) => {
              if (event.target === event.currentTarget) {
                setActiveScreenshot(null)
              }
            }}
          >
            {activeScreenshot && (
              <div className="relative w-full max-w-6xl">
                <Image
                  alt={activeScreenshot.label}
                  className="h-auto w-full rounded border border-border bg-background shadow-2xl dark:hidden"
                  height={1080}
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 85vw, 1280px"
                  src={activeScreenshot.lightSrc}
                  width={1920}
                />
                <Image
                  alt={activeScreenshot.label}
                  className="hidden h-auto w-full rounded border border-border bg-background shadow-2xl dark:block"
                  height={1080}
                  priority
                  quality={100}
                  sizes="(max-width: 768px) 92vw, (max-width: 1280px) 85vw, 1280px"
                  src={activeScreenshot.darkSrc}
                  width={1920}
                />
                <Dialog.Title className="sr-only">{activeScreenshot.label}</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Full-size preview of the {activeScreenshot.label} screenshot.
                </Dialog.Description>
                <span className="absolute right-3 bottom-3 rounded bg-primary/80 px-2 py-1 text-xs font-medium tracking-wide text-primary-foreground backdrop-blur">
                  {activeScreenshot.label}
                </span>
              </div>
            )}
            <Dialog.Close
              aria-label="Close"
              className="absolute top-4 right-4 inline-flex size-10 items-center justify-center rounded-full border border-border bg-primary text-primary-foreground backdrop-blur transition-colors hover:bg-primary/80"
            >
              <XIcon className="size-5" />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}
