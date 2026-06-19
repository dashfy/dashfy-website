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
    demo: 'https://demo.dashfy.dev',
    discord: '/discord',
    docs: 'https://docs.dashfy.dev',
    github: 'https://github.com/dashfy',
    roadmap: '/roadmap',
    sponsor: '/sponsor',
    x: 'https://x.com/dashfydev',
  },
} as const
