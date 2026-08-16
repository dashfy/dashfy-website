import { withEnvStyles } from 'env.style'
import { createMDX } from 'fumadocs-mdx/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: '/discord',
        destination: 'https://discord.gg/8g4ytjebGS',
        permanent: false,
      },
      {
        source: '/roadmap',
        destination: 'https://github.com/orgs/dashfy/projects/1',
        permanent: false,
      },
      {
        source: '/sponsor',
        destination: 'https://github.com/sponsors/brenopolanski',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/docs.md',
        destination: '/docs-raw',
      },
      {
        source: '/docs/:slug*.md',
        destination: '/docs-raw/:slug*',
      },
      // The JSON Schemas are authored in the dashfy repo and deployed with the
      // registry, but their $id is on this origin. Serve them from here so the
      // canonical URLs resolve without keeping a second copy in sync.
      {
        source: '/schema.json',
        destination: 'https://registry.dashfy.dev/schema.json',
      },
      {
        source: '/schema/:file',
        destination: 'https://registry.dashfy.dev/schema/:file',
      },
    ]
  },
}

const withMDX = createMDX()

export default withEnvStyles(withMDX(nextConfig), {
  color: {
    development: '#3b82f6',
    preview: '#f59e0b',
    staging: '#6b7280',
  },
})
