import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'Dashfy Extensions'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgImage({
    title: 'Extensions',
    subtitle: 'Official integrations for GitHub, system metrics, market data, and more.',
    label: 'dashfy.dev / extensions',
  })
}
