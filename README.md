# Zypp Homepage Redesign

A modern, high-performance homepage built with Next.js 14, featuring sustainable design principles and optimal user experience.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS + shadcn/ui
- **Animations**: Framer Motion + Lottie
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Performance**: ISR, Image Optimization, Core Web Vitals optimized

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── impact/        # Impact data endpoint
│   ├── globals.css        # Global styles with design tokens
│   ├── layout.tsx         # Root layout with SEO
│   └── page.tsx           # Homepage
├── components/
│   ├── sections/          # Main page sections
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Impact.tsx     # Dynamic section with ISR
│   │   ├── WhyChooseZypp.tsx
│   │   ├── Comparison.tsx
│   │   ├── PilotTimeline.tsx
│   │   ├── Services.tsx
│   │   ├── Testimonials.tsx
│   │   └── Footer.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── pill-nav.tsx
│       └── timeline-step.tsx
├── hooks/                 # Custom React hooks
│   ├── useAnalytics.ts
│   └── useImpactData.ts
├── lib/
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript definitions
```

## 🎨 Design System

### Colors
- **Zypp Green**: `#00B140` (primary)
- **Zypp Green Dark**: `#0DA04B` (hover states)
- **Neutral Light**: `#F7F8F9` (backgrounds)
- **Neutral Card**: `#F0F2F3` (card backgrounds)
- **Neutral Text**: `#6B7280` (secondary text)

### Typography
- **Heading Large**: 48px/32px/24px (desktop/tablet/mobile)
- **Heading Medium**: 32px/24px/20px
- **Body Base**: 16px/14px
- **Caption**: 12px

### Components
- **Border Radius**: `rounded-3xl` for pills, `rounded-xl` for cards
- **Shadows**: `shadow-lg` for primary cards, `shadow-sm` for buttons
- **Spacing**: Consistent Tailwind scale (p-4, p-6, gap-6)

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 📊 Performance Requirements

- **Core Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Lighthouse Score**: ≥90 on all metrics
- **Image Optimization**: WebP/AVIF with lazy loading
- **ISR**: Impact data regenerates every 10 minutes
- **Accessibility**: WCAG 2.1 AA compliant

## 🔧 Key Features

- **SSR + ISR**: Static generation with dynamic data updates
- **Responsive Design**: Mobile-first approach with breakpoints
- **Keyboard Navigation**: Full accessibility support
- **Analytics Ready**: Built-in event tracking hooks
- **SEO Optimized**: Structured data and meta tags
- **Performance Optimized**: Code splitting and lazy loading

## 📱 Responsive Behavior

- **Desktop**: Full timeline, hover animations
- **Tablet**: Condensed layout, touch-friendly
- **Mobile**: Accordion timeline, sticky CTA bar

## 🎯 Analytics Events

Track user interactions with the built-in analytics hook:

```typescript
const { track } = useAnalytics()
track('nav_click', { label: 'About' })
track('cta_click', { section: 'hero', label: 'Get Started' })
```

## 🔄 Data Flow

1. **Static Content**: Navigation, Hero, Footer (build time)
2. **Dynamic Content**: Impact stats (ISR every 10 minutes)
3. **Client Interactions**: Animations, form submissions
4. **Analytics**: Real-time event tracking

## 🛠️ Development Guidelines

- Use semantic HTML elements
- Implement proper ARIA labels
- Optimize images with Next.js Image component
- Follow the established design system
- Write accessible, keyboard-navigable components
- Test on multiple devices and screen sizes

## 📈 Deployment

The project is optimized for deployment on Vercel with automatic:
- Image optimization
- Edge caching
- ISR support
- Analytics integration
