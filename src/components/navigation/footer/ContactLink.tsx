'use client'

import { siteConfig } from '@/config/site'
import { useCopy } from '@/hooks/useCopy'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'

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

  const handleCopy = () => {
    copy(siteConfig.email)
    trackEvent(ANALYTICS_EVENTS.copyEmail)
  }

  return (
    <button
      aria-label={
        copied ? `Copied ${siteConfig.email}` : `${label} — copy email address ${siteConfig.email}`
      }
      className={className}
      onClick={handleCopy}
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
