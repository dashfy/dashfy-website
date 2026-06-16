import { cn } from '@/lib/utils'

import { ConnectApisArt } from './arts/ConnectApisArt'
import { DefineAsCodeArt } from './arts/DefineAsCodeArt'
import { RealtimeArt } from './arts/RealtimeArt'
import { RunServerArt } from './arts/RunServerArt'

type StepId = '01' | '02' | '03' | '04'

interface HowItWorksStepsProps extends React.SVGProps<SVGSVGElement> {
  step: StepId
}

export const HowItWorksSteps = ({ step, className, ...props }: HowItWorksStepsProps) => {
  return (
    <svg
      aria-hidden
      className={cn('text-foreground', className)}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 320 220"
      {...props}
    >
      {step === '01' ? <DefineAsCodeArt /> : null}
      {step === '02' ? <ConnectApisArt /> : null}
      {step === '03' ? <RunServerArt /> : null}
      {step === '04' ? <RealtimeArt /> : null}
    </svg>
  )
}
