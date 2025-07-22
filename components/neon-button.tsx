"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type React from "react"

type NeonButtonProps = {
  href: string
  text: string
  icon?: React.ReactNode
  className?: string
}

export default function NeonButton({ href, text, icon, className = "" }: NeonButtonProps) {
  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-[#5A8CC1] rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#7BA3D1] shadow-[0_0_20px_rgba(90,140,193,0.5)] hover:shadow-[0_0_30px_rgba(90,140,193,0.8)]"
      >
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#5A8CC1] via-[#7BA3D1] to-[#5A8CC1] bg-size-200 bg-pos-0 group-hover:bg-pos-100 transition-all duration-500"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-lg bg-[#5A8CC1] opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

        {/* Content */}
        <span className="relative z-10 flex items-center">
          {icon}
          {text}
        </span>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-lg border-2 border-[#5A8CC1] opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
    </motion.div>
  )
}
