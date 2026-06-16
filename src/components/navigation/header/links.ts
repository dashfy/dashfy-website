import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'

export interface NavLink {
  href: string
  label: string
  external?: boolean
}

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/#how-it-works', label: 'How it works' },
  { href: '/#features', label: 'Features' },
  { href: '/#config', label: 'Config' },
  { href: paths.extensions, label: 'Extensions' },
  { href: siteConfig.links.docs, label: 'Docs', external: true },
] as const
