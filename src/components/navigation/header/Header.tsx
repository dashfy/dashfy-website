import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowUpRightIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

import { GitHubStarsButton } from './github/GitHubStarsButton'
import { HeaderClient } from './HeaderClient'

export const Header = () => {
  return (
    <HeaderClient>
      <div className="flex hidden shrink-0 items-center gap-2 md:flex">
        <GitHubStarsButton />

        <Button asChild>
          <ExternalLink href={siteConfig.links.demo}>
            <span className="hidden lg:inline">Live demo</span>
            <span className="inline lg:hidden">Demo</span>
            <ArrowUpRightIcon />
          </ExternalLink>
        </Button>
      </div>
    </HeaderClient>
  )
}
