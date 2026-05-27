"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, BellRing, Volume2, Moon, Copy, Pencil, Music, Youtube } from "lucide-react"
import { format } from "date-fns"
import * as audioLib from "@/lib/audio"

const playAlarmSound = () => {
  if (audioLib && typeof audioLib.playAlarmSound === "function") {
    audioLib.playAlarmSound()
  }
}

const getSoundSettings = () => {
  if (audioLib && typeof audioLib.getSoundSettings === "function") {
    return audioLib.getSoundSettings()
  }
  return { volume: 50, type: "sine", speed: "normal" }
}
import { SoundSettings } from "./sound-settings"
import dynamic from "next/dynamic"
import { motion, AnimatePresence } from "motion/react"
import { trackAlarmSet } from "@/lib/analytics"

const CustomMediaHub = dynamic(() => import("./custom-media-hub"), { ssr: false })

interface AlarmData {
  id: string
  hours: string
  minutes: string
  label: string
  note?: string
  targetDate?: string
  recurrence?: "once" | "daily" | "weekdays" | "weekends"
  enabled: boolean
}

export default function Alarm() {
  const [alarms, setAlarms] = useState<AlarmData[]>([])
  const [currentTime, setCurrentTime] = useState<Date | null>(null)
  
  // Create Alarm dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [newHours, setNewHours] = useState("07")
  const [newMinutes, setNewMinutes] = useState("00")
  const [newLabel, setNewLabel] = useState("Wake Up")
  const [newNote, setNewNote] = useState("")
  const [isTomorrow, setIsTomorrow] = useState(false)
  const [newRecurrence, setNewRecurrence] = useState("once")

  // Sort and Filter
  const [filter, setFilter] = useState("all")
  const [sortField, setSortField] = useState("nearest")

  // Ringing State
  const [ringingAlarmId, setRingingAlarmId] = useState<string | null>(null)
  
  // Sound interval and audio elements refs
  const soundInterval = useRef<NodeJS.Timeout | null>(null)
  const ringingAudioRef = useRef<HTMLAudioElement | null>(null)

  // Checked minutes track to avoid skipping alarms during background sleeps/throttles
  const lastCheckedMinRef = useRef<number>(0)

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("clockivo_alarms")
    if (saved) {
      try { 
        // fallback 'label' to 'title' for existing data
        const parsed = JSON.parse(saved).map((a: any) => ({
          ...a,
          label: a.label || a.title || "Alarm"
        }))
        setTimeout(() => setAlarms(parsed), 0)
      } catch (e) {}
    }
  }, [])

  // Save to local storage and sync cross-component
  useEffect(() => {
    localStorage.setItem("clockivo_alarms", JSON.stringify(alarms))
    window.dispatchEvent(new Event("alarmsChanged"))
  }, [alarms])

  const triggerAlarm = (id: string) => {
    setRingingAlarmId(id)

    const settings = getSoundSettings()
    
    if (settings.type === "custom") {
      try {
        const customUrl = localStorage.getItem("clockivo_uploaded_url")
        if (customUrl) {
          const audio = new Audio(customUrl)
          audio.loop = true
          audio.volume = (settings.volume ?? 50) / 100
          audio.play().catch(e => console.warn("Browser blocked auto-play inside custom track:", e))
          ringingAudioRef.current = audio
          return
        }
      } catch (e) {
        console.warn("Could not play custom audio:", e)
      }
    }

    if (settings.type === "youtube") {
      // YouTube streams directly via our Iframe renderer inside the Modal overlay
      return
    }
    
    playAlarmSound()
    soundInterval.current = setInterval(() => {
        playAlarmSound()
    }, 2000)
  }

  // Current time & alarm checker
  useEffect(() => {
    setTimeout(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Initialize checked minute immediately so we do not double-trigger old alarms on load
      const initMinObj = new Date(now)
      initMinObj.setSeconds(0, 0)
      lastCheckedMinRef.current = initMinObj.getTime()
    }, 0)
    
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      // Get hour-minute timestamp floored to minute
      const currentMinObj = new Date(now)
      currentMinObj.setSeconds(0, 0)
      const currentMinTS = currentMinObj.getTime()
      const lastCheckTS = lastCheckedMinRef.current

      if (lastCheckTS > 0 && currentMinTS > lastCheckTS) {
        // Find how many minutes of differences we have since we last checked
        const diffMin = Math.round((currentMinTS - lastCheckTS) / 60000)
        
        // Limit lookback sweep to max 15 minutes to prevent huge alarm spam
        const minutesToCheck = Math.min(diffMin, 15)
        
        for (let i = minutesToCheck; i >= 1; i--) {
          const checkTime = new Date(currentMinTS - (i - 1) * 60000)
          const checkH = format(checkTime, "HH")
          const checkM = format(checkTime, "mm")
          
          alarms.forEach(alarm => {
            let shouldRing = alarm.enabled && alarm.hours === checkH && alarm.minutes === checkM
            if (shouldRing) {
              const rec = alarm.recurrence || "once"
              const dayOfWeek = checkTime.getDay()
              const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
              if (rec === "weekdays" && isWeekend) shouldRing = false
              if (rec === "weekends" && !isWeekend) shouldRing = false

              if (rec === "once" && alarm.targetDate) {
                const checkDateStr = format(checkTime, "yyyy-MM-dd")
                if (alarm.targetDate !== checkDateStr) {
                  shouldRing = false
                }
              }
            }
            if (shouldRing) {
              triggerAlarm(alarm.id)
            }
          })
        }
        
        lastCheckedMinRef.current = currentMinTS
      } else if (lastCheckTS === 0) {
        lastCheckedMinRef.current = currentMinTS
      }

    }, 1000)

    return () => clearInterval(interval)
  }, [alarms])

  const stopAlarm = () => {
    if (soundInterval.current) {
      clearInterval(soundInterval.current)
      soundInterval.current = null
    }
    if (ringingAudioRef.current) {
      ringingAudioRef.current.pause()
      ringingAudioRef.current = null
    }
    
    setAlarms(current => current.map(a => 
      a.id === ringingAlarmId ? { ...a, enabled: false } : a
    ))
    
    setRingingAlarmId(null)
  }

  const snoozeAlarm = () => {
    if (soundInterval.current) {
      clearInterval(soundInterval.current)
      soundInterval.current = null
    }
    if (ringingAudioRef.current) {
      ringingAudioRef.current.pause()
      ringingAudioRef.current = null
    }
    
    // Create a new snooze time (+5 mins)
    const now = new Date()
    now.setMinutes(now.getMinutes() + 5)
    const newH = format(now, "HH")
    const newM = format(now, "mm")

    setAlarms(current => current.map(a => 
      a.id === ringingAlarmId ? {
        ...a,
        hours: newH,
        minutes: newM,
        enabled: true,
        label: !a.label.includes("(Snoozed)") ? a.label + " (Snoozed)" : a.label
      } : a
    ))

    setRingingAlarmId(null)
  }

  const openAddAlarm = () => {
      setEditingId(null)
      setNewHours("07")
      setNewMinutes("00")
      setNewLabel("Wake Up")
      setNewNote("")
      setIsTomorrow(false)
      setNewRecurrence("once")
      setIsDialogOpen(true)
  }

  const openEditAlarm = (alarm: AlarmData) => {
      setEditingId(alarm.id)
      setNewHours(alarm.hours)
      setNewMinutes(alarm.minutes)
      setNewLabel(alarm.label)
      setNewNote(alarm.note || "")
      setNewRecurrence(alarm.recurrence || "once")
      setIsTomorrow(!!alarm.targetDate && alarm.targetDate !== format(new Date(), "yyyy-MM-dd"))
      setIsDialogOpen(true)
  }

  useEffect(() => {
      const handler = () => openAddAlarm();
      window.addEventListener("openAddAlarm", handler);
      return () => window.removeEventListener("openAddAlarm", handler);
  }, [])

  const handleAddAlarm = () => {
    let targetDate = undefined
    if (newRecurrence === "once" && isTomorrow) {
        targetDate = format(new Date(Date.now() + 86400000), "yyyy-MM-dd")
    }

    if (editingId) {
        setAlarms(current => current.map(a => a.id === editingId ? {
            ...a, hours: newHours, minutes: newMinutes, label: newLabel || "Alarm", note: newNote, targetDate, recurrence: newRecurrence as any, enabled: true
        } : a).sort((a,b) => {
            const timeA = parseInt(a.hours)*60 + parseInt(a.minutes)
            const timeB = parseInt(b.hours)*60 + parseInt(b.minutes)
            return timeA - timeB
        }))
    } else {
        const newAlarm: AlarmData = {
          id: Date.now().toString(), hours: newHours, minutes: newMinutes, label: newLabel || "Alarm", note: newNote, targetDate, recurrence: newRecurrence as any, enabled: true
        }
        setAlarms(current => [...current, newAlarm].sort((a,b) => {
            const timeA = parseInt(a.hours)*60 + parseInt(a.minutes)
            const timeB = parseInt(b.hours)*60 + parseInt(b.minutes)
            return timeA - timeB
        }))

        trackAlarmSet({
          recurrence: newRecurrence,
          has_label: !!newLabel && newLabel !== "Alarm",
          is_tomorrow: isTomorrow,
        })
    }
    setIsDialogOpen(false)
  }

  const duplicateAlarm = (alarm: AlarmData) => {
    const newAlarm = { ...alarm, id: Date.now().toString() }
    setAlarms(current => [...current, newAlarm].sort((a,b) => {
        const timeA = parseInt(a.hours)*60 + parseInt(a.minutes)
        const timeB = parseInt(b.hours)*60 + parseInt(b.minutes)
        return timeA - timeB
    }))
  }

  const toggleAlarm = (id: string, enabled: boolean) => {
    setAlarms(current => current.map(a => a.id === id ? { ...a, enabled } : a))
  }

  const deleteAlarm = (id: string) => {
    setAlarms(current => current.filter(a => a.id !== id))
  }

  // Pre-generate hours and minutes options
  const hoursOptions = Array.from({ length: 24 }).map((_, i) => i.toString().padStart(2, '0'))
  const minutesOptions = Array.from({ length: 60 }).map((_, i) => i.toString().padStart(2, '0'))

  const ringingAlarm = alarms.find(a => a.id === ringingAlarmId)

  const processedAlarms = alarms.filter(a => {
      if (filter === "active") return a.enabled;
      if (filter === "tomorrow") return a.targetDate || (a.recurrence && a.recurrence !== "once");
      return true;
  }).sort((a,b) => {
      if (sortField === "label") return a.label.localeCompare(b.label);
      if (sortField === "latest") return parseInt(b.id) - parseInt(a.id);
      
      const currTimeObj = new Date()
      const currMins = currTimeObj.getHours() * 60 + currTimeObj.getMinutes();
      let aMins = parseInt(a.hours)*60 + parseInt(a.minutes)
      let bMins = parseInt(b.hours)*60 + parseInt(b.minutes)
      if (aMins < currMins) aMins += 24*60;
      if (bMins < currMins) bMins += 24*60;
      return aMins - bMins;
  })

  return (
    <Card className="flex flex-col items-center p-4 sm:p-12 min-h-[60vh] border-none shadow-none bg-transparent sm:bg-card sm:border sm:shadow-sm w-full">
      
      {/* Current Time Display */}
      {currentTime && (
          <div className="text-4xl sm:text-6xl font-mono font-bold tracking-tighter mb-8 text-muted-foreground/50">
              {format(currentTime, "HH:mm")}
              <span className="text-2xl sm:text-4xl ml-2 text-muted-foreground/30">{format(currentTime, "ss")}</span>
          </div>
      )}

      {/* Alarms List */}
      <div className="w-full max-w-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 mt-2 sm:mt-0">
          <div className="flex gap-2">
            <Select value={filter} onValueChange={(v) => v && setFilter(v)}>
                <SelectTrigger className="w-[110px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow / Rec</SelectItem>
                </SelectContent>
            </Select>
            <Select value={sortField} onValueChange={(v) => v && setSortField(v)}>
                <SelectTrigger className="w-[110px] h-9"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="nearest">Nearest</SelectItem>
                    <SelectItem value="latest">Latest</SelectItem>
                    <SelectItem value="label">Label A-Z</SelectItem>
                </SelectContent>
            </Select>
          </div>
          <SoundSettings />
      </div>

      <div className="w-full max-w-xl flex flex-col gap-4 mb-8">
        {processedAlarms.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 text-center border-2 border-dashed rounded-xl bg-muted/10">
            <BellRing className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Alarms Set</h3>
            <p className="text-muted-foreground mb-6">Create your first alarm to get started.</p>
            <Button onClick={openAddAlarm} variant="secondary">Add your first alarm</Button>
          </div>
        ) : (
          <AnimatePresence>
            {processedAlarms.map(alarm => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                key={alarm.id} 
                className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 rounded-2xl border transition-all duration-300 gap-4 sm:gap-0 ${alarm.enabled ? 'bg-card/60 backdrop-blur-md border-primary/30 shadow-[0_4px_20px_rgb(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.02)]' : 'bg-muted/20 border-transparent opacity-60 grayscale-[0.5]'}`}
              >
                <div className="flex flex-col gap-1 w-full sm:w-auto">
                <div className="flex items-center gap-3">
                  <span className="text-4xl sm:text-5xl font-mono font-bold tracking-tight">
                    {alarm.hours}:{alarm.minutes}
                  </span>
                  {alarm.targetDate && (
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold">Tomorrow</span>
                  )}
                  {alarm.recurrence && alarm.recurrence !== "once" && (
                    <span className="px-2.5 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold capitalize">{alarm.recurrence}</span>
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-sm sm:text-base font-medium text-muted-foreground">
                    {alarm.label}
                  </span>
                  {alarm.note && (
                    <span className="text-xs text-muted-foreground/70 mt-0.5">{alarm.note}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <Button variant="ghost" size="icon" onClick={() => openEditAlarm(alarm)} className="text-muted-foreground" title="Edit">
                  <Pencil className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => duplicateAlarm(alarm)} className="text-muted-foreground" title="Duplicate">
                  <Copy className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => deleteAlarm(alarm.id)} className="text-muted-foreground hover:text-destructive" title="Delete">
                  <Trash2 className="w-5 h-5" />
                </Button>
                <Switch 
                  checked={alarm.enabled} 
                  onCheckedChange={(c) => toggleAlarm(alarm.id, c)} 
                  className="scale-110 ml-auto sm:ml-2"
                />
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        )}
      </div>

      {alarms.length > 0 && (
        <Button size="lg" onClick={openAddAlarm} className="rounded-full h-14 px-8 text-lg shadow-lg">
          <Plus className="w-5 h-5 mr-2" /> Add Alarm
        </Button>
      )}

      {/* Dynamic Custom Audio, Visualizer & YouTube Hub */}
      <CustomMediaHub />

      {/* Add Alarm Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} disablePointerDismissal>
        <DialogContent className="sm:max-w-md border-none sm:border shadow-2xl">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle>{editingId ? "Edit Alarm" : "Set New Alarm"}</DialogTitle>
            <Button variant="outline" size="sm" onClick={playAlarmSound} className="mt-0">
               <Volume2 className="w-4 h-4 mr-2" /> Test Sound
            </Button>
          </DialogHeader>
          <div className="flex flex-col gap-6 py-4">
            <div className="flex items-center justify-center gap-4">
              <div className="flex flex-col gap-2 w-1/3">
                <Label className="text-center">Hour</Label>
                <Select value={newHours} onValueChange={(val) => val && setNewHours(val)}>
                  <SelectTrigger className="h-16 text-2xl font-mono justify-center">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {hoursOptions.map(h => <SelectItem key={h} value={h} className="text-lg font-mono">{h}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-3xl font-bold pb-2">:</div>
              <div className="flex flex-col gap-2 w-1/3">
                <Label className="text-center">Minute</Label>
                <Select value={newMinutes} onValueChange={(val) => val && setNewMinutes(val)}>
                  <SelectTrigger className="h-16 text-2xl font-mono justify-center">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="max-h-[250px]">
                    {minutesOptions.map(m => <SelectItem key={m} value={m} className="text-lg font-mono">{m}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Label</Label>
                <Input 
                  value={newLabel} 
                  onChange={e => setNewLabel(e.target.value)} 
                  placeholder="Wake Up" 
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Note <span className="text-muted-foreground font-normal">(Optional)</span></Label>
                <Input 
                  value={newNote} 
                  onChange={e => setNewNote(e.target.value)} 
                  placeholder="E.g., Take medicine..." 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label>Repeat</Label>
                    <Select value={newRecurrence} onValueChange={(val) => val && setNewRecurrence(val)}>
                        <SelectTrigger><SelectValue/></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="once">Once</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                            <SelectItem value="weekdays">Weekdays</SelectItem>
                            <SelectItem value="weekends">Weekends</SelectItem>
                        </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between border rounded-lg p-3">
                    <Label className="cursor-pointer">{newRecurrence==='once'?"Tomorrow":"-"} </Label>
                    <Switch checked={isTomorrow} onCheckedChange={setIsTomorrow} disabled={newRecurrence !== 'once'} />
                  </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddAlarm}>Save Alarm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ringing Modal overlays everything */}
      <Dialog open={ringingAlarmId !== null} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md rounded-[2rem] p-8 flex flex-col items-center gap-6 justify-center bg-card 
          ring-8 ring-primary/20 animate-in zoom-in duration-300">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center animate-pulse relative">
             <BellRing className="w-10 h-10 text-primary animate-bounce" />
          </div>
          <div className="flex flex-col items-center gap-2 text-center w-full">
             <h2 className="text-5xl font-mono font-bold tabular-nums">
               {ringingAlarm?.hours}:{ringingAlarm?.minutes}
             </h2>
             <p className="text-xl font-medium text-muted-foreground">{ringingAlarm?.label}</p>
             {ringingAlarm?.note && (
               <p className="text-xs text-muted-foreground bg-muted/65 px-3 py-1.5 rounded-lg border border-border/30 max-w-xs">{ringingAlarm.note}</p>
             )}
          </div>

          {/* YouTube loop streamer inside alert screen (Visual-free background notifier) */}
          {ringingAlarmId !== null && getSoundSettings().type === "youtube" && (
            <div className="w-full flex flex-col items-center gap-1.5 bg-red-500/5 border border-red-500/20 p-4 rounded-xl animate-pulse">
               <div className="flex items-center gap-1.5 text-red-500">
                 <Youtube className="w-5 h-5 animate-bounce" />
                 <span className="text-xs font-bold font-mono">YouTube Alarm Sounding...</span>
               </div>
               <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[220px]">
                 Streaming High-Fidelity Audio
               </span>
               
               {/* Invisible background stream engine element keeping sound active */}
               <iframe
                 src={`https://www.youtube.com/embed/${localStorage.getItem("clockivo_youtube_id") || "5qap5aO4i9A"}?autoplay=1&loop=1&playlist=${localStorage.getItem("clockivo_youtube_id") || "5qap5aO4i9A"}`}
                 title="YouTube Alarm Ringing Tone"
                 style={{
                   position: "absolute",
                   width: "1px",
                   height: "1px",
                   opacity: 0,
                   pointerEvents: "none",
                   top: "-1000px",
                   left: "-1000px",
                   border: "none",
                 }}
                 allow="autoplay"
                 frameBorder="0"
               />
            </div>
          )}

          {/* Custom Local audio stream state visual inside alert screen */}
          {ringingAlarmId !== null && getSoundSettings().type === "custom" && (
            <div className="w-full flex flex-col items-center gap-1.5 bg-primary/5 border border-primary/20 p-4 rounded-xl animate-pulse">
               <div className="flex items-center gap-1.5 text-primary">
                 <Music className="w-4 h-4 animate-bounce" />
                 <span className="text-xs font-bold font-mono">Custom Upload Sounding</span>
               </div>
               <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[220px]">
                 {localStorage.getItem("clockivo_uploaded_name") || "Custom Alarm Tone"}
               </span>
            </div>
          )}

          <div className="flex flex-col w-full gap-3 mt-2">
             <Button size="lg" onClick={stopAlarm} className="w-full rounded-full h-15 text-xl shadow-lg animate-pulse">
               STOP
             </Button>
             <Button size="lg" variant="secondary" onClick={snoozeAlarm} className="w-full rounded-full h-13 text-lg">
               <Moon className="w-5 h-5 mr-2" /> Snooze 5 Min
             </Button>
          </div>
        </DialogContent>
      </Dialog>

    </Card>
  )
}
