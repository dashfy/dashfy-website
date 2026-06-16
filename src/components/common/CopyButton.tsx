import { useCopy } from '@/hooks/useCopy'

import { CheckIcon, CopyIcon } from './Icons'

interface CopyButtonProps {
  value: string
}

export const CopyButton = ({ value }: CopyButtonProps) => {
  const { copied, copy } = useCopy()

  return (
    <button
      aria-label={copied ? 'Copied command' : 'Copy command'}
      className="shrink-0 text-muted-foreground transition-colors hover:text-foreground"
      onClick={() => copy(value)}
      type="button"
    >
      {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
    </button>
  )
}
