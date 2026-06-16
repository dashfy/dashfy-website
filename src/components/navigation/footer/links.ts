import type { LucideProps } from 'lucide-react'

import { DiscordIcon, GitHubIcon, XTwitterIcon } from '@/components/common/Icons'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'

export interface SocialLink {
  name: string
  href: string
  icon: (props: LucideProps) => React.ReactNode
}

export interface QuickLink {
  name: string
  href: string
  external?: boolean
  prefetch?: boolean
}

export const SOCIAL_LINKS: readonly SocialLink[] = [
  { name: 'Twitter', href: siteConfig.links.x, icon: XTwitterIcon },
  { name: 'GitHub', href: siteConfig.links.github, icon: GitHubIcon },
  { name: 'Discord', href: siteConfig.links.discord, icon: DiscordIcon },
] as const

export const QUICK_LINKS: readonly QuickLink[] = [
  { name: 'Extensions', href: paths.extensions },
  { name: 'Docs', href: siteConfig.links.docs, external: true, prefetch: false },
  { name: 'Roadmap', href: siteConfig.links.roadmap, external: true, prefetch: false },
  { name: 'Sponsor', href: siteConfig.links.sponsor, external: true, prefetch: false },
  { name: 'Brand', href: paths.brand },
  { name: 'llms.txt', href: paths.llmsTxt, external: true, prefetch: false },
] as const
