import { SectionHeading } from '@/components/common/SectionHeading'

import { HowItWorksSteps } from './HowItWorksSteps'

const STEPS = [
  {
    step: '01',
    title: 'Define dashboards as code',
    description:
      'Write declarative configuration in TypeScript, JSON, or YAML. Version, review, and share dashboards alongside your codebase.',
  },
  {
    step: '02',
    title: 'Connect APIs and data sources',
    description:
      'Register extensions like GitHub, system metrics, JSON APIs, or your own custom integrations as data providers.',
  },
  {
    step: '03',
    title: 'Run the Dashfy server',
    description:
      'The server loads configuration, manages API clients, and exposes data to clients through a real-time WebSocket runtime.',
  },
  {
    step: '04',
    title: 'Render real-time interfaces',
    description:
      'The client composes widgets from extensions, receives push updates, and renders responsive dashboards automatically.',
  },
] as const

export const HowItWorksSection = () => {
  return (
    <section className="border-b border-border bg-background" id="how-it-works">
      <div className="mx-auto w-full max-w-6xl px-6 py-20 md:py-28">
        <SectionHeading
          description={
            <>
              Dashfy uses a server&ndash;client architecture. The server loads dashboard
              configuration, connects to APIs, and pushes updates over WebSockets to a composable
              React client.
            </>
          }
          label="How it works"
          title="From configuration to real-time dashboards."
        />

        <div className="mt-16 grid grid-cols-1 border-t border-l border-border md:grid-cols-2">
          {STEPS.map(({ step, title, description }) => (
            <article
              key={step}
              className="group/step relative flex flex-col border-r border-b border-border bg-background transition-colors duration-200 hover:bg-muted/30"
            >
              <div className="relative aspect-16/10 overflow-hidden border-b border-border bg-background">
                <div aria-hidden className="step-art-grid absolute inset-0" />
                <HowItWorksSteps className="absolute inset-0 h-full w-full p-3" step={step} />
              </div>
              <div className="flex flex-1 flex-col p-8">
                <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                  Step {step}
                </span>
                <h3 className="mt-4 text-base font-semibold tracking-tight text-foreground">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
