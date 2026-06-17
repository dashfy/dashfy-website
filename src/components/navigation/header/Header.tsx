import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowUpRightIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { ANALYTICS_EVENTS } from '@/lib/analytics'

import { GitHubStarsButton } from './github/GitHubStarsButton'
import { HeaderClient } from './HeaderClient'

export const Header = () => {
  return (
    <HeaderClient>
      <div className="hidden shrink-0 items-center gap-2 md:flex">
        <GitHubStarsButton />

        <Button asChild>
          <ExternalLink
            data-analytics-event={ANALYTICS_EVENTS.ctaDemoClick}
            data-analytics-location="header"
            href={siteConfig.links.demo}
          >
            <span className="hidden lg:inline">Live demo</span>
            <span className="inline lg:hidden">Demo</span>
            <ArrowUpRightIcon />
          </ExternalLink>
        </Button>
      </div>
    </HeaderClient>
  )
}
