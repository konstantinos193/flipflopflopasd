"use client"

import { Bitcoin } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0A0A0F] to-[#0A0A0F] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/5 bg-black/50 backdrop-blur-sm">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-[#F7931A]" />
            <span className="text-lg font-bold text-white">Odinflip</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="max-w-3xl w-full mx-auto text-center space-y-8">
          {/* Logo and Title */}
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-[0_0_30px_rgba(234,179,8,0.3)] flex items-center justify-center">
                <Bitcoin className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight">
              Odinflip <span className="text-[#F7931A]">is coming soon</span>
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              The ultimate Bitcoin coinflip experience. Bet, flip, and win in a secure and thrilling environment.
            </p>
            <p className="text-lg text-white/80">
              Follow us{" "}
              <a
                href="https://x.com/odinflip"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F7931A] font-medium hover:underline hover:text-[#E78B19] transition-colors"
              >
                @odinflip
              </a>{" "}
              on Twitter (X) for exclusive updates and be the first to know when we launch!
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Secure Betting",
                description: "Provably fair system with transparent odds and secure transactions.",
              },
              {
                title: "Instant Payouts",
                description: "Win Bitcoin and receive it instantly in your account.",
              },
              {
                title: "Stunning UI",
                description: "Beautiful interface with realistic coin animations and effects.",
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

          {/* Social Links - Mobile Optimized */}
          <div className="flex justify-center pt-8">
            <a
              href="https://x.com/odinflip"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 hover:bg-[#F7931A]/20 transition-all duration-300 active:scale-95 touch-manipulation"
              style={{ WebkitTapHighlightColor: "transparent" }}
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
              <span className="text-white font-medium text-base">Follow on Twitter</span>
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 bg-black/30">
        <div className="container text-center">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Odinflip. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
