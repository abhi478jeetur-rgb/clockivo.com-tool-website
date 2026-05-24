"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { Maximize, Minimize, BellRing, Settings2, Globe, Search, Star, Sun, Moon, MapPin } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import * as audioLib from "@/lib/audio"
import { motion, AnimatePresence } from "motion/react"

const playBeep = (durationMs = 500, frequency = 800, type: OscillatorType | string = "sine", volume = 0.5) => {
  if (audioLib && typeof audioLib.playBeep === "function") {
    audioLib.playBeep(durationMs, frequency, type, volume)
  }
}

interface ClockProps {
  defaultMode?: "digital" | "analog"
}

// 26 Prominent world cities capturing global business, remote coordination, and travel hubs
export const LIST_OF_25_CITIES = [
  // Americas
  { name: "New York", country: "United States", zone: "Americas", tz: "America/New_York" },
  { name: "Los Angeles", country: "United States", zone: "Americas", tz: "America/Los_Angeles" },
  { name: "Chicago", country: "United States", zone: "Americas", tz: "America/Chicago" },
  { name: "Mexico City", country: "Mexico", zone: "Americas", tz: "America/Mexico_City" },
  { name: "Toronto", country: "Canada", zone: "Americas", tz: "America/Toronto" },
  { name: "São Paulo", country: "Brazil", zone: "Americas", tz: "America/Sao_Paulo" },
  { name: "Buenos Aires", country: "Argentina", zone: "Americas", tz: "America/Argentina/Buenos_Aires" },

  // Europe & Middle East
  { name: "London", country: "United Kingdom", zone: "Europe", tz: "Europe/London" },
  { name: "Paris", country: "France", zone: "Europe", tz: "Europe/Paris" },
  { name: "Berlin", country: "Germany", zone: "Europe", tz: "Europe/Berlin" },
  { name: "Rome", country: "Italy", zone: "Europe", tz: "Europe/Rome" },
  { name: "Moscow", country: "Russia", zone: "Europe", tz: "Europe/Moscow" },
  { name: "Istanbul", country: "Turkey", zone: "Europe", tz: "Europe/Istanbul" },
  { name: "Dubai", country: "United Arab Emirates", zone: "Middle East", tz: "Asia/Dubai" },
  { name: "Riyadh", country: "Saudi Arabia", zone: "Middle East", tz: "Asia/Riyadh" },

  // Asia & Oceania
  { name: "Tokyo", country: "Japan", zone: "Asia & Pacific", tz: "Asia/Tokyo" },
  { name: "Mumbai", country: "India", zone: "Asia & Pacific", tz: "Asia/Kolkata" },
  { name: "Singapore", country: "Singapore", zone: "Asia & Pacific", tz: "Asia/Singapore" },
  { name: "Shanghai", country: "China", zone: "Asia & Pacific", tz: "Asia/Shanghai" },
  { name: "Hong Kong", country: "Hong Kong", zone: "Asia & Pacific", tz: "Asia/Hong_Kong" },
  { name: "Sydney", country: "Australia", zone: "Asia & Pacific", tz: "Australia/Sydney" },
  { name: "Seoul", country: "South Korea", zone: "Asia & Pacific", tz: "Asia/Seoul" },
  { name: "Bangkok", country: "Thailand", zone: "Asia & Pacific", tz: "Asia/Bangkok" },
  { name: "Auckland", country: "New Zealand", zone: "Asia & Pacific", tz: "Pacific/Auckland" },

  // Africa
  { name: "Cairo", country: "Egypt", zone: "Africa", tz: "Africa/Cairo" },
  { name: "Johannesburg", country: "South Africa", zone: "Africa", tz: "Africa/Johannesburg" },
]

