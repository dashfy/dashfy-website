'use client'

import { useRef } from 'react'

import { CheckIcon, CopyIcon } from '@/components/common/Icons'
import { useCopy } from '@/hooks/useCopy'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

import { useInCodeBlockTabs } from './CodeBlockTabs'
import { getFileIcon } from './fileIcons'

type CodeBlockProps = React.ComponentProps<'pre'> & {
  // Fumadocs' rehype code plugin injects a non-standard `icon` prop we don't render.
  icon?: unknown
}

export const CodeBlock = ({
  className,
  children,
  icon: _icon,
  title,
  ...props
}: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null)
  const { copied, copy } = useCopy()
  const inTabs = useInCodeBlockTabs()
  // Set by fumadocs for ```ts lineNumbers blocks, which render their own left gutter.
  const hasLineNumbers = 'data-line-numbers' in props
  // Rendered as a visible header instead of the native tooltip fumadocs would give it.
  const showHeader = Boolean(title) && !inTabs

  const handleCopy = () => {
    const text = preRef.current?.textContent ?? ''
    copy(text)
    trackEvent(ANALYTICS_EVENTS.docsCopyCode)
  }

  const copyButton = (
    <button
      aria-label={copied ? 'Copied' : 'Copy code'}
      className={cn(
        'z-10 flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-background/80 text-muted-foreground backdrop-blur transition hover:text-foreground focus-visible:opacity-100',
        !showHeader && 'absolute top-3 right-3 opacity-0 group-hover:opacity-100',
      )}
      type="button"
      onClick={handleCopy}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
    </button>
  )

  return (
    <div
      className={cn(
        'group relative',
        !inTabs && 'my-6 overflow-hidden rounded-xl border border-border bg-muted/40',
      )}
    >
      {showHeader ? (
        <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
          {title ? getFileIcon(title) : null}
          <span className="flex-1 truncate font-mono text-xs text-muted-foreground">{title}</span>
          {copyButton}
        </div>
      ) : (
        copyButton
      )}
      <pre
        ref={preRef}
        className={cn(
          'dashfy-docs-code max-h-160 overflow-x-auto p-4 text-[0.825rem] leading-relaxed [&_code]:font-mono',
          hasLineNumbers && 'pl-3',
          className,
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  )
}
