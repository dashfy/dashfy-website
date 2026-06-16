import { BrandLogo } from '@/components/common/BrandLogo'
import type { ExtensionLogo as ExtensionLogoType } from '@/config/extensions'
import type { ThemedSvg } from '@/lib/thesvg'
import { cn } from '@/lib/utils'

interface ExtensionLogoProps {
  logo?: ExtensionLogoType
  className?: string
}

const isThemedSvg = (logo: NonNullable<ExtensionLogoType>): logo is ThemedSvg =>
  typeof logo === 'object' && 'light' in logo && 'dark' in logo

export const ExtensionLogo = ({ logo, className }: ExtensionLogoProps) => {
  if (!logo) {
    return null
  }

  if (typeof logo === 'string') {
    return <BrandLogo className={className} svg={logo} />
  }

  if (isThemedSvg(logo)) {
    return (
      <>
        <BrandLogo className={cn('dark:hidden', className)} svg={logo.light} />
        <BrandLogo className={cn('hidden dark:inline-flex', className)} svg={logo.dark} />
      </>
    )
  }

  const Icon = logo

  return <Icon className={className} />
}
