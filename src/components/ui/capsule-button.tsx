"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button, ButtonProps } from "./button"

export interface CapsuleButtonProps extends ButtonProps {
  animated?: boolean
  glowEffect?: boolean
}

export function CapsuleButton({ 
  animated = true,
  glowEffect = false,
  className,
  children,
  asChild = false,
  ...props 
}: CapsuleButtonProps) {
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: animated ? 1.05 : 1,
      transition: { duration: 0.2, ease: "easeOut" }
    },
    tap: { 
      scale: animated ? 0.95 : 1,
      transition: { duration: 0.1 }
    }
  }

  // When asChild is true, we can't wrap the children with additional elements
  if (asChild) {
    return (
      <Button
        variant="pill"
        className={cn(
          "relative overflow-hidden",
          glowEffect && "shadow-lg hover:shadow-xl hover:shadow-zyppGreen/20",
          className
        )}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    )
  }

  const MotionWrapper = animated ? motion.div : 'div'

  return (
    <MotionWrapper
      className={cn("relative inline-block")}
      variants={animated ? buttonVariants : undefined}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <Button
        variant="pill"
        className={cn(
          "relative overflow-hidden",
          glowEffect && "shadow-lg hover:shadow-xl hover:shadow-zyppGreen/20",
          className
        )}
        {...props}
      >
        {glowEffect && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-zyppGreen/20 to-zyppGreen-dark/20 rounded-3xl"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
        <span className="relative z-10">{children}</span>
      </Button>
    </MotionWrapper>
  )
}
