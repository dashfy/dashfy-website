import Link from 'next/link'
import type { AnchorHTMLAttributes, ComponentProps, ReactNode } from 'react'

import { cn } from '@/lib/utils'

import { Callout } from './Callout'
import { CodeBlock } from './CodeBlock'
import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from './CodeBlockTabs'
import { LinkedCard } from './LinkedCard'
import { Step, Steps } from './Steps'

const isInlineCode = (children: ReactNode) => typeof children === 'string'

const DocsLink = ({ href = '', className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  const linkClassName = cn(
    'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
    className,
  )

  if (isInternal) {
    return <Link className={linkClassName} href={href} {...props} />
  }

  return <a className={linkClassName} href={href} rel="noreferrer" target="_blank" {...props} />
}

export const mdxComponents = {
  Callout,
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
  LinkedCard,
  Step,
  Steps,
  h1: ({ className, ...props }: ComponentProps<'h1'>) => (
    <h1
      className={cn('mt-2 scroll-m-24 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-12 scroll-m-24 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: ComponentProps<'h3'>) => (
    <h3
      className={cn('mt-8 scroll-m-24 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: ComponentProps<'h4'>) => (
    <h4
      className={cn('mt-6 scroll-m-24 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: ComponentProps<'p'>) => (
    <p className={cn('leading-7 not-first:mt-5', className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentProps<'ul'>) => (
    <ul className={cn('my-5 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentProps<'ol'>) => (
    <ol className={cn('my-5 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentProps<'li'>) => (
    <li className={cn('leading-7', className)} {...props} />
  ),
  a: DocsLink,
  blockquote: ({ className, ...props }: ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn('mt-6 border-l-2 border-border pl-6 text-muted-foreground italic', className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentProps<'hr'>) => (
    <hr className={cn('my-8 border-border', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={cn('my-6 rounded-xl border border-border', className)} {...props} />
  ),
  table: ({ className, ...props }: ComponentProps<'table'>) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: ComponentProps<'thead'>) => (
    <thead className={cn('bg-muted/50', className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentProps<'tr'>) => (
    <tr className={cn('border-b border-border last:border-0', className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentProps<'th'>) => (
    <th
      className={cn('px-4 py-2.5 text-left font-semibold whitespace-nowrap', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentProps<'td'>) => (
    <td className={cn('border-t border-border px-4 py-2.5 align-top', className)} {...props} />
  ),
  pre: ({ className, ...props }: ComponentProps<'pre'>) => (
    <CodeBlock className={className} {...props} />
  ),
  code: ({ className, children, ...props }: ComponentProps<'code'>) => {
    if (isInlineCode(children)) {
      return (
        <code
          className={cn(
            'rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[0.85em]',
            className,
          )}
          {...props}
        >
          {children}
        </code>
      )
    }

    return (
      <code className={cn('font-mono', className)} {...props}>
        {children}
      </code>
    )
  },
}
