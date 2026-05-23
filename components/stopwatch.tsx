"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Play, Square, Flag, RotateCcw, History } from "lucide-react"
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut"

interface Session {
    id: string;
    duration: number;
    completedAt: string;
}

export default function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [laps, setLaps] = useState<{ id: number; time: number; delta: number }[]>([])
  const [history, setHistory] = useState<Session[]>([])
  
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const lastUpdateRef = useRef<number>(0)
  const wakeLockRef = useRef<any>(null)
  const timeRef = useRef<number>(0)

  useEffect(() => {
    timeRef.current = time
  }, [time])

  // Screen Wake Lock API management
  useEffect(() => {
    const requestWakeLock = async () => {
      if (typeof window === 'undefined' || !('wakeLock' in navigator)) return
      try {
        if (!wakeLockRef.current) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
          console.log("🔒 Clockivo: Stopwatch acquired Screen Wake Lock!")
        }
      } catch (err) {
        console.warn("🔒 Clockivo: Stopwatch Screen Wake Lock failed:", err)
      }
    }

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release()
          wakeLockRef.current = null
          console.log("🔓 Clockivo: Stopwatch released Screen Wake Lock!")
        } catch (err) {
          console.warn("🔓 Clockivo: Stopwatch Screen Wake Lock release failed:", err)
        }
      }
    }

    if (isRunning) {
      requestWakeLock()
    } else {
      releaseWakeLock()
    }

    const handleVisibilityChange = async () => {
      if (document.visibilityState === 'visible' && isRunning) {
        await requestWakeLock()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      releaseWakeLock()
    }
  }, [isRunning])

  useEffect(() => {
    const saved = localStorage.getItem("clockivo_stopwatch_history")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTimeout(() => setHistory(parsed), 0)
      } catch (e) {}
    }
  }, [])

  const saveHistory = (sessions: Session[]) => {
      setHistory(sessions)
      localStorage.setItem("clockivo_stopwatch_history", JSON.stringify(sessions))
  }

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - timeRef.current
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime)
      }, 10) // Update faster for ms precision
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning])

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const milliseconds = Math.floor((ms % 1000) / 10)

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
  }

  const handleStartStop = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    if (time > 0) {
        const h = [{
            id: Date.now().toString(),
            duration: time,
            completedAt: new Date().toISOString()
        }, ...history].slice(0, 50);
        saveHistory(h);
    }
    setIsRunning(false)
    setTime(0)
    setLaps([])
  }

  const handleLap = () => {
    const lastLapTime = laps.length > 0 ? laps[0].time : 0
    const delta = time - lastLapTime
    setLaps([{ id: Date.now(), time, delta }, ...laps])
  }

  // Keyboard Shortcuts for Stopwatch using useKeyboardShortcut hook
  useKeyboardShortcut("Space", () => {
    handleStartStop()
  })

  useKeyboardShortcut("KeyL", () => {
    if (isRunning) {
      handleLap()
    }
  })

  useKeyboardShortcut("KeyR", () => {
    if (!isRunning && time > 0) {
      handleReset()
    }
  })

  return (
    <Card className="flex flex-col items-center p-6 sm:p-12 min-h-[60vh] border-none shadow-none bg-transparent sm:bg-card sm:border sm:shadow-sm">
      <div className="font-mono text-6xl sm:text-9xl font-bold tracking-tighter tabular-nums text-foreground mb-12">
        {formatTime(time)}
      </div>

      <div className="flex gap-4 mb-12">
        {!isRunning && time === 0 && (
          <Button size="lg" onClick={handleStartStop} className="w-32 h-14 text-lg rounded-full">
            <Play className="w-5 h-5 mr-2" /> Start
          </Button>
        )}
        
        {isRunning && (
          <>
            <Button size="lg" variant="outline" onClick={handleLap} className="w-32 h-14 text-lg rounded-full">
              <Flag className="w-5 h-5 mr-2" /> Lap
            </Button>
            <Button size="lg" variant="destructive" onClick={handleStartStop} className="w-32 h-14 text-lg rounded-full">
              <Square className="w-5 h-5 mr-2 outline-none fill-current" /> Stop
            </Button>
          </>
        )}

        {!isRunning && time > 0 && (
          <>
            <Button size="lg" variant="secondary" onClick={handleReset} className="w-32 h-14 text-lg rounded-full">
              <RotateCcw className="w-5 h-5 mr-2" /> Reset
            </Button>
            <Button size="lg" onClick={handleStartStop} className="w-32 h-14 text-lg rounded-full">
                <Play className="w-5 h-5 mr-2" /> Resume
            </Button>
          </>
        )}
      </div>

      {laps.length > 0 && (
        <ScrollArea className="w-full max-w-md h-[400px] border rounded-lg p-4 bg-muted/50">
          <div className="flex justify-between px-4 py-2 text-sm font-medium text-muted-foreground border-b mb-2">
            <span>Lap</span>
            <span>Time</span>
            <span>Total</span>
          </div>
          {laps.map((lap, index) => (
            <div key={lap.id} className="flex justify-between items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-muted/80 rounded-md transition-colors font-mono tabular-nums text-lg">
              <span className="text-muted-foreground">{(laps.length - index).toString().padStart(2, '0')}</span>
              <span className="text-primary/80">{formatTime(lap.delta)}</span>
              <span className="font-semibold">{formatTime(lap.time)}</span>
            </div>
          ))}
        </ScrollArea>
      )}

      {history.length > 0 && !isRunning && time === 0 && (
        <div className="w-full max-w-md mt-16 px-4 sm:px-0">
            <h3 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider text-center flex items-center justify-center gap-2"><History className="w-4 h-4"/> Session History</h3>
            <div className="h-[200px] overflow-y-auto border rounded-xl p-2 bg-card shadow-sm">
                {history.map(s => {
                    const dDate = new Date(s.completedAt);
                    return (
                        <div key={s.id} className="flex justify-between items-center p-3 border-b border-border/50 last:border-0 hover:bg-muted/50 rounded-lg text-sm transition-colors">
                            <div className="flex flex-col">
                                <span className="font-semibold text-foreground font-mono">{formatTime(s.duration)}</span>
                                <span className="text-xs text-muted-foreground">{dDate.toLocaleDateString()} {dDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      )}
    </Card>
  )
}
