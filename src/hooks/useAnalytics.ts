// Analytics Hook
// Lightweight analytics tracking hook
// Usage: track("nav_click", { label: "About" })

export function useAnalytics() {
  const track = (event: string, properties?: Record<string, any>) => {
    // Analytics implementation will go here
    // Can integrate with PostHog, Google Analytics, etc.
    console.log('Analytics Event:', event, properties)
  }

  return { track }
}
