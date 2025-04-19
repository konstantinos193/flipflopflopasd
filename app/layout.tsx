import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Odinflip | Bitcoin Coinflip Platform",
  description: "The ultimate Bitcoin coinflip experience. Bet, flip, and win in a secure and thrilling environment.",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
  },
  manifest: "/manifest.json",
  themeColor: "#F7931A",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-gray-900 via-[#0A0A0F] to-[#0A0A0F]">
          {children}
        </div>
      </body>
    </html>
  )
}
