import { ExternalLink } from '@/components/common/ExternalLink'
import { ChevronRightIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

import { GetStartedDialog } from './GetStartedDialog'
import { RotatingWord } from './RotatingWord'
import { ScreenshotsMarquee } from './ScreenshotsMarquee'

export const HeroMobile = () => {
  return (
    <div className="pb-8 md:hidden">
      <div className="mx-auto w-full max-w-6xl px-6 pt-16 pb-10">
        <div className="animate-hero-text-slide-up-fade flex flex-col items-center text-center">
          <ExternalLink
            className="rainbow-border mb-10 inline-flex items-center justify-center rounded-full p-px text-sm leading-none"
            href={siteConfig.links.github}
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-2 whitespace-nowrap">
              Open source dashboard framework
              <ChevronRightIcon className="size-3" />
            </span>
          </ExternalLink>

          <h1 className="max-w-4xl pb-3 text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
            Dashboards for <RotatingWord />
          </h1>

          <p className="mx-auto mt-2 mb-8 max-w-xl text-base leading-7 text-muted-foreground">
            Define dashboards as code. Connect APIs. Render real-time interfaces.
          </p>

          <div className="flex w-full flex-col items-stretch justify-center gap-3 sm:w-auto sm:flex-row">
            <GetStartedDialog />
            <Button
              className="h-12 rounded-xl px-8 text-base font-semibold"
              size="lg"
              variant="outline"
              asChild
            >
              <ExternalLink href={siteConfig.links.docs}>Documentation</ExternalLink>
            </Button>
          </div>
        </div>
      </div>

      <ScreenshotsMarquee />
    </div>
  )
}
