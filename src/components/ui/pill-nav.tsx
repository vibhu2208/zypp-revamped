"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

export interface NavItem {
  id: string
  label: string
  href?: string
  type?: 'link' | 'dropdown'
  children?: NavItem[]
}

interface PillNavProps {
  items: NavItem[]
  activeId?: string
  onItemClick?: (item: NavItem) => void
  className?: string
}

export function PillNav({ items, activeId, onItemClick, className }: PillNavProps) {
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null)
  const [hoveredItem, setHoveredItem] = React.useState<string | null>(null)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, item: NavItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      if (item.type === 'dropdown') {
        setOpenDropdown(openDropdown === item.id ? null : item.id)
      } else if (item.href) {
        onItemClick?.(item)
      }
    } else if (event.key === 'Escape') {
      setOpenDropdown(null)
    }
  }

  const handleMouseEnter = (item: NavItem) => {
    // Clear any pending close timeout
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    
    setHoveredItem(item.id)
    if (item.type === 'dropdown') {
      console.log('Opening dropdown for:', item.label) // Debug log
      setOpenDropdown(item.id)
    }
  }

  const handleMouseLeave = () => {
    setHoveredItem(null)
    // Add a small delay before closing to prevent flickering
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
      closeTimeoutRef.current = null
    }, 150)
  }

  const handleDropdownMouseEnter = () => {
    // Clear any pending close timeout when mouse enters dropdown
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = null
    }
    setHoveredItem(openDropdown)
  }

  const handleDropdownMouseLeave = () => {
    // Close dropdown when mouse leaves dropdown area
    setHoveredItem(null)
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null)
      closeTimeoutRef.current = null
    }, 150)
  }

  return (
    <nav className={cn("flex items-center gap-4", className)} aria-label="Primary Navigation">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative"
          ref={item.type === 'dropdown' ? dropdownRef : undefined}
          onMouseEnter={() => handleMouseEnter(item)}
          onMouseLeave={handleMouseLeave}
        >
          {item.type === 'dropdown' ? (
            <Button
              variant={activeId === item.id ? "navPillActive" : "navPill"}
              className="flex items-center gap-1"
              onClick={() => setOpenDropdown(openDropdown === item.id ? null : item.id)}
              onKeyDown={(e) => handleKeyDown(e, item)}
              aria-expanded={openDropdown === item.id}
              aria-haspopup="true"
            >
              {item.label}
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  openDropdown === item.id && "rotate-180"
                )} 
              />
            </Button>
          ) : (
            <Button
              variant={activeId === item.id ? "navPillActive" : "navPill"}
              asChild
              onKeyDown={(e) => handleKeyDown(e, item)}
            >
              <Link 
                href={item.href || '#'}
                onClick={() => onItemClick?.(item)}
                aria-label={item.label}
              >
                {item.label}
              </Link>
            </Button>
          )}

          {/* Dropdown Menu */}
          {item.type === 'dropdown' && item.children && openDropdown === item.id && (
            <motion.div
              initial={{ opacity: 0, translateY: -8 }}
              animate={{ opacity: 1, translateY: 0 }}
              exit={{ opacity: 0, translateY: -8 }}
              transition={{ duration: 0.22 }}
              className="absolute top-full left-0 mt-2 min-w-[220px] bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
              role="menu"
              onMouseEnter={handleDropdownMouseEnter}
              onMouseLeave={handleDropdownMouseLeave}
            >
              {item.children.map((child) => (
                <Link
                  key={child.id}
                  href={child.href || '#'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-zyppGreen transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-zyppGreen focus:ring-offset-2"
                  role="menuitem"
                  onClick={() => {
                    onItemClick?.(child)
                    setOpenDropdown(null)
                  }}
                >
                  {child.label}
                </Link>
              ))}
            </motion.div>
          )}
        </div>
      ))}
    </nav>
  )
}
