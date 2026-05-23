"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Maximize, Minimize, BellRing, Settings2, Globe } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { playBeep } from "@/lib/audio"

interface ClockProps {
  defaultMode?: "digital" | "analog"
}

export default function Clock({ defaultMode }: ClockProps) {
  const [time, setTime] = useState<Date | null>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  const [alarms, setAlarms] = useState<any[]>([])
  
  // Settings
  const [hourlyChime, setHourlyChime] = useState(false)
  const [clockMode, setClockMode] = useState<"digital" | "analog">(defaultMode || "digital")
  const [dateFormat, setDateFormat] = useState<"full" | "dd/mm/yyyy" | "mm/dd/yyyy">("full")
  const [nightColor, setNightColor] = useState<"default" | "red" | "amber" | "green">("default")

  useEffect(() => {
    // Load alarms from local storage
    const loadAlarms = () => {
        try {
            const saved = localStorage.getItem("clockivo_alarms")
            if (saved) setAlarms(JSON.parse(saved))
        } catch (e) {}
    }
    loadAlarms()
    window.addEventListener("alarmsChanged", loadAlarms)
    return () => window.removeEventListener("alarmsChanged", loadAlarms)
  }, [])

  useEffect(() => {
    setTimeout(() => setTime(new Date()), 0)
    const interval = setInterval(() => {
      const now = new Date()
      setTime(now)
      
      if (hourlyChime && format(now, "mm:ss") === "00:00") {
        playBeep(500, 800)
        setTimeout(() => playBeep(500, 800), 1000)
      }

    }, 1000)
    return () => clearInterval(interval)
  }, [hourlyChime])

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (clockRef.current) {
        clockRef.current.requestFullscreen().catch(err => {
          console.error("Error attempting to enable fullscreen:", err)
        })
      }
    } else {
      document.exitFullscreen()
    }
  }

  const nextAlarm = useMemo(() => {
    if (!time || alarms.length === 0) return null
    const activeAlarms = alarms.filter(a => a.enabled)
    if (activeAlarms.length === 0) return null

    let nearest: any = null;
    let minDiff = Infinity;
    
    activeAlarms.forEach(a => {
        const h = parseInt(a.hours)
        const m = parseInt(a.minutes)
        const dObj = new Date(time.getTime())
        dObj.setHours(h, m, 0, 0)
        
        let target = dObj.getTime()
        
        if (a.targetDate) {
            const [year, month, day] = a.targetDate.split("-")
            dObj.setFullYear(parseInt(year), parseInt(month)-1, parseInt(day))
            target = dObj.getTime()
            if (target < time.getTime()) {
                return 
            }
        } else {
            if (target < time.getTime()) {
                target += 86400000 // next day
            }
        }
        
        const diffStr = target - time.getTime();
        if (diffStr > 0 && diffStr < minDiff) {
            minDiff = diffStr;
            nearest = { ...a, diff: diffStr }
        }
    })
    
    if (!nearest) return null

    const diffMins = Math.floor(nearest.diff / 60000)
    const diffH = Math.floor(diffMins / 60)
    const diffM = Math.floor(diffMins % 60)

    let diffText = ""
    if (diffH > 0) diffText += `${diffH}h `
    diffText += `${diffM}m`

    return { ...nearest, diffText }
  }, [time, alarms])

  const colorClass = nightColor === "red" ? "text-red-500" : nightColor === "amber" ? "text-amber-500" : nightColor === "green" ? "text-green-500" : "text-foreground"
  const isNightColored = nightColor !== "default"

  if (!time) return null

  let dateText = ""
  if (dateFormat === "full") dateText = format(time, "EEEE, MMMM do, yyyy")
  else if (dateFormat === "dd/mm/yyyy") dateText = format(time, "dd/MM/yyyy")
  else if (dateFormat === "mm/dd/yyyy") dateText = format(time, "MM/dd/yyyy")



  const cities = [
    { name: "New York", tz: "America/New_York" },
    { name: "London", tz: "Europe/London" },
    { name: "Tokyo", tz: "Asia/Tokyo" },
  ]

  return (
    <Card ref={clockRef} className={`relative flex flex-col items-center justify-center p-6 sm:p-12 min-h-[60vh] border-none shadow-none bg-transparent sm:bg-card sm:border sm:shadow-sm ${isFullscreen ? (isNightColored ? '!bg-black h-screen w-screen rounded-none' : 'bg-background h-screen w-screen sm:bg-background sm:rounded-none') : ''}`}>
      
      {/* Top right controls */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
         {isFullscreen ? (
             <div className="flex bg-muted/80 backdrop-blur rounded-full p-1 mr-2 gap-1 px-3">
                 <button className={`w-6 h-6 rounded-full border border-border/50 bg-white dark:bg-black transition-transform ${nightColor==='default'?'scale-125 border-primary':''}`} onClick={()=>setNightColor("default")}></button>
                 <button className={`w-6 h-6 rounded-full border border-border/50 bg-red-500 transition-transform ${nightColor==='red'?'scale-125 border-primary':''}`} onClick={()=>setNightColor("red")}></button>
                 <button className={`w-6 h-6 rounded-full border border-border/50 bg-amber-500 transition-transform ${nightColor==='amber'?'scale-125 border-primary':''}`} onClick={()=>setNightColor("amber")}></button>
                 <button className={`w-6 h-6 rounded-full border border-border/50 bg-green-500 transition-transform ${nightColor==='green'?'scale-125 border-primary':''}`} onClick={()=>setNightColor("green")}></button>
             </div>
         ) : (
            <Dialog>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
                <Settings2 className="w-5 h-5"/>
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs border-none sm:border shadow-2xl">
                <DialogHeader>
                <DialogTitle>Clock Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex items-center justify-between">
                        <Label>Clock Mode</Label>
                        <Select value={clockMode} onValueChange={(v:any)=>setClockMode(v)}>
                            <SelectTrigger className="w-32"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="digital">Digital</SelectItem>
                                <SelectItem value="analog">Analog</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Date Format</Label>
                        <Select value={dateFormat} onValueChange={(v:any)=>setDateFormat(v)}>
                            <SelectTrigger className="w-32"><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full">Full Readable</SelectItem>
                                <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                                <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <Label>Hourly Chime</Label>
                        <Switch checked={hourlyChime} onCheckedChange={setHourlyChime}/>
                    </div>
                </div>
            </DialogContent>
            </Dialog>
         )}

         <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
          {isFullscreen ? <Minimize className={`w-5 h-5 ${isNightColored?'text-white/50 hover:text-white':''}`}/> : <Maximize className="w-5 h-5"/>}
         </Button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full mt-8 sm:mt-0">
          {clockMode === "digital" ? (
             <div className={`font-mono font-bold tracking-tighter tabular-nums ${colorClass} ${isFullscreen ? 'text-[5rem] sm:text-[15rem] leading-[0.8]' : 'text-6xl sm:text-9xl leading-[0.9]'}`}>
                {format(time, "HH:mm")}
                <span className={`text-[0.6em] ml-2 opacity-50 font-semibold ${isNightColored?'':'text-muted-foreground'}`}>{format(time, "ss")}</span>
             </div>
          ) : (
              <AnalogClock time={time} colorClass={colorClass} />
          )}

          <div className={`mt-6 font-medium ${isNightColored?'opacity-70 text-current text-2xl sm:text-4xl':'text-muted-foreground text-xl sm:text-3xl'} ${colorClass}`}>
            {dateText}
          </div>
      </div>
      
      {!isFullscreen && (
          <div className="mt-12 w-full flex flex-col gap-6">
              <div className="flex items-center justify-between p-4 rounded-xl border bg-muted/20 w-full hover:bg-muted/30 transition-colors cursor-default">
                  <div className="flex items-center gap-3">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <BellRing className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                          <span className="text-sm font-semibold text-foreground">Next Alarm</span>
                          <span className="text-xs text-muted-foreground">
                              {nextAlarm ? nextAlarm.label : 'No active alarms'}
                          </span>
                      </div>
                  </div>
                  {nextAlarm && (
                     <div className="flex flex-col items-end">
                         <span className="text-xl font-mono font-bold tabular-nums leading-none tracking-tight">
                             {nextAlarm.hours}:{nextAlarm.minutes}
                         </span>
                         <span className="text-xs font-semibold text-primary mt-1">in {nextAlarm.diffText}</span>
                     </div>
                  )}
              </div>

              <div className="flex flex-col mt-4">
                  <div className="flex items-center gap-2 mb-3 px-1 text-muted-foreground">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-wider">World Time</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {cities.map(city => {
                          let strTime = "";
                          let strDate = "";
                          try {
                            const dfTime = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit', hour12: false });
                            const dfDate = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, month: 'short', day: 'numeric' });
                            strTime = dfTime.format(time);
                            strDate = dfDate.format(time);
                          } catch (e) {
                            strTime = "--:--"; 
                            strDate = "---";
                          }
                          return (
                              <div key={city.name} className="flex flex-col p-4 rounded-xl border border-border/50 bg-card hover:bg-accent/50 transition-colors shadow-sm">
                                  <span className="text-sm font-medium text-muted-foreground">{city.name}</span>
                                  <span className="text-3xl font-mono font-bold tracking-tighter mt-1">{strTime}</span>
                                  <span className="text-xs text-muted-foreground mt-1 font-medium">{strDate}</span>
                              </div>
                          )
                      })}
                  </div>
              </div>
          </div>
      )}
    </Card>
  )
}

