'use client'

import { useEffect, useMemo, useState } from 'react'

import { ANALYTICS_EVENTS } from '@/lib/analytics'
import { cn, generateReactKey } from '@/lib/utils'

interface TocItem {
  title: React.ReactNode
  url: string
  depth: number
}

interface DocsTocProps {
  toc: TocItem[]
}

const useActiveHeading = (ids: string[]) => {
  const [activeId, setActiveId] = useState<string | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '0% 0% -80% 0%' },
    )

    for (const id of ids) {
      const element = document.getElementById(id)

      if (element) {
        observer.observe(element)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [ids])

  return activeId
}

export const DocsToc = ({ toc }: DocsTocProps) => {
  const ids = useMemo(() => toc.map((item) => item.url.replace('#', '')), [toc])
  const activeHeading = useActiveHeading(ids)

  if (!toc.length) {
    return null
  }

  return (
    <div className="flex flex-col gap-2 text-sm">
      <p className="text-xs font-semibold tracking-wide text-foreground/70">On this page</p>
      {toc.map((item) => (
        <a
          key={generateReactKey('docs-toc-item', item.url)}
          className={cn(
            'text-[0.8rem] text-muted-foreground no-underline transition-colors hover:text-foreground',
            item.depth >= 3 && 'pl-3',
            item.depth >= 4 && 'pl-6',
            item.url === `#${activeHeading}` && 'font-medium text-foreground',
          )}
          data-analytics-event={ANALYTICS_EVENTS.docsTocClick}
          data-analytics-target={item.url}
          href={item.url}
        >
          {item.title}
        </a>
      ))}
    </div>
  )
}
