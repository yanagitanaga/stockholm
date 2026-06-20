import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { SelectedWorks } from '@/components/selected-works'
import { Services } from '@/components/services'
import { Clients } from '@/components/clients'
import { CtaSection } from '@/components/cta-section'
import { SiteFooter } from '@/components/site-footer'
import { OrbCursor } from '@/components/orb-cursor'

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <OrbCursor />
      <SiteHeader />
      <main>
        <Hero />
        <SelectedWorks />
        <Services />
        <Clients />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
