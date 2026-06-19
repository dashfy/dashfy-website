'use client'

import { ExternalLink } from '@/components/common/ExternalLink'
import { GitHubIcon } from '@/components/common/Icons'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'

interface GitHubStarsButtonClientProps {
  stars: React.ReactNode
}

export const GitHubStarsButtonClient = ({ stars }: GitHubStarsButtonClientProps) => {
  return (
    <Button variant="outline" asChild>
      <ExternalLink href={`${siteConfig.links.github}/dashfy`} rel="noreferrer">
        <GitHubIcon className="size-4" />
        <span className="max-sm:sr-only">{stars}</span>
      </ExternalLink>
    </Button>
  )
}
