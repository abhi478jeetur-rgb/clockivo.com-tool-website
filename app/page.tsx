"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlarmClock, Timer as TimerIcon, Hourglass, Clock as ClockIcon, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import dynamic from "next/dynamic"

import Header from "@/components/header"
import Footer from "@/components/footer"

const Alarm = dynamic(() => import("@/components/alarm"), {
  ssr: false,
  loading: () => <TabLoadingSkeleton name="Alarm" />
})
const Timer = dynamic(() => import("@/components/timer"), {
  ssr: false,
  loading: () => <TabLoadingSkeleton name="Timer" />
})
const Stopwatch = dynamic(() => import("@/components/stopwatch"), {
  ssr: false,
  loading: () => <TabLoadingSkeleton name="Stopwatch" />
})
const Clock = dynamic(() => import("@/components/clock"), {
  ssr: false,
  loading: () => <TabLoadingSkeleton name="Clock" />
})

function TabLoadingSkeleton({ name }: { name: string }) {
  return (
    <div className="w-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-card rounded-3xl border border-border/40 shadow-sm animate-pulse">
      <div className="w-12 h-12 rounded-full bg-muted/60 mb-4 flex items-center justify-center">
        <div className="w-6 h-6 rounded-full bg-border" />
      </div>
      <div className="h-4 w-28 bg-muted/60 rounded mb-2" />
      <div className="h-3 w-48 bg-muted/40 rounded" />
    </div>
  )
}

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeAlarmsCount, setActiveAlarmsCount] = useState(0)
  const [activeTab, setActiveTab] = useState("alarm")

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
      try {
        const saved = localStorage.getItem("clockivo_alarms")
        if (saved) {
          const parsed = JSON.parse(saved)
          setActiveAlarmsCount(parsed.filter((a: any) => a.enabled).length)
        }
      } catch (e) {}
    }, 0);

    const updateAlarmsCount = () => {
      try {
        const saved = localStorage.getItem("clockivo_alarms")
        if (saved) {
          const parsed = JSON.parse(saved)
          setActiveAlarmsCount(parsed.filter((a: any) => a.enabled).length)
        }
      } catch (e) {}
    }
    window.addEventListener("alarmsChanged", updateAlarmsCount)
    return () => window.removeEventListener("alarmsChanged", updateAlarmsCount)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 flex flex-col items-center p-4 sm:p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-4xl pb-24 sm:pb-0">
          <TabsList className="hidden sm:grid w-full grid-cols-4 h-14 mb-8">
            <TabsTrigger value="alarm" className="text-sm sm:text-base flex items-center gap-2 relative">
              <AlarmClock className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Alarm</span>
              {activeAlarmsCount > 0 && (
                <span className="absolute top-2 right-2 sm:right-6 flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground transform translate-x-1/2 -translate-y-1/2">
                  {activeAlarmsCount}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="timer" className="text-sm sm:text-base flex items-center gap-2">
              <Hourglass className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Timer</span>
            </TabsTrigger>
            <TabsTrigger value="stopwatch" className="text-sm sm:text-base flex items-center gap-2">
              <TimerIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Stopwatch</span>
            </TabsTrigger>
            <TabsTrigger value="clock" className="text-sm sm:text-base flex items-center gap-2">
              <ClockIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Clock</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="alarm" className="mt-0 outline-none">
            <Alarm />
          </TabsContent>

          <TabsContent value="timer" className="mt-0 outline-none">
            <Timer />
          </TabsContent>

          <TabsContent value="stopwatch" className="mt-0 outline-none">
            <Stopwatch />
          </TabsContent>

          <TabsContent value="clock" className="mt-0 outline-none">
            <Clock />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />

      {/* Mobile Sticky Quick Actions Bar */}
      <div className="sm:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center bg-background/95 backdrop-blur-md border rounded-full shadow-2xl p-1.5 gap-1.5">
        <Button variant="secondary" size="icon" className="rounded-full shadow-sm text-primary bg-primary/10 hover:bg-primary/20" onClick={() => {
            setActiveTab("alarm");
            setTimeout(() => window.dispatchEvent(new Event("openAddAlarm")), 50);
        }}>
            <Plus className="w-6 h-6" />
        </Button>
        <div className="w-px h-8 bg-border/50 mx-1"></div>
        <Button variant={activeTab === 'alarm' ? 'secondary' : 'ghost'} size="icon" className="rounded-full" onClick={() => setActiveTab('alarm')}>
            <AlarmClock className="w-5 h-5"/>
        </Button>
        <Button variant={activeTab === 'timer' ? 'secondary' : 'ghost'} size="icon" className="rounded-full" onClick={() => setActiveTab('timer')}>
            <Hourglass className="w-5 h-5"/>
        </Button>
        <Button variant={activeTab === 'stopwatch' ? 'secondary' : 'ghost'} size="icon" className="rounded-full" onClick={() => setActiveTab('stopwatch')}>
            <TimerIcon className="w-5 h-5"/>
        </Button>
      </div>
    </div>
  )
}
