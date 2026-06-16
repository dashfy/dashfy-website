import { namespaceSvgIds } from '@/lib/svg'
import { cn } from '@/lib/utils'

interface BrandLogoProps {
  svg: string
  className?: string
}

export const BrandLogo = ({ svg, className }: BrandLogoProps) => (
  <span
    aria-hidden
    className={cn('inline-flex [&>svg]:h-full [&>svg]:w-full', className)}
    dangerouslySetInnerHTML={{ __html: namespaceSvgIds(svg) }}
  />
)
