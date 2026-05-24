"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Lightbulb, ChevronRight, ChevronLeft } from "lucide-react"

interface Fact {
  id: number
  title: string
  fact: string
}

const FACTS: Fact[] = [
  {
    id: 1,
    title: "Pomodoro Tomato Origins",
    fact: "The Pomodoro Technique was invented in the late 1980s by Francesco Cirillo, who named it after a kitchen timer shaped like a tomato ('pomodoro' in Italian)."
  },
  {
    id: 2,
    title: "Atomic Clock Precision",
    fact: "Modern atomic clocks are accurate to within 1 second every 300 billion years. They measure time using the ultra-stable electromagnetic vibrations of cesium atoms."
  },
  {
    id: 3,
    title: "The 25-5 Scientific Boost",
    fact: "Scientific studies on cognitive rest show that taking a brief 5-minute break after 25 minutes of intense focus improves sustained focus and reduces fatigue by 30%."
  },
  {
    id: 4,
    title: "Daylight Saving Proposal",
    fact: "Daylight Saving Time (DST) was first proposed in 1895 by entomologist George Hudson, who wanted more daylight hours after work to collect insects."
  },
  {
    id: 5,
    title: "Time in Space",
    fact: "Due to gravitational time dilation, time passes slightly slower for astronauts aboard the International Space Station than for people on Earth (approx. 0.01 seconds per year)."
  },
  {
    id: 6,
    title: "Stopwatch Subdivisions",
    fact: "Standard professional stopwatches measure intervals in centiseconds (1/100th of a second) or milliseconds (1/1000th of a second) to ensure absolute precision."
  }
]

export default function QuickStats() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % FACTS.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [])

  const nextFact = () => {
    setIndex((prevIndex) => (prevIndex + 1) % FACTS.length)
  }

  const prevFact = () => {
    setIndex((prevIndex) => (prevIndex - 1 + FACTS.length) % FACTS.length)
  }

  return (
    <div className="w-full max-w-xl mx-auto my-8">
      <Card className="border-border/40 bg-card/30 backdrop-blur-sm shadow-lg overflow-hidden">
        <CardContent className="p-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            <div className="p-2 rounded-xl bg-primary/10 border border-primary/20 text-primary">
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase font-bold tracking-wider text-primary">Did You Know?</span>
              <h4 className="text-xs font-bold text-foreground">{FACTS[index].title}</h4>
            </div>
          </div>

          <div className="flex-1 text-left min-h-[50px] flex items-center relative overflow-hidden px-1">
            <AnimatePresence mode="wait">
              <motion.p
                key={FACTS[index].id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-xs text-muted-foreground leading-relaxed"
              >
                {FACTS[index].fact}
              </motion.p>
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center">
            <button
              onClick={prevFact}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card/85 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Previous fact"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button
              onClick={nextFact}
              className="p-1.5 rounded-lg border border-border/50 bg-card/50 hover:bg-card/85 text-muted-foreground hover:text-foreground transition-all"
              aria-label="Next fact"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
