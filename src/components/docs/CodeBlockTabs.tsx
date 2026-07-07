'use client'

import { createContext, useContext } from 'react'

import { TerminalIcon } from '@/components/common/Icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { usePackageManager } from '@/hooks/usePackageManager'
import { cn } from '@/lib/utils'

const InCodeBlockTabsContext = createContext(false)

export const useInCodeBlockTabs = () => useContext(InCodeBlockTabsContext)

type CodeBlockTabsProps = Omit<React.ComponentProps<typeof Tabs>, 'defaultValue'> & {
  // Injected by fumadocs' remarkNpm plugin.
  groupId?: string
  persist?: boolean
  defaultValue?: string
}

const CodeBlockTabs = ({
  groupId,
  persist: _persist,
  defaultValue,
  className,
  children,
  ...props
}: CodeBlockTabsProps) => {
  // Default to pnpm regardless of remarkNpm's first-in-list (`npm`) default.
  const [value, setValue] = usePackageManager(groupId ?? '')
  const controlled = Boolean(groupId)

  return (
    <InCodeBlockTabsContext.Provider value={true}>
      <Tabs
        className={cn(
          'my-6 gap-0 overflow-hidden rounded-xl border border-border bg-muted/40',
          className,
        )}
        {...(controlled ? { value, onValueChange: setValue } : { defaultValue })}
        {...props}
      >
        {children}
      </Tabs>
    </InCodeBlockTabsContext.Provider>
  )
}

const CodeBlockTabsList = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsList>) => {
  return (
    <div className="flex items-center gap-2 border-b border-border px-3 py-1.5">
      <TerminalIcon className="size-3.5 shrink-0 text-muted-foreground" />
      <TabsList className={cn('h-auto rounded-none bg-transparent p-0', className)} {...props}>
        {children}
      </TabsList>
    </div>
  )
}

const CodeBlockTabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsTrigger>) => {
  return (
    <TabsTrigger
      className={cn(
        'h-7 flex-none rounded-md border border-transparent px-2 text-xs text-muted-foreground shadow-none data-[state=active]:border-border data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-none',
        className,
      )}
      {...props}
    />
  )
}

const CodeBlockTab = ({ className, ...props }: React.ComponentProps<typeof TabsContent>) => {
  return <TabsContent className={cn('mt-0', className)} {...props} />
}

export { CodeBlockTab, CodeBlockTabs, CodeBlockTabsList, CodeBlockTabsTrigger }
