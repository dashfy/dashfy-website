import { llms } from 'fumadocs-core/source'

import { siteConfig } from '@/config/site'
import { formatLlmsExtras } from '@/lib/llmsExtras'
import { source } from '@/lib/source'

/**
 * Page tree URLs are root-relative, while the rest of the file links to the
 * live site. Rewrite them so every link resolves without a base URL.
 */
const absolutizeLinks = (markdown: string) => markdown.replaceAll('](/', `](${siteConfig.url}/`)

/**
 * Builds `llms.txt`: the docs index generated from the Fumadocs page tree, so
 * it stays in sync as pages are added or removed, followed by the
 * Dashfy-specific sections the tree cannot express.
 */
export const getLlmsIndex = () => {
  const { indexNode } = llms(source)
  const docsIndex = source
    .getPageTree()
    .children.map((node) => indexNode(node))
    .join('\n')

  return [
    `# ${siteConfig.name}`,
    '',
    `> ${siteConfig.tagline}. ${siteConfig.description}`,
    '',
    '## Documentation',
    absolutizeLinks(docsIndex),
    '',
    formatLlmsExtras(),
  ].join('\n')
}
