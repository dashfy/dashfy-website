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
    ]
  },
}

const withMDX = createMDX()

export default withEnvStyles(withMDX(nextConfig), {
  color: {
    development: '#4f46e5',
    preview: '#e5484d',
  },
})
