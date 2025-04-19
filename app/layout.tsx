import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Odin Flip | Viking-Themed Bitcoin Coinflip Platform",
  description:
    "The ultimate Viking-themed Bitcoin coinflip experience. Bet, flip, and win with the blessing of Odin himself.",
  icons: {
    icon: [
      {
        url: "/images/logo.png",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/images/logo.png",
        type: "image/png",
        sizes: "180x180"
      }
    ]
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
  openGraph: {
    title: "Odin Flip | Viking-Themed Bitcoin Coinflip Platform",
    description: "The ultimate Viking-themed Bitcoin coinflip experience. Bet, flip, and win with the blessing of Odin himself.",
    images: [
      {
        url: "/images/banner.jpeg",
        width: 1200,
        height: 630,
        alt: "Odin Flip Banner"
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Odin Flip | Viking-Themed Bitcoin Coinflip Platform",
    description: "The ultimate Viking-themed Bitcoin coinflip experience. Bet, flip, and win with the blessing of Odin himself.",
    images: ["/images/banner.jpeg"],
    creator: "@odinflip"
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
