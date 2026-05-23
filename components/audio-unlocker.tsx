"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { VolumeX, Volume2, Check, Sparkles } from "lucide-react"
import * as audioLib from "@/lib/audio"

const unlockAudio = async () => {
  if (audioLib && typeof audioLib.unlockAudio === "function") {
    return await audioLib.unlockAudio()
  }
  return false
}

const isAudioUnlocked = () => {
  if (audioLib && typeof audioLib.isAudioUnlocked === "function") {
    return audioLib.isAudioUnlocked()
  }
  return false
}

export default function AudioUnlocker() {
  const [mounted, setMounted] = useState(false)
  const [unlocked, setUnlocked] = useState(false)
  const [showStatus, setShowStatus] = useState(false)
  const [successDismissed, setSuccessDismissed] = useState(false)

  useEffect(() => {
    setTimeout(() => setMounted(true), 0)
    
    // Initial sync check
    const checkState = () => {
      const isOk = isAudioUnlocked()
      setUnlocked(isOk)
      if (!isOk) {
        setShowStatus(true)
      }
    }

    checkState()

    // Monitor custom state change events dispatched by our lib/audio
    const handleStateChange = () => {
      setUnlocked(true)
      // Show success animation brief before auto hiding
      setShowStatus(true)
      setTimeout(() => {
        setSuccessDismissed(true)
      }, 3500)
    }

    window.addEventListener("audioUnlockedStateChanged", handleStateChange)

    // Listen to ANY click or keypress anywhere on the page to automatically trigger a silent unlock
    const handleGlobalTrigger = async () => {
      if (!isAudioUnlocked()) {
        await unlockAudio()
      }
    }

    window.addEventListener("click", handleGlobalTrigger, { capture: true })
    window.addEventListener("touchstart", handleGlobalTrigger, { capture: true })
    window.addEventListener("keydown", handleGlobalTrigger, { capture: true })

    // Also repeatedly check context state on focus/visibility change
    const handleFocusCheck = () => {
      if (isAudioUnlocked()) {
        handleStateChange()
      }
    }
    window.addEventListener("focus", handleFocusCheck)

    return () => {
      window.removeEventListener("audioUnlockedStateChanged", handleStateChange)
      window.removeEventListener("click", handleGlobalTrigger, { capture: true })
      window.removeEventListener("touchstart", handleGlobalTrigger, { capture: true })
      window.removeEventListener("keydown", handleGlobalTrigger, { capture: true })
      window.removeEventListener("focus", handleFocusCheck)
    }
  }, [])

  const handleManualUnlock = async (e: React.MouseEvent) => {
    e.stopPropagation() // Avoid bubbling
    await unlockAudio()
  }

  // Do not show anything once dismissed to keep visual space pristine
  if (!mounted || successDismissed) return null

  return (
    <AnimatePresence>
      {showStatus && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          id="audio-unlocker-float"
          className="fixed bottom-5 right-5 z-[99999] max-w-sm sm:max-w-md"
        >
          {!unlocked ? (
            <button
              onClick={handleManualUnlock}
              type="button"
              className="flex items-center gap-3 bg-red-500/10 dark:bg-red-500/20 hover:bg-red-500/20 border border-red-500/40 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md transition-all text-left group"
            >
              <div className="w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0 animate-pulse relative">
                <VolumeX className="w-4 h-4" />
                <span className="absolute inset-0 rounded-full bg-red-500/45 animate-ping" />
              </div>
              <div className="flex flex-col gap-0.5 min-w-0 pr-1">
                <span className="text-xs font-bold text-red-600 dark:text-red-400">
                  Tap to Activate Sound
                </span>
                <p className="text-[10px] text-muted-foreground/90 leading-tight">
                  Modern browsers block default alarm ringers until you click or interact. Click here to confirm!
                </p>
              </div>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 bg-emerald-500/15 dark:bg-emerald-500/20 border border-emerald-500/40 px-4 py-3 rounded-2xl shadow-xl backdrop-blur-md"
            >
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Check className="w-4 h-4" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" /> Alarms Ready!
                </span>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Autoplay successfully authorized. Alarms and timers will ring with high-fidelity audio!
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
