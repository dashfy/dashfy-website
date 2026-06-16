import 'server-only'

import type { BundledLanguage, Highlighter } from 'shiki'
import { createHighlighter } from 'shiki'

const THEMES = { light: 'github-light', dark: 'github-dark' } as const

const LANGUAGES: readonly BundledLanguage[] = ['yaml', 'typescript', 'tsx'] as const

let highlighterPromise: Promise<Highlighter> | null = null

const getHighlighter = () => {
  highlighterPromise ??= createHighlighter({
    themes: [THEMES.light, THEMES.dark],
    langs: [...LANGUAGES],
  })

  return highlighterPromise
}

const resolveLanguage = (language: string): BundledLanguage => {
  const normalized = language === 'ts' ? 'typescript' : language
  return (LANGUAGES.includes(normalized as BundledLanguage) ? normalized : 'tsx') as BundledLanguage
}

export const highlightCode = async (code: string, language: string): Promise<string> => {
  const highlighter = await getHighlighter()

  return highlighter.codeToHtml(code, {
    lang: resolveLanguage(language),
    themes: THEMES,
    defaultColor: 'light',
  })
}
