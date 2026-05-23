"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "motion/react"
import { Home } from "lucide-react"
import * as audioLib from "@/lib/audio"

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-background px-4 py-12 select-none relative overflow-hidden">
      {/* Subtle glowing ambient decorative blobs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>

      <div className="max-w-xl w-full text-center flex flex-col items-center">
        {/* Animated 404 Graphic Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative w-full aspect-video md:aspect-[16/10] overflow-hidden rounded-3xl border border-border/40 shadow-xl bg-card mb-8"
        >
          <Image
            src="/404_error.jpg"
            alt="Page Not Found 404 Astronaut"
            fill
            priority
            className="object-cover hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          {/* Subtle vignette/gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none"></div>
        </motion.div>

        {/* Info & CTA Panel */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col items-center space-y-6"
        >
          <div className="space-y-2">
            <h1 className="font-sans font-extrabold text-3xl sm:text-4xl tracking-tight text-foreground">
              You Have Drifted Off Course
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              The page you are looking for does not exist or has been relocated in space-time. Let&apos;s get you back to safety.
            </p>
          </div>

          <Link
            href="/"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-medium px-8 py-4 h-auto text-base gap-2 shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-transform cursor-pointer"
            onClick={() => {
              try {
                if (audioLib && typeof audioLib.playFeedbackClick === "function") {
                  audioLib.playFeedbackClick();
                }
              } catch (e) {}
            }}
          >
            <Home className="w-5 h-5" />
            Return Home
          </Link>
        </motion.div>
      </div>

      {/* Decorative footer label */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.4 }}
        className="absolute bottom-6 font-mono text-[10px] text-muted-foreground uppercase tracking-widest"
      >
        Clockivo Command Center // 404
      </motion.p>
    </div>
  )
}
