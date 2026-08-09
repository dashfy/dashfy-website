import { getLLMText } from '@/lib/getLLMText'
import { source } from '@/lib/source'

let docsText: Promise<string> | undefined

/**
 * Every docs page as a single markdown document, shared by `/llms-full.txt` and
 * the Ask AI route. Memoized per server instance so the string handed to the
 * model stays byte-identical between requests, which is what lets OpenAI reuse
 * its cached prompt prefix instead of billing the whole corpus every time.
 */
export const getLlmsFullText = (): Promise<string> => {
  docsText ??= Promise.all(source.getPages().map(getLLMText)).then((pages) => pages.join('\n\n'))

  return docsText
}
