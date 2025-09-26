"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"

export interface PartnersProps {
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

function PartnerTile({ 
  logo, 
  name, 
  co2Saved, 
  treesEquivalent, 
  delay = 0,
  inView 
}: {
  logo: string
  name: string
  co2Saved: number
  treesEquivalent: number
  delay?: number
  inView: boolean
}) {
  const { count: co2Count, animate: animateCo2 } = useAnimatedCounter(co2Saved, 2)
  const { count: treesCount, animate: animateTrees } = useAnimatedCounter(treesEquivalent, 2)

  React.useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        animateCo2()
        animateTrees()
      }, delay * 200)
      return () => clearTimeout(timer)
    }
  }, [inView, animateCo2, animateTrees, delay])

  return (
    <motion.div
      className="bg-transparent rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 px-5 py-4 text-center group"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      {/* Partner Logo */}
      <div className="mb-3 flex justify-center">
        <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-green-50/80 transition-all duration-300 shadow-sm">
          <Image
            src={logo}
            alt={name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain transition-all duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Partner Name */}
      <h3 className="text-sm font-bold text-gray-900 mb-3 group-hover:text-green-600 transition-colors duration-300">
        {name}
      </h3>

      {/* Stats */}
      <div className="space-y-2">
        {/* CO₂ Saved */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="text-sm">🌍</span>
            <span className="text-xs text-gray-600 ml-1 font-medium">CO₂ Saved</span>
          </div>
          <div className="text-base font-bold text-green-600">
            {co2Count.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">Tons</div>
        </div>

        {/* Trees Equivalent */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <span className="text-sm">🌳</span>
            <span className="text-xs text-gray-600 ml-1 font-medium">Trees Equivalent</span>
          </div>
          <div className="text-base font-bold text-green-600">
            {treesCount.toLocaleString()}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function HeroPartner({ logo, name, delay = 0, inView }: { logo: string, name: string, delay?: number, inView: boolean }) {
  return (
    <motion.div
      className="flex items-center justify-center h-14 md:h-20"
      initial={{ y: 20, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      <Image
        src={logo}
        alt={name}
        width={120}
        height={80}
        className="h-12 md:h-16 w-auto object-contain transition-all duration-300 hover:scale-110 hover:brightness-110"
      />
    </motion.div>
  )
}

export function Partners({ className }: PartnersProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  // Hero partners (4 main brands) - using actual uploaded logos
  const heroPartners = [
    { logo: "/images/partners/Porter-logo.jpeg", name: "Porter" },
    { logo: "/images/partners/blinkit-logo.jfif", name: "Blinkit" },
    { logo: "/images/partners/bigbasket-logo.png", name: "BigBasket" },
    { logo: "/images/partners/zepto-logo.jfif", name: "Zepto" }
  ]

  // Remaining partners with data - using placeholder data for carousel
  const partnerData = [
    { logo: "/images/partners/swiggy.png", name: "Swiggy", co2Saved: 12500, treesEquivalent: 850 },
    { logo: "/images/partners/zomato.png", name: "Zomato", co2Saved: 9800, treesEquivalent: 650 },
    { logo: "/images/partners/dunzo.png", name: "Dunzo", co2Saved: 7200, treesEquivalent: 480 },
    { logo: "/images/partners/rapido.png", name: "Rapido", co2Saved: 5600, treesEquivalent: 370 },
    { logo: "/images/partners/uber.png", name: "Uber", co2Saved: 15200, treesEquivalent: 1010 },
    { logo: "/images/partners/ola.png", name: "Ola", co2Saved: 18900, treesEquivalent: 1250 },
    { logo: "/images/partners/amazon.png", name: "Amazon", co2Saved: 22300, treesEquivalent: 1480 },
    { logo: "/images/partners/flipkart.png", name: "Flipkart", co2Saved: 19800, treesEquivalent: 1310 },
    { logo: "/images/partners/meesho.png", name: "Meesho", co2Saved: 8700, treesEquivalent: 580 },
    { logo: "/images/partners/nykaa.png", name: "Nykaa", co2Saved: 4200, treesEquivalent: 280 },
    { logo: "/images/partners/myntra.png", name: "Myntra", co2Saved: 6800, treesEquivalent: 450 }
  ]

  // Calculate totals for supporting line
  const totalCo2Saved = partnerData.reduce((sum, partner) => sum + partner.co2Saved, 0)
  const totalTreesEquivalent = partnerData.reduce((sum, partner) => sum + partner.treesEquivalent, 0)

  const { count: totalCo2Count, animate: animateTotalCo2 } = useAnimatedCounter(totalCo2Saved, 3)
  const { count: totalTreesCount, animate: animateTotalTrees } = useAnimatedCounter(totalTreesEquivalent, 3)

  React.useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        animateTotalCo2()
        animateTotalTrees()
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [isInView, animateTotalCo2, animateTotalTrees])

  return (
    <section 
      ref={ref}
      className={cn("bg-[#F9FFF9] py-20", className)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Headline */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands. Driving a Greener Tomorrow 🌱
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-green-600 mx-auto rounded-full"></div>
        </motion.div>

        {/* Hero Partners Row */}
        <motion.div
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mb-16"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {heroPartners.map((partner, index) => (
            <HeroPartner
              key={partner.name}
              logo={partner.logo}
              name={partner.name}
              delay={index}
              inView={isInView}
            />
          ))}
        </motion.div>

        {/* Partner Carousel */}
        <motion.div
          className="relative overflow-hidden mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex gap-3 animate-scroll">
            {/* First set of partners */}
            {partnerData.map((partner, index) => (
              <div key={`first-${index}`} className="flex-shrink-0 w-56">
                <PartnerTile
                  logo={partner.logo}
                  name={partner.name}
                  co2Saved={partner.co2Saved}
                  treesEquivalent={partner.treesEquivalent}
                  delay={index}
                  inView={isInView}
                />
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partnerData.map((partner, index) => (
              <div key={`second-${index}`} className="flex-shrink-0 w-56">
                <PartnerTile
                  logo={partner.logo}
                  name={partner.name}
                  co2Saved={partner.co2Saved}
                  treesEquivalent={partner.treesEquivalent}
                  delay={index}
                  inView={isInView}
                />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Supporting Line */}
        <motion.div
          className="text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl font-medium text-gray-800">
            👉 "Together, our partners have saved{" "}
            <span className="font-bold text-[#00C853]">
              {totalCo2Count.toLocaleString()} Tons
            </span>{" "}
            of CO₂ & planted{" "}
            <span className="font-bold text-[#00C853]">
              {totalTreesCount.toLocaleString()} Trees
            </span>
            ."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
