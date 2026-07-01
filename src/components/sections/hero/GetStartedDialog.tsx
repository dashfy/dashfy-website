'use client'

import Link from 'next/link'

import { CopyButton } from '@/components/common/CopyButton'
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/common/ResponsiveDialog'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { paths } from '@/config/paths'
import { siteConfig } from '@/config/site'
import { ANALYTICS_EVENTS } from '@/lib/analytics'
import { cn, generateReactKey } from '@/lib/utils'

const PACKAGE_MANAGERS = ['pnpm', 'npm', 'yarn', 'bun'] as const

type PackageManager = (typeof PACKAGE_MANAGERS)[number]

interface InstallTab {
  value: string
  label: string
  description: string
  commands: Record<PackageManager, string>
}

const INSTALL_TABS: readonly InstallTab[] = [
  {
    value: 'cli',
    label: 'CLI',
    description: 'Scaffolds a new dashboard project.',
    commands: {
      pnpm: 'pnpm create dashfy@latest',
      npm: 'npx create-dashfy@latest',
      yarn: 'yarn create dashfy',
      bun: 'bun create dashfy@latest',
    },
  },
  {
    value: 'skill',
    label: 'Skill',
    description: `Add the ${siteConfig.name} skill to your AI agent.`,
    commands: {
      pnpm: 'pnpm dlx dashfy@latest add skill',
      npm: 'npx dashfy@latest add skill',
      yarn: 'yarn dlx dashfy@latest add skill',
      bun: 'bunx dashfy@latest add skill',
    },
  },
] as const

interface CommandLineProps {
  command: string
}

const CommandLine = ({ command }: CommandLineProps) => {
  const [bin, ...rest] = command.split(' ')

  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="font-mono text-[13px] text-muted-foreground select-none">$</span>
      <code className="flex-1 font-mono text-[13px] text-foreground">
        <span className="font-medium text-primary">{bin}</span>
        {rest.length > 0 ? ` ${rest.join(' ')}` : ''}
      </code>
      <CopyButton value={command} />
    </div>
  )
}

interface PackageManagerTabsProps {
  commands: Record<PackageManager, string>
}

const PackageManagerTabs = ({ commands }: PackageManagerTabsProps) => {
  return (
    <Tabs className="gap-0" defaultValue={PACKAGE_MANAGERS[0]}>
      <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
        <TabsList className="h-auto justify-start gap-1 rounded-none bg-transparent p-0">
          {PACKAGE_MANAGERS.map((manager, index) => (
            <TabsTrigger
              key={generateReactKey('pm-tab', manager, index)}
              className={cn(
                'h-7 flex-none rounded-md border border-transparent bg-transparent px-2 text-[13px] font-medium text-muted-foreground shadow-none',
                'hover:text-foreground data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none',
              )}
              value={manager}
            >
              {manager}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {PACKAGE_MANAGERS.map((manager, index) => (
        <TabsContent key={generateReactKey('pm-content', manager, index)} value={manager}>
          <CommandLine command={commands[manager]} />
        </TabsContent>
      ))}
    </Tabs>
  )
}

export const GetStartedDialog = () => {
  return (
    <ResponsiveDialog>
      <ResponsiveDialogTrigger asChild>
        <Button
          className="h-12 rounded-xl px-8 text-base font-semibold"
          data-analytics-event={ANALYTICS_EVENTS.getStartedOpen}
          data-analytics-location="hero"
          size="lg"
        >
          Get started
        </Button>
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent className="md:max-w-md">
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Get started with {siteConfig.name}</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>Spin up a dashboard in seconds.</ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogBody>
          <Tabs defaultValue={INSTALL_TABS[0].value}>
            <div className="overflow-hidden rounded-lg border border-border bg-muted/40">
              <TabsList className="h-auto w-full justify-start gap-0 rounded-none border-b border-border bg-transparent p-0">
                {INSTALL_TABS.map((tab, index) => (
                  <TabsTrigger
                    key={generateReactKey('install-tab', tab.value, index)}
                    className={cn(
                      'relative flex-none rounded-none border-0 bg-transparent px-3.5 pt-3 pb-2.5 text-[13px] font-medium text-muted-foreground shadow-none',
                      'hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none',
                      'after:absolute after:inset-x-3.5 after:-bottom-px after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 data-[state=active]:after:opacity-100',
                    )}
                    value={tab.value}
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>

              {INSTALL_TABS.map((tab, index) => (
                <TabsContent
                  key={generateReactKey('install-content', tab.value, index)}
                  value={tab.value}
                >
                  <PackageManagerTabs commands={tab.commands} />
                  <p className="border-t border-border px-4 py-3 text-xs leading-snug text-muted-foreground">
                    {tab.description}
                  </p>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </ResponsiveDialogBody>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose asChild>
            <Button variant="outline">Close</Button>
          </ResponsiveDialogClose>
          <Button asChild>
            <Link
              data-analytics-event={ANALYTICS_EVENTS.ctaDocsClick}
              data-analytics-location="get_started_dialog"
              href={paths.docs}
            >
              Go to docs
            </Link>
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
