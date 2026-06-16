const hashString = (value: string): string => {
  let hash = 5381

  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) + hash + value.charCodeAt(index)) | 0
  }

  return (hash >>> 0).toString(36)
}

const escapeRegExp = (value: string): string => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/**
 * Makes the internal IDs of a raw SVG string unique.
 *
 * Brand SVGs frequently define gradients/masks with short, generic IDs
 * (`a`, `b`, `c`, ...). When several SVGs are inlined into the same document
 * (e.g. via `dangerouslySetInnerHTML`), those IDs collide and references like
 * `fill="url(#b)"` resolve to the first matching ID in the document, so a logo
 * can pick up another logo's gradient. Suffixing every ID with a deterministic
 * hash of the SVG keeps each distinct logo self-contained while staying stable
 * across server/client renders (identical SVGs share the same suffix).
 */
export const namespaceSvgIds = (svg: string): string => {
  const ids = new Set<string>()

  for (const match of svg.matchAll(/\sid="([^"]+)"/g)) {
    ids.add(match[1])
  }

  if (ids.size === 0) {
    return svg
  }

  const suffix = hashString(svg)
  let result = svg

  for (const id of ids) {
    const escaped = escapeRegExp(id)
    const unique = `${id}-${suffix}`

    result = result
      .replace(new RegExp(`id="${escaped}"`, 'g'), `id="${unique}"`)
      .replace(new RegExp(`url\\(#${escaped}\\)`, 'g'), `url(#${unique})`)
      .replace(new RegExp(`(xlink:href|href)="#${escaped}"`, 'g'), `$1="#${unique}"`)
  }

  return result
}
