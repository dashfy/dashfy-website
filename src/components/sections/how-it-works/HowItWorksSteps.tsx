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
      className={cn('text-foreground', className)}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 320 220"
      aria-hidden
      {...props}
    >
      {step === '01' && <DefineAsCodeArt />}
      {step === '02' && <ConnectApisArt />}
      {step === '03' && <RunServerArt />}
      {step === '04' && <RealtimeArt />}
    </svg>
  )
}
