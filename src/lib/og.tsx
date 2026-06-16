import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import { ImageResponse } from 'next/og'

import { siteConfig } from '@/config/site'

export const OG_SIZE = { width: 1200, height: 630 }
export const OG_CONTENT_TYPE = 'image/png'

interface OgImageOptions {
  title: string
  subtitle?: string
  label?: string
}

/**
 * Render a brand-consistent Open Graph image (dark, neutral, crisp-bordered)
 * using the bundled Dashfy wordmark. Shared by every `opengraph-image` route so
 * social cards stay visually aligned across the site.
 */
export const renderOgImage = async ({ title, subtitle, label }: OgImageOptions) => {
  const wordmark = await readFile(join(process.cwd(), 'public/brand/dashfy-wordmark-white.png'))
  const wordmarkSrc = `data:image/png;base64,${wordmark.toString('base64')}`

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        padding: 48,
        background: '#0a0a0a',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '100%',
          height: '100%',
          padding: 64,
          border: '1px solid #262626',
          borderRadius: 24,
          background: 'radial-gradient(circle at 25% 15%, rgba(255,255,255,0.07), transparent 55%)',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" height={92} src={wordmarkSrc} width={330} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div
            style={{
              maxWidth: 920,
              fontSize: 66,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: '#fafafa',
            }}
          >
            {title}
          </div>

          {subtitle && (
            <div style={{ maxWidth: 840, fontSize: 30, lineHeight: 1.4, color: '#a1a1aa' }}>
              {subtitle}
            </div>
          )}
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 22,
            letterSpacing: 4,
            color: '#71717a',
            textTransform: 'uppercase',
          }}
        >
          {label ?? siteConfig.url.replace('https://', '')}
        </div>
      </div>
    </div>,
    { ...OG_SIZE },
  )
}
