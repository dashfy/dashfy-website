import { HeroDesktop } from './HeroDesktop'
import { HeroMobile } from './HeroMobile'

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <HeroDesktop />
      <HeroMobile />
    </section>
  )
}
