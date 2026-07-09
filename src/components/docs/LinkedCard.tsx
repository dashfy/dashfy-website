import Link from 'next/link'

import { cn } from '@/lib/utils'

export const LinkedCard = ({ className, ...props }: React.ComponentProps<typeof Link>) => (
  <Link
    className={cn(
      'flex w-full flex-col rounded-xl border border-border bg-card p-6 text-card-foreground no-underline transition-colors hover:bg-muted/50',
      className,
    )}
    {...props}
  />
)
