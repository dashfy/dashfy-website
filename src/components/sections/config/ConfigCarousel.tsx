'use client'

import { Fragment, useCallback, useEffect, useState } from 'react'

import { Scrollable } from '@/components/common/Scrollable'
import { generateReactKey } from '@/lib/utils'

import type { StepMeta } from './codeExample'

export interface Step extends StepMeta {
  codeHtml: string
}

const ROTATE_INTERVAL_MS = 6_000

interface CodePanelProps {
  filename: string
  language: string
  code: string
  codeHtml: string
}

const CodePanel = ({ filename, language, code, codeHtml }: CodePanelProps) => {
  const lines = code.split('\n')

  return (
    <div className="flex h-full w-full flex-col overflow-hidden border border-border bg-card">
      <div className="flex shrink-0 items-center justify-between border-b border-border bg-muted/60 px-3 py-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/30" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">{filename}</span>
        </div>
        <span className="text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
          {language}
        </span>
      </div>

      <Scrollable className="flex min-h-0 flex-1">
        <div className="flex min-h-full w-max">
          <div
            className="shrink-0 border-r border-border bg-muted/30 px-3 py-4 text-right font-mono text-xs leading-relaxed text-muted-foreground/60 select-none"
            aria-hidden
          >
            {lines.map((_, index) => (
              <div key={generateReactKey('line', index)}>{index + 1}</div>
            ))}
          </div>
          <div
            className="code-panel min-w-0 flex-1 px-4 py-4 text-xs leading-relaxed"
            dangerouslySetInnerHTML={{ __html: codeHtml }}
          />
        </div>
      </Scrollable>
    </div>
  )
}

interface StepBlockProps {
  step: Step
}

const StepBlock = ({ step }: StepBlockProps) => {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="mx-auto max-w-md text-2xl font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mx-auto max-w-md text-base leading-normal text-muted-foreground">
          {step.description}
        </p>
      </div>
      <div className="relative w-full overflow-hidden border border-border p-1 sm:p-3">
        <div className="relative flex h-[520px] w-full items-center justify-center overflow-hidden sm:h-[620px]">
          <CodePanel
            code={step.code}
            codeHtml={step.codeHtml}
            filename={step.filename}
            language={step.language}
          />
        </div>
      </div>
    </div>
  )
}

interface StepTimelineProps {
  steps: readonly Step[]
  activeStep: number
  isPaused?: boolean
  onSelect: (index: number) => void
}

const StepTimeline = ({ steps, activeStep, isPaused = false, onSelect }: StepTimelineProps) => {
  return (
    <div className="flex flex-col">
      <div className="mb-6 flex items-center">
        <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Configuration
        </span>
      </div>

      <ol className="grid grid-cols-[auto_1fr] gap-x-4">
        {steps.map((step, index) => {
          const isActive = index === activeStep
          const isLast = index === steps.length - 1

          return (
            <Fragment key={generateReactKey('step', step.id)}>
              <div className="relative flex flex-col items-center">
                <button
                  aria-label={`Go to step: ${step.title}`}
                  className="relative z-10 mt-2 cursor-pointer"
                  type="button"
                  onClick={() => onSelect(index)}
                >
                  <span
                    className={`block size-2 transition-all duration-200 ease-out ${
                      isActive ? 'scale-[1.2] bg-primary' : 'bg-border hover:bg-muted-foreground'
                    }`}
                  />
                </button>
                {!isLast && (
                  <span
                    className="absolute top-5 bottom-0 w-px overflow-hidden border-l border-border"
                    aria-hidden
                  >
                    {isActive && (
                      <span
                        className="absolute -inset-x-px top-0 block w-px bg-primary"
                        style={{
                          animation: `step-progress ${ROTATE_INTERVAL_MS}ms linear forwards`,
                          animationPlayState: isPaused ? 'paused' : 'running',
                        }}
                        aria-hidden
                      />
                    )}
                  </span>
                )}
              </div>

              <button
                className={`pb-6 text-left transition-opacity duration-300 ${
                  isActive ? 'opacity-100' : 'cursor-pointer opacity-60 hover:opacity-80'
                } ${isLast ? 'pb-0' : ''}`}
                type="button"
                onClick={() => onSelect(index)}
              >
                {isActive ? (
                  <div className="animate-fade-in-blur overflow-hidden">
                    <h3 className="max-w-md text-lg text-primary transition-colors duration-300 lg:text-xl">
                      {step.title}
                    </h3>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-primary">
                      {step.description}
                    </p>
                  </div>
                ) : (
                  <h3 className="max-w-md text-lg text-muted-foreground transition-colors duration-300 lg:text-xl">
                    {step.title}
                  </h3>
                )}
              </button>
            </Fragment>
          )
        })}
      </ol>
    </div>
  )
}

interface StepPreviewProps {
  step: Step
}

const StepPreview = ({ step }: StepPreviewProps) => {
  return (
    <div className="relative flex h-full items-center justify-center overflow-hidden border border-border bg-background p-6 lg:p-8">
      <div className="step-art-grid absolute inset-0" aria-hidden />
      <div className="animate-fade-in-scale relative h-full w-full">
        <CodePanel
          code={step.code}
          codeHtml={step.codeHtml}
          filename={step.filename}
          language={step.language}
        />
      </div>
    </div>
  )
}

interface ConfigCarouselProps {
  steps: readonly Step[]
}

export const ConfigCarousel = ({ steps }: ConfigCarouselProps) => {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) {
      return
    }

    const intervalId = window.setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, ROTATE_INTERVAL_MS)

    return () => {
      window.clearInterval(intervalId)
    }
  }, [isPaused, activeStep, steps.length])

  const handleSelect = useCallback((index: number) => {
    setActiveStep(index)
  }, [])

  return (
    <section className="border-b border-border bg-background" id="config">
      <div className="mx-auto w-full max-w-[1400px] px-6 pt-12 pb-20 sm:pt-16 lg:pt-24 lg:pb-24 xl:pt-28">
        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:hidden">
          <div className="space-y-2 text-center">
            <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
              Configuration
            </span>
            <h2 className="mx-auto max-w-md text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Dashboards as code
            </h2>
            <p className="mx-auto max-w-md text-base leading-normal text-muted-foreground">
              Three small files take a dashboard from idea to live in the browser.
            </p>
          </div>

          {steps.map((step) => (
            <StepBlock key={generateReactKey('step', step.id)} step={step} />
          ))}
        </div>

        <div
          className="hidden lg:grid lg:h-[720px] lg:grid-cols-2 lg:gap-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <StepTimeline
            activeStep={activeStep}
            isPaused={isPaused}
            steps={steps}
            onSelect={handleSelect}
          />
          <StepPreview
            key={generateReactKey('step', steps[activeStep].id)}
            step={steps[activeStep]}
          />
        </div>
      </div>
    </section>
  )
}
