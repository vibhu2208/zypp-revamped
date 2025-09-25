"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronDown } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { NavItem } from "./pill-nav"

interface MobileSheetProps {
  isOpen: boolean
  onClose: () => void
  navItems: NavItem[]
  cta?: { label: string; href: string }
  onItemClick?: (item: NavItem) => void
}

export function MobileSheet({ 
  isOpen, 
  onClose, 
  navItems, 
  cta, 
  onItemClick 
}: MobileSheetProps) {
  const [expandedAccordion, setExpandedAccordion] = React.useState<string | null>(null)

  // Handle escape key
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      // Prevent body scroll when sheet is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  const handleItemClick = (item: NavItem) => {
    if (item.type === 'dropdown') {
      setExpandedAccordion(expandedAccordion === item.id ? null : item.id)
    } else {
      onItemClick?.(item)
      onClose()
    }
  }

  const handleChildClick = (child: NavItem) => {
    onItemClick?.(child)
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-50 lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation Menu"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  aria-label="Close menu"
                  className="h-8 w-8"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* CTA at top */}
              {cta && (
                <div className="p-4 border-b border-gray-100">
                  <Button
                    variant="pill"
                    asChild
                    className="w-full justify-center"
                    onClick={() => onClose()}
                  >
                    <Link href={cta.href}>
                      {cta.label}
                    </Link>
                  </Button>
                </div>
              )}

              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.id}>
                    {item.type === 'dropdown' ? (
                      <div className="space-y-2">
                        <Button
                          variant="ghost"
                          className="w-full justify-between text-left h-12 px-4 text-base font-medium"
                          onClick={() => handleItemClick(item)}
                          aria-expanded={expandedAccordion === item.id}
                        >
                          {item.label}
                          <ChevronDown 
                            className={cn(
                              "h-4 w-4 transition-transform duration-200",
                              expandedAccordion === item.id && "rotate-180"
                            )} 
                          />
                        </Button>
                        
                        <AnimatePresence>
                          {expandedAccordion === item.id && item.children && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="pl-4 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.id}
                                    href={child.href || '#'}
                                    className="block py-2 px-4 text-sm text-gray-600 hover:text-zyppGreen hover:bg-gray-50 rounded-md transition-colors duration-150"
                                    onClick={() => handleChildClick(child)}
                                  >
                                    {child.label}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Button
                        variant="ghost"
                        asChild
                        className="w-full justify-start h-12 px-4 text-base font-medium"
                      >
                        <Link 
                          href={item.href || '#'}
                          onClick={() => handleItemClick(item)}
                        >
                          {item.label}
                        </Link>
                      </Button>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
