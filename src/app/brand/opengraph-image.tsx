import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from '@/lib/og'

export const alt = 'Dashfy Brand Kit'
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function Image() {
  return renderOgImage({
    title: 'Brand kit',
    subtitle: 'Guidelines and assets for presenting the Dashfy brand consistently.',
    label: 'dashfy.dev / brand',
  })
}
