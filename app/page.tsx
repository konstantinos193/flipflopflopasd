"use client"

import Image from "next/image"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0A0A0F] to-[#0A0A0F] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/logo.png" alt="Odin Flip Logo" width={40} height={40} className="rounded-full" />
            <span className="text-xl font-bold text-white">Odin Flip</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/odinflip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 hover:bg-[#F7931A]/20 transition-all duration-300 active:scale-95 touch-manipulation text-sm"
              style={{ WebkitTapHighlightColor: "transparent" }}
            >
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#F7931A]"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
              <span className="text-white font-medium">Follow</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
        <Image src="/images/banner.jpeg" alt="Odin Flip Banner" fill priority className="object-cover object-center" />
      </div>

      {/* Main Content */}
      <main className="flex-1 container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Intro Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-8">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <Image src="/images/coin-glow.jpeg" alt="Odin Coin" fill className="object-contain" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
              <span className="text-[#F7931A]">Odin Flip</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
              A Viking-themed coin flip experience inspired by Norse mythology.
            </p>
            <a
              href="https://x.com/odinflip"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#F7931A] hover:bg-[#E78B19] transition-all duration-300 active:scale-95 touch-manipulation text-black font-medium"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
              <span>Follow @odinflip</span>
            </a>
          </div>

          {/* Concept Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "The Concept",
                description: "A coin flip game with Norse mythology aesthetics and Viking-inspired design.",
              },
              {
                title: "The Inspiration",
                description: "Inspired by the legends of Odin, the Allfather of Norse gods and his wisdom.",
              },
              {
                title: "The Design",
                description: "Featuring unique artwork that brings together Viking lore and modern aesthetics.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-black/20 border border-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/5 transition-all duration-200"
              >
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Coin Flip Art */}
          <div className="flex flex-col md:flex-row items-center gap-8 mb-16">
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image src="/images/coin-flip.jpeg" alt="Coin Flip Art" fill className="object-contain" />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">The Coin of Fate</h2>
              <p className="text-white/70 mb-6">
                The sacred coin of Odin represents the duality of fate - victory or defeat, fortune or loss. In Norse
                mythology, even the gods were subject to fate and the turn of fortune's wheel.
              </p>
            </div>
          </div>

          {/* Odin Character Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <Image src="/images/odin-character.jpeg" alt="Odin Character" fill className="object-contain" />
              </div>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl font-bold text-white mb-4">The Allfather</h2>
              <p className="text-white/70 mb-6">
                Odin, the Allfather in Norse mythology, was known for his wisdom, knowledge, and unpredictable nature.
                As a god associated with both victory and death, he embodies the perfect spirit for a game of chance.
              </p>
              <a
                href="https://x.com/odinflip"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 hover:bg-[#F7931A]/20 transition-all duration-300 text-white font-medium"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#F7931A]"
                >
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
                </svg>
                <span>Join our community</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 bg-black/30">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Odin Flip Logo" width={32} height={32} className="rounded-full" />
              <span className="text-white font-medium">Odin Flip</span>
            </div>
            <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Odin Flip. All rights reserved.</p>
            <a
              href="https://x.com/odinflip"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition-colors"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4l11.733 16h4.267l-11.733 -16z"></path>
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"></path>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
