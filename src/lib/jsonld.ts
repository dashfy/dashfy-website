import { siteConfig } from '@/config/site'

export interface JsonLdGraph {
  '@context': 'https://schema.org'
  '@graph': Record<string, unknown>[]
}

export const ORGANIZATION_ID = `${siteConfig.url}/#organization`
export const WEBSITE_ID = `${siteConfig.url}/#website`

const getOrganizationSchema = (): Record<string, unknown> => ({
  '@type': 'Organization',
  '@id': ORGANIZATION_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: new URL('/brand/dashfy-social-logo.png', siteConfig.url).href,
  email: siteConfig.email,
  sameAs: [siteConfig.links.github, siteConfig.links.x, siteConfig.links.discord],
})

const getWebSiteSchema = (): Record<string, unknown> => ({
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  publisher: { '@id': ORGANIZATION_ID },
})

interface WebPageOptions {
  path: string
  name: string
  description: string
}

const getWebPageSchema = ({
  path,
  name,
  description,
}: WebPageOptions): Record<string, unknown> => ({
  '@type': 'WebPage',
  url: new URL(path, siteConfig.url).href,
  name,
  description,
  isPartOf: { '@id': WEBSITE_ID },
})

export const getSiteJsonLd = (): JsonLdGraph => ({
  '@context': 'https://schema.org',
  '@graph': [getOrganizationSchema(), getWebSiteSchema()],
})

export const getWebPageJsonLd = (options: WebPageOptions): JsonLdGraph => ({
  '@context': 'https://schema.org',
  '@graph': [getWebPageSchema(options)],
})
