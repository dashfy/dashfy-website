const siteName = 'Dashfy'
const tagline = 'Dashboards for developers'
const description = 'Define dashboards as code. Connect APIs. Render real-time interfaces.'

export const siteConfig = {
  name: siteName,
  tagline,
  title: `${siteName} - ${tagline}`,
  description,
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
    'dashfy',
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
