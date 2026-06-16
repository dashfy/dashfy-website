'use client'

import Link from 'next/link'

import { LogoIcon } from '@/components/logo/LogoIcon'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { useMobileNav } from '@/hooks/useMobileNav'
import { cn } from '@/lib/utils'

import { MainNav } from './MainNav'

interface HeaderClientProps {
  children: React.ReactNode
}

export const HeaderClient = ({ children }: HeaderClientProps) => {
  const { open, toggle, close } = useMobileNav()

  return (
    <header
      className={cn(
        'sticky top-0 z-50 flex h-14 items-center border-b border-border pr-2 pl-0',
        open
          ? 'bg-background'
          : 'bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80',
      )}
    >
      <Link
        aria-label={`${siteConfig.name} home`}
        className="flex h-full shrink-0 items-center gap-3"
        href={paths.home}
      >
        <span className="flex size-14 items-center justify-center bg-primary">
          <LogoIcon className="text-primary-foreground" size="sm" />
        </span>
        <span className="hidden text-xl font-bold tracking-tight lg:inline">{siteConfig.name}</span>
      </Link>

      <MainNav open={open} onClose={close} onToggle={toggle} />

      <div aria-label="Site navigation" className="flex shrink-0 items-center gap-2">
        {children}
      </div>
    </header>
  )
}
