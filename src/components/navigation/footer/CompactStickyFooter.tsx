'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

import { ExternalLink } from '@/components/common/ExternalLink'
import { ChevronUpIcon } from '@/components/common/Icons'
import { siteConfig } from '@/config/site'
import { cn, generateReactKey } from '@/lib/utils'

import { ContactLink } from './ContactLink'
import { QUICK_LINKS, SOCIAL_LINKS } from './links'
import { ThemeSwitcher } from './ThemeSwitcher'

const BOTTOM_THRESHOLD = 16

interface CompactStickyFooterProps {
  disableHideOnScroll?: boolean
}

export const CompactStickyFooter = ({ disableHideOnScroll = false }: CompactStickyFooterProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)

  useEffect(() => {
    if (disableHideOnScroll) {
      return
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const isScrollingDown = currentScrollY > lastScrollY.current
      const isScrollingUp = currentScrollY < lastScrollY.current
      const isAtBottom =
        window.innerHeight + currentScrollY >=
        document.documentElement.scrollHeight - BOTTOM_THRESHOLD

      if (isAtBottom) {
        setIsVisible(true)
      } else if (isScrollingDown && currentScrollY > 100) {
        setIsVisible(false)
        setIsExpanded(false)
      } else if (isScrollingUp) {
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [disableHideOnScroll])

  return (
    <div
      className={cn(
        'fixed right-0 bottom-0 left-0 z-40 border-t bg-background/95 backdrop-blur-sm transition-transform',
        isExpanded && 'shadow-lg',
        isVisible ? 'translate-y-0 duration-500' : 'translate-y-full duration-200',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div
          aria-expanded={isExpanded}
          aria-label={isExpanded ? 'Collapse footer' : 'Expand footer'}
          className="flex h-12 w-full cursor-pointer items-center justify-between"
          role="button"
          tabIndex={0}
          onClick={() => setIsExpanded((prev) => !prev)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              setIsExpanded((prev) => !prev)
            }
          }}
        >
          <div className="flex items-center gap-4">
            <p className="hidden text-xs text-muted-foreground sm:block">
              © {new Date().getFullYear()} {siteConfig.name}
            </p>

            <div
              className="flex items-center gap-3"
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              {SOCIAL_LINKS.map((item, index) => (
                <ExternalLink
                  key={generateReactKey('footer-social', item.name, index)}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                  href={item.href}
                  referrerPolicy="no-referrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-4 w-4" aria-hidden />
                </ExternalLink>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div
              onClick={(event) => event.stopPropagation()}
              onKeyDown={(event) => event.stopPropagation()}
            >
              <ThemeSwitcher />
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="hidden sm:inline">{isExpanded ? 'Less' : 'More'}</span>
              <ChevronUpIcon
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isExpanded && 'rotate-180',
                )}
              />
            </div>
          </div>
        </div>

        <div
          className={cn(
            'grid transition-all duration-300 ease-in-out',
            isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="border-t py-4">
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                {QUICK_LINKS.map((link, index) =>
                  link.external ? (
                    <ExternalLink
                      key={generateReactKey('footer-link', link.name, index)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                    >
                      {link.name}
                    </ExternalLink>
                  ) : (
                    <Link
                      key={generateReactKey('footer-link', link.name, index)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      href={link.href}
                      prefetch={link.prefetch}
                    >
                      {link.name}
                    </Link>
                  ),
                )}
                <ContactLink className="cursor-pointer text-sm text-muted-foreground transition-colors hover:text-foreground" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
