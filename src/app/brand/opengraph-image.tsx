import { siteConfig } from '@/config/site'
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = `${siteConfig.name} Brand Kit`
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

const Image = async () => {
  return renderOgImage({
    title: 'Brand kit',
    subtitle: `Guidelines and assets for presenting the ${siteConfig.name} brand consistently.`,
    label: 'dashfy.dev / brand',
  })
}

export default Image
