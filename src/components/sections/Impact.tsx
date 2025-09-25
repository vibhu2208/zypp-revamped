"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, TreePine, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImpactProps {
  className?: string
}

// Custom hook for animated counter
function useAnimatedCounter(end: number, duration: number = 2) {
  const [count, setCount] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)

  const animate = React.useCallback(() => {
    if (hasAnimated) return
    
    setHasAnimated(true)
    let start = 0
    const increment = end / (duration * 60) // 60fps
    
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [end, duration, hasAnimated])

  return { count, animate }
}

function ImpactCard({ 
  icon: Icon, 
  value, 
  suffix, 
  title, 
  description, 
  delay = 0,
  inView 
}: {
  icon: React.ElementType
  value: number
  suffix: string
  title: string
  description: string
  delay?: number
  inView: boolean
}) {
  const { count, animate } = useAnimatedCounter(value, 2)

  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(animate, delay * 200)
      return () => clearTimeout(timer)
    }
  }, [inView, animate, delay])

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-zyppGreen/10 rounded-full flex items-center justify-center">
          <Icon className="w-8 h-8 text-zyppGreen" />
        </div>
      </div>

      {/* Animated Counter */}
      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {count.toLocaleString()}{suffix}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-3">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-center leading-relaxed">
        {description}
      </p>
    </motion.div>
  )
}

export function Impact({ className }: ImpactProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const impactData = [
    {
      icon: Leaf,
      value: 20000,
      suffix: "+",
      title: "CO₂ Saved",
      description: "Tons of CO₂ saved by avoiding greenhouse gas emissions through our electric fleet."
    },
    {
      icon: TreePine,
      value: 68000,
      suffix: "+",
      title: "Trees Planted",
      description: "Trees planted through Zypp's environmental initiatives and carbon offset programs."
    },
    {
      icon: Truck,
      value: 24,
      suffix: "/7",
      title: "Zypp Fleet",
      description: "Our electric fleet delivering around the clock, ensuring sustainable last-mile delivery."
    }
  ]

  return (
    <section 
      ref={ref}
      className={cn("py-20 bg-gradient-to-b from-gray-50 to-white", className)}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Environmental Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Making a difference through sustainable delivery solutions
          </p>
        </motion.div>

        {/* Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {impactData.map((item, index) => (
            <ImpactCard
              key={index}
              icon={item.icon}
              value={item.value}
              suffix={item.suffix}
              title={item.title}
              description={item.description}
              delay={index}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
