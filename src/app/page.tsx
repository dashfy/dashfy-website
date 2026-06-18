import { JsonLd } from '@/components/common/JsonLd'
import { CompactStickyFooter } from '@/components/navigation/footer/CompactStickyFooter'
import { Header } from '@/components/navigation/header/Header'
import { ConfigSection } from '@/components/sections/config/ConfigSection'
import { CtaSection } from '@/components/sections/CtaSection'
import { ExtensionsSection } from '@/components/sections/extensions/ExtensionsSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HeroSection } from '@/components/sections/hero/HeroSection'
import { HowItWorksSection } from '@/components/sections/how-it-works/HowItWorksSection'
import { UseCasesSection } from '@/components/sections/UseCasesSection'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { getWebPageJsonLd } from '@/lib/jsonld'

const Page = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1 pb-12">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <ExtensionsSection />
        <ConfigSection />
        <UseCasesSection />
        <CtaSection />
      </main>
      <CompactStickyFooter />
      <JsonLd
        data={getWebPageJsonLd({
          path: paths.home,
          name: siteConfig.title,
          description: siteConfig.description,
        })}
      />
    </div>
  )
}

export default Page
