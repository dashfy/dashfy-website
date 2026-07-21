import { siteConfig } from '@/config/site'

export const YAML_EXAMPLE = `title: GitHub Dashboard
columns: 3
rows: 2
widgets:
  - extension: github
    widget: RepoBadge
    x: 0
    y: 0
    columns: 1
    rows: 1
    repository: facebook/react
  - extension: github
    widget: PullRequests
    x: 1
    y: 0
    columns: 2
    rows: 1
    repository: vercel/next.js
    state: open
  - extension: json
    widget: JsonStatus
    x: 0
    y: 1
    columns: 3
    rows: 1
    title: API Status
    url: https://api.example.com/health`

export const SERVER_EXAMPLE = `import { createGitHubClient } from '@getdashfy/ext-github/client'
import { createSystemClient } from '@getdashfy/ext-system/client'
import { Dashfy } from '@getdashfy/server'

const dashfy = new Dashfy()

await dashfy.configureFromFile('./dashfy.config.yml')

dashfy.registerApi(
  'github',
  createGitHubClient({ token: process.env.GITHUB_TOKEN! }),
)

dashfy.registerApi('system', createSystemClient(), 'push')

await dashfy.start()`

export const APP_EXAMPLE = `import { PullRequests, RepoBadge } from '@getdashfy/ext-github'
import { CpuUsageLine, MemoryUsageGauge } from '@getdashfy/ext-system'
import { Dashfy, WidgetRegistry } from '@getdashfy/ui'

WidgetRegistry.addExtension('github', {
  PullRequests,
  RepoBadge,
})

WidgetRegistry.addExtension('system', {
  CpuUsageLine,
  MemoryUsageGauge,
})

export const App = () => {
  return <Dashfy />
}`

export interface StepMeta {
  id: string
  title: string
  description: string
  filename: string
  language: string
  code: string
}

export const STEP_META: readonly StepMeta[] = [
  {
    id: 'yaml',
    title: 'Define dashboards in YAML',
    description:
      'Declarative configuration alongside your codebase. Version, review, and share dashboards as plain text.',
    filename: 'dashfy.config.yml',
    language: 'yaml',
    code: YAML_EXAMPLE,
  },
  {
    id: 'server',
    title: 'Register APIs on the server',
    description: `Set up extensions on the ${siteConfig.name} server, hand them credentials, and start streaming data over WebSockets.`,
    filename: 'dashfy.server.ts',
    language: 'ts',
    code: SERVER_EXAMPLE,
  },
  {
    id: 'client',
    title: 'Render with the React client',
    description:
      'Register widget extensions in the browser and render the live dashboard with a single component.',
    filename: 'App.tsx',
    language: 'tsx',
    code: APP_EXAMPLE,
  },
] as const
