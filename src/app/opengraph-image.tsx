import { siteConfig } from '@/config/site'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = siteConfig.title
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const Image = async () => {
  return renderOgImage({
    title: siteConfig.tagline,
    subtitle: siteConfig.description,
  })
}

export default Image
