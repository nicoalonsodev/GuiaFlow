"use client"

import { useCallback, useEffect, useRef } from "react"
import { useTheme } from "next-themes"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  const drawParticles = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    particles.forEach((particle) => {
      // Ensure particle size is always positive
      const safeSize = Math.max(0.1, particle.size)

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, safeSize, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(90, 140, 193, ${particle.alpha})`
      ctx.fill()
    })
  }, [])

  const updateParticles = useCallback((particles: Particle[], width: number, height: number) => {
    return particles.map((particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Bounce off edges
      if (particle.x > width || particle.x < 0) {
        particle.speedX = -particle.speedX
      }
      if (particle.y > height || particle.y < 0) {
        particle.speedY = -particle.speedY
      }

      return particle
    })
  }, [])

  const createParticles = useCallback((width: number, height: number, count: number): Particle[] => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.05, // Reducido de 0.3 a 0.05
      speedY: (Math.random() - 0.5) * 0.05, // Reducido de 0.3 a 0.05
      color: "#5A8CC1",
      alpha: Math.random() * 0.5 + 0.1,
    }))
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    let particles = createParticles(canvas.width, canvas.height, 100)
    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw particles
      drawParticles(ctx, particles)

      // Update particles
      particles = updateParticles(particles, canvas.width, canvas.height)

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", handleResize)
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [createParticles, drawParticles, updateParticles])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }} />
}
