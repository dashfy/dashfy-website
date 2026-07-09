import { findNeighbour } from 'fumadocs-core/page-tree'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/common/Icons'
import { DocsCopyPage } from '@/components/docs/DocsCopyPage'
import { DocsToc } from '@/components/docs/DocsToc'
import { mdxComponents } from '@/components/docs/mdx'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { getDocMarkdown } from '@/lib/docsRaw'
import { source } from '@/lib/source'

export const dynamicParams = false

interface DocsPageProps {
  params: Promise<{ slug?: string[] }>
}

export const generateStaticParams = () => source.generateParams()

export const generateMetadata = async (props: DocsPageProps): Promise<Metadata> => {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const { title, description } = page.data
  const url = `${siteConfig.url}${page.url}`

  return {
    title,
    description,
    openGraph: {
      type: 'article',
      title,
      description,
      url,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  }
}

const DocsPage = async (props: DocsPageProps) => {
  const params = await props.params
  const page = source.getPage(params.slug)

  if (!page) {
    notFound()
  }

  const { body: MDX, toc, title, description } = page.data
  const neighbours = findNeighbour(source.pageTree, page.url)
  const markdown = await getDocMarkdown(page)
  const markdownUrl = `${siteConfig.url}${page.url}.md`

  return (
    <div className="flex gap-10">
      <article className="min-w-0 flex-1 py-8 lg:py-10">
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <h1 className="scroll-m-24 text-3xl font-semibold tracking-tight">{title}</h1>
            <div className="docs-nav flex items-center gap-2">
              <div className="hidden sm:block">
                <DocsCopyPage markdown={markdown} url={markdownUrl} />
              </div>
              {neighbours.previous || neighbours.next ? (
                <div className="ml-auto flex gap-2">
                  {neighbours.previous && (
                    <Button className="shadow-none" size="icon-sm" variant="secondary" asChild>
                      <Link href={neighbours.previous.url}>
                        <ArrowLeftIcon />
                        <span className="sr-only">Previous</span>
                      </Link>
                    </Button>
                  )}
                  {neighbours.next && (
                    <Button className="shadow-none" size="icon-sm" variant="secondary" asChild>
                      <Link href={neighbours.next.url}>
                        <span className="sr-only">Next</span>
                        <ArrowRightIcon />
                      </Link>
                    </Button>
                  )}
                </div>
              ) : null}
            </div>
          </div>
          {description && (
            <p className="text-base text-balance text-muted-foreground">{description}</p>
          )}
        </div>

        <div className="text-[0.95rem]">
          <MDX components={mdxComponents} />
        </div>

        {neighbours.previous || neighbours.next ? (
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-6">
            {neighbours.previous ? (
              <Link
                className="group flex flex-col gap-1 text-sm transition-colors hover:text-foreground"
                href={neighbours.previous.url}
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <ChevronLeftIcon className="size-3.5" />
                  Previous
                </span>
                <span className="font-medium">{neighbours.previous.name}</span>
              </Link>
            ) : (
              <span />
            )}
            {neighbours.next ? (
              <Link
                className="group flex flex-col items-end gap-1 text-right text-sm transition-colors hover:text-foreground"
                href={neighbours.next.url}
              >
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  Next
                  <ChevronRightIcon className="size-3.5" />
                </span>
                <span className="font-medium">{neighbours.next.name}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>
        ) : null}
      </article>

      <aside className="sticky top-14 hidden h-[calc(100svh-3.5rem)] w-56 shrink-0 overflow-y-auto py-10 xl:block">
        <DocsToc toc={toc} />
      </aside>
    </div>
  )
}

export default DocsPage
