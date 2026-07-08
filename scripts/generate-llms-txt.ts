import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

import { paths } from '../src/config/paths.ts'
import { siteConfig } from '../src/config/site.ts'

const DOCS_DIR = join(process.cwd(), 'content/docs')
const META_PATH = join(DOCS_DIR, 'meta.json')
const EXTENSIONS_PATH = join(process.cwd(), 'src/config/extensions.ts')
const OUTPUT_PATH = join(process.cwd(), 'public', 'llms.txt')

const url = (path: string) => new URL(path, siteConfig.url).href
const docUrl = (slug: string) => url(slug === 'index' ? paths.docs : `${paths.docs}/${slug}`)
const docMarkdownUrl = (slug: string) => `${docUrl(slug)}.md`

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---/
const SECTION_PATTERN = /^---(.+)---$/
const LINK_PATTERN = /^\[.+\]\(.+\)$/

interface DocEntry {
  slug: string
  title: string
  description: string
}

interface DocSection {
  title: string
  entries: DocEntry[]
}

const parseFrontmatter = (filePath: string): Pick<DocEntry, 'title' | 'description'> => {
  const raw = readFileSync(filePath, 'utf8')
  const match = raw.match(FRONTMATTER_PATTERN)

  if (!match) {
    throw new Error(`Missing frontmatter: ${filePath}`)
  }

  const frontmatter = match[1]
  const title = frontmatter.match(/^title:\s*(.+)$/m)?.[1]?.trim()
  const description = frontmatter.match(/^description:\s*(.+)$/m)?.[1]?.trim()

  if (!title || !description) {
    throw new Error(`Missing title or description: ${filePath}`)
  }

  return { title, description }
}

const loadDocEntry = (slug: string): DocEntry => {
  const filePath = join(DOCS_DIR, `${slug}.mdx`)
  const { title, description } = parseFrontmatter(filePath)
  return { slug, title, description }
}

const loadSectionsFromMeta = (): DocSection[] => {
  const meta = JSON.parse(readFileSync(META_PATH, 'utf8')) as { pages: string[] }
  const sections: DocSection[] = []
  let current: DocSection | null = null

  for (const page of meta.pages) {
    const sectionMatch = page.match(SECTION_PATTERN)

    if (sectionMatch) {
      current = { title: sectionMatch[1].trim(), entries: [] }
      sections.push(current)
      continue
    }

    if (LINK_PATTERN.test(page)) {
      continue
    }

    if (!current) {
      throw new Error(`Doc page "${page}" appears before any section in meta.json`)
    }

    current.entries.push(loadDocEntry(page))
  }

  return sections
}

const loadInstallationGuides = (): DocEntry[] => {
  const installDir = join(DOCS_DIR, 'installation')

  return readdirSync(installDir)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => loadDocEntry(`installation/${file.replace(/\.mdx$/, '')}`))
    .sort((a, b) => a.title.localeCompare(b.title))
}

const loadExtensions = () => {
  const source = readFileSync(EXTENSIONS_PATH, 'utf8')
  const entries = [...source.matchAll(/\{\s*id:\s*'[^']+',\s*label:\s*'([^']+)'([^}]*)\}/g)].map(
    ([, label, rest]) => ({
      label,
      available: /available:\s*true/.test(rest),
    }),
  )

  const byLabel = (a: string, b: string) => a.localeCompare(b, undefined, { sensitivity: 'base' })

  return {
    available: entries
      .filter((entry) => entry.available)
      .map((entry) => entry.label)
      .sort(byLabel),
    comingSoon: entries
      .filter((entry) => !entry.available)
      .map((entry) => entry.label)
      .sort(byLabel),
  }
}

const formatLink = (entry: DocEntry) =>
  `- [${entry.title}](${docUrl(entry.slug)}): ${entry.description}`

const formatSection = (section: DocSection) =>
  [`## ${section.title}`, '', ...section.entries.map(formatLink), ''].join('\n')

const sections = loadSectionsFromMeta()
const installationGuides = loadInstallationGuides()
const { available, comingSoon } = loadExtensions()

const content = `# ${siteConfig.name}

> ${siteConfig.tagline}

${siteConfig.description}

## Site

- [Home](${url(paths.home)}): Product overview, features, config examples, and use cases
- [Extensions](${url(paths.extensions)}): Official integrations and connectors
- [Docs](${url(paths.docs)}): Installation, configuration, CLI, and extension docs
- [Brand](${url(paths.brand)}): Logos, icons, screenshots, and brand guidelines

${sections.map(formatSection).join('\n')}
## Installation guides

Framework-specific setup guides:

${installationGuides.map(formatLink).join('\n')}

## Getting started

Scaffold a new project:

- pnpm: \`pnpm dlx dashfy@latest init\`
- npm: \`npx dashfy@latest init\`
- yarn: \`yarn dlx dashfy@latest init\`
- bun: \`bunx dashfy@latest init\`

Add the Dashfy skill to an AI agent:

- pnpm: \`pnpm dlx dashfy@latest add skill\`
- npm: \`npx dashfy@latest add skill\`
- yarn: \`yarn dlx dashfy@latest add skill\`
- bun: \`bunx dashfy@latest add skill\`

Add an extension (GitHub example):

- pnpm: \`pnpm dlx dashfy@latest add @dashfy/github\`
- npm: \`npx dashfy@latest add @dashfy/github\`
- yarn: \`yarn dlx dashfy@latest add @dashfy/github\`
- bun: \`bunx dashfy@latest add @dashfy/github\`

## Extensions

Available now (${available.length}): ${available.join(', ')}. Full catalog: ${url(paths.extensions)}

Coming soon (${comingSoon.length}): ${comingSoon.join(', ')}

## Raw documentation (markdown)

Any docs page is also available as plain markdown for AI tools — append \`.md\` to the docs URL:

- [Introduction](${docMarkdownUrl('index')})
- [Installation](${docMarkdownUrl('installation')})
- [Configuration](${docMarkdownUrl('configuration')})
- [CLI](${docMarkdownUrl('cli')})

Pattern: \`${siteConfig.url}/docs/<slug>.md\` (example: \`${docMarkdownUrl('installation/next')}\`).

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
- Prefer the raw markdown docs (\`.md\` URLs) over scraping HTML when possible.
- Dashfy extensions use the \`@dashfy/<name>\` namespace (e.g. \`@dashfy/github\`).
- Do not invent API references or config options not shown on the site, docs, or GitHub repo.
`

writeFileSync(OUTPUT_PATH, content)
console.log(`Generated ${OUTPUT_PATH}`)
