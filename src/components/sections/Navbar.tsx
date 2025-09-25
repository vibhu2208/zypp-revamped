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
    id: 'about',
    label: 'About Us',
    href: '/about',
    type: 'link'
  },
  {
    id: 'properties',
    label: 'Property List',
    href: '/properties',
    type: 'link'
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    type: 'link'
  },
  {
    id: 'contact',
    label: 'Contact',
    href: '/contact',
    type: 'link'
  }
]

const defaultCta = {
  label: 'Admin Login',
  href: '/admin/login'
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
          "w-full transition-all duration-300 z-40 bg-white shadow-sm",
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
              <PillNav
                items={navItems}
                activeId={activeItem || undefined}
                onItemClick={handleNavClick}
                className="mx-8"
              />
            </div>

            {/* Desktop Right Side - Language Selector + CTA */}
            <div className="hidden lg:flex lg:items-center lg:gap-4">
              <LanguageSelector 
                onLanguageChange={(lang) => track('language_change', { language: lang })}
              />
              <Button
                variant="pill"
                asChild
                onClick={handleCtaClick}
                className="bg-zyppGreen hover:bg-zyppGreen-dark text-white"
              >
                <Link href={cta.href}>
                  {cta.label}
                </Link>
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
