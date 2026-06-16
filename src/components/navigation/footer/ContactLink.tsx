'use client'

import { siteConfig } from '@/config/site'
import { useCopy } from '@/hooks/useCopy'

interface ContactLinkProps extends React.HTMLAttributes<HTMLButtonElement> {
  label?: string
  copiedLabel?: string
}

export const ContactLink = ({
  className,
  label = 'Contact',
  copiedLabel = 'Copied!',
}: ContactLinkProps) => {
  const { copied, copy } = useCopy()

  return (
    <button
      aria-label={
        copied ? `Copied ${siteConfig.email}` : `${label} — copy email address ${siteConfig.email}`
      }
      className={className}
      onClick={() => copy(siteConfig.email)}
      type="button"
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
