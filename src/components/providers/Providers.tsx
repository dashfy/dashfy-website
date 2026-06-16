import { ProgressProvider } from './ProgressProvider'
import { ThemeProvider } from './ThemeProvider'

export const Providers = ({ children }: React.PropsWithChildren) => {
  return (
    <ThemeProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </ThemeProvider>
  )
}
