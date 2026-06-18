import '@/styles/globals.css'

import { Analytics } from '@vercel/analytics/next'

import { AnalyticsClickTracker } from '@/components/analytics/AnalyticsClickTracker'
import { JsonLd } from '@/components/common/JsonLd'
import { Providers } from '@/components/providers/Providers'
import { SplashScreenWrapper } from '@/components/splashscreen/SplashScreenWrapper'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { fontVariables } from '@/lib/fonts'
import { getSiteJsonLd } from '@/lib/jsonld'
import { cn } from '@/lib/utils'

export { metadata } from './metadata'

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <html
      className={cn('font-sans text-base antialiased', fontVariables)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta content={siteConfig.title} name="apple-mobile-web-app-title" />
        <link href={paths.llmsTxt} rel="llms-txt" />
      </head>
      <body>
        <Providers>
          <SplashScreenWrapper>{children}</SplashScreenWrapper>
        </Providers>
        <JsonLd data={getSiteJsonLd()} />
        <Analytics />
        <AnalyticsClickTracker />
      </body>
    </html>
  )
}

export default RootLayout
