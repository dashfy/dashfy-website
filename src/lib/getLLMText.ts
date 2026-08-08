import type { InferPageType } from 'fumadocs-core/source'

import type { source } from '@/lib/source'

type DocsPage = InferPageType<typeof source>

/**
 * Returns a doc page as markdown, normalised by the MDX compiler so frontmatter
 * and imports are stripped. Requires `includeProcessedMarkdown` in
 * `source.config.ts`.
 */
export const getProcessedMarkdown = (page: DocsPage): Promise<string> =>
  page.data.getText('processed')

/**
 * Returns a doc page as markdown prefixed with a title/URL header, the format
 * Fumadocs recommends for `llms-full.txt` and `.md` routes.
 */
export const getLLMText = async (page: DocsPage): Promise<string> => {
  const processed = await getProcessedMarkdown(page)

  return `# ${page.data.title} (${page.url})\n\n${processed}`
}
