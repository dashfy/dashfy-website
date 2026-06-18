import Image from 'next/image'

import type { BrandAsset, BrandDownload, BrandScreenshot } from '@/config/brand'
import { ANALYTICS_EVENTS } from '@/lib/analytics'
import { cn, generateReactKey } from '@/lib/utils'

const TONE_STYLES: Record<BrandAsset['tone'], string> = {
  dark: 'bg-neutral-900',
  light: 'bg-neutral-50',
}

type DownloadTone = BrandAsset['tone'] | 'adaptive'

const DOWNLOAD_TONE_STYLES: Record<DownloadTone, string> = {
  dark: 'border-white/20 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40',
  light:
    'border-black/15 bg-black/5 text-neutral-900 hover:bg-black/10 focus-visible:ring-black/30',
  adaptive:
    'border-black/15 bg-black/5 text-neutral-900 hover:bg-black/10 focus-visible:ring-black/30 dark:border-white/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:focus-visible:ring-white/40',
}

interface CardShellProps {
  className?: string
  children: React.ReactNode
}

const CardShell = ({ className, children }: CardShellProps) => (
  <div
    className={cn(
      'group relative w-full overflow-hidden rounded-xl border border-border transition-colors duration-300 ease-in-out hover:border-foreground/20',
      className,
    )}
  >
    {children}
  </div>
)

interface DownloadLinksProps {
  title: string
  tone: DownloadTone
  downloads: readonly BrandDownload[]
}

const DownloadLinks = ({ title, tone, downloads }: DownloadLinksProps) => (
  <div className="absolute right-3 bottom-3 flex translate-y-0 items-center gap-2 opacity-100 transition-all duration-300 ease-in-out md:translate-y-2 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
    {downloads.map((download, index) => (
      <a
        key={generateReactKey('brand-download', `${title}-${download.label}`, index)}
        aria-label={`Download ${title} ${download.label}`}
        className={cn(
          'inline-flex h-6 items-center justify-center rounded-md border px-2 text-xs font-medium backdrop-blur-sm transition-colors outline-none focus-visible:ring-2',
          DOWNLOAD_TONE_STYLES[tone],
        )}
        data-analytics-asset={title}
        data-analytics-event={ANALYTICS_EVENTS.brandDownload}
        data-analytics-format={download.label}
        href={download.href}
        download
      >
        {download.label}
      </a>
    ))}
  </div>
)

export const BrandAssetCard = ({ title, src, tone, downloads }: BrandAsset) => (
  <CardShell className={TONE_STYLES[tone]}>
    <div className="relative flex h-48 w-full items-center justify-center p-6">
      <Image
        alt={title}
        className="h-auto max-h-24 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-110"
        height={96}
        src={src}
        width={220}
      />
      <DownloadLinks downloads={downloads} title={title} tone={tone} />
    </div>
  </CardShell>
)

export const BrandScreenshotCard = ({ title, light, dark, downloads }: BrandScreenshot) => (
  <CardShell className="bg-neutral-50 dark:bg-neutral-900">
    <div className="relative flex h-auto w-full items-center justify-center p-4">
      <Image
        alt={title}
        className="h-auto w-full rounded object-contain transition-transform duration-500 ease-out group-hover:scale-105 dark:hidden"
        height={508}
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={light}
        width={881}
      />
      <Image
        alt={title}
        className="hidden h-auto w-full rounded object-contain transition-transform duration-500 ease-out group-hover:scale-105 dark:block"
        height={508}
        sizes="(max-width: 1024px) 100vw, 50vw"
        src={dark}
        width={881}
      />
      <DownloadLinks downloads={downloads} title={title} tone="adaptive" />
    </div>
  </CardShell>
)
