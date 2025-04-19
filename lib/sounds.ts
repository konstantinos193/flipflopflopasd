// Sound utility for handling audio playback
class SoundManager {
  private static instance: SoundManager
  private audioContext: AudioContext | null = null
  private sounds: Map<string, AudioBuffer> = new Map()
  private isLoaded = false
  private isLoading = false

  private constructor() {}

  public static getInstance(): SoundManager {
    if (!SoundManager.instance) {
      SoundManager.instance = new SoundManager()
    }
    return SoundManager.instance
  }

  public async initialize(): Promise<void> {
    if (this.isLoaded || this.isLoading) return

    this.isLoading = true

    try {
      // Create audio context on user interaction
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()

      // Load all sound effects
      await Promise.all([
        this.loadSound("flip-start", "/sounds/coin-flip-start.mp3"),
        this.loadSound("flip-spinning", "/sounds/coin-spinning.mp3"),
        this.loadSound("flip-land", "/sounds/coin-land.mp3"),
        this.loadSound("win", "/sounds/win.mp3"),
        this.loadSound("lose", "/sounds/lose.mp3"),
      ])

      this.isLoaded = true
    } catch (error) {
      console.error("Failed to load sounds:", error)
    } finally {
      this.isLoading = false
    }
  }

  private async loadSound(id: string, url: string): Promise<void> {
    if (!this.audioContext) return

    try {
      const response = await fetch(url)
      const arrayBuffer = await response.arrayBuffer()
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer)
      this.sounds.set(id, audioBuffer)
    } catch (error) {
      console.error(`Failed to load sound ${id}:`, error)
    }
  }

  public play(id: string, options: { volume?: number; loop?: boolean; duration?: number } = {}): void {
    if (!this.audioContext || !this.isLoaded) return

    const buffer = this.sounds.get(id)
    if (!buffer) {
      console.warn(`Sound ${id} not found`)
      return
    }

    // Create source and gain nodes
    const source = this.audioContext.createBufferSource()
    const gainNode = this.audioContext.createGain()

    // Configure nodes
    source.buffer = buffer
    source.loop = options.loop || false
    gainNode.gain.value = options.volume || 1

    // Connect nodes
    source.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    // Start playback
    source.start()

    // Stop after duration if specified
    if (options.duration && options.loop) {
      setTimeout(() => {
        source.stop()
      }, options.duration)
    }

    return
  }

  public resume(): void {
    if (this.audioContext?.state === "suspended") {
      this.audioContext.resume()
    }
  }
}

// Export singleton instance
export const soundManager = SoundManager.getInstance()
