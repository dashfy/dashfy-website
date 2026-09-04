import type { MetadataRoute } from 'next'

import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { source } from '@/lib/source'

const entries = [
  { path: paths.home, priority: 1, changeFrequency: 'weekly' as const },
  { path: paths.docs, priority: 0.9, changeFrequency: 'weekly' as const },
  { path: paths.extensions, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: paths.brand, priority: 0.5, changeFrequency: 'monthly' as const },
]

const sitemap = (): MetadataRoute.Sitemap => {
  const staticEntries = entries.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, siteConfig.url).href,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
  const staticUrls = new Set(staticEntries.map((entry) => entry.url))

  const docEntries = source
    .getPages()
    .map((page) => ({
      url: new URL(page.url, siteConfig.url).href,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
    .filter((entry) => !staticUrls.has(entry.url))

  return [...staticEntries, ...docEntries]
}

export default sitemap
