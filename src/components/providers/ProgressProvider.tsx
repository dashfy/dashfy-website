'use client'

import { ProgressProvider as NextProgressProvider } from '@bprogress/next/app'

export const ProgressProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <NextProgressProvider
      color="var(--foreground)"
      height="3px"
      options={{ showSpinner: false }}
      shallowRouting={false}
      startPosition={0.1}
      stopDelay={200}
    >
      {children}
    </NextProgressProvider>
  )
}
