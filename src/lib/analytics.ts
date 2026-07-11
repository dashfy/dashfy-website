import { track } from '@vercel/analytics'

export const ANALYTICS_EVENTS = {
  ctaDemoClick: 'cta_demo_click',
  ctaDocsClick: 'cta_docs_click',
  ctaGithubClick: 'cta_github_click',
  getStartedOpen: 'get_started_open',
  copyCommand: 'copy_command',
  copyEmail: 'copy_email',
  extensionView: 'extension_view',
  viewAllExtensions: 'view_all_extensions',
  brandDownload: 'brand_download',
  docsCopyPage: 'docs_copy_page',
  docsViewMarkdown: 'docs_view_markdown',
  docsOpenAi: 'docs_open_ai',
  docsCopyCode: 'docs_copy_code',
  docsSearchOpen: 'docs_search_open',
  docsSearchSelect: 'docs_search_select',
  docsNavClick: 'docs_nav_click',
  docsTocClick: 'docs_toc_click',
  docsPaginationClick: 'docs_pagination_click',
  docsContentLink: 'docs_content_link',
} as const

export type AnalyticsEventName = (typeof ANALYTICS_EVENTS)[keyof typeof ANALYTICS_EVENTS]

type AnalyticsValue = string | number | boolean | null
export type AnalyticsData = Record<string, AnalyticsValue>

export const trackEvent = (name: string, data?: AnalyticsData) => {
  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const page = typeof window !== 'undefined' ? window.location.pathname : undefined

  track(name, { page, ...data })
}
