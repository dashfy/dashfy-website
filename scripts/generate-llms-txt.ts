import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { paths } from '../src/config/paths.ts'
import { siteConfig } from '../src/config/site.ts'

const url = (path: string) => new URL(path, siteConfig.url).href

const content = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Site

- [Home](${url(paths.home)}): Product overview, features, config examples, and use cases
- [Extensions](${url(paths.extensions)}): Official integrations and connectors
- [Docs](${url(paths.docs)}): Installation, configuration, CLI, and extension docs
- [Brand](${url(paths.brand)}): Logos, icons, screenshots, and brand guidelines

## Getting started

Scaffold a new project:

- pnpm: \`pnpm create dashfy@latest\`
- npm: \`npx create-dashfy@latest\`
- yarn: \`yarn create dashfy@latest\`
- bun: \`bun create dashfy@latest\`

Add the Dashfy skill to an AI agent:

- pnpm: \`pnpm dlx dashfy@latest add skill\`
- npm: \`npx dashfy@latest add skill\`
- yarn: \`yarn dlx dashfy@latest add skill\`
- bun: \`bunx dashfy@latest add skill\`

## Available extensions

GitHub, JSON / REST, Market Live, NBA, System Monitoring. Full list: ${url(paths.extensions)}

## External resources

- [Live demo](${siteConfig.links.demo})
- [GitHub](${siteConfig.links.github})
- [Roadmap](${siteConfig.url + siteConfig.links.roadmap})
- [Sponsor](${siteConfig.url + siteConfig.links.sponsor})
- [Discord](${siteConfig.url + siteConfig.links.discord})
- [X (Twitter)](${siteConfig.links.x})

## Contact

- Email: ${siteConfig.email}

## Notes for AI agents

- Brand name is "Dashfy" (capital D, single word). Do not alter brand assets from /brand.
- Do not invent API references or config options not shown on the site, docs, or GitHub repo.
`

writeFileSync(join(process.cwd(), 'public', 'llms.txt'), content)
console.log('Generated public/llms.txt')
