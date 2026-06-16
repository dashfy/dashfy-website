import { highlightCode } from '@/lib/shiki'

import { STEP_META } from './codeExample'
import type { Step } from './ConfigCarousel'
import { ConfigCarousel } from './ConfigCarousel'

export const ConfigSection = async () => {
  const steps: Step[] = await Promise.all(
    STEP_META.map(async (step) => ({
      ...step,
      codeHtml: await highlightCode(step.code, step.language),
    })),
  )

  return <ConfigCarousel steps={steps} />
}
