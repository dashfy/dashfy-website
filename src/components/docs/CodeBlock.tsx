'use client'

import { useRef } from 'react'

import { CheckIcon, CopyIcon } from '@/components/common/Icons'
import { useCopy } from '@/hooks/useCopy'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

import { useInCodeBlockTabs } from './CodeBlockTabs'

type CodeBlockProps = React.ComponentProps<'pre'> & {
  // Fumadocs' rehype code plugin injects a non-standard `icon` prop we don't render.
  icon?: unknown
}

export const CodeBlock = ({ className, children, icon: _icon, ...props }: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null)
  const { copied, copy } = useCopy()
  const inTabs = useInCodeBlockTabs()

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? ''
    copy(text)
    trackEvent(ANALYTICS_EVENTS.docsCopyCode)
  }

  return (
    <div
      className={cn(
        'group relative',
        !inTabs && 'my-6 overflow-hidden rounded-xl border border-border bg-muted/40',
      )}
    >
      <button
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground opacity-0 backdrop-blur transition group-hover:opacity-100 hover:text-foreground focus-visible:opacity-100"
        type="button"
        onClick={handleCopy}
      >
        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
      </button>
      <pre
        ref={preRef}
        className={cn(
          'dashfy-docs-code max-h-160 overflow-x-auto p-4 text-[0.825rem] leading-relaxed [&_code]:font-mono',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
