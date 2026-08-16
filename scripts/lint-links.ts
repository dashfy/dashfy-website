/**
 * Validates internal doc links: markdown links, `LinkedCard` hrefs, and heading
 * anchors. External URLs are left alone — `next-validate-link` only fetches them
 * when `checkExternal` is enabled, which keeps this check offline and fast.
 */
import { glob, readFile } from 'node:fs/promises'
import { register } from 'node:module'
import { join } from 'node:path'

import { type FileObject, printErrors, scanURLs, validateFiles } from 'next-validate-link'

// `.source/index.ts` imports `.mdx?collection=docs`, which only resolves through
// the Fumadocs loader hook. Must run before `src/lib/source.ts` is imported. The
// `lint:links` script regenerates `.source` first so new pages are always seen.
register('fumadocs-mdx/node/loader', import.meta.url)

const { source } = await import('../src/lib/source')

const APP_DIR = 'src/app'
const DOCS_DIR = 'content/docs'
const META_PATH = join(DOCS_DIR, 'meta.json')
// `validateFiles` picks its parser from the file extension, so the sidebar config
// is passed under a markdown alias. Markdown link syntax survives inside JSON
// strings, which keeps reported line numbers pointing at the real entries.
const META_MARKDOWN_ALIAS = `${META_PATH}.md`

/**
 * App Router paths of every route handler. The Next preset only globs `page`
 * files, so handler-backed routes like `/llms.txt` look missing without these.
 */
const getRouteHandlers = async (): Promise<string[]> => {
  const handlers: string[] = []

  for await (const file of glob('**/route.ts', { cwd: APP_DIR })) {
    handlers.push(file)
  }

  return handlers
}

/**
 * Rewrites same-page anchors to absolute URLs. Hrefs with an empty pathname are
 * skipped by the validator, so the `#existing-project` style card links on the
 * installation guides would otherwise go unchecked.
 */
const expandSelfAnchors = (content: string, url: string): string =>
  content.replaceAll('](#', `](${url}#`).replaceAll('href="#', `href="${url}#`)

const getFiles = async (): Promise<FileObject[]> => {
  const pages = await Promise.all(
    source.getPages().map(async (page) => {
      const path = join(DOCS_DIR, page.path)

      return {
        path,
        url: page.url,
        content: expandSelfAnchors(await readFile(path, 'utf8'), page.url),
      }
    }),
  )

  return [
    ...pages,
    {
      path: META_MARKDOWN_ALIAS,
      url: '/docs',
      content: await readFile(META_PATH, 'utf8'),
    },
  ]
}

const checkLinks = async (): Promise<void> => {
  const scanned = await scanURLs({
    preset: 'next',
    pages: await getRouteHandlers(),
    // Without this, the optional catch-all leaves a `/docs/(.+)` fallback that
    // matches every path. Listing real slugs is what makes broken doc links fail,
    // and the table of contents supplies the valid anchors per page.
    populate: {
      'docs/[[...slug]]': source.getPages().map((page) => ({
        value: { slug: page.slugs },
        hashes: page.data.toc.map((item) => item.url.slice(1)),
      })),
    },
  })

  const results = await validateFiles(await getFiles(), {
    scanned,
    checkRelativePaths: 'as-url',
    markdown: {
      components: {
        LinkedCard: { attributes: ['href'] },
      },
    },
  })

  printErrors(
    results.map((result) =>
      result.file === META_MARKDOWN_ALIAS ? { ...result, file: META_PATH } : result,
    ),
    true,
  )
}

await checkLinks()