function AnalogClock({ time, colorClass }: { time: Date; colorClass: string }) {
  const s = time.getSeconds();
  const m = time.getMinutes();
  const h = time.getHours();
  
  const sRotation = s * 6;
  const mRotation = m * 6 + s * 0.1;
  const hRotation = (h % 12) * 30 + m * 0.5;

  return (
    <svg viewBox="0 0 100 100" className={`w-64 h-64 sm:w-[500px] sm:h-[500px] ${colorClass} transition-transform`}>
      <circle cx="50" cy="50" r="48" fill="transparent" stroke="currentColor" strokeWidth="2" opacity="0.3"/>
      <circle cx="50" cy="50" r="3" fill="currentColor" />
      
      {/* Hour markers */}
      {Array.from({length: 12}).map((_, i) => (
        <line key={i} x1="50" y1="6" x2="50" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${i * 30} 50 50)`} opacity="0.5"/>
      ))}
      
      {/* Hour hand */}
      <line x1="50" y1="50" x2="50" y2="28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" transform={`rotate(${hRotation} 50 50)`} />
      
      {/* Minute hand */}
      <line x1="50" y1="50" x2="50" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" transform={`rotate(${mRotation} 50 50)`} />
      
      {/* Second hand */}
      <line x1="50" y1="58" x2="50" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" transform={`rotate(${sRotation} 50 50)`} className="text-primary"/>
    </svg>
  )
}
