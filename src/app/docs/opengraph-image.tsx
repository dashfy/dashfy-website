import { siteConfig } from '@/config/site'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = `${siteConfig.name} Documentation`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const Image = async () => {
  return renderOgImage({
    title: 'Documentation',
    subtitle: `Guides and API reference for building dashboards with ${siteConfig.name}.`,
    label: 'dashfy.dev / docs',
  })
}

export default Image
