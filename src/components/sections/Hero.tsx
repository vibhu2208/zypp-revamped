"use client"

import * as React from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Leaf, TreePine, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

export interface HeroProps {
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
      className="relative rounded-xl p-3 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 h-full flex flex-col justify-center overflow-hidden group"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.2 }}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 rounded-xl" />
      
      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-2">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Animated Counter */}
        <div className="mb-2">
          <div className="text-xl font-bold text-white mb-1 drop-shadow-lg">
            {count.toLocaleString()}{suffix}
          </div>
          <h3 className="text-xs font-semibold text-white mb-1 drop-shadow-md">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-white/90 text-xs text-center leading-tight drop-shadow-sm">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function Hero({ className }: HeroProps) {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 300], [0, -150])
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8])
  
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const impactData = [
    {
      icon: Leaf,
      value: 56882400,
      suffix: "",
      title: "CO₂ Saved",
      description: "CO₂ saved by avoiding greenhouse gas emissions.",
      backgroundImage: "/1.png"
    },
    {
      icon: Truck,
      value: 142991300,
      suffix: "",
      title: "Deliveries Till Now",
      description: "Successful deliveries completed by our electric fleet.",
      backgroundImage: "/2.png"
    },
    {
      icon: TreePine,
      value: 2844111,
      suffix: "",
      title: "Trees Equivalent",
      description: "Avoided greenhouse gas emissions equivalent to planting this many trees.",
      backgroundImage: "/3.png"
    }
  ]

  return (
    <section className={cn("relative h-[85vh] overflow-hidden rounded-3xl mx-2 mt-2", className)}>
      <div className="flex h-full">
        {/* Hero Image Section - 80% width (increased from 70%) */}
        <div className="w-[80%] relative overflow-hidden rounded-l-3xl h-full">
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
                backgroundImage: "url('/hero-design.png')"
              }}
            />
          </motion.div>
        </div>

        {/* Impacsst Section - 20% width (reduced from 30%) */}
        <div className="w-[20%] bg-white rounded-r-3xl h-full">
          <div ref={ref} className="w-full h-full p-2">
            <div className="grid grid-cols-1 gap-2 w-full h-full">
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
        </div>
      </div>
    </section>
  )
}
