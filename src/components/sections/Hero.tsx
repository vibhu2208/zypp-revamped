"use client"

import * as React from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

export interface HeroProps {
  className?: string
}
export function Hero({ className }: HeroProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])

  return (
    <section className={cn("relative min-h-[80vh] overflow-hidden rounded-3xl mx-2 mt-2", className)}>
      {/* Hero Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y, opacity }}
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div 
          className="w-full h-[120%] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('/banner-3-Optimized.webp')"
          }}
        />
      </motion.div>
    </section>
  )
}
