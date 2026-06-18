import type { Metadata } from 'next'
import Link from 'next/link'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowLeftIcon, BookOpenIcon, PuzzleIcon } from '@/components/common/Icons'
import { CompactStickyFooter } from '@/components/navigation/footer/CompactStickyFooter'
import { Header } from '@/components/navigation/header/Header'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: 'Page not found',
}

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex flex-1 items-center justify-center px-6 py-20">
        <div className="flex w-full max-w-xl flex-col items-center gap-6 text-center">
          <p className="text-7xl font-semibold tracking-tight text-muted-foreground/60 md:text-8xl">
            404
          </p>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Page not found
            </h1>
            <p className="text-balance text-muted-foreground">
              The page you are looking for does not exist or may have been moved. Let&apos;s get you
              back on track.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button size="lg" asChild>
              <Link href={paths.home}>
                <ArrowLeftIcon />
                Back to home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href={paths.extensions}>
                <PuzzleIcon />
                Browse extensions
              </Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <ExternalLink href={siteConfig.links.docs}>
                <BookOpenIcon />
                Read the docs
              </ExternalLink>
            </Button>
          </div>
        </div>
      </main>
      <CompactStickyFooter />
    </div>
  )
}

export default NotFound
