'use client'

import { useEffect, useRef, useState } from 'react'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ChevronRightIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

import { DashboardPreview } from './DashboardPreview'
import { GetStartedDialog } from './GetStartedDialog'
import { RotatingWord } from './RotatingWord'

const GAP_PX = 32

export const HeroDesktop = () => {
  const textRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const [shiftPx, setShiftPx] = useState(0)

  useEffect(() => {
    const text = textRef.current
    const preview = previewRef.current

    if (!text || !preview) {
      return
    }

    const desktop = window.matchMedia('(min-width: 768px)')

    const update = () => {
      const previewRect = preview.getBoundingClientRect()

      if (!desktop.matches || previewRect.width === 0) {
        setShiftPx(0)
        return
      }

      const textRect = text.getBoundingClientRect()
      const overlapPx = textRect.right + GAP_PX - previewRect.left
      setShiftPx(overlapPx > 0 ? overlapPx : 0)
    }

    update()

    const resizeObserver = new ResizeObserver(update)
    resizeObserver.observe(text)
    resizeObserver.observe(preview)
    window.addEventListener('resize', update)
    desktop.addEventListener('change', update)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', update)
      desktop.removeEventListener('change', update)
    }
  }, [])

  return (
    <>
      <div className="relative mx-auto hidden max-w-5xl px-6 md:block md:h-screen md:max-h-[950px] md:max-w-7xl md:pb-8">
        <div className="flex h-full flex-col items-start justify-center">
          <div
            ref={textRef}
            className="animate-hero-text-slide-up-fade relative z-10 max-w-3xl lg:pl-16"
          >
            <div className="inline-flex items-center">
              <ExternalLink
                className="rainbow-border mb-10 inline-flex items-center justify-center rounded-full p-px text-sm leading-none"
                href={siteConfig.links.github}
              >
                <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-2 whitespace-nowrap">
                  Open source dashboard framework
                  <ChevronRightIcon className="size-3" />
                </span>
              </ExternalLink>
            </div>

            <h1 className="pb-3 text-left text-6xl leading-[1.05] font-semibold tracking-tight text-balance lg:text-7xl">
              Dashboards for
              <br />
              <RotatingWord />
            </h1>

            <p className="mt-2 mb-8 max-w-120 text-left text-lg leading-normal text-muted-foreground">
              Define dashboards as code. Connect APIs. <br /> Render real-time interfaces.
            </p>

            <div className="flex flex-row items-stretch justify-start gap-3">
              <GetStartedDialog />
              <Button
                className="h-12 rounded-xl px-8 text-base font-semibold"
                size="lg"
                variant="outline"
                asChild
              >
                <ExternalLink href={siteConfig.links.docs}>Documentation</ExternalLink>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={previewRef}
        className="animate-hero-preview-scale-in-fade absolute top-1/2 right-0 hidden w-[80vw] max-w-none translate-x-[40%] -translate-y-1/2 md:block lg:w-[1100px] lg:translate-x-[35%]"
      >
        <div
          className="transition-transform duration-300 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(${shiftPx}px)` }}
        >
          <DashboardPreview className="rounded-l-md rounded-r-none border-r-0" />
        </div>
      </div>
    </>
  )
}
