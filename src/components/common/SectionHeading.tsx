import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  label: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
  as?: 'h1' | 'h2'
  align?: 'center' | 'left'
  className?: string
  descriptionClassName?: string
}

export const SectionHeading = ({
  label,
  title,
  description,
  as: Heading = 'h2',
  align = 'center',
  className,
  descriptionClassName,
}: SectionHeadingProps) => (
  <div
    className={cn(
      'flex max-w-2xl flex-col',
      align === 'center' ? 'mx-auto items-center gap-3 text-center' : 'gap-4',
      className,
    )}
  >
    <span className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
      {label}
    </span>

    <Heading
      className={cn(
        'font-semibold tracking-tight text-balance',
        Heading === 'h1' ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl',
      )}
    >
      {title}
    </Heading>

    {description && (
      <p className={cn('text-balance text-muted-foreground', descriptionClassName)}>
        {description}
      </p>
    )}
  </div>
)
