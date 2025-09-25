// Main Homepage
// Combines all sections with proper SSR + ISR setup

import {
  Navbar,
  Hero,
  Impact,
  WhyChooseZypp,
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
      
      {/* Dynamic Section with ISR */}
      <Impact />
      
      {/* Static Sections */}
      <WhyChooseZypp />
      <Comparison />
      <PilotTimeline />
      <Services />
      <Testimonials />
      <Footer />
    </main>
  )
}
