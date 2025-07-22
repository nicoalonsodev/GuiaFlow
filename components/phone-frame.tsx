"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

type PhoneFrameProps = {
  imageUrl: string
  altText: string
  className?: string
}

export default function PhoneFrame({ imageUrl, altText, className = "" }: PhoneFrameProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative mx-auto ${className}`}
      style={{ maxWidth: "220px" }} // Reducido de 300px a 220px
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.3 },
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Phone frame */}
      <div className="relative rounded-[30px] overflow-hidden border-[10px] border-black bg-black shadow-xl">
        {" "}
        {/* Reducido el borde y el radio */}
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/3 h-5 bg-black rounded-b-xl z-10"></div>{" "}
        {/* Reducida la altura */}
        {/* Screen */}
        <div className="relative overflow-hidden bg-gray-100 aspect-[9/19.5]">
          {/* Status bar */}
          <div className="absolute top-0 left-0 right-0 h-4 bg-white z-[1] flex justify-between items-center px-3 text-[8px]">
            {" "}
            {/* Reducida la altura y el padding */}
            <span className="font-semibold">10:15</span>
            <div className="flex items-center gap-1">
              <div className="h-2 w-3 relative">
                {" "}
                {/* Reducido el tamaño */}
                <div className="absolute bottom-0 left-0 w-[1px] h-[3px] bg-black rounded-sm"></div>
                <div className="absolute bottom-0 left-[2px] w-[1px] h-1 bg-black rounded-sm"></div>
                <div className="absolute bottom-0 left-[4px] w-[1px] h-1.5 bg-black rounded-sm"></div>
                <div className="absolute bottom-0 left-[6px] w-[1px] h-2 bg-black rounded-sm"></div>
              </div>
              <div className="h-2 w-2 relative">
                {" "}
                {/* Reducido el tamaño */}
                <div className="absolute inset-0 border border-black rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[1px] h-1 bg-black"></div>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[1px] h-1 bg-black"></div>
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-[1px] bg-black"></div>
                <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-[1px] bg-black"></div>
              </div>
              <div className="flex items-center">
                <span className="font-semibold">78%</span>
                <div className="h-2 w-4 ml-0.5 border border-black rounded-sm relative">
                  {" "}
                  {/* Reducido el tamaño */}
                  <div className="absolute left-0 top-0 bottom-0 w-3/4 bg-black m-[0.5px]"></div>
                  <div className="absolute -right-[2px] top-1/2 transform -translate-y-1/2 h-1.5 w-[1px] bg-black"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat image */}
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={altText}
            width={500}
            height={1000}
            className="w-full h-auto object-contain"
            priority
            quality={100}
          />

          {/* Bottom bar with home indicator */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gray-100 flex justify-center items-center">
            {" "}
            {/* Reducida la altura */}
            <div className="w-1/3 h-0.5 bg-black rounded-full"></div> {/* Reducido el grosor */}
          </div>
        </div>
      </div>

      {/* Glow effect on hover */}
      {isHovered && (
        <div
          className="absolute -inset-3 bg-[#5eff00]/20 rounded-[40px] blur-xl opacity-70 -z-10"
          style={{
            animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        ></div>
      )}
    </motion.div>
  )
}
