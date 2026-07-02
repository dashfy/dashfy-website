import { notFound } from 'next/navigation'
import { NextResponse } from 'next/server'

import { getDocMarkdown } from '@/lib/docsRaw'
import { source } from '@/lib/source'

export const dynamic = 'force-static'
export const dynamicParams = false

export const generateStaticParams = () => source.generateParams()

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ slug?: string[] }> },
) => {
  const { slug } = await params
  const page = source.getPage(slug)

  if (!page) {
    notFound()
  }

  const markdown = await getDocMarkdown(page)

  return new NextResponse(markdown, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
    },
  })
}
