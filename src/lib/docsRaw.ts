import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

import type { InferPageType } from 'fumadocs-core/source'

import type { source } from '@/lib/source'

type DocsPage = InferPageType<typeof source>

const FRONTMATTER_PATTERN = /^---\r?\n[\s\S]*?\r?\n---\r?\n?/

/**
 * Reads a doc page's source markdown from disk and strips its YAML
 * frontmatter, returning content suitable for "Copy Page" and the raw
 * `.md` route.
 */
export const getDocMarkdown = async (page: DocsPage): Promise<string> => {
  const filePath = page.absolutePath || join(process.cwd(), 'content/docs', page.path)
  const raw = await readFile(filePath, 'utf8')

  return raw.replace(FRONTMATTER_PATTERN, '').trimStart()
}
