"use client"

/*
 * Clockivo Analytics Utility
 * Thin wrapper around Google Analytics 4 (gtag.js) for custom event tracking.
 * All calls are guarded so the app works identically if GA is blocked or not loaded.
 */

type GtagCommand = "event" | "config" | "set"

interface EventParams {
  [key: string]: string | number | boolean | undefined
}

function gtag(command: GtagCommand, targetOrEventName: string, params?: EventParams) {
  if (typeof window !== "undefined" && typeof (window as any).gtag === "function") {
    ;(window as any).gtag(command, targetOrEventName, params)
  }
}

/**
 * Send a custom GA4 event.
 * @param name - GA4 event name (snake_case recommended)
 * @param params - Optional key-value parameters
 */
export function sendAnalyticsEvent(name: string, params?: EventParams) {
  gtag("event", name, params)
}

// ── Pre-built helpers for Clockivo tool interactions ──

export function trackTimerStarted(durationSeconds: number) {
  sendAnalyticsEvent("timer_started", {
    duration_seconds: durationSeconds,
    tool: "countdown_timer",
  })
}

export function trackAlarmSet(options: {
  recurrence: string
  has_label: boolean
  is_tomorrow: boolean
}) {
  sendAnalyticsEvent("alarm_set", {
    recurrence: options.recurrence,
    has_label: options.has_label,
    is_tomorrow: options.is_tomorrow,
    tool: "alarm_clock",
  })
}
