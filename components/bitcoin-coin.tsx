"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

interface BitcoinCoinProps {
  isFlipping: boolean
  showResult: boolean
  result: "win" | "lose" | null
  onAnimationComplete?: () => void
}

export function BitcoinCoin({ isFlipping, showResult, result, onAnimationComplete }: BitcoinCoinProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    if (isFlipping) {
      const interval = setInterval(() => {
        setRotation((prev) => prev + 30)
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isFlipping])

  if (showResult) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div
          className={`w-48 h-48 rounded-full flex items-center justify-center ${
            result === "win" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <div className="flex flex-col items-center">
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M40 0C17.9086 0 0 17.9086 0 40C0 62.0914 17.9086 80 40 80C62.0914 80 80 62.0914 80 40C80 17.9086 62.0914 0 40 0ZM40 72C22.3269 72 8 57.6731 8 40C8 22.3269 22.3269 8 40 8C57.6731 8 72 22.3269 72 40C72 57.6731 57.6731 72 40 72Z"
                fill="white"
              />
              <path
                d="M54.5 33.5C54.5 25.4919 47.9632 19 40 19C32.0368 19 25.5 25.4919 25.5 33.5C25.5 41.5081 32.0368 48 40 48C47.9632 48 54.5 41.5081 54.5 33.5Z"
                fill="white"
              />
              <path d="M40 48V60" stroke="white" strokeWidth="6" strokeLinecap="round" />
              <path d="M32 60H48" stroke="white" strokeWidth="6" strokeLinecap="round" />
              <path d="M32 26H48" stroke="white" strokeWidth="6" strokeLinecap="round" />
              <path d="M40 19V26" stroke="white" strokeWidth="6" strokeLinecap="round" />
            </svg>
            <div className="text-white text-xl font-bold mt-2">{result === "win" ? "WIN" : "LOSE"}</div>
          </div>
        </div>
      </div>
    )
  }

  if (isFlipping) {
    return (
      <div className="flex items-center justify-center w-full h-full perspective-2000">
        <motion.div
          initial={{ rotateY: 0, filter: "blur(0px)" }}
          animate={{
            rotateY: 1800,
            y: [0, -30, 0],
            filter: ["blur(0px)", "blur(1px)", "blur(2px)", "blur(1px)", "blur(0px)"],
            scale: [1, 1.05, 1.1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            ease: [0.22, 0.03, 0.26, 1], // Custom easing for more realistic physics
            y: {
              duration: 2,
              times: [0, 0.5, 1],
              ease: "easeInOut",
            },
            filter: {
              duration: 2,
              times: [0, 0.25, 0.5, 0.75, 1],
            },
            scale: {
              duration: 2,
              times: [0, 0.25, 0.5, 0.75, 1],
            },
            rotateY: {
              duration: 2,
              ease: (t) => {
                // Custom easing function for slow-motion effect at peak
                if (t < 0.4) return 2.5 * t // Accelerate at start
                if (t > 0.6) return 0.5 + 1.25 * (t - 0.6) // Accelerate at end
                return 1 - Math.cos((t - 0.4) * 5 * Math.PI) * 0.05 + t // Slow at peak
              },
            },
          }}
          onAnimationComplete={onAnimationComplete}
          style={{
            transformStyle: "preserve-3d",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          }}
          className="relative w-48 h-48"
        >
          {/* Front side */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(0deg)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Metallic gradient for more realistic look */}
              <defs>
                <linearGradient id="coinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#F7931A" />
                  <stop offset="100%" stopColor="#E78B19" />
                </linearGradient>
                <filter id="coinShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>

              {/* Coin base with metallic gradient */}
              <circle cx="100" cy="100" r="100" fill="url(#coinGradient)" />

              {/* Edge highlight */}
              <circle cx="100" cy="100" r="95" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 4" />

              {/* Subtle inner shadow */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="transparent"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="10"
                filter="url(#coinShadow)"
              />

              <path
                d="M100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30ZM100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160Z"
                fill="white"
              />
              <path
                d="M135 83.75C135 67.7298 119.404 55 100 55C80.5964 55 65 67.7298 65 83.75C65 99.7702 80.5964 112.5 100 112.5C119.404 112.5 135 99.7702 135 83.75Z"
                fill="white"
              />
              <path d="M100 112.5V137.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <path d="M85 137.5H115" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <path d="M85 70H115" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <path d="M100 55V70" stroke="white" strokeWidth="10" strokeLinecap="round" />

              {/* Highlight overlay */}
              <ellipse cx="70" cy="70" rx="60" ry="40" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>

          {/* Back side */}
          <div
            className="absolute w-full h-full backface-hidden"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Reuse the same gradient */}
              <circle cx="100" cy="100" r="100" fill="url(#coinGradient)" />
              <circle cx="100" cy="100" r="95" stroke="#FFD700" strokeWidth="2" strokeDasharray="4 4" />
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="transparent"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth="10"
                filter="url(#coinShadow)"
              />

              <path
                d="M100 50C72.3858 50 50 72.3858 50 100C50 127.614 72.3858 150 100 150C127.614 150 150 127.614 150 100C150 72.3858 127.614 50 100 50Z"
                fill="white"
              />
              <path d="M85 85H115" stroke="#F7931A" strokeWidth="10" strokeLinecap="round" />
              <path d="M85 100H115" stroke="#F7931A" strokeWidth="10" strokeLinecap="round" />
              <path d="M85 115H115" stroke="#F7931A" strokeWidth="10" strokeLinecap="round" />

              {/* Highlight overlay */}
              <ellipse cx="70" cy="70" rx="60" ry="40" fill="rgba(255,255,255,0.1)" />
            </svg>
          </div>

          {/* Motion blur effect */}
          <div
            className="absolute inset-0 opacity-20 blur-md"
            style={{
              background: "linear-gradient(90deg, transparent, #F7931A, transparent)",
              transform: "translateZ(-10px) rotateY(90deg)",
              animation: "pulse 2s infinite",
            }}
          />
        </motion.div>

        {/* Soft shadow beneath the coin */}
        <div
          className="absolute w-32 h-8 rounded-full bg-black/20 blur-md"
          style={{
            transform: "translateY(80px) rotateX(70deg)",
            animation: "shadowPulse 2s ease-in-out infinite",
          }}
        />
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-48 h-48">
        <svg width="100%" height="100%" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="100" fill="#F7931A" />
          <circle cx="100" cy="100" r="95" stroke="#E78B19" strokeWidth="2" strokeDasharray="4 4" />
          <path
            d="M100 30C61.3401 30 30 61.3401 30 100C30 138.66 61.3401 170 100 170C138.66 170 170 138.66 170 100C170 61.3401 138.66 30 100 30ZM100 160C66.8629 160 40 133.137 40 100C40 66.8629 66.8629 40 100 40C133.137 40 160 66.8629 160 100C160 133.137 133.137 160 100 160Z"
            fill="white"
          />
          <path
            d="M135 83.75C135 67.7298 119.404 55 100 55C80.5964 55 65 67.7298 65 83.75C65 99.7702 80.5964 112.5 100 112.5C119.404 112.5 135 99.7702 135 83.75Z"
            fill="white"
          />
          <path d="M100 112.5V137.5" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <path d="M85 137.5H115" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <path d="M85 70H115" stroke="white" strokeWidth="10" strokeLinecap="round" />
          <path d="M100 55V70" stroke="white" strokeWidth="10" strokeLinecap="round" />
        </svg>
        <div className="absolute bottom-0 left-0 right-0 text-center text-white/90">
          <p className="text-sm font-medium">Place your bet</p>
        </div>
      </div>
    </div>
  )
}
