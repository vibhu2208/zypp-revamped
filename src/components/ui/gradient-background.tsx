"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface GradientBackgroundProps {
  className?: string
  variant?: 'hero' | 'subtle' | 'accent'
  animated?: boolean
}

export function GradientBackground({ 
  className,
  variant = 'hero',
  animated = true
}: GradientBackgroundProps) {
  const getGradientClasses = () => {
    switch (variant) {
      case 'hero':
        return 'bg-gradient-to-br from-zyppGreen via-zyppGreen-dark to-emerald-900'
      case 'subtle':
        return 'bg-gradient-to-br from-gray-50 via-white to-gray-100'
      case 'accent':
        return 'bg-gradient-to-br from-zyppGreen/10 via-zyppGreen-dark/10 to-emerald-900/10'
      default:
        return 'bg-gradient-to-br from-zyppGreen via-zyppGreen-dark to-emerald-900'
    }
  }

  const gradientVariants = {
    initial: { opacity: 0.8 },
    animate: { 
      opacity: 1,
      transition: { 
        duration: 3, 
        repeat: Infinity, 
        repeatType: "reverse" as const 
      }
    }
  }

  const MotionDiv = animated ? motion.div : 'div'

  return (
    <MotionDiv
      className={cn(
        "absolute inset-0",
        getGradientClasses(),
        className
      )}
      {...(animated ? {
        variants: gradientVariants,
        initial: "initial",
        animate: "animate"
      } : {})}
    >
      {/* Animated overlay patterns */}
      {variant === 'hero' && (
        <>
          <motion.div
            className="absolute top-0 left-0 w-full h-full opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
            }}
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0]
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </>
      )}
    </MotionDiv>
  )
}
