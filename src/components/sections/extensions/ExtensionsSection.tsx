import Link from 'next/link'

import { SectionHeading } from '@/components/common/SectionHeading'
import { ExtensionLogo } from '@/components/sections/extensions/ExtensionLogo'
import type { Extension } from '@/config/extensions'
import { EXTENSIONS_ROW_ONE, EXTENSIONS_ROW_TWO } from '@/config/extensions'
import { paths } from '@/config/paths'

const FADE_LEFT =
  'linear-gradient(to right, var(--background) 0%, var(--background) 25%, color-mix(in oklch, var(--background) 40%, transparent) 70%, transparent 100%)'
const FADE_RIGHT =
  'linear-gradient(to left, var(--background) 0%, var(--background) 25%, color-mix(in oklch, var(--background) 40%, transparent) 70%, transparent 100%)'

const ExtensionPill = ({ label, logo }: Extension) => {
  return (
    <span className="flex shrink-0 items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 whitespace-nowrap transition-colors hover:border-foreground/20">
      {logo ? (
        <span className="flex size-4 shrink-0 items-center justify-center">
          <ExtensionLogo className="h-full w-full" logo={logo} />
        </span>
      ) : null}
      <span className="text-sm text-foreground">{label}</span>
    </span>
  )
}

interface MarqueeRowProps {
  items: Extension[]
  direction: 'left' | 'right'
}

const MarqueeRow = ({ items, direction }: MarqueeRowProps) => {
  const animation = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right'

  return (
    <div className={`flex ${animation} will-change-transform group-hover/extensions:paused`}>
      <div className="flex shrink-0 gap-2 pr-2">
        {items.map((item) => (
          <ExtensionPill key={item.id} {...item} />
        ))}
      </div>
      <div aria-hidden className="flex shrink-0 gap-2 pr-2">
        {items.map((item) => (
          <ExtensionPill key={`${item.id}-dup`} {...item} />
        ))}
      </div>
    </div>
  )
}

export const ExtensionsSection = () => {
  return (
    <section className="border-b border-border bg-background" id="extensions">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-12 sm:py-16 lg:py-24">
        <SectionHeading
          className="mb-10"
          description="Official Dashfy extensions and common APIs — from GitHub and system metrics to REST endpoints, databases, and the services your team already runs on."
          descriptionClassName="hidden sm:block"
          label="Extensions"
          title="Works with the tools you already use."
        />

        <div className="group/extensions relative overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 sm:w-32"
            style={{ background: FADE_LEFT }}
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 sm:w-32"
            style={{ background: FADE_RIGHT }}
          />

          <div className="flex flex-col gap-3">
            <MarqueeRow direction="left" items={EXTENSIONS_ROW_ONE} />
            <MarqueeRow direction="right" items={EXTENSIONS_ROW_TWO} />
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            className="text-sm text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            href={paths.extensions}
          >
            View all extensions
          </Link>
        </div>
      </div>
    </section>
  )
}
