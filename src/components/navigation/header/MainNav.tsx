'use client'

import Link from 'next/link'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowUpRightIcon, ChevronRightIcon, MenuIcon, XIcon } from '@/components/common/Icons'
import { SOCIAL_LINKS } from '@/components/navigation/footer/links'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { siteConfig } from '@/config/site'
import { cn, generateReactKey } from '@/lib/utils'

import { NAV_LINKS } from './links'

interface MainNavProps {
  open: boolean
  onToggle: () => void
  onClose: () => void
}

export const MainNav = ({ open, onToggle, onClose }: MainNavProps) => {
  return (
    <>
      <NavigationMenu className="hidden max-w-none flex-1 justify-center md:flex" viewport={false}>
        <NavigationMenuList>
          {NAV_LINKS.map((link, index) => (
            <NavigationMenuItem key={generateReactKey('nav-link', link.href, index)}>
              <NavigationMenuLink asChild className={cn(navigationMenuTriggerStyle(), 'h-8')}>
                <Link
                  href={link.href}
                  {...(link.external
                    ? { target: '_blank', rel: 'noopener noreferrer', prefetch: false }
                    : {})}
                  onClick={(event) => {
                    // Drop focus after a mouse click so the link doesn't keep the
                    // focused "selected" background. `detail > 0` means a pointer
                    // click, so keyboard activation (detail === 0) keeps focus.
                    if (event.detail > 0) {
                      event.currentTarget.blur()
                    }
                  }}
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <Button
        aria-controls="mobile-nav"
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="ml-auto md:hidden"
        size="lg"
        variant="ghost"
        onClick={onToggle}
      >
        {open ? <XIcon /> : <MenuIcon />}
      </Button>

      {open && (
        <div
          id="mobile-nav"
          className="fixed inset-x-0 top-14 bottom-0 z-40 flex animate-in flex-col overflow-y-auto bg-background duration-300 fade-in slide-in-from-top-2 md:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col px-6 py-6">
            {NAV_LINKS.map((link, index) => {
              const className =
                'group animate-in fade-in slide-in-from-top-2 fill-mode-both flex items-center justify-between border-b border-border/60 py-5 text-2xl font-semibold tracking-tight text-foreground transition-colors hover:text-muted-foreground'
              const style = { animationDelay: `${index * 60}ms` }

              return link.external ? (
                <ExternalLink
                  key={generateReactKey('nav-link', link.href)}
                  className={className}
                  href={link.href}
                  onClick={onClose}
                  style={style}
                >
                  {link.label}
                  <ArrowUpRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </ExternalLink>
              ) : (
                <Link
                  key={generateReactKey('nav-link', link.href)}
                  className={className}
                  href={link.href}
                  onClick={onClose}
                  style={style}
                >
                  {link.label}
                  <ChevronRightIcon className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto flex flex-col gap-5 border-t border-border px-6 py-8">
            <Button asChild className="w-full" size="lg">
              <ExternalLink href={siteConfig.links.demo} onClick={onClose}>
                Live demo
                <ArrowUpRightIcon />
              </ExternalLink>
            </Button>

            <div className="flex items-center justify-center gap-6">
              {SOCIAL_LINKS.map((item, index) => (
                <ExternalLink
                  key={generateReactKey('mobile-social', item.name, index)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href={item.href}
                  onClick={onClose}
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon aria-hidden="true" className="size-5" />
                </ExternalLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
