"use client"

import { useState, useEffect } from "react"
import { Bitcoin, ChevronDown, Clock, History, Moon, Sun, Volume2, VolumeX } from "lucide-react"
import dynamic from "next/dynamic"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { soundManager } from "@/lib/sounds"
import { useTheme } from "next-themes"

// Dynamically import the 3D coin component with no SSR
const BitcoinCoin3D = dynamic(() => import("@/components/3d-bitcoin-coin"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center w-64 h-64">
      <div className="w-12 h-12 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
    </div>
  ),
})

export default function CoinflipGame() {
  const [isFlipping, setIsFlipping] = useState(false)
  const [betAmount, setBetAmount] = useState("0.001")
  const [result, setResult] = useState<"win" | "lose" | null>(null)
  const [balance, setBalance] = useState(0.05)
  const [showResult, setShowResult] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [soundInitialized, setSoundInitialized] = useState(false)
  const [history, setHistory] = useState<
    Array<{
      id: number
      amount: number
      result: "win" | "lose"
      timestamp: Date
    }>
  >([])
  const { toast } = useToast()
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize sound system
  const initializeSound = async () => {
    if (!soundInitialized) {
      await soundManager.initialize()
      setSoundInitialized(true)
    }
    soundManager.resume()
  }

  // Toggle sound on/off
  const toggleSound = async () => {
    if (!soundInitialized) {
      await initializeSound()
    }
    setSoundEnabled(!soundEnabled)
  }

  // Play a sound if sound is enabled
  const playSound = (id: string, options = {}) => {
    if (soundEnabled && soundInitialized) {
      soundManager.play(id, options)
    }
  }

  const handleFlip = async () => {
    const amount = Number.parseFloat(betAmount)

    // Validation
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid bet amount",
        description: "Please enter a valid bet amount",
        variant: "destructive",
      })
      return
    }

    if (amount > balance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough BTC to place this bet",
        variant: "destructive",
      })
      return
    }

    // Initialize sound if not already done
    if (!soundInitialized) {
      await initializeSound()
    }

    // Reset previous result
    setResult(null)
    setShowResult(false)

    // Start flipping animation
    setIsFlipping(true)

    // Play flip start sound
    playSound("flip-start", { volume: 0.7 })

    // Play spinning sound
    setTimeout(() => {
      playSound("flip-spinning", { volume: 0.5, loop: true, duration: 1700 })
    }, 300)

    // Simulate random result after 2 seconds
    setTimeout(() => {
      const flipResult = Math.random() > 0.5 ? "win" : "lose"
      setResult(flipResult)
      setIsFlipping(false)

      // Play landing sound
      playSound("flip-land", { volume: 0.8 })

      // Show result after flip completes
      setTimeout(() => {
        setShowResult(true)

        // Play win/lose sound
        playSound(flipResult === "win" ? "win" : "lose", { volume: 0.7 })

        // Update balance
        const won = flipResult === "win"
        const newBalance = won ? balance + amount : balance - amount
        setBalance(newBalance)

        // Add to history
        setHistory(
          [
            {
              id: Date.now(),
              amount,
              result: flipResult,
              timestamp: new Date(),
            },
            ...history,
          ].slice(0, 10),
        )

        // Show result toast
        toast({
          title: won ? "You won!" : "You lost!",
          description: won ? `+${amount.toFixed(6)} BTC` : `-${amount.toFixed(6)} BTC`,
          variant: won ? "default" : "destructive",
        })
      }, 500)
    }, 2000)
  }

  // Format timestamp to relative time (e.g. "2 minutes ago")
  const formatRelativeTime = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    return `${Math.floor(diffInSeconds / 86400)} days ago`
  }

  if (!isMounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:bg-[#0A0A0F] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-900 dark:via-[#0A0A0F] dark:to-[#0A0A0F] transition-colors duration-300">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-white/5 bg-white dark:bg-black sticky top-0 z-50 transition-colors duration-300">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <Bitcoin className="h-6 w-6 text-[#F7931A]" />
            <span className="text-lg font-bold text-gray-900 dark:text-white transition-colors duration-300">
              BTCFLIP
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-gray-100 dark:bg-white/5 px-3 py-1.5 rounded-full transition-colors duration-300">
              <Bitcoin className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white transition-colors duration-300">
                {balance.toFixed(6)} BTC
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
            >
              <span className="mr-2">Login</span>
              <ChevronDown className="h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
            >
              {theme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSound}
              className="text-gray-700 dark:text-white/80 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
            >
              {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
              <span className="sr-only">Toggle sound</span>
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="border-white/10 bg-white/5 text-gray-900 dark:text-white hover:bg-white/10"
              >
                Back to Coming Soon
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="container py-8 md:py-12">
        <div className="grid gap-8 md:grid-cols-[1fr_350px]">
          {/* Main Game Area */}
          <div className="space-y-8">
            <Card className="overflow-hidden border-gray-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-xl transition-colors duration-300">
              <div className="p-6 md:p-8">
                <div className="flex flex-col items-center justify-center">
                  {/* Coin Flip Area */}
                  <div className="relative w-64 h-64 mb-10">
                    <BitcoinCoin3D isFlipping={isFlipping} showResult={showResult} result={result} />
                  </div>

                  {/* Betting Controls */}
                  <div className="w-full max-w-md space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="bet-amount"
                          className="text-sm font-medium text-gray-700 dark:text-white/80 transition-colors duration-300"
                        >
                          Bet Amount
                        </label>
                        <div className="text-sm text-gray-500 dark:text-white/60 transition-colors duration-300">
                          Balance: {balance.toFixed(6)} BTC
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <Input
                            id="bet-amount"
                            type="number"
                            placeholder="0.001"
                            value={betAmount}
                            onChange={(e) => setBetAmount(e.target.value)}
                            step="0.001"
                            min="0.001"
                            max={balance.toString()}
                            className="pl-8 bg-white dark:bg-black/40 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus-visible:ring-yellow-500 transition-colors duration-300"
                          />
                          <Bitcoin className="absolute left-2.5 top-2.5 h-4 w-4 text-yellow-500" />
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setBetAmount((balance / 4).toFixed(6))}
                          className="w-14 border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-black/60 transition-colors duration-300"
                        >
                          25%
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setBetAmount((balance / 2).toFixed(6))}
                          className="w-14 border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-black/60 transition-colors duration-300"
                        >
                          50%
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setBetAmount(balance.toFixed(6))}
                          className="w-14 border-gray-200 dark:border-white/10 bg-white dark:bg-black/40 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-black/60 transition-colors duration-300"
                        >
                          Max
                        </Button>
                      </div>
                    </div>

                    <Button
                      size="lg"
                      onClick={handleFlip}
                      disabled={isFlipping}
                      className="w-full h-14 text-lg bg-[#F7931A] hover:bg-[#E78B19] text-black font-medium"
                    >
                      {isFlipping ? (
                        <div className="flex items-center">
                          <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                          Flipping...
                        </div>
                      ) : (
                        "Flip Coin"
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Live Bets */}
            <Card className="overflow-hidden border-gray-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-xl transition-colors duration-300">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white flex items-center transition-colors duration-300">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </div>
                  Live Bets
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-all duration-200 hover:bg-gray-100 dark:hover:bg-white/10">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 shadow-[0_0_15px_rgba(234,179,8,0.3)] flex items-center justify-center mr-4">
                        <Bitcoin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                          Satoshi
                        </div>
                        <div className="text-xs text-gray-500 dark:text-white/60 transition-colors duration-300">
                          0.025 BTC
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <Clock className="w-3 h-3 mr-1 text-gray-400 dark:text-white/40 transition-colors duration-300" />
                      <span className="text-gray-500 dark:text-white/60 transition-colors duration-300">Just now</span>
                    </div>
                  </div>
                  {/* More live bets... */}
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* User Stats */}
            <Card className="overflow-hidden border-gray-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-xl transition-colors duration-300">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border border-gray-100 dark:border-white/10 flex items-center justify-center mr-4 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <span className="text-gray-700 dark:text-white font-bold text-lg transition-colors duration-300">
                      G
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                      Guest User
                    </div>
                    <div className="text-xs text-gray-500 dark:text-white/60 transition-colors duration-300">
                      Playing since today
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
                  >
                    Login
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                    <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                      Balance
                    </div>
                    <div className="font-medium flex items-center text-gray-900 dark:text-white transition-colors duration-300">
                      <Bitcoin className="h-3 w-3 mr-1 text-yellow-500" />
                      {balance.toFixed(6)} BTC
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                    <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                      Total Bets
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                      {history.length}
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 h-12 relative overflow-hidden">
                  <span className="relative z-10">Deposit BTC</span>
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
                </Button>
              </div>
            </Card>

            {/* History & Stats */}
            <Card className="overflow-hidden border-gray-200 dark:border-white/5 bg-white dark:bg-black/20 backdrop-blur-xl transition-colors duration-300">
              <Tabs defaultValue="history">
                <div className="border-b border-gray-200 dark:border-white/5 px-6 transition-colors duration-300">
                  <TabsList className="bg-transparent h-14">
                    <TabsTrigger
                      value="history"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none text-gray-500 dark:text-white/60 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-colors duration-300"
                    >
                      Your History
                    </TabsTrigger>
                    <TabsTrigger
                      value="stats"
                      className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-yellow-500 rounded-none text-gray-500 dark:text-white/60 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white transition-colors duration-300"
                    >
                      Stats
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="history" className="p-6 pt-4 m-0">
                  {history.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 dark:text-white/60 transition-colors duration-300">
                      <History className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p>No flip history yet</p>
                      <p className="text-sm mt-1">Place your first bet to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">{/* History items */}</div>
                  )}
                </TabsContent>

                <TabsContent value="stats" className="p-6 pt-4 m-0">
                  {/* Stats content */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                        Win Rate
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        {history.length > 0
                          ? `${Math.round((history.filter((h) => h.result === "win").length / history.length) * 100)}%`
                          : "0%"}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                        Profit/Loss
                      </div>
                      <div
                        className={cn(
                          "font-medium flex items-center",
                          history.reduce((acc, h) => acc + (h.result === "win" ? h.amount : -h.amount), 0) >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400",
                        )}
                      >
                        <Bitcoin className="h-3 w-3 mr-1" />
                        {history.reduce((acc, h) => acc + (h.result === "win" ? h.amount : -h.amount), 0).toFixed(6)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                        Biggest Win
                      </div>
                      <div className="font-medium flex items-center text-green-600 dark:text-green-400">
                        <Bitcoin className="h-3 w-3 mr-1" />
                        {history.length > 0
                          ? Math.max(...history.filter((h) => h.result === "win").map((h) => h.amount), 0).toFixed(6)
                          : "0.000000"}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                        Biggest Loss
                      </div>
                      <div className="font-medium flex items-center text-red-600 dark:text-red-400">
                        <Bitcoin className="h-3 w-3 mr-1" />
                        {history.length > 0
                          ? Math.max(...history.filter((h) => h.result === "lose").map((h) => h.amount), 0).toFixed(6)
                          : "0.000000"}
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 border border-gray-100 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                      <div className="text-xs text-gray-500 dark:text-white/60 mb-1 transition-colors duration-300">
                        Longest Streak
                      </div>
                      <div className="font-medium text-gray-900 dark:text-white transition-colors duration-300">
                        {history.length > 0 ? calculateLongestStreak(history) : "0 wins"}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Helper function to calculate longest streak
function calculateLongestStreak(history: Array<{ result: "win" | "lose" }>) {
  if (history.length === 0) return "0 wins"

  let currentStreak = 1
  let maxStreak = 1
  let currentResult = history[0].result

  for (let i = 1; i < history.length; i++) {
    if (history[i].result === currentResult) {
      currentStreak++
      maxStreak = Math.max(maxStreak, currentStreak)
    } else {
      currentStreak = 1
      currentResult = history[i].result
    }
  }

  return `${maxStreak} ${maxStreak === 1 ? "win" : "wins"}`
}
