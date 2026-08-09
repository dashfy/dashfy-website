'use client'

import type { UIMessage } from 'ai'
import Link from 'next/link'
import { type ExtraProps, Streamdown } from 'streamdown'

import { ExternalLink } from '@/components/common/ExternalLink'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

type MarkdownProps<T extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<T> &
  ExtraProps

/**
 * The corpus cites pages as `/docs/...`, but the model often expands those to
 * the production origin. Collapsing them back keeps citations on client-side
 * navigation instead of sending readers off to dashfy.dev.
 */
const toSameOriginHref = (href: string) =>
  href.startsWith(siteConfig.url) ? href.slice(siteConfig.url.length) || '/' : href

/**
 * Scaled-down version of `mdxComponents` for the chat panel: same visual
 * language as the docs, tighter spacing, and no client-side syntax highlighter.
 * The `node` prop is dropped from each so it never reaches the DOM.
 */
const answerComponents = {
  a: ({ node: _node, href = '', className, ...props }: MarkdownProps<'a'>) => {
    const linkClassName = cn(
      'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
      className,
    )
    const resolved = toSameOriginHref(href)

    if (resolved.startsWith('/') || resolved.startsWith('#')) {
      return <Link className={linkClassName} href={resolved} {...props} />
    }

    return <ExternalLink className={linkClassName} href={resolved} rel="noreferrer" {...props} />
  },
  p: ({ node: _node, className, ...props }: MarkdownProps<'p'>) => (
    <p className={cn('leading-6 not-first:mt-3', className)} {...props} />
  ),
  ul: ({ node: _node, className, ...props }: MarkdownProps<'ul'>) => (
    <ul className={cn('mt-3 ml-5 list-disc [&>li]:mt-1', className)} {...props} />
  ),
  ol: ({ node: _node, className, ...props }: MarkdownProps<'ol'>) => (
    <ol className={cn('mt-3 ml-5 list-decimal [&>li]:mt-1', className)} {...props} />
  ),
  li: ({ node: _node, className, ...props }: MarkdownProps<'li'>) => (
    <li className={cn('leading-6', className)} {...props} />
  ),
  h1: ({ node: _node, className, ...props }: MarkdownProps<'h1'>) => (
    <h1 className={cn('mt-4 text-base font-semibold first:mt-0', className)} {...props} />
  ),
  h2: ({ node: _node, className, ...props }: MarkdownProps<'h2'>) => (
    <h2 className={cn('mt-4 text-base font-semibold first:mt-0', className)} {...props} />
  ),
  h3: ({ node: _node, className, ...props }: MarkdownProps<'h3'>) => (
    <h3 className={cn('mt-4 text-sm font-semibold first:mt-0', className)} {...props} />
  ),
  blockquote: ({ node: _node, className, ...props }: MarkdownProps<'blockquote'>) => (
    <blockquote
      className={cn('mt-3 border-l-2 border-border pl-4 text-muted-foreground italic', className)}
      {...props}
    />
  ),
  pre: ({ node: _node, className, ...props }: MarkdownProps<'pre'>) => (
    <pre
      className={cn(
        'mt-3 overflow-x-auto rounded-lg border border-border bg-muted p-3 font-mono text-xs',
        className,
      )}
      {...props}
    />
  ),
  code: ({ node: _node, className, ...props }: MarkdownProps<'code'>) => (
    <code
      className={cn(
        'rounded-md font-mono text-[0.85em] not-[pre_*]:border not-[pre_*]:border-border not-[pre_*]:bg-muted not-[pre_*]:px-1.5 not-[pre_*]:py-0.5',
        className,
      )}
      {...props}
    />
  ),
  table: ({ node: _node, className, ...props }: MarkdownProps<'table'>) => (
    <div className="mt-3 w-full overflow-x-auto rounded-lg border border-border">
      <table className={cn('w-full border-collapse text-xs', className)} {...props} />
    </div>
  ),
  th: ({ node: _node, className, ...props }: MarkdownProps<'th'>) => (
    <th className={cn('px-3 py-2 text-left font-semibold', className)} {...props} />
  ),
  td: ({ node: _node, className, ...props }: MarkdownProps<'td'>) => (
    <td className={cn('border-t border-border px-3 py-2 align-top', className)} {...props} />
  ),
}

const getMessageText = (message: UIMessage) =>
  message.parts
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('')
    .trim()

interface DocsAskAiMessageProps {
  message: UIMessage
  streaming: boolean
}

export const DocsAskAiMessage = ({ message, streaming }: DocsAskAiMessageProps) => {
  const text = getMessageText(message)

  if (message.role === 'user') {
    return (
      <div className="flex justify-end">
        <p className="max-w-[85%] rounded-xl rounded-br-sm bg-secondary px-3 py-2 text-sm whitespace-pre-wrap">
          {text}
        </p>
      </div>
    )
  }

  return (
    <div className="text-sm">
      <Streamdown components={answerComponents} isAnimating={streaming}>
        {text}
      </Streamdown>
    </div>
  )
}
