import type { Metadata } from 'next'
import Image from 'next/image'

import { JsonLd } from '@/components/common/JsonLd'
import { CompactStickyFooter } from '@/components/navigation/footer/CompactStickyFooter'
import { Header } from '@/components/navigation/header/Header'
import { BrandAssetCard, BrandScreenshotCard } from '@/components/sections/brand/BrandAssetCard'
import { Button } from '@/components/ui/button'
import { BRAND_ZIP_HREF, ICON_ASSETS, LOGO_ASSETS, SCREENSHOTS } from '@/config/brand'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { ANALYTICS_EVENTS } from '@/lib/analytics'
import { getWebPageJsonLd } from '@/lib/jsonld'
import { generateReactKey } from '@/lib/utils'

const title = 'Brand'
const description = `Guidelines and assets for presenting the ${siteConfig.name} brand consistently.`

export const metadata: Metadata = {
  title,
  description,
}

const SECTION_TITLE = 'text-2xl font-medium tracking-tight text-foreground'
const SECTION_BODY = 'text-sm text-muted-foreground'

export default function BrandPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16">
        <section className="border-b border-border">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-6 py-20 text-center sm:py-24">
            <Image
              alt={`${siteConfig.name} icon`}
              className="h-24 w-24 rounded-2xl"
              height={96}
              priority
              src="/brand/dashfy-social-logo.png"
              width={96}
            />

            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance md:text-6xl">
              Brand kit
            </h1>
            <p className="mt-4 max-w-xl text-base text-balance text-muted-foreground md:text-lg">
              Guidelines and assets for presenting the {siteConfig.name} brand consistently.
            </p>

            <Button asChild className="mt-8 h-12 rounded-xl px-8 text-base font-semibold" size="lg">
              <a
                data-analytics-asset="all"
                data-analytics-event={ANALYTICS_EVENTS.brandDownload}
                download
                href={BRAND_ZIP_HREF}
              >
                Download all assets
              </a>
            </Button>
          </div>
        </section>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-16 px-6 py-16">
          <section className="flex flex-col gap-4">
            <h2 className={SECTION_TITLE}>Naming</h2>
            <p className={SECTION_BODY}>
              &ldquo;{siteConfig.name}&rdquo; is the brand name and always spelled with a capital
              &ldquo;D&rdquo;.
            </p>
            <p className={SECTION_BODY}>
              It is a single word and should not be spelled as &ldquo;DashFy&rdquo;,
              &ldquo;dashfy&rdquo;, or any other variation.
            </p>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className={SECTION_TITLE}>Logo</h2>
            <p className={SECTION_BODY}>
              Use the {siteConfig.name} wordmark for stronger brand recognition. Do not alter these
              files in any way.
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {LOGO_ASSETS.map((asset) => (
                <BrandAssetCard key={generateReactKey('brand-logo', asset.title)} {...asset} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className={SECTION_TITLE}>Icon</h2>
            <p className={SECTION_BODY}>
              Use the {siteConfig.name} icon where the full wordmark does not fit.
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ICON_ASSETS.map((asset) => (
                <BrandAssetCard key={generateReactKey('brand-icon', asset.title)} {...asset} />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-6">
            <h2 className={SECTION_TITLE}>Screenshots</h2>
            <p className={SECTION_BODY}>
              Use the following product screenshots when presenting {siteConfig.name} to avoid
              showing any sensitive information.
            </p>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {SCREENSHOTS.map((screenshot) => (
                <BrandScreenshotCard
                  key={generateReactKey('brand-screenshot', screenshot.title)}
                  {...screenshot}
                />
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className={SECTION_TITLE}>Questions</h2>
            <p className={SECTION_BODY}>
              Please{' '}
              <a
                className="text-foreground underline-offset-4 hover:underline"
                data-analytics-event={ANALYTICS_EVENTS.copyEmail}
                data-analytics-location="brand"
                href={`mailto:${siteConfig.email}`}
              >
                contact us
              </a>{' '}
              if you need additional assets or have questions on how to use the {siteConfig.name}{' '}
              brand.
            </p>
          </section>
        </div>
      </main>
      <CompactStickyFooter />
      <JsonLd
        data={getWebPageJsonLd({
          path: paths.brand,
          name: `${title} · ${siteConfig.name}`,
          description,
        })}
      />
    </div>
  )
}
