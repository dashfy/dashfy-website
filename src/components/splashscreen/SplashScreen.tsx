import { Logo } from '@/components/logo/Logo'
import { siteConfig } from '@/config/site'

export const SplashScreen = () => {
  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-100 flex flex-col items-center justify-center gap-8 bg-background"
      role="status"
    >
      <Logo className="animate-fade-in-blur text-foreground" aria-hidden />

      <div className="relative h-1 w-64 overflow-hidden rounded-full bg-border/50" aria-hidden>
        <div className="animate-loading-bar absolute inset-y-0 left-0 w-1/3 rounded-full bg-foreground" />
      </div>

      <span className="sr-only">Loading {siteConfig.name}...</span>
    </div>
  )
}
