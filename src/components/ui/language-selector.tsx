"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

export interface LanguageSelectorProps {
  className?: string
  onLanguageChange?: (language: string) => void
}

const languages = [
  { code: 'en', label: 'English', flag: '🇺🇸' },
  { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' }
]

export function LanguageSelector({ className, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [selectedLanguage, setSelectedLanguage] = React.useState(languages[0])
  const dropdownRef = React.useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLanguageSelect = (language: typeof languages[0]) => {
    setSelectedLanguage(language)
    setIsOpen(false)
    onLanguageChange?.(language.code)
  }

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full border border-white/20 text-white transition-all duration-200"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{selectedLanguage.flag}</span>
        <ChevronDown 
          className={cn(
            "w-4 h-4 transition-transform duration-200",
            isOpen && "rotate-180"
          )} 
        />
      </motion.button>

      {/* Dropdown */}
      <motion.div
        className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50"
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={isOpen ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: -10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {languages.map((language) => (
          <motion.button
            key={language.code}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors",
              selectedLanguage.code === language.code && "bg-zyppGreen/10 text-zyppGreen"
            )}
            onClick={() => handleLanguageSelect(language)}
            whileHover={{ backgroundColor: "rgba(0, 177, 64, 0.05)" }}
          >
            <span className="text-lg">{language.flag}</span>
            <span className="text-sm font-medium text-gray-900">{language.label}</span>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
