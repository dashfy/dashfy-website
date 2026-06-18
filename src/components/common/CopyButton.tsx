import { useCopy } from '@/hooks/useCopy'
import { ANALYTICS_EVENTS, trackEvent } from '@/lib/analytics'

import { CheckIcon, CopyIcon } from './Icons'

interface CopyButtonProps {
  value: string
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const { copied, copy } = useCopy()

  const handleCopy = () => {
    copy(value)
    trackEvent(ANALYTICS_EVENTS.copyCommand, { command: value })
  }

  return (
    <button
      aria-label={copied ? 'Copied command' : 'Copy command'}
      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
      onClick={handleCopy}
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
    </button>
  )
}
