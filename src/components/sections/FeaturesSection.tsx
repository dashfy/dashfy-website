import {
  BlocksIcon,
  CodeIcon,
  GaugeIcon,
  KeyboardIcon,
  LayoutDashboardIcon,
  LockKeyholeIcon,
  PaletteIcon,
  RefreshCcwIcon,
  ScreenShareIcon,
  ShieldCheckIcon,
  SparklesIcon,
  WifiIcon,
} from '@/components/common/Icons'
import { SectionHeading } from '@/components/common/SectionHeading'
import { Badge } from '@/components/ui/badge'
import { siteConfig } from '@/config/site'
import { generateReactKey } from '@/lib/utils'

const FEATURES = [
  {
    icon: CodeIcon,
    title: 'Declarative configuration',
    description:
      'Define dashboards as structured TypeScript, JSON, or YAML. Versioned, reviewable, reproducible.',
  },
  {
    icon: WifiIcon,
    title: 'Real-time updates',
    description:
      'Server-client architecture built on WebSockets and subscriptions. No polling hacks, no manual refresh.',
  },
  {
    icon: BlocksIcon,
    title: 'Extension-based',
    description:
      'Add widgets and data sources through extensions. Connect to any API or service without forking the core.',
  },
  {
    icon: LayoutDashboardIcon,
    title: 'Composable layouts',
    description:
      'Compose responsive dashboards across screen sizes with a simple grid model and reusable widgets.',
  },
  {
    icon: RefreshCcwIcon,
    title: 'Multiple dashboards',
    description:
      'Define and rotate through multiple dashboards automatically — perfect for kiosk and TV displays.',
  },
  {
    icon: PaletteIcon,
    title: 'Themes and dark mode',
    description:
      'Built-in themes, light and dark mode, and full support for custom themes you can ship with your app.',
  },
  {
    icon: ScreenShareIcon,
    title: 'Wake-lock support',
    description:
      'Keep dashboards alive on always-on displays without dimming or sleep interrupting your monitoring.',
  },
  {
    icon: KeyboardIcon,
    title: 'Keyboard shortcuts',
    description:
      'Productivity-focused shortcuts for navigating dashboards, panels, and settings without leaving the keyboard.',
  },
  {
    icon: ShieldCheckIcon,
    title: 'TypeScript-first',
    description:
      'Fully typed configuration, APIs, and widgets for safety, autocompletion, and refactor-friendly DX.',
  },
  {
    icon: GaugeIcon,
    title: 'Built for ops',
    description:
      'Designed for live displays, internal tools, monitoring screens, and developer-facing dashboards.',
  },
  {
    icon: LockKeyholeIcon,
    title: 'PIN protection',
    description:
      'Lock dashboards behind a PIN to keep kiosk and ops displays safe from accidental edits or unauthorized access.',
    comingSoon: true,
  },
  {
    icon: SparklesIcon,
    title: 'Agent compiler',
    description: `Describe your dashboard in natural language and let the AI agent compile it into a typed ${siteConfig.name} configuration.`,
    comingSoon: true,
  },
] as const

export const FeaturesSection = () => {
  return (
    <section className="border-b border-border bg-background" id="features">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          description={`${siteConfig.name} ships with the building blocks for production-grade dashboards: declarative config, real-time updates, themes, extensions, and a composable React UI.`}
          label="Features"
          title="Everything you need to ship developer dashboards."
        />

        <div className="mt-16 grid grid-cols-1 border-t border-l border-border md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const { title, description, icon: Icon } = feature
            const comingSoon = 'comingSoon' in feature && feature.comingSoon

            return (
              <article
                key={generateReactKey('feature', title)}
                className="group/feature relative flex flex-col border-r border-b border-border bg-background p-8 transition-colors duration-200 hover:bg-muted/30"
              >
                <div className="flex items-start justify-between gap-3">
                  <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} aria-hidden />
                  {comingSoon && <Badge variant="secondary">Soon</Badge>}
                </div>

                <h3 className="mt-6 text-base font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
