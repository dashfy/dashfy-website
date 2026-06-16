import {
  EyeIcon,
  GaugeIcon,
  MonitorIcon,
  ServerIcon,
  TerminalIcon,
  TvIcon,
} from '@/components/common/Icons'
import { SectionHeading } from '@/components/common/SectionHeading'
import { generateReactKey } from '@/lib/utils'

const USE_CASES = [
  {
    icon: TerminalIcon,
    title: 'Developer dashboards',
    description:
      'Monitor APIs, services, CI/CD pipelines, and infrastructure side-by-side with your code.',
  },
  {
    icon: GaugeIcon,
    title: 'Internal tools',
    description:
      'Operational dashboards for internal metrics and system health without building a UI from scratch.',
  },
  {
    icon: EyeIcon,
    title: 'API observability',
    description: 'Visualize API responses, service status, and external integrations in real time.',
  },
  {
    icon: ServerIcon,
    title: 'DevOps & infrastructure',
    description:
      'Track deployments, system metrics, and service health across environments and clusters.',
  },
  {
    icon: MonitorIcon,
    title: 'Real-time systems',
    description:
      'WebSockets and subscriptions make Dashfy a fit for live dashboards and operational displays.',
  },
  {
    icon: TvIcon,
    title: 'Wall displays & kiosks',
    description:
      'Fullscreen mode, rotation, and continuous display make Dashfy ideal for TV monitoring screens.',
  },
] as const

export const UseCasesSection = () => {
  return (
    <section className="border-b border-border" id="use-cases">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          description={
            <>
              Whether you&apos;re monitoring services, building internal tools, or running TV
              dashboards, Dashfy keeps your dashboards declarative and real time.
            </>
          }
          label="Use cases"
          title="Built for developers, ops, and live displays."
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {USE_CASES.map(({ title, description, icon: Icon }) => (
            <div
              key={generateReactKey('use-case', title)}
              className="flex flex-col gap-3 rounded-xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-accent/40"
            >
              <span className="flex size-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Icon className="size-4" />
              </span>
              <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
