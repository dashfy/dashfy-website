import { defineConfig, defineDocs } from 'fumadocs-mdx/config'

export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    // Exposes `page.data.getText('processed')`, used to serve docs as clean
    // markdown to LLMs instead of raw MDX.
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
})

export default defineConfig({
  mdxOptions: {
    remarkNpmOptions: {
      persist: { id: 'package-manager' },
    },
  },
})
