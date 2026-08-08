import { EXTENSIONS } from '@/config/extensions'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'

const url = (path: string) => new URL(path, siteConfig.url).href
const docUrl = (slug: string) => url(`${paths.docs}/${slug}`)
const docMarkdownUrl = (slug: string) => `${docUrl(slug)}.md`

const byLabel = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' })

const extensionLabels = (available: boolean) =>
  EXTENSIONS.filter((extension) => Boolean(extension.available) === available)
    .map((extension) => extension.label)
    .sort(byLabel)

const packageManagerCommands = (command: string) =>
  [
    `- pnpm: \`pnpm dlx ${command}\``,
    `- npm: \`npx ${command}\``,
    `- yarn: \`yarn dlx ${command}\``,
    `- bun: \`bunx ${command}\``,
  ].join('\n')

/**
 * Dashfy-specific sections appended to the Fumadocs-generated page tree index
 * in `llms.txt`. Everything here is context the docs tree cannot express:
 * site-wide links, CLI usage, the extension catalog, and agent guidance.
 */
export const formatLlmsExtras = () => {
  const available = extensionLabels(true)
  const comingSoon = extensionLabels(false)

  return `## Site

- [Home](${url(paths.home)}): Product overview, features, config examples, and use cases
- [Extensions](${url(paths.extensions)}): Official integrations and connectors
- [Docs](${url(paths.docs)}): Installation, configuration, CLI, and extension docs
- [Brand](${url(paths.brand)}): Logos, icons, screenshots, and brand guidelines

## CLI commands

Scaffold a new project:

${packageManagerCommands('dashfy@latest init')}

Add the ${siteConfig.name} skill to an AI agent (via the skills CLI, not the ${siteConfig.name} CLI):

${packageManagerCommands('skills add dashfy/dashfy')}

Add an extension (GitHub example):

${packageManagerCommands('dashfy@latest add @getdashfy/github')}

## Extensions

Available now (${available.length}): ${available.join(', ')}. Full catalog: ${url(paths.extensions)}

Coming soon (${comingSoon.length}): ${comingSoon.join(', ')}

## Raw documentation (markdown)

Any docs page is also available as plain markdown for AI tools — append \`.md\` to the docs URL:

- [Introduction](${url(`${paths.docs}.md`)})
- [Installation](${docMarkdownUrl('installation')})
- [Configuration](${docMarkdownUrl('configuration')})
- [CLI](${docMarkdownUrl('cli')})

Pattern: \`${siteConfig.url}${paths.docs}/<slug>.md\` (example: \`${docMarkdownUrl('installation/next')}\`).

For the entire documentation as a single file, use [${paths.llmsFullTxt}](${url(paths.llmsFullTxt)}).

## External resources

- [Live demo](${siteConfig.links.demo})
- [GitHub](${siteConfig.links.github})
- [Roadmap](${url(siteConfig.links.roadmap)})
- [Sponsor](${url(siteConfig.links.sponsor)})
- [Discord](${url(siteConfig.links.discord)})
- [X (Twitter)](${siteConfig.links.x})

## Contact

- Email: ${siteConfig.email}

## Notes for AI agents

- Brand name is "${siteConfig.name}" (capital D, single word). Do not alter brand assets from ${paths.brand}.
- Prefer the raw markdown docs (\`.md\` URLs) over scraping HTML when possible.
- ${siteConfig.name} extensions use the \`@getdashfy/<name>\` namespace (e.g. \`@getdashfy/github\`).
- Do not invent API references or config options not shown on the site, docs, or GitHub repo.
`
}
