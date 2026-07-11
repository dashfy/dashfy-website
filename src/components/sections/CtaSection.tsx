import Link from 'next/link'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowUpRightIcon, BookOpenIcon, GitHubIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { ANALYTICS_EVENTS } from '@/lib/analytics'

export const CtaSection = () => {
  return (
    <section className="border-b border-border bg-muted/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center md:py-28">
        <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          Start building dashboards as code.
        </h2>
        <p className="max-w-xl text-balance text-muted-foreground">
          Try the live demo, read the docs, or jump straight into the source. {siteConfig.name} is
          open source and ready to drop into your stack.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" asChild>
            <ExternalLink
              data-analytics-event={ANALYTICS_EVENTS.ctaDemoClick}
              data-analytics-location="cta_section"
              href={siteConfig.links.demo}
            >
              View live demo
              <ArrowUpRightIcon />
            </ExternalLink>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link
              data-analytics-event={ANALYTICS_EVENTS.ctaDocsClick}
              data-analytics-location="cta_section"
              href={paths.docs}
            >
              <BookOpenIcon />
              Read the docs
            </Link>
          </Button>
          <Button size="lg" variant="ghost" asChild>
            <ExternalLink
              data-analytics-event={ANALYTICS_EVENTS.ctaGithubClick}
              data-analytics-location="cta_section"
              href={siteConfig.links.github}
            >
              <GitHubIcon />
              GitHub
            </ExternalLink>
          </Button>
        </div>
      </div>
    </section>
  )
}
