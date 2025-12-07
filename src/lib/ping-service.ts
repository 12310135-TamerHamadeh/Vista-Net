/**
 * Ping Service - Simulates ping functionality for monitoring hosts
 * In a real application, this would use a backend API to ping actual IPs
 */

export interface PingResult {
  ip: string
  success: boolean
  time?: number
  error?: string
}

export interface PingStats {
  ip: string
  name: string
  sent: number
  received: number
  lost: number
  min: number
  max: number
  avg: number
  lastResult: PingResult
}

class PingService {
  private stats: Map<string, PingStats> = new Map()
  private isRunning = false
  private interval: NodeJS.Timeout | null = null
  private callbacks: ((stats: PingStats) => void)[] = []

  /**
   * Start continuous pinging of hosts
   */
  startPinging(hosts: any[], interval = 2000): void {
    if (this.isRunning) return
    this.isRunning = true

    console.log("Starting ping service")

    this.interval = setInterval(() => {
      hosts.forEach((host) => {
        this.pingHost(host)
      })
    }, interval)
  }

  /**
   * Stop pinging
   */
  stopPinging(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    this.isRunning = false
    console.log("[v0] Stopped ping service")
  }

  /**
   * Pause pinging temporarily
   */
  pausePinging(): void {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
    console.log("[v0] Paused ping service")
  }

  /**
   * Resume pinging
   */
  resumePinging(hosts: any[], interval = 2000): void {
    if (this.isRunning) {
      this.startPinging(hosts, interval)
    }
  }

  /**
   * Ping a single host - simulates ping behavior
   */
  private pingHost(host: any): void {
    // Simulate ping with 85% success rate
    const success = Math.random() > 0.15
    const responseTime = success ? Math.random() * 50 + 5 : undefined

    const result: PingResult = {
      ip: host.ip,
      success,
      time: responseTime,
      error: success ? undefined : "Request timeout",
    }

    this.updateStats(host, result)
    this.notifyCallbacks()
  }

  /**
   * Update ping statistics for a host
   */
  private updateStats(host: any, result: PingResult): void {
    const key = host.ip
    let stats = this.stats.get(key)

    if (!stats) {
      stats = {
        ip: host.ip,
        name: host.name,
        sent: 0,
        received: 0,
        lost: 0,
        min: Number.POSITIVE_INFINITY,
        max: 0,
        avg: 0,
        lastResult: result,
      }
      this.stats.set(key, stats)
    }

    stats.sent++
    stats.lastResult = result

    if (result.success && result.time) {
      stats.received++
      stats.min = Math.min(stats.min, result.time)
      stats.max = Math.max(stats.max, result.time)
      stats.avg = (stats.avg * (stats.received - 1) + result.time) / stats.received
    } else {
      stats.lost++
    }
  }

  /**
   * Get statistics for a host
   */
  getStats(ip: string): PingStats | undefined {
    return this.stats.get(ip)
  }

  /**
   * Get all statistics
   */
  getAllStats(): PingStats[] {
    return Array.from(this.stats.values())
  }

  /**
   * Clear statistics for a host
   */
  clearStats(ip: string): void {
    this.stats.delete(ip)
  }

  /**
   * Register callback for stat updates
   */
  onStatsUpdate(callback: (stats: PingStats) => void): () => void {
    this.callbacks.push(callback)
    return () => {
      this.callbacks = this.callbacks.filter((cb) => cb !== callback)
    }
  }

  /**
   * Notify all callbacks of stats update
   */
  private notifyCallbacks(): void {
    this.stats.forEach((stats) => {
      this.callbacks.forEach((cb) => cb(stats))
    })
  }

  isActive(): boolean {
    return this.isRunning
  }
}

export const pingService = new PingService()