// Accurate TZ calculation helper supporting DST recursively
export const getRelativeOffset = (tz: string, time: Date) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    })
    
    const formatted = formatter.formatToParts(time)
    const partsMap = Object.fromEntries(formatted.map(p => [p.type, p.value]))
    
    const year = parseInt(partsMap.year)
    const month = parseInt(partsMap.month) - 1
    const day = parseInt(partsMap.day)
    const hour = parseInt(partsMap.hour)
    const minute = parseInt(partsMap.minute)
    const second = parseInt(partsMap.second)
    
    const tzTime = new Date(Date.UTC(year, month, day, hour, minute, second))
    const tzUtcTime = new Date(Date.UTC(time.getUTCFullYear(), time.getUTCMonth(), time.getUTCDate(), time.getUTCHours(), time.getUTCMinutes(), time.getUTCSeconds()))
    
    const diffMs = tzTime.getTime() - tzUtcTime.getTime()
    const diffHrs = diffMs / 3600000
    
    const sign = diffHrs >= 0 ? "+" : "-"
    const absHrs = Math.floor(Math.abs(diffHrs))
    const absMins = Math.round((Math.abs(diffHrs) - absHrs) * 60)
    
    const formattedOffset = `UTC${sign}${absHrs.toString().padStart(2, "0")}:${absMins.toString().padStart(2, "0")}`
    return { formattedOffset, diffHrs }
  } catch (e) {
    return { formattedOffset: "UTC+00:00", diffHrs: 0 }
  }
}

// Visual hour retriever to handle local Day/Night glow
export const getHourInTimezone = (tz: string, date: Date) => {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      hour12: false,
    })
    return parseInt(formatter.format(date))
  } catch (e) {
    return 12
  }
}

