"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera, Text } from "@react-three/drei"
import type * as THREE from "three"

// We're not using GLTFLoader directly since the model isn't loading properly
// Instead, we'll create a simple 3D coin using basic Three.js geometries

interface CoinModelProps {
  isFlipping: boolean
  onAnimationComplete?: () => void
}

function CoinModel({ isFlipping, onAnimationComplete }: CoinModelProps) {
  const coinRef = useRef<THREE.Group>(null)
  const [rotationCount, setRotationCount] = useState(0)
  const [lastTime, setLastTime] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useFrame((state) => {
    if (!coinRef.current || !isFlipping || isComplete) return

    const time = state.clock.getElapsedTime()
    const deltaTime = time - lastTime
    setLastTime(time)

    // Calculate rotation speed with easing
    const duration = 2 // seconds
    const progress = Math.min(time / duration, 1)

    // Custom easing function for realistic physics
    let speed
    if (progress < 0.3) {
      // Start fast
      speed = 15
    } else if (progress < 0.8) {
      // Maintain speed
      speed = 10
    } else {
      // Slow down at the end
      speed = 10 * (1 - (progress - 0.8) / 0.2)
    }

    // Apply rotation
    coinRef.current.rotation.x += speed * deltaTime

    // Track rotations
    if (coinRef.current.rotation.x > rotationCount * Math.PI * 2 + Math.PI) {
      setRotationCount(rotationCount + 1)
    }

    // Bounce effect
    if (progress < 0.5) {
      coinRef.current.position.y = Math.sin(progress * Math.PI) * 1.5
    } else {
      coinRef.current.position.y = 0
    }

    // Complete animation
    if (progress >= 1 && !isComplete) {
      setIsComplete(true)
      if (onAnimationComplete) {
        onAnimationComplete()
      }
    }
  })

  // Reset when flipping starts/stops
  useEffect(() => {
    if (coinRef.current) {
      coinRef.current.rotation.x = 0
      coinRef.current.position.y = 0

      if (isFlipping) {
        setIsComplete(false)
        setRotationCount(0)
        setLastTime(0)
      }
    }
  }, [isFlipping])

  return (
    <group ref={coinRef}>
      {/* Front side of coin */}
      <group position={[0, 0, 0.1]}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.2, 32]} />
          <meshStandardMaterial color="#F7931A" metalness={0.8} roughness={0.2} />
        </mesh>
        <Text
          position={[0, 0, 0.11]}
          fontSize={0.8}
          color="white"
          font="/fonts/Inter_Bold.json"
          anchorX="center"
          anchorY="middle"
        >
          ₿
        </Text>
      </group>

      {/* Back side of coin */}
      <group position={[0, 0, -0.1]} rotation={[Math.PI, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[2, 2, 0.2, 32]} />
          <meshStandardMaterial color="#F7931A" metalness={0.8} roughness={0.2} />
        </mesh>
        <group position={[0, 0, 0.11]}>
          <Text
            position={[0, 0.4, 0]}
            fontSize={0.4}
            color="white"
            font="/fonts/Inter_Bold.json"
            anchorX="center"
            anchorY="middle"
          >
            BTC
          </Text>
          <mesh position={[0, -0.2, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[1.5, 0.2, 0.05]} />
            <meshStandardMaterial color="white" />
          </mesh>
        </group>
      </group>
    </group>
  )
}

interface BitcoinCoin3DProps {
  isFlipping: boolean
  showResult: boolean
  result: "win" | "lose" | null
  onAnimationComplete?: () => void
}

export function BitcoinCoin3D({ isFlipping, showResult, result, onAnimationComplete }: BitcoinCoin3DProps) {
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

  return (
    <div className="w-full h-full relative">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />

        <Suspense fallback={null}>
          <CoinModel isFlipping={isFlipping} onAnimationComplete={onAnimationComplete} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls enabled={false} />
      </Canvas>

      {!isFlipping && !showResult && (
        <div className="absolute bottom-0 left-0 right-0 text-center text-white/90">
          <p className="text-sm font-medium">Place your bet</p>
        </div>
      )}

      {/* Loading fallback */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-12 h-12 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin opacity-0 transition-opacity duration-300"
          style={{ opacity: isFlipping ? 0 : 0 }}
        ></div>
      </div>
    </div>
  )
}

// Export as default for dynamic import
export default BitcoinCoin3D
