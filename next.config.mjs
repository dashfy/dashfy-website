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
}

const withMDX = createMDX()

export default withMDX(nextConfig)
