import { siteConfig } from '@/config/site'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = `${siteConfig.name} Extensions`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const Image = async () => {
  return renderOgImage({
    title: 'Extensions',
    subtitle: 'Official integrations for GitHub, system metrics, market data, and more.',
    label: 'dashfy.dev / extensions',
  })
}

export default Image
