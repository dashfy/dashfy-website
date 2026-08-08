// The generic stringifier lives on this subpath; the one re-exported from
// `fumadocs-core/mdx-plugins` is bound to remark-structure's context type.
import type { StringifyOptions } from 'fumadocs-core/mdx-plugins/stringifier'
import { defaultStringifier } from 'fumadocs-core/mdx-plugins/stringifier'
import type { Processor } from 'unified'

// Derived from the stringifier's own options so this module doesn't need `mdast`
// and `mdast-util-mdx` as direct dependencies just for type annotations.
type StringifyFn = NonNullable<StringifyOptions['stringify']>
type MdastNode = Parameters<StringifyFn>[0]
type JsxElement = Extract<MdastNode, { type: 'mdxJsxFlowElement' }>
type State = Parameters<StringifyFn>[2]
type Info = Parameters<StringifyFn>[3]

const getAttribute = (node: JsxElement, name: string) => {
  for (const attribute of node.attributes) {
    if (attribute.type !== 'mdxJsxAttribute' || attribute.name !== name) {
      continue
    }

    return typeof attribute.value === 'string' ? attribute.value : undefined
  }
}

const getText = (node: MdastNode): string => {
  if (node.type === 'text' || node.type === 'inlineCode') {
    return node.value
  }

  if ('name' in node && node.name === 'svg') {
    return ''
  }

  if (!('children' in node)) {
    return ''
  }

  return node.children.map(getText).filter(Boolean).join(' ')
}

// `> **Title**` followed by the body, so the callout's emphasis survives as
// markdown rather than as a component with attributes.
const calloutToBlockquote = (node: JsxElement, state: State, info: Info) => {
  const title = getAttribute(node, 'title')
  const body = state.containerFlow(node, info)

  return [title && `**${title}**`, body]
    .filter(Boolean)
    .join('\n\n')
    .split('\n')
    .map((line) => (line ? `> ${line}` : '>'))
    .join('\n')
}

// Cards wrap a framework logo and a label; only the destination is useful in
// markdown, so emit a list item and drop the inline SVG.
const linkedCardToLink = (node: JsxElement) => {
  const href = getAttribute(node, 'href')

  if (!href) {
    return
  }

  return `- [${getText(node) || href}](${href})`
}

/**
 * Captures each page as markdown in `file.data._markdown`, which fumadocs-mdx
 * exports and `page.data.getText('processed')` reads.
 *
 * This runs instead of `postprocess.includeProcessedMarkdown` so it can sit
 * before `remarkNpm` in the pipeline: that plugin expands every authored
 * ```npm fence into four package-manager tabs, which is useful on the page but
 * pure duplication for an LLM.
 */
export function remarkLlmMarkdown(this: Processor) {
  const stringifier = defaultStringifier({
    filterElement(node) {
      if (node.type === 'mdxjsEsm') {
        return false
      }

      if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
        return node.name === 'svg' ? false : 'children-only'
      }

      return true
    },
    stringify(node, _parent, state, info) {
      if (node.type !== 'mdxJsxFlowElement') {
        return
      }

      if (node.name === 'Callout') {
        return calloutToBlockquote(node, state, info)
      }

      if (node.name === 'LinkedCard') {
        return linkedCardToLink(node)
      }
    },
  })

  return (tree: MdastNode, file: { data: Record<string, unknown> }) => {
    file.data._markdown = stringifier.call(this, tree, undefined)
  }
}
