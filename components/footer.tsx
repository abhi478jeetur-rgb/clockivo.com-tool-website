"use client"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/20 py-12 px-6 sm:px-12 mt-auto w-full">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="flex flex-col gap-3">
          <span className="text-lg font-bold tracking-tight text-foreground">Clockivo</span>
          <p className="text-xs text-muted-foreground max-w-xs">
            A fast, free, browser-based online clock utility. Access alarms, timers, stopwatches, world times, and visual presets offline or online.
          </p>
        </div>
        
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Online Tools</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/alarm-clock" className="hover:text-primary transition-colors">Alarm Clock</Link>
            </li>
            <li>
              <Link href="/timer" className="hover:text-primary transition-colors">Online Timer</Link>
            </li>
            <li>
              <Link href="/stopwatch" className="hover:text-primary transition-colors">Online Stopwatch</Link>
            </li>
            <li>
              <Link href="/digital-clock" className="hover:text-primary transition-colors">Digital Clock</Link>
            </li>
            <li>
              <Link href="/analog-clock" className="hover:text-primary transition-colors">Analog Clock</Link>
            </li>
            <li>
              <Link href="/world-clock" className="hover:text-primary transition-colors">World Clock</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
          <ul className="flex flex-col gap-2.5 text-sm text-muted-foreground">
            <li>
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            </li>
            <li>
              <Link href="/help" className="hover:text-primary transition-colors">Help & FAQ</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-primary transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-foreground mb-4">Legal & Trust</h4>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li>
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-6xl mx-auto border-t border-border/40 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
        <span>© {currentYear} Clockivo. All rights reserved. Built for seamless productivity.</span>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
        </div>
      </div>
    </footer>
  )
}
