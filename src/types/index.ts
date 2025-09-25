// Global Type Definitions

export interface ImpactData {
  co2Saved: number
  treesPlanted: number
  partnersCount: number
  lastUpdated: string
}

export interface TimelineStep {
  id: string
  title: string
  description: string
  status: 'completed' | 'current' | 'upcoming'
  date?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar?: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  features: string[]
}

export interface Partner {
  id: string
  name: string
  logo: string
  website?: string
}

export interface AnalyticsEvent {
  event: string
  properties?: Record<string, any>
  timestamp?: string
}
