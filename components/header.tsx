"use client"

import { Clock as ClockIcon } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"

export default function Header() {
  return (
    <header className="border-b px-6 py-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur z-50">
      <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <ClockIcon className="w-6 h-6 text-primary" />
        <span className="text-xl font-bold tracking-tight">Clockivo</span>
      </Link>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground mr-2">
          <Link href="/alarm-clock" className="hover:text-foreground transition-colors">Alarm</Link>
          <Link href="/timer" className="hover:text-foreground transition-colors">Timer</Link>
          <Link href="/stopwatch" className="hover:text-foreground transition-colors">Stopwatch</Link>
          <Link href="/digital-clock" className="hover:text-foreground transition-colors">Clock (Digital)</Link>
          <Link href="/analog-clock" className="hover:text-foreground transition-colors">Clock (Analog)</Link>
          <Link href="/world-clock" className="hover:text-foreground transition-colors">World Clock</Link>
        </nav>
        <ModeToggle />
      </div>
    </header>
  )
}
