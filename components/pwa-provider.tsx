"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Laptop } from "lucide-react"

export default function PWAProvider() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // 1. Register Service Worker on modern browsers
    if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Clockivo Service Worker active on scope:", reg.scope)
        })
        .catch((err) => {
          console.warn("Clockivo Service Worker registration bypassed:", err)
        })
    }

    // 2. Listen for the native beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Delay showing banner slightly for better UX engagement
      const dismissed = localStorage.getItem("clockivo_pwa_dismissed")
      if (!dismissed) {
        setTimeout(() => setShowBanner(true), 3000)
      }
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)
    
    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
    }
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return
    
    // Show native prompt
    deferredPrompt.prompt()
    
    // Wait for choice
    const { outcome } = await deferredPrompt.userChoice
    console.log(`PWA install user outcome: ${outcome}`)
    
    setDeferredPrompt(null)
    setShowBanner(false)
  }

  const handleDismiss = () => {
    setShowBanner(false)
    localStorage.setItem("clockivo_pwa_dismissed", "true")
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-[100] animate-in slide-in-from-bottom duration-300">
      <div className="bg-card/95 backdrop-blur-md border border-primary/20 hover:border-primary/40 rounded-2xl p-4 shadow-2xl flex flex-col gap-3 transition-colors">
        <button 
          onClick={handleDismiss} 
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Dismiss launch prompt"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div className="flex flex-col gap-0.5">
            <h4 className="text-sm font-bold text-foreground">Install Clockivo App</h4>
            <p className="text-xs text-muted-foreground leading-normal">
              Install Clockivo on your device for fast local access, fullscreen alarms, and offline capability.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-1 justify-end">
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="text-xs">
            Later
          </Button>
          <Button size="sm" onClick={handleInstallClick} className="text-xs gap-1.5 rounded-xl">
            <Download className="w-3.5 h-3.5" /> Install App
          </Button>
        </div>
      </div>
    </div>
  )
}
