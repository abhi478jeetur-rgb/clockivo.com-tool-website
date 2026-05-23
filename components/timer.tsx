"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Play, Square, RotateCcw, Plus, History } from "lucide-react"
import * as audioLib from "@/lib/audio"
import { SoundSettings } from "./sound-settings"
import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut"

const playAlarmSound = () => {
  if (audioLib && typeof audioLib.playAlarmSound === "function") {
    audioLib.playAlarmSound()
  }
}

interface TimerSession {
   id: string; label: string; duration: number; completedAt: string;
}

export default function Timer() {
  const [initialTime, setInitialTime] = useState(300) // 5 minutes default
  const [timeLeft, setTimeLeft] = useState(300)
  const [isRunning, setIsRunning] = useState(false)
  
  // Edit mode state
  const [isEditing, setIsEditing] = useState(true)
  const [hours, setHours] = useState("00")
  const [minutes, setMinutes] = useState("05")
  const [seconds, setSeconds] = useState("00")
  const [history, setHistory] = useState<TimerSession[]>([])

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const endTimeRef = useRef<number | null>(null)
  const wakeLockRef = useRef<any>(null)

  // Screen Wake Lock API management
  useEffect(() => {
    const requestWakeLock = async () => {
      if (typeof window === 'undefined' || !('wakeLock' in navigator)) return
      try {
        if (!wakeLockRef.current) {
          wakeLockRef.current = await (navigator as any).wakeLock.request('screen')
          console.log("🔒 Clockivo: Timer acquired Screen Wake Lock!")
        }
      } catch (err) {
        console.warn("🔒 Clockivo: Timer Screen Wake Lock failed:", err)
      }
    }

    const releaseWakeLock = async () => {
      if (wakeLockRef.current) {
        try {
          await wakeLockRef.current.release()
          wakeLockRef.current = null
          console.log("🔓 Clockivo: Timer released Screen Wake Lock!")
        } catch (err) {
          console.warn("🔓 Clockivo: Timer Screen Wake Lock release failed:", err)
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

  const saveHistory = (sessions: TimerSession[]) => {
      setHistory(sessions)
      localStorage.setItem("clockivo_timer_history", JSON.stringify(sessions))
  }

  const handleTimerComplete = useCallback((duration: number) => {
    const h = [{
        id: Date.now().toString(),
        label: "Timer session",
        duration: duration,
        completedAt: new Date().toISOString()
    }, ...history].slice(0, 50);
    saveHistory(h);

    playAlarmSound()
    setTimeout(playAlarmSound, 2000)
  }, [history])

  useEffect(() => {
    const saved = localStorage.getItem("clockivo_timer_history")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setTimeout(() => setHistory(parsed), 0)
      } catch (e) {}
    }
  }, [])

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      if (!endTimeRef.current) {
         endTimeRef.current = Date.now() + timeLeft * 1000
      }

      timerRef.current = setInterval(() => {
        const remaining = Math.round((endTimeRef.current! - Date.now()) / 1000)
        
        if (remaining <= 0) {
          clearInterval(timerRef.current!)
          setTimeLeft(0)
          setIsRunning(false)
          endTimeRef.current = null
          handleTimerComplete(initialTime)
        } else {
          setTimeLeft(remaining)
        }
      }, 100)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      endTimeRef.current = null
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isRunning, timeLeft, initialTime, handleTimerComplete])

  const formatDisplayTime = (totalSeconds: number) => {
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    
    if (h > 0) {
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const startTimer = () => {
    if (isEditing) {
      const h = parseInt(hours) || 0
      const m = parseInt(minutes) || 0
      const s = parseInt(seconds) || 0
      const total = h * 3600 + m * 60 + s
      
      if (total > 0) {
        setInitialTime(total)
        setTimeLeft(total)
        setIsEditing(false)
        setIsRunning(true)
      }
    } else {
      setIsRunning(true)
    }
  }

  const stopTimer = () => {
    setIsRunning(false)
  }

  const resetTimer = () => {
    setIsRunning(false)
    setTimeLeft(initialTime)
    endTimeRef.current = null
  }

  const editTimer = () => {
    setIsRunning(false)
    setIsEditing(true)
    endTimeRef.current = null
    
    // Set edit inputs to current time left
    const h = Math.floor(timeLeft / 3600)
    const m = Math.floor((timeLeft % 3600) / 60)
    const s = timeLeft % 60
    setHours(h.toString().padStart(2, '0'))
    setMinutes(m.toString().padStart(2, '0'))
    setSeconds(s.toString().padStart(2, '0'))
  }

  const addPreset = (min: number) => {
    const total = min * 60
    setInitialTime(total)
    setTimeLeft(total)
    setIsEditing(false)
    setIsRunning(true)
    endTimeRef.current = null
  }

  const addTime = (minutes: number) => {
    const addedSeconds = minutes * 60;
    setTimeLeft(prev => prev + addedSeconds);
    if (endTimeRef.current) {
      endTimeRef.current += addedSeconds * 1000;
    }
  }

  // Keyboard Shortcuts for Timer using the useKeyboardShortcut hook
  useKeyboardShortcut("Space", () => {
    if (isRunning) {
      stopTimer()
    } else {
      startTimer()
    }
  })

  useKeyboardShortcut("KeyR", () => {
    if (!isEditing) {
      resetTimer()
    }
  })

  useKeyboardShortcut("Escape", () => {
    if (!isEditing) {
      editTimer()
    }
  })

  const handleInputChange = (setter: (val: string) => void, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '')
    if (val.length > 2) val = val.slice(-2)
    const num = parseInt(val)
    if (num > max) val = max.toString()
    setter(val)
  }

  const onBlurPad = (val: string, setter: (val: string) => void) => {
      if(!val) setter("00")
      else setter(val.padStart(2, '0'))
  }

  return (
    <Card className="flex flex-col items-center p-6 sm:p-12 min-h-[60vh] border-none shadow-none bg-transparent sm:bg-card sm:border sm:shadow-sm relative">
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
          <SoundSettings />
      </div>

      {isEditing ? (
        <div className="flex items-center gap-2 sm:gap-4 mb-12" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-col items-center gap-2">
            <Input 
              type="text" 
              value={hours} 
              onChange={handleInputChange(setHours, 99)} 
              onBlur={() => onBlurPad(hours, setHours)}
              className="text-5xl sm:text-7xl w-24 sm:w-32 h-24 sm:h-32 text-center font-mono font-bold tracking-tighter"
            />
            <Label className="text-muted-foreground font-medium">Hours</Label>
          </div>
          <div className="text-4xl font-bold pb-8">:</div>
          <div className="flex flex-col items-center gap-2">
            <Input 
              type="text" 
              value={minutes} 
              onChange={handleInputChange(setMinutes, 59)}
              onBlur={() => onBlurPad(minutes, setMinutes)} 
              className="text-5xl sm:text-7xl w-24 sm:w-32 h-24 sm:h-32 text-center font-mono font-bold tracking-tighter"
            />
            <Label className="text-muted-foreground font-medium">Minutes</Label>
          </div>
          <div className="text-4xl font-bold pb-8">:</div>
          <div className="flex flex-col items-center gap-2">
            <Input 
              type="text" 
              value={seconds} 
              onChange={handleInputChange(setSeconds, 59)} 
              onBlur={() => onBlurPad(seconds, setSeconds)}
              className="text-5xl sm:text-7xl w-24 sm:w-32 h-24 sm:h-32 text-center font-mono font-bold tracking-tighter"
            />
            <Label className="text-muted-foreground font-medium">Seconds</Label>
          </div>
        </div>
      ) : (
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-80 sm:h-80 mb-12 select-none">
          {/* SVG Progress Circle with neat transitions */}
          <svg className="absolute w-full h-full -rotate-90 scale-x-[-1]" viewBox="0 0 240 240">
            {/* Background track */}
            <circle
              cx="120"
              cy="120"
              r="100"
              className="stroke-muted/30"
              strokeWidth="6"
              fill="transparent"
            />
            {/* Pulsing circular track when running */}
            <circle
              cx="120"
              cy="120"
              r="100"
              className={`stroke-primary transition-all duration-300 ${isRunning ? 'opacity-100 shadow-md animate-pulse-slow' : 'opacity-90'}`}
              strokeWidth="6"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 100}
              strokeDashoffset={2 * Math.PI * 100 * (1 - (timeLeft / initialTime))}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.3s cubic-bezier(0.4, 0, 0.2, 1)" }}
            />
          </svg>
          
          <div 
            className="z-10 flex flex-col items-center justify-center text-center cursor-pointer hover:scale-105 active:scale-95 transition-transform"
            onClick={editTimer}
            title="Click to customize timer duration"
          >
            <span className="font-mono text-5xl sm:text-6xl font-bold tracking-tighter tabular-nums text-foreground leading-none">
              {formatDisplayTime(timeLeft)}
            </span>
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2 bg-muted/40 px-2.5 py-1 rounded-full hover:bg-muted/60 transition-colors">
              Edit
            </span>
          </div>
        </div>
      )}

      {/* Control Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
         {timeLeft === 0 && !isEditing ? (
            <Button size="lg" variant="secondary" onClick={editTimer} className="w-32 h-14 text-lg rounded-full">
              Done
            </Button>
         ) : !isRunning ? (
          <Button size="lg" onClick={startTimer} className="w-32 h-14 text-lg rounded-full">
            <Play className="w-5 h-5 mr-2" /> Start
          </Button>
        ) : (
          <Button size="lg" variant="destructive" onClick={stopTimer} className="w-32 h-14 text-lg rounded-full">
            <Square className="w-5 h-5 mr-2 fill-current" /> Stop
          </Button>
        )}

        {!isEditing && timeLeft > 0 && (
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" onClick={resetTimer} className="w-32 h-14 text-lg rounded-full">
              <RotateCcw className="w-5 h-5 mr-2" /> Reset
            </Button>
            {isRunning && (
                <div className="flex gap-2">
                   <Button size="lg" variant="secondary" onClick={() => addTime(1)} className="w-24 h-14 rounded-full font-mono font-bold text-lg">+1m</Button>
                   <Button size="lg" variant="secondary" onClick={() => addTime(5)} className="w-24 h-14 rounded-full font-mono font-bold text-lg">+5m</Button>
                </div>
            )}
          </div>
        )}
      </div>

      {/* Presets */}
      {isEditing && (
        <div className="flex flex-col gap-8 mt-4 w-full max-w-2xl px-4 sm:px-0">
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider text-center">Quick Presets</h3>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {[1, 3, 5, 10, 15, 30, 45, 60].map(min => (
                <Button key={min} variant="outline" onClick={() => addPreset(min)} className="font-mono text-sm sm:text-base">
                  {min}m
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider text-center">Pomodoro</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 cursor-pointer transition-colors shadow-sm"
                onClick={() => addPreset(25)}
              >
                <span className="text-3xl font-mono font-bold tracking-tighter">25:00</span>
                <span className="text-sm font-medium text-muted-foreground mt-1">Focus Time</span>
              </div>
              <div 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 cursor-pointer transition-colors shadow-sm"
                onClick={() => addPreset(5)}
              >
                <span className="text-3xl font-mono font-bold tracking-tighter">05:00</span>
                <span className="text-sm font-medium text-muted-foreground mt-1">Short Break</span>
              </div>
              <div 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 cursor-pointer transition-colors shadow-sm"
                onClick={() => addPreset(15)}
              >
                <span className="text-3xl font-mono font-bold tracking-tighter">15:00</span>
                <span className="text-sm font-medium text-muted-foreground mt-1">Long Break</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {history.length > 0 && !isRunning && (
        <div className="w-full max-w-md mt-16 px-4 sm:px-0">
            <h3 className="text-xs font-bold text-muted-foreground mb-4 uppercase tracking-wider text-center flex items-center justify-center gap-2"><History className="w-4 h-4"/> Session History</h3>
            <div className="h-[200px] overflow-y-auto border rounded-xl p-2 bg-card shadow-sm">
                {history.map(s => {
                    const dDate = new Date(s.completedAt);
                    return (
                    <div key={s.id} className="flex justify-between items-center p-3 border-b border-border/50 last:border-0 hover:bg-muted/50 rounded-lg text-sm transition-colors">
                        <div className="flex flex-col">
                            <span className="font-semibold text-foreground">{Math.floor(s.duration / 60)}m {s.duration % 60}s</span>
                            <span className="text-xs text-muted-foreground">{dDate.toLocaleDateString()} {dDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                        </div>
                    </div>
                )})}
            </div>
        </div>
      )}
    </Card>
  )
}
