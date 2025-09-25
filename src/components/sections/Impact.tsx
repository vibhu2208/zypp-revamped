"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { Leaf, TreePine, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

export interface ImpactProps {
  className?: string
}

// Custom hook for animated counter that increases every 1.5 seconds
function useAnimatedCounter(end: number, duration: number = 2) {
  const [count, setCount] = React.useState(0)
  const [hasAnimated, setHasAnimated] = React.useState(false)
  const [isIncreasing, setIsIncreasing] = React.useState(false)

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
        setIsIncreasing(true)
      } else {
        setCount(Math.floor(start))
      }
    }, 1000 / 60)
    
    return () => clearInterval(timer)
  }, [end, duration, hasAnimated])

  // Function to increase numbers by 1 every 1.5 seconds
  const startIncreasing = React.useCallback(() => {
    if (!isIncreasing) return
    
    const increaseInterval = setInterval(() => {
      setCount(prevCount => prevCount + 1)
    }, 1500) // Every 1.5 seconds
    
    return () => clearInterval(increaseInterval)
  }, [isIncreasing])

  React.useEffect(() => {
    if (isIncreasing) {
      const cleanup = startIncreasing()
      return cleanup
    }
  }, [isIncreasing, startIncreasing])

  return { count, animate }
}

function ImpactCard({ 
  icon: Icon, 
  value, 
  suffix, 
  title, 
  description, 
  backgroundImage,
  delay = 0,
  inView 
}: {
  icon: React.ElementType
  value: number
  suffix: string
  title: string
  description: string
  backgroundImage: string
  delay?: number
  inView: boolean
}) {
  const { count, animate } = useAnimatedCounter(value, 3)

  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(animate, delay * 200)
      return () => clearTimeout(timer)
    }
  }, [inView, animate, delay])

  return (
    <motion.div
      className="relative rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-3 h-full flex flex-col justify-center overflow-hidden group"
      initial={{ y: 50, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 rounded-2xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Animated Counter */}
        <div className="mb-4">
          <div className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
            {count.toLocaleString()}{suffix}
          </div>
          <h3 className="text-xl font-semibold text-white mb-3 drop-shadow-md">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/90 text-center leading-relaxed drop-shadow-sm">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function Impact({ className }: ImpactProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const impactData = [
    {
      icon: Leaf,
      value: 56882400,
      suffix: "",
      title: "CO₂ Saved",
      description: "CO₂ saved by avoiding greenhouse gas emissions.",
      backgroundImage: "https://images.unsplash.com/photo-1569163139394-0d1b5d4b8a4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: Truck,
      value: 142991300,
      suffix: "",
      title: "Deliveries Till Now",
      description: "Successful deliveries completed by our electric fleet.",
      backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: TreePine,
      value: 2844111,
      suffix: "",
      title: "Trees Equivalent",
      description: "Avoided greenhouse gas emissions equivalent to planting this many trees.",
      backgroundImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ]

  return (
    <section 
      ref={ref}
      className={cn("bg-white flex items-center py-4", className)}
    >
      <div className="w-full px-1 mx-1">
        {/* Impact Cards - No header, just cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-2 w-full h-full">
          {impactData.map((item, index) => (
            <ImpactCard
              key={index}
              icon={item.icon}
              value={item.value}
              suffix={item.suffix}
              title={item.title}
              description={item.description}
              backgroundImage={item.backgroundImage}
              delay={index}
              inView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
