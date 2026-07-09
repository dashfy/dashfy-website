import { cn } from '@/lib/utils'

export const Steps = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      className={cn(
        'docs-steps mb-8 ml-4 border-l border-border pl-6 [&>h3]:mt-8 [&>h3]:mb-3',
        className,
      )}
      {...props}
    />
  )
}

export const Step = ({ className, ...props }: React.ComponentProps<'h3'>) => {
  return (
    <h3
      className={cn('mt-8 mb-3 scroll-m-20 text-base font-semibold tracking-tight', className)}
      {...props}
    />
  )
}
