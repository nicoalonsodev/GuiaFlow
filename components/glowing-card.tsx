"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

type GlowingCardProps = {
  children: React.ReactNode
  className?: string
}

export default function GlowingCard({ children, className = "" }: GlowingCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden border border-gray-800/50 shadow-[0_0_35px_rgba(0,0,0,0.5)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5, boxShadow: "0 15px 30px rgba(0,0,0,0.6)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Glow effect */}
      {isHovered && (
        <div
          className="absolute pointer-events-none inset-0 opacity-70 z-10"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(90, 140, 193, 0.15), transparent 40%)`,
          }}
        />
      )}

      {/* Border glow */}
      <div className="absolute inset-0 rounded-xl pointer-events-none z-0">
        <div className="absolute inset-0 rounded-xl border border-[#5A8CC1]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content */}
      <div className="relative z-0">{children}</div>
    </motion.div>
  )
}
