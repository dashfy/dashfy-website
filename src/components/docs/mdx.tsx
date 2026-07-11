import Link from 'next/link'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ANALYTICS_EVENTS } from '@/lib/analytics'
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

const isInlineCode = (children: React.ReactNode) => typeof children === 'string'

const DocsLink = ({
  href = '',
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  const linkClassName = cn(
    'font-medium text-primary underline underline-offset-4 transition-colors hover:text-primary/80',
    className,
  )

  if (isInternal) {
    return (
      <Link
        className={linkClassName}
        data-analytics-event={ANALYTICS_EVENTS.docsContentLink}
        data-analytics-target={href}
        href={href}
        {...props}
      />
    )
  }

  return (
    <ExternalLink
      className={linkClassName}
      data-analytics-event={ANALYTICS_EVENTS.docsContentLink}
      data-analytics-target={href}
      href={href}
      rel="noreferrer"
      {...props}
    />
  )
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
  h1: ({ className, ...props }: React.ComponentProps<'h1'>) => (
    <h1
      className={cn('mt-2 scroll-m-24 text-3xl font-semibold tracking-tight first:mt-0', className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.ComponentProps<'h2'>) => (
    <h2
      className={cn(
        'mt-12 scroll-m-24 border-b border-border pb-2 text-2xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.ComponentProps<'h3'>) => (
    <h3
      className={cn('mt-8 scroll-m-24 text-xl font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.ComponentProps<'h4'>) => (
    <h4
      className={cn('mt-6 scroll-m-24 text-lg font-semibold tracking-tight', className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<'p'>) => (
    <p className={cn('leading-7 not-first:mt-5', className)} {...props} />
  ),
  ul: ({ className, ...props }: React.ComponentProps<'ul'>) => (
    <ul className={cn('my-5 ml-6 list-disc [&>li]:mt-2', className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<'ol'>) => (
    <ol className={cn('my-5 ml-6 list-decimal [&>li]:mt-2', className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<'li'>) => (
    <li className={cn('leading-7', className)} {...props} />
  ),
  a: DocsLink,
  blockquote: ({ className, ...props }: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className={cn('mt-6 border-l-2 border-border pl-6 text-muted-foreground italic', className)}
      {...props}
    />
  ),
  hr: ({ className, ...props }: React.ComponentProps<'hr'>) => (
    <hr className={cn('my-8 border-border', className)} {...props} />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img alt={alt} className={cn('my-6 rounded-xl border border-border', className)} {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<'table'>) => (
    <div className="my-6 w-full overflow-x-auto rounded-xl border border-border">
      <table className={cn('w-full border-collapse text-sm', className)} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: React.ComponentProps<'thead'>) => (
    <thead className={cn('bg-muted/50', className)} {...props} />
  ),
  tr: ({ className, ...props }: React.ComponentProps<'tr'>) => (
    <tr className={cn('border-b border-border last:border-0', className)} {...props} />
  ),
  th: ({ className, ...props }: React.ComponentProps<'th'>) => (
    <th
      className={cn('px-4 py-2.5 text-left font-semibold whitespace-nowrap', className)}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<'td'>) => (
    <td className={cn('border-t border-border px-4 py-2.5 align-top', className)} {...props} />
  ),
  pre: ({ className, ...props }: React.ComponentProps<'pre'>) => (
    <CodeBlock className={className} {...props} />
  ),
  code: ({ className, children, ...props }: React.ComponentProps<'code'>) => {
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
