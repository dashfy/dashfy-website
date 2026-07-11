import { ProgressProvider } from './ProgressProvider'
import { ThemeProvider } from './ThemeProvider'

interface ProvidersProps {
  children: React.ReactNode
}

export const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </ThemeProvider>
  )
}
