const appName = 'Dashfy'
const tagline = 'Dashboards for developers'

export const siteConfig = {
  name: appName,
  tagline,
  title: `${appName} - ${tagline}`,
  description: 'Define dashboards as code. Connect APIs. Render real-time interfaces.',
  url: 'https://dashfy.dev',
  email: 'contact@dashfy.dev',
  links: {
    demo: 'https://demo.dashfy.dev',
    discord: 'https://discord.gg/dashfy',
    docs: 'https://docs.dashfy.dev',
    github: 'https://github.com/dashfy/dashfy',
    roadmap: 'https://github.com/orgs/dashfy/projects/1',
    sponsor: 'https://github.com/sponsors/brenopolanski',
    x: 'https://x.com/dashfy',
  },
} as const
