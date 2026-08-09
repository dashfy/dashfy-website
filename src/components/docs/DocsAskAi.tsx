'use client'

import { useChat } from '@ai-sdk/react'
import { useEffect, useRef, useState } from 'react'

import {
  ArrowRightIcon,
  RefreshCcwIcon,
  SparklesIcon,
  SquareIcon,
  TriangleAlertIcon,
} from '@/components/common/Icons'
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogTitle,
} from '@/components/common/ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'
import { cn, generateReactKey } from '@/lib/utils'

import { DocsAskAiMessage } from './DocsAskAiMessage'

const SUGGESTIONS = [
  'How do I add Dashfy to an existing Vite app?',
  'What does dashfy.json configure?',
  'How do I deploy with Docker?',
]

export const DocsAskAi = () => {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const { messages, sendMessage, status, stop, regenerate, setMessages, error, clearError } =
    useChat()

  const isBusy = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const ask = (question: string) => {
    const trimmed = question.trim()

    if (trimmed.length === 0 || isBusy) {
      return
    }

    clearError()
    setInput('')
    void sendMessage({ text: trimmed })
    trackEvent(ANALYTICS_EVENTS.docsAskAiSubmit)
  }

  return (
    <>
      <Button
        className="fixed right-4 bottom-16 z-30 rounded-full shadow-lg"
        size="lg"
        variant="secondary"
        onClick={() => {
          setOpen(true)
          trackEvent(ANALYTICS_EVENTS.docsAskAiOpen)
        }}
      >
        <SparklesIcon />
        Ask AI
      </Button>

      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogContent className="top-20 flex max-h-[70vh] translate-y-0 flex-col gap-0 p-0 md:max-w-2xl">
          <ResponsiveDialogTitle className="flex items-center gap-2 border-b border-border py-3 pr-12 pl-4 text-sm font-medium">
            <SparklesIcon className="size-4 text-muted-foreground" />
            Ask AI
            <span className="ml-auto hidden text-xs font-normal text-muted-foreground sm:inline">
              Answers can be wrong — verify against the docs
            </span>
          </ResponsiveDialogTitle>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Ask anything about {siteConfig.name}. Answers come from this documentation only.
                </p>
                <div className="flex flex-col items-start gap-2">
                  {SUGGESTIONS.map((suggestion, index) => (
                    <Button
                      key={generateReactKey('ask-ai-suggestion', suggestion, index)}
                      className="h-auto py-1.5 text-left whitespace-normal"
                      size="sm"
                      variant="outline"
                      onClick={() => ask(suggestion)}
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <DocsAskAiMessage
                  key={generateReactKey('ask-ai-message', message.id, index)}
                  message={message}
                  streaming={status === 'streaming' && index === messages.length - 1}
                />
              ))
            )}

            {status === 'submitted' && (
              <p className="text-sm text-muted-foreground">Reading the docs…</p>
            )}

            {error && (
              <p className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                <TriangleAlertIcon className="mt-0.5 size-4 shrink-0" />
                {error.message || 'Something went wrong. Please try again.'}
              </p>
            )}
          </div>

          <form
            className="flex items-center gap-2 border-t border-border p-3"
            onSubmit={(event) => {
              event.preventDefault()
              ask(input)
            }}
          >
            <input
              className="min-w-0 flex-1 bg-transparent px-1 text-sm outline-none placeholder:text-muted-foreground"
              placeholder={isBusy ? 'Answering…' : 'Ask a question…'}
              value={input}
              autoFocus
              onChange={(event) => setInput(event.target.value)}
            />

            {messages.length > 0 && !isBusy && (
              <>
                <Button
                  aria-label="Retry last answer"
                  size="icon-sm"
                  type="button"
                  variant="ghost"
                  onClick={() => void regenerate()}
                >
                  <RefreshCcwIcon />
                </Button>
                <Button size="sm" type="button" variant="ghost" onClick={() => setMessages([])}>
                  Clear
                </Button>
              </>
            )}

            {isBusy ? (
              <Button
                aria-label="Stop answering"
                size="icon-sm"
                type="button"
                variant="secondary"
                onClick={() => void stop()}
              >
                <SquareIcon />
              </Button>
            ) : (
              <Button
                aria-label="Send question"
                className={cn(input.trim().length === 0 && 'opacity-50')}
                disabled={input.trim().length === 0}
                size="icon-sm"
                type="submit"
              >
                <ArrowRightIcon />
              </Button>
            )}
          </form>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  )
}
