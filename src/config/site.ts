const appName = 'Dashfy'
const tagline = 'Dashboards for developers'
const description = 'Define dashboards as code. Connect APIs. Render real-time interfaces.'

export const siteConfig = {
  name: appName,
  tagline,
  title: `${appName} - ${tagline}`,
  description,
  url: 'https://dashfy.dev',
  email: 'contact@dashfy.dev',
  links: {
    demo: '/demo',
    discord: '/discord',
    docs: '/docs',
    github: '/github',
    roadmap: '/roadmap',
    sponsor: '/sponsor',
    x: '/x',
  },
} as const
