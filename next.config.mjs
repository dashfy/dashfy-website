/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [75, 100],
  },
  async redirects() {
    return [
      {
        source: '/demo',
        destination: 'https://demo.dashfy.dev',
        permanent: false,
      },
      {
        source: '/discord',
        destination: 'https://discord.gg/dashfy',
        permanent: false,
      },
      {
        source: '/docs',
        destination: 'https://docs.dashfy.dev',
        permanent: false,
      },
      {
        source: '/github',
        destination: 'https://github.com/dashfy/dashfy',
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
      {
        source: '/(twitter|x)',
        destination: 'https://x.com/dashfy',
        permanent: false,
      },
    ]
  },
}

export default nextConfig
