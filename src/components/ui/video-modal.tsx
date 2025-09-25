"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Play } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"
import { useAnalytics } from "@/hooks/useAnalytics"

export interface VideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoTitle: string
  thumbnailUrl?: string
  className?: string
}

export function VideoModal({
  isOpen,
  onClose,
  videoUrl,
  videoTitle,
  thumbnailUrl,
  className
}: VideoModalProps) {
  const { track } = useAnalytics()
  const modalRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden'
      
      // Track video modal open
      track('video_modal_open', { video_title: videoTitle })
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose, track, videoTitle])

  const handleVideoPlay = () => {
    track('video_play', { video_title: videoTitle })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Modal Content */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              className={cn(
                "relative w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl",
                className
              )}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-black">
                {thumbnailUrl && !isOpen ? (
                  <div className="relative inset-0">
                    <img
                      src={thumbnailUrl}
                      alt={videoTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Button
                        size="icon"
                        className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 border-2 border-white/50"
                        onClick={() => {}}
                      >
                        <Play className="w-8 h-8 text-white" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={videoUrl}
                    title={videoTitle}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onLoad={handleVideoPlay}
                  />
                )}
              </div>

              {/* Header */}
              <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/60 to-transparent">
                <div className="flex items-center justify-between">
                  <h3 className="text-white text-lg font-semibold">
                    {videoTitle}
                  </h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