export default function Clock({ defaultMode }: ClockProps) {
  const [time, setTime] = useState<Date | null>(null)
  const clockRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [alarms, setAlarms] = useState<any[]>([])
  
  // Interactive World Clock filters/pins
  const [pinnedCities, setPinnedCities] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("All")

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

  // Load / Sync pinned cities safely on client
  useEffect(() => {
    setTimeout(() => {
      try {
        const savedPins = localStorage.getItem("clockivo_pinned_cities")
        if (savedPins) {
          setPinnedCities(JSON.parse(savedPins))
        } else {
          const defaults = ["New York", "London", "Tokyo", "Mumbai", "Paris"]
          setPinnedCities(defaults)
          localStorage.setItem("clockivo_pinned_cities", JSON.stringify(defaults))
        }
      } catch (e) {
        setPinnedCities(["New York", "London", "Tokyo", "Mumbai", "Paris"])
      }
    }, 0)
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

  const togglePin = (cityName: string) => {
    try {
      let updated: string[] = []
      if (pinnedCities.includes(cityName)) {
        updated = pinnedCities.filter(name => name !== cityName)
      } else {
        updated = [...pinnedCities, cityName]
      }
      setPinnedCities(updated)
      localStorage.setItem("clockivo_pinned_cities", JSON.stringify(updated))
    } catch (e) {}
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (clockRef.current) {
        clockRef.current.requestFullscreen().catch(err => {
          console.error("Error enabling fullscreen:", err)
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

    let nearest: any = null
    let minDiff = Infinity
    
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

  // Live filter/search computations
  const filteredCities = useMemo(() => {
    return LIST_OF_25_CITIES.filter(city => {
      const matchRegion = selectedRegion === "All" || city.zone === selectedRegion
      const matchSearch = searchQuery.trim() === "" ||
        city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        city.country.toLowerCase().includes(searchQuery.toLowerCase())
      return matchRegion && matchSearch
    })
  }, [searchQuery, selectedRegion])

  // Split into pinned list items
  const pinnedList = useMemo(() => {
    return LIST_OF_25_CITIES.filter(city => pinnedCities.includes(city.name))
  }, [pinnedCities])

  if (!time) return null

  let dateText = ""
  if (dateFormat === "full") dateText = format(time, "EEEE, MMMM do, yyyy")
  else if (dateFormat === "dd/mm/yyyy") dateText = format(time, "dd/MM/yyyy")
  else if (dateFormat === "mm/dd/yyyy") dateText = format(time, "MM/dd/yyyy")

  // Relative hour helper comparing clock timezone with standard user system time
  const getRelativeHrsLabel = (targetOffsetHrs: number) => {
    const systemOffsetMins = time.getTimezoneOffset()
    const systemOffsetHrs = -systemOffsetMins / 60
    const diffHrs = targetOffsetHrs - systemOffsetHrs
    if (diffHrs === 0) return "same time"
    const sign = diffHrs > 0 ? "+" : ""
    const formattedDiff = Number(diffHrs.toFixed(1)).toString()
    return `${sign}${formattedDiff}h`
  }

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
             <DialogContent className="sm:max-w-xs border-none sm:border shadow-2xl bg-card">
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
          <div className="mt-12 w-full flex flex-col gap-8">
              {/* Next Alarm Module */}
              <div className="flex items-center justify-between p-4 rounded-2xl border bg-muted/20 w-full hover:bg-muted/30 transition-colors cursor-default">
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

              {/* Ultimate World Clocks Dashboard Panel */}
              <div className="flex flex-col border-t border-border/35 pt-8">
                  
                  {/* Header & Main Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                      <div className="flex items-center gap-2 text-foreground">
                          <Globe className="w-5 h-5 text-primary animate-pulse" />
                          <div>
                              <h2 className="text-lg font-bold tracking-tight">World Clock Dashboard</h2>
                              <p className="text-xs text-muted-foreground font-medium">Real-time coordinates and Daylight Saving Time (DST) offsets</p>
                          </div>
                      </div>

                      {/* Live search input */}
                      <div className="relative w-full sm:w-64">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <input
                              type="text"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              placeholder="Search over 25 world cities..."
                              className="w-full bg-muted/40 text-sm pl-9 pr-3 py-2 border border-border/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent transition-all text-foreground"
                          />
                      </div>
                  </div>

                  {/* Region Filter Buttons */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                      {["All", "Americas", "Europe", "Middle East", "Asia & Pacific", "Africa"].map(region => (
                          <button
                              key={region}
                              onClick={() => setSelectedRegion(region)}
                              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                                  selectedRegion === region
                                      ? "bg-primary text-primary-foreground shadow-xs"
                                      : "bg-muted/30 text-muted-foreground hover:bg-muted/70 hover:text-foreground"
                              }`}
                          >
                              {region}
                          </button>
                      ))}
                  </div>

                  {/* 1. Pinned Cities (Favorites) Section */}
                  {pinnedList.length > 0 && (
                      <div className="mb-6 flex flex-col">
                          <div className="flex items-center gap-1.5 mb-3 px-1 text-primary">
                              <Star className="w-4 h-4 fill-primary" />
                              <span className="text-xs font-bold uppercase tracking-wider">Pinned Favorites ({pinnedList.length})</span>
                          </div>
                          <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                          >
                              <AnimatePresence>
                              {pinnedList.map(city => {
                                  let strTime = ""
                                  let strDate = ""
                                  let offsetInfo = { formattedOffset: "", diffHrs: 0 }
                                  const localHour = getHourInTimezone(city.tz, time)
                                  const isDaytime = localHour >= 6 && localHour < 18

                                  try {
                                      const dfTime = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
                                      const dfDate = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, month: 'short', day: 'numeric' })
                                      strTime = dfTime.format(time)
                                      strDate = dfDate.format(time)
                                      offsetInfo = getRelativeOffset(city.tz, time)
                                  } catch (e) {
                                      strTime = "--:--"
                                      strDate = "---"
                                  }

                                  return (
                                      <motion.div 
                                          layout
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          exit={{ opacity: 0, scale: 0.9 }}
                                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                          key={`pin-${city.name}`} 
                                          className="flex flex-col p-4 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all shadow-xs relative group"
                                      >
                                          <button 
                                              onClick={() => togglePin(city.name)}
                                              className="absolute top-3 right-3 text-primary opacity-80 hover:opacity-100 transition-opacity"
                                              title="Unpin this city"
                                          >
                                              <Star className="w-4 h-4 fill-primary" />
                                          </button>

                                          <div className="flex items-center gap-1">
                                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/95">{city.name}</span>
                                              <span className="text-[10px] text-muted-foreground/60">({city.country})</span>
                                          </div>

                                          <div className="flex items-baseline mt-1 gap-2">
                                              <span className="text-3xl font-mono font-bold tracking-tight tabular-nums">{strTime}</span>
                                              <span className="text-xs font-bold shrink-0 flex items-center gap-1">
                                                  {isDaytime ? (
                                                      <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                                                  ) : (
                                                      <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/20" />
                                                  )}
                                              </span>
                                          </div>

                                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-primary/10 text-[11px] text-muted-foreground font-mono">
                                              <span>{strDate}</span>
                                              <span className="flex items-center gap-1">
                                                  <span>{offsetInfo.formattedOffset}</span>
                                                  <span className="font-semibold text-primary bg-primary/10 rounded-sm px-1 shrink-0 text-[10px]">
                                                      {getRelativeHrsLabel(offsetInfo.diffHrs)}
                                                  </span>
                                              </span>
                                          </div>
                                      </motion.div>
                                  )
                              })}
                              </AnimatePresence>
                          </motion.div>
                      </div>
                  )}

                  {/* 2. Main Selected Grid */}
                  <div className="flex flex-col mt-2">
                      <div className="flex items-center gap-1.5 mb-3 px-1 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">
                              {selectedRegion} World Clocks ({filteredCities.length})
                          </span>
                      </div>

                      {filteredCities.length === 0 ? (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-10 rounded-2xl border border-dashed border-border/40 text-muted-foreground text-sm"
                          >
                              No world cities matched your search query. Try another keyword.
                          </motion.div>
                      ) : (
                          <motion.div 
                            layout
                            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3"
                          >
                              {filteredCities.map(city => {
                                  const isPinned = pinnedCities.includes(city.name)
                                  let strTime = ""
                                  let strDate = ""
                                  let offsetInfo = { formattedOffset: "", diffHrs: 0 }
                                  const localHour = getHourInTimezone(city.tz, time)
                                  const isDaytime = localHour >= 6 && localHour < 18

                                  try {
                                      const dfTime = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
                                      const dfDate = new Intl.DateTimeFormat('en-US', { timeZone: city.tz, month: 'short', day: 'numeric' })
                                      strTime = dfTime.format(time)
                                      strDate = dfDate.format(time)
                                      offsetInfo = getRelativeOffset(city.tz, time)
                                  } catch (e) {
                                      strTime = "--:--"
                                      strDate = "---"
                                  }

                                  return (
                                      <motion.div 
                                          layout
                                          initial={{ opacity: 0, scale: 0.95 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                          key={city.name} 
                                          className="flex flex-col p-4 rounded-2xl border border-border/30 bg-card hover:bg-muted/10 transition-all shadow-xs relative group"
                                      >
                                          <button 
                                              onClick={() => togglePin(city.name)}
                                              className="absolute top-3 right-3 text-muted-foreground opacity-30 hover:opacity-100 group-hover:opacity-100 transition-all"
                                              title={isPinned ? "Unpin this city" : "Pin this city to standard list"}
                                          >
                                              <Star className={`w-4 h-4 ${isPinned ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                                          </button>

                                          <div className="flex items-center gap-1">
                                              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground/95">{city.name}</span>
                                              <span className="text-[10px] text-muted-foreground/60">({city.country})</span>
                                          </div>

                                          <div className="flex items-baseline mt-1 gap-2">
                                              <span className="text-3xl font-mono font-bold tracking-tight tabular-nums">{strTime}</span>
                                              <span className="text-xs font-bold shrink-0 flex items-center gap-1">
                                                  {isDaytime ? (
                                                      <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/10" />
                                                  ) : (
                                                      <Moon className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400/10" />
                                                  )}
                                              </span>
                                          </div>

                                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-border/20 text-[11px] text-muted-foreground font-mono">
                                              <span>{strDate}</span>
                                              <span className="flex items-center gap-1">
                                                  <span>{offsetInfo.formattedOffset}</span>
                                                  <span className="font-semibold text-primary bg-primary/10 rounded-sm px-1 shrink-0 text-[10px]">
                                                      {getRelativeHrsLabel(offsetInfo.diffHrs)}
                                                  </span>
                                              </span>
                                          </div>
                                      </motion.div>
                                  )
                              })}
                          </motion.div>
                      )}
                  </div>
              </div>
          </div>
      )}
    </Card>
  )
}

function AnalogClock({ time, colorClass }: { time: Date; colorClass: string }) {
  const s = time.getSeconds()
  const m = time.getMinutes()
  const h = time.getHours()
  
  const sRotation = s * 6
  const mRotation = m * 6 + s * 0.1
  const hRotation = (h % 12) * 30 + m * 0.5

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
