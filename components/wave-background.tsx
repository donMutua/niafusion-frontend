"use client"

import { useEffect, useRef } from "react"

export default function WaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Animation parameters
    let time = 0
    const waves = 5
    const amplitude = 50
    const frequency = 0.02
    const speed = 0.02

    // Create gradient
    const createGradient = (x: number, y: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 100)
      gradient.addColorStop(0, "rgba(52, 211, 153, 0.3)") // Green glow
      gradient.addColorStop(1, "rgba(52, 211, 153, 0)")
      return gradient
    }

    // Animation loop
    const animate = () => {
      ctx.fillStyle = "#f5f5f5"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw waves
      for (let row = 0; row < canvas.height + 100; row += 100) {
        for (let col = 0; col < canvas.width + 100; col += 100) {
          const xOffset = Math.sin(time + row * frequency) * amplitude
          const yOffset = Math.cos(time + col * frequency) * amplitude
          const x = col + xOffset
          const y = row + yOffset

          // Draw base circle
          ctx.fillStyle = "#e5e5e5"
          ctx.beginPath()
          ctx.arc(x, y, 40, 0, Math.PI * 2)
          ctx.fill()

          // Add glow effect
          if (Math.random() < 0.05) {
            ctx.fillStyle = createGradient(x, y)
            ctx.beginPath()
            ctx.arc(x, y, 60, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      time += speed
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasSize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10" style={{ filter: "blur(40px)" }} />
}

