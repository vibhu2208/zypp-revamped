"use client"

import * as React from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Fuel, Zap, TrendingUp, DollarSign } from "lucide-react"

export interface SaveMoreProps {
  className?: string
}

function ExpenseItem({ label, amount, isHighlight = false }: { label: string, amount: string, isHighlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={cn(
        "font-bold text-sm",
        isHighlight ? "text-red-700 text-lg" : "text-gray-900"
      )}>
        {amount}
      </span>
    </div>
  )
}

function BenefitItem({ label, amount, isHighlight = false }: { label: string, amount: string, isHighlight?: boolean }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
      <span className="text-sm text-gray-600">{label}</span>
      <span className={cn(
        "font-bold text-sm",
        isHighlight ? "text-green-700 text-lg" : "text-gray-900"
      )}>
        {amount}
      </span>
    </div>
  )
}

function PetrolCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-6 border border-red-200 shadow-lg"
      initial={{ x: -30, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: -30, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4">
          <Fuel className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-red-800">Petrol Bike Expenses</h3>
          <p className="text-sm text-red-600">Traditional delivery costs</p>
        </div>
      </div>

      {/* Expense Breakdown */}
      <div className="space-y-1">
        <ExpenseItem label="Monthly Fuel Cost" amount="₹30,000" />
        <ExpenseItem label="Daily Fuel (₹250/day)" amount="₹7,500" />
        <ExpenseItem label="EMI Payment" amount="₹3,500" />
        <ExpenseItem label="Maintenance" amount="₹750" />
        <ExpenseItem label="Total Monthly Cost" amount="₹34,500" isHighlight />
      </div>

      {/* Icon */}
      <div className="flex justify-center mt-6">
        <div className="text-4xl">🛵</div>
      </div>
    </motion.div>
  )
}

function ZyppCard({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="bg-white rounded-2xl p-6 border-2 border-green-200 shadow-lg"
      initial={{ x: 30, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: 30, opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4">
          <Zap className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-green-800">Zypp EV Benefits</h3>
          <p className="text-sm text-green-600">Electric delivery advantages</p>
        </div>
      </div>

      {/* Benefits Breakdown */}
      <div className="space-y-1">
        <BenefitItem label="Monthly Earnings" amount="₹35,000" />
        <BenefitItem label="Daily Charging (₹20/day)" amount="₹600" />
        <BenefitItem label="Daily Rent" amount="₹170" />
        <BenefitItem label="Maintenance" amount="₹334" />
        <BenefitItem label="Total Monthly Savings" amount="₹28,600" isHighlight />
      </div>

      {/* Icon */}
      <div className="flex justify-center mt-6">
        <div className="text-4xl">⚡</div>
      </div>
    </motion.div>
  )
}

function SavingsBadge({ inView }: { inView: boolean }) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Glowing background effect */}
      <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Badge content */}
      <div className="relative bg-gradient-to-r from-green-500 to-green-600 rounded-full px-8 py-4 shadow-2xl">
        <div className="flex items-center justify-center">
          <div className="text-2xl mr-3">💡</div>
          <div className="text-center">
            <div className="text-white font-bold text-lg">
              Save up to ₹18,000 More Every Month!
            </div>
            <div className="text-green-100 text-sm">
              Switch to Zypp EV today
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SaveMore({ className }: SaveMoreProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section 
      ref={ref}
      className={cn("bg-gray-50 py-20", className)}
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
            Save More, Earn More with Zypp
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Why spend more on fuel and EMI when you can save big with electric? Switch today and boost your monthly earnings.
          </p>
        </motion.div>

        {/* Comparison Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Petrol Card */}
          <PetrolCard inView={isInView} />

          {/* Zypp Card */}
          <ZyppCard inView={isInView} />
        </div>

        {/* Savings Highlight */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <SavingsBadge inView={isInView} />
        </motion.div>

        {/* CTA Section */}
        <motion.div
          className="text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg text-gray-700 mb-6">
            Join thousands of delivery partners already saving with Zypp.
          </p>
          <Button 
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Start Earning with Zypp
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
