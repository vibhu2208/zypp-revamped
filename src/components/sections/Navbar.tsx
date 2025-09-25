"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { PillNav, NavItem } from "@/components/ui/pill-nav"
import { MobileSheet } from "@/components/ui/mobile-sheet"
import { LanguageSelector } from "@/components/ui/language-selector"
import { useAnalytics } from "@/hooks/useAnalytics"

export interface NavbarProps {
  navItems?: NavItem[]
  cta?: { label: string; href: string; variant?: 'primary' | 'secondary' }
  sticky?: boolean
  theme?: 'light' | 'dark'
  className?: string
}

const defaultNavItems: NavItem[] = [
  {
    id: 'about-zypp',
    label: 'About Zypp',
    type: 'dropdown',
    children: [
      {
        id: 'who-we-are',
        label: 'Who We Are',
        href: '/about/who-we-are',
        type: 'link'
      },
      {
        id: 'technologies',
        label: 'Technologies',
        href: '/about/technologies',
        type: 'link'
      },
      {
        id: 'esg',
        label: 'ESG',
        href: '/about/esg',
        type: 'link'
      },
      {
        id: 'press',
        label: 'Press',
        href: '/about/press',
        type: 'link'
      },
      {
        id: 'environment',
        label: 'Environment',
        href: '/about/environment',
        type: 'link'
      }
    ]
  },
  {
    id: 'delivery-partner',
    label: 'Delivery Partner',
    href: '/delivery-partner',
    type: 'link'
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    type: 'link'
  },
  {
    id: 'franchise',
    label: 'Franchise',
    href: '/franchise',
    type: 'link'
  },
  {
    id: 'advertise',
    label: 'Advertise',
    href: '/advertise',
    type: 'link'
  }
]

const defaultCta = {
  label: 'Get Started',
  href: '/get-started'
}

export function Navbar({
  navItems = defaultNavItems,
  cta = defaultCta,
  sticky = true,
  theme = 'light',
  className
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [activeItem, setActiveItem] = React.useState<string | null>(null)
  const { track } = useAnalytics()

  // Handle scroll for sticky behavior
  React.useEffect(() => {
    if (!sticky) return

    const handleScroll = () => {
      const scrolled = window.scrollY > 8
      setIsScrolled(scrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sticky])

  // Handle route changes to set active item
  React.useEffect(() => {
    const currentPath = window.location.pathname
    const activeNavItem = navItems.find(item => 
      item.href === currentPath || 
      item.children?.some(child => child.href === currentPath)
    )
    setActiveItem(activeNavItem?.id || null)
  }, [navItems])

  const handleNavClick = (item: NavItem) => {
    track('nav_click', { label: item.label })
    setActiveItem(item.id)
    console.log('Nav item clicked:', item) // Debug log
  }

  const handleCtaClick = () => {
    track('cta_click', { label: cta.label, location: 'navbar' })
  }

  const handleMobileMenuToggle = () => {
    const newState = !isMobileMenuOpen
    setIsMobileMenuOpen(newState)
    track(newState ? 'mobile_menu_open' : 'mobile_menu_close', {})
  }

  const handleDropdownOpen = (method: 'hover' | 'click' | 'keyboard') => {
    track('about_dropdown_open', { method })
  }

  return (
    <>
      <motion.header
        className={cn(
          "w-full transition-all duration-300 z-40 fixed top-0 left-0 right-0 bg-transparent",
          theme === 'dark' && "bg-gray-900 text-white",
          className
        )}
        initial={false}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-18 lg:h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zyppGreen rounded-md"
                onClick={() => track('nav_click', { label: 'Logo' })}
              >
                <Image
                  src="/logo-desktop.png"
                  alt="Zypp — Electric Last Mile Delivery"
                  width={120}
                  height={40}
                  priority
                  className="h-8 w-auto sm:h-10 lg:h-12 hidden sm:block"
                />
                <Image
                  src="/logo-mobile.png"
                  alt="Zypp — Electric Last Mile Delivery"
                  width={80}
                  height={30}
                  priority
                  className="h-6 w-auto sm:hidden"
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:justify-center flex-1">
              <div className="border border-gray-300 rounded-full px-6 py-2 bg-white/90 backdrop-blur-sm">
                <PillNav
                  items={navItems}
                  activeId={activeItem || undefined}
                  onItemClick={handleNavClick}
                  className="mx-4"
                />
              </div>
            </div>

            {/* Desktop Right Side - App Download Buttons */}
            <div className="hidden lg:flex lg:items-center lg:gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => track('app_download', { platform: 'android' })}
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4482.9993.9993 0 .5511-.4482.9997-.9993.9997m11.4045-6.02l1.9973-3.4592a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.503C15.5902 8.6589 13.8533 7.8228 12 7.8228s-3.5902.8361-4.7137 2.0859L5.2639 6.4057a.416.416 0 00-.5676-.1521.416.416 0 00-.1521.5676l1.9973 3.4592C2.6889 11.1867.3432 14.6589 0 18.761h24c-.3432-4.1021-2.6889-7.5743-6.1185-9.4396"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => track('app_download', { platform: 'ios' })}
              >
                <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91 1.52.12 2.65 1.09 3.5 2.07-1.03 1.2-1.6 2.85-1.32 4.41.26 1.42 1.04 2.76 2.03 3.64.6.5 1.25 1.04 2.15 1.01.85-.03 1.18-.5 2.22-.5 1.03 0 1.33.47 2.22.45.9-.02 1.5-.6 2.1-1.1.65-.57 1.18-1.48 1.64-2.38-2.14-.8-2.5-2.56-2.5-2.56s.52-1.05.82-1.62c.8.95 2.24 1.78 2.24 1.78s1.37-1.22 1.9-2.3c.53-1.08.9-2.13.9-2.13s-1.18.53-2.3 1.18c-1.12.65-1.8 1.18-1.8 1.18s-.9-1.22-1.5-1.75c-.6-.53-1.3-.9-1.3-.9s.9.53 1.5 1.18c.6.65 1.1 1.3 1.1 1.3s-.6-.4-1.3-.8c-.7-.4-1.5-.8-1.5-.8s.8.4 1.3.8c.5.4.9.8.9.8s-.4-.3-.9-.6c-.5-.3-1.1-.6-1.1-.6s.6.3 1 .6c.4.3.8.6.8.6s-.3-.2-.7-.4c-.4-.2-.9-.4-.9-.4s.5.2.8.4c.3.2.6.4.6.4s-.2-.1-.5-.2c-.3-.1-.7-.2-.7-.2s.4.1.6.2c.2.1.4.2.4.2s-.1 0-.3-.1c-.2-.1-.5-.1-.5-.1s.3 0 .4.1c.1.1.2.1.2.1s0 0-.1 0c-.1 0-.2 0-.2 0s.1 0 .1 0c0 0 0 0 0 0z"/>
                </svg>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMobileMenuToggle}
                aria-label="Open mobile menu"
                aria-expanded={isMobileMenuOpen}
                className="h-10 w-10"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Sheet */}
      <MobileSheet
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        cta={cta}
        onItemClick={handleNavClick}
      />

      {/* Mobile Sticky CTA Bar */}
      <motion.div
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="pill"
          asChild
          className="w-full justify-center h-12"
          onClick={handleCtaClick}
        >
          <Link href={cta.href}>
            {cta.label}
          </Link>
        </Button>
      </motion.div>

      {/* Add padding to body content to account for sticky CTA on mobile */}
      <div className="lg:hidden h-20" aria-hidden="true" />
    </>
  )
}
