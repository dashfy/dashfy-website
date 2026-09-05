const siteName = 'Dashfy'
const siteTagline = 'Dashboards for developers'

export const siteConfig = {
  name: siteName,
  tagline: siteTagline,
  title: `${siteName} - ${siteTagline}`,
  description: 'Define dashboards as code. Connect APIs. Render real-time interfaces.',
  url: 'https://dashfy.dev',
  email: 'contact@dashfy.dev',
  links: {
    demo: 'https://demo.dashfy.dev',
    discord: '/discord',
    github: 'https://github.com/dashfy',
    roadmap: '/roadmap',
    sponsor: '/sponsor',
    x: 'https://x.com/dashfydev',
  },
  keywords: [
    siteName,
    'dashboards',
    'dashboard-as-code',
    'developer tools',
    'api',
    'real-time',
    'extensions',
    'widgets',
    'charts',
  ],
} as const
