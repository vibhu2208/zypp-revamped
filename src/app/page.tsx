// Main Homepage
// Combines all sections with proper SSR + ISR setup

import {
  Navbar,
  Hero,
  Partners,
  WhyChooseZypp,
  SaveMore,
  Comparison,
  PilotTimeline,
  Services,
  Testimonials,
  Footer
} from '@/components/sections'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Static Sections */}
      <Navbar />
      <Hero />
      <Partners />
      
      {/* Static Sections */}
      <WhyChooseZypp />
      <SaveMore />
      <Comparison />
      <PilotTimeline />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  )
}
