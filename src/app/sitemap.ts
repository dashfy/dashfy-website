import type { MetadataRoute } from 'next'

import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'

const entries = [
  { path: paths.home, priority: 1, changeFrequency: 'weekly' as const },
  { path: paths.extensions, priority: 0.8, changeFrequency: 'weekly' as const },
  { path: paths.brand, priority: 0.5, changeFrequency: 'monthly' as const },
]

const sitemap = (): MetadataRoute.Sitemap => {
  return entries.map(({ path, priority, changeFrequency }) => ({
    url: new URL(path, siteConfig.url).href,
    lastModified: new Date(),
    changeFrequency,
    priority,
  }))
}

export default sitemap
