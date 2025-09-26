"use client"

import React, { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Smartphone, Wallet, CreditCard, CheckCircle, Play } from "lucide-react"

export interface PilotTimelineProps {
  className?: string
}

const timelineSteps = [
  {
    id: 1,
    title: "Download App",
    description: "Get the Zypp app from Play Store",
    icon: Smartphone,
    mockupContent: {
      title: "Welcome to Zypp",
      subtitle: "Download our app to get started"
    }
  },
  {
    id: 2,
    title: "Complete KYC",
    description: "Verify your identity with documents",
    icon: CreditCard,
    mockupContent: {
      title: "Identity Verification",
      subtitle: "Upload your documents for verification"
    }
  },
  {
    id: 3,
    title: "Start Earning",
    description: "Begin your delivery journey",
    icon: Wallet,
    mockupContent: {
      title: "Start Delivering",
      subtitle: "Accept orders and start earning"
    }
  },
  {
    id: 4,
    title: "Get Paid",
    description: "Receive your earnings daily",
    icon: CheckCircle,
    mockupContent: {
      title: "Daily Payouts",
      subtitle: "Get paid instantly for your deliveries"
    }
  }
]

export function PilotTimeline({ className }: PilotTimelineProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [activeStep, setActiveStep] = useState(0)
  const [isVideoOpen, setIsVideoOpen] = useState(false)

  const renderTimelineSteps = () => {
    return timelineSteps.map((step, index) => {
      const isActive = index === activeStep
      const isCompleted = index < activeStep
      
      return (
        <motion.div
          key={step.id}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => setActiveStep(index)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="relative">
            <motion.div
              className={cn(
                "w-16 h-16 rounded-full flex items-center justify-center border-4 transition-all duration-300",
                isActive || isCompleted
                  ? "bg-green-500 border-green-500 text-white shadow-lg" 
                  : "bg-white border-gray-300 text-gray-400 group-hover:border-green-300"
              )}
              animate={{
                scale: isActive ? 1.1 : 1,
                boxShadow: isActive ? "0 0 20px rgba(34, 197, 94, 0.4)" : "0 0 0px rgba(34, 197, 94, 0)"
              }}
            >
              <step.icon className="w-6 h-6" />
            </motion.div>
          </div>

          <div className="mt-3 text-center">
            <h3 className={cn(
              "font-semibold text-sm transition-colors duration-300",
              isActive ? "text-green-600" : "text-gray-700"
            )}>
              {step.title}
            </h3>
            <p className="text-xs text-gray-500 mt-1 max-w-24">
              {step.description}
            </p>
          </div>
        </motion.div>
      )
    })
  }

  const renderPhoneMockup = () => {
    const currentStep = timelineSteps[activeStep]
    
    return (
      <div className="relative mx-auto w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
          <div className="bg-gray-100 h-6 flex items-center justify-between px-4 text-xs">
            <span>9:41</span>
            <div className="flex space-x-1">
              <div className="w-4 h-2 bg-gray-400 rounded"></div>
              <div className="w-4 h-2 bg-gray-400 rounded"></div>
              <div className="w-4 h-2 bg-gray-400 rounded"></div>
            </div>
          </div>
          <div className="p-6 h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <currentStep.icon className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {currentStep.mockupContent.title}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentStep.mockupContent.subtitle}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div 
        ref={ref}
        className={cn("bg-white py-20", className)}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Become a Zypp Pilot in 4 Simple Steps
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Join thousands of delivery partners earning more with electric vehicles
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-200 rounded-full">
              <motion.div
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${((activeStep + 1) / timelineSteps.length) * 100}%` 
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <div className="relative grid grid-cols-4 gap-4 mb-16">
              {renderTimelineSteps()}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <motion.div
              className="lg:order-1"
              initial={{ x: -30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Button
                onClick={() => setIsVideoOpen(true)}
                variant="outline"
                className="w-full py-4 px-6 rounded-full border-2 border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-3 text-gray-600 group-hover:text-green-600" />
                <span className="font-semibold text-gray-700 group-hover:text-green-700">
                  🎥 How to Become a Zypp Pilot
                </span>
              </Button>
            </motion.div>

            <motion.div
              className="lg:order-2 flex justify-center"
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {renderPhoneMockup()}
            </motion.div>

            <motion.div
              className="lg:order-3"
              initial={{ x: 30, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="w-full py-4 px-6 rounded-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Become a Pilot
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">
              How to Become a Zypp Pilot
            </DialogTitle>
          </DialogHeader>
          <div className="aspect-video rounded-lg overflow-hidden">
            <video 
              className="w-full h-full object-cover"
              controls
              preload="metadata"
            >
              <source src="/how-to-join-zypp.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}