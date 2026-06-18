import type { Metadata } from 'next'

import { JsonLd } from '@/components/common/JsonLd'
import { SectionHeading } from '@/components/common/SectionHeading'
import { CompactStickyFooter } from '@/components/navigation/footer/CompactStickyFooter'
import { Header } from '@/components/navigation/header/Header'
import { ExtensionCard } from '@/components/sections/extensions/ExtensionCard'
import { Badge } from '@/components/ui/badge'
import { EXTENSIONS } from '@/config/extensions'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { getWebPageJsonLd } from '@/lib/jsonld'
import { generateReactKey } from '@/lib/utils'

const title = 'Extensions'
const description = `Browse ${siteConfig.name} extensions — official integrations for GitHub, system metrics, market data, and more, with new connectors on the way.`

export const metadata: Metadata = {
  title,
  description,
}

const availableExtensions = EXTENSIONS.filter((extension) => extension.available)
const soonExtensions = EXTENSIONS.filter((extension) => !extension.available)

const ExtensionsPage = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-12">
        <section className="border-b border-border">
          <div className="mx-auto w-full max-w-[1400px] px-6 py-16 sm:py-20 lg:py-24">
            <SectionHeading
              align="left"
              as="h1"
              description={`Official ${siteConfig.name} extensions and common integrations — from GitHub and system metrics to REST endpoints, databases, and the services your team already runs on. More connectors are landing soon.`}
              label="Extensions"
              title={`Connect ${siteConfig.name} to your stack.`}
            />
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1400px] px-6 py-12 lg:py-16">
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold tracking-tight">Available now</h2>
            <Badge variant="secondary">{availableExtensions.length}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {availableExtensions.map((extension) => (
              <ExtensionCard key={generateReactKey('extension', extension.id)} {...extension} />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1400px] px-6 pb-16 lg:pb-24">
          <div className="mb-6 flex items-baseline gap-2">
            <h2 className="text-lg font-semibold tracking-tight">Coming soon</h2>
            <Badge variant="secondary">{soonExtensions.length}</Badge>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {soonExtensions.map((extension) => (
              <ExtensionCard key={generateReactKey('extension', extension.id)} {...extension} />
            ))}
          </div>
        </section>
      </main>
      <CompactStickyFooter />
      <JsonLd
        data={getWebPageJsonLd({
          path: paths.extensions,
          name: `${title} · ${siteConfig.name}`,
          description,
        })}
      />
    </div>
  )
}

export default ExtensionsPage
