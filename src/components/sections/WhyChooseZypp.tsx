"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { IndianRupee, Shield, Calendar, Bike, TrendingUp } from "lucide-react"

export interface WhyChooseZyppProps {
  className?: string
}

function HeroCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="relative bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {/* Large Rupee Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <IndianRupee className="w-10 h-10 text-white" />
        </div>
      </div>

      {/* Bold Stat */}
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          Earn up to ₹15,000 more every month
        </h3>
        <p className="text-green-100 text-sm md:text-base">
          Higher earnings with our electric fleet
        </p>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-4 right-4 w-16 h-16 bg-white/10 rounded-full"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-white/10 rounded-full"></div>
    </motion.div>
  )
}

function SupportingCard({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  inView 
}: {
  icon: React.ElementType
  title: string
  description: string
  delay?: number
  inView: boolean
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-green-100 group"
      initial={{ y: 30, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: delay * 0.1 }}
    >
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-all duration-300">
          <Icon className="w-6 h-6 text-green-600" />
        </div>
      </div>

      {/* Content */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export function WhyChooseZypp({ className }: WhyChooseZyppProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const supportingCards = [
    {
      icon: TrendingUp,
      title: "💸 Extra Savings",
      description: "No fuel costs. Save ₹3,000/month on petrol."
    },
    {
      icon: Calendar,
      title: "📆 Affordable Daily Rentals",
      description: "Start with as low as ₹299/day."
    },
    {
      icon: Shield,
      title: "🛡️ Accidental Insurance",
      description: "Stay protected on every ride."
    },
    {
      icon: Bike,
      title: "🚲 Own Your Scooter",
      description: "Rent today, own it tomorrow."
    }
  ]

  return (
    <section 
      ref={ref}
      className={cn("bg-white py-20", className)}
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Zypp Electric?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            We empower riders with higher earnings, lower costs, and long-term security.
          </p>
        </motion.div>

        {/* Cards Grid - Diamond Layout */}
        <div className="flex flex-col items-center gap-6 mb-16 max-w-4xl mx-auto">
          {/* Top Supporting Card */}
          <motion.div
            className="w-full max-w-sm"
            initial={{ y: -30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: -30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <SupportingCard
              icon={supportingCards[0].icon}
              title={supportingCards[0].title}
              description={supportingCards[0].description}
              delay={0}
              inView={isInView}
            />
          </motion.div>

          {/* Middle Row - Hero and Supporting Cards */}
          <div className="flex flex-col md:flex-row items-center gap-6 w-full">
            {/* Left Supporting Card */}
            <motion.div
              className="w-full max-w-sm md:order-1"
              initial={{ x: -30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <SupportingCard
                icon={supportingCards[1].icon}
                title={supportingCards[1].title}
                description={supportingCards[1].description}
                delay={1}
                inView={isInView}
              />
            </motion.div>

            {/* Hero Card - Center */}
            <motion.div
              className="w-full max-w-md md:order-2"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroCard inView={isInView} />
            </motion.div>

            {/* Right Supporting Card */}
            <motion.div
              className="w-full max-w-sm md:order-3"
              initial={{ x: 30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <SupportingCard
                icon={supportingCards[2].icon}
                title={supportingCards[2].title}
                description={supportingCards[2].description}
                delay={2}
                inView={isInView}
              />
            </motion.div>
          </div>

          {/* Bottom Supporting Card */}
          <motion.div
            className="w-full max-w-sm"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <SupportingCard
              icon={supportingCards[3].icon}
              title={supportingCards[3].title}
              description={supportingCards[3].description}
              delay={3}
              inView={isInView}
            />
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-lg md:text-xl text-gray-700 mb-6">
            Join thousands of riders earning more with Zypp today.
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Become a Zypp Pilot
          </Button>
        </motion.div>
      </div>
    </section>
  )
}