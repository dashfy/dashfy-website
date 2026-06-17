import { ExternalLink } from '@/components/common/ExternalLink'
import { ArrowUpRightIcon } from '@/components/common/Icons'
import { ExtensionLogo } from '@/components/sections/extensions/ExtensionLogo'
import { Badge } from '@/components/ui/badge'
import type { Extension } from '@/config/extensions'
import { getExtensionGitHubUrl } from '@/config/extensions'
import { ANALYTICS_EVENTS } from '@/lib/analytics'

interface CardShellProps {
  children: React.ReactNode
  dimmed?: boolean
}

const CardShell = ({ children, dimmed }: CardShellProps) => (
  <div
    className={`group relative flex h-full flex-col gap-4 rounded-xl border border-border bg-card p-5 transition-colors ${
      dimmed ? 'opacity-60' : 'hover:border-foreground/20 hover:bg-accent/40'
    }`}
  >
    {children}
  </div>
)

export const ExtensionCard = ({ id, label, logo, available }: Extension) => {
  const content = (
    <>
      <div className="flex items-start justify-between">
        <span className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-foreground">
          <ExtensionLogo className="h-6 w-6" logo={logo} />
        </span>
        {available ? (
          <ArrowUpRightIcon className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        ) : (
          <Badge variant="secondary">Soon</Badge>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">
          {available ? 'View on GitHub' : 'Coming soon'}
        </span>
      </div>
    </>
  )

  if (available) {
    return (
      <ExternalLink
        className="block h-full"
        data-analytics-event={ANALYTICS_EVENTS.extensionView}
        data-analytics-id={id}
        href={getExtensionGitHubUrl(id)}
      >
        <CardShell>{content}</CardShell>
      </ExternalLink>
    )
  }

  return (
    <div aria-disabled className="h-full cursor-default">
      <CardShell dimmed>{content}</CardShell>
    </div>
  )
}
