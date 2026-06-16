import '@/styles/globals.css'

import { JsonLd } from '@/components/common/JsonLd'
import { Providers } from '@/components/providers/Providers'
import { SplashScreenWrapper } from '@/components/splashscreen/SplashScreenWrapper'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { fontVariables } from '@/lib/fonts'
import { getSiteJsonLd } from '@/lib/jsonld'
import { cn } from '@/lib/utils'

export { metadata } from './metadata'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      className={cn('font-sans text-base antialiased', fontVariables)}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <meta name="apple-mobile-web-app-title" content={siteConfig.title} />
        <link href={paths.llmsTxt} rel="llms-txt" />
      </head>
      <body>
        <Providers>
          <SplashScreenWrapper>{children}</SplashScreenWrapper>
        </Providers>
        <JsonLd data={getSiteJsonLd()} />
      </body>
    </html>
  )
}
