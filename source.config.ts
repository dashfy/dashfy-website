import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

import { remarkLlmMarkdown } from './src/lib/remarkLlmMarkdown'

export const docs = defineDocs({
  dir: 'content/docs',
})

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: { id: 'package-manager' },
    },
    // Prepended so it runs before remarkNpm expands each authored ```npm fence
    // into four package-manager tabs. It only reads the tree, writing the
    // markdown snapshot that `getText('processed')` returns.
    remarkPlugins: (plugins) => [remarkLlmMarkdown, ...plugins],
  },
})
