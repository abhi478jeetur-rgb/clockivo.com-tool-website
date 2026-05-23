import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Alarm from "@/components/alarm"
import { AlarmClock, BellRing, Settings, CalendarRange } from "lucide-react"

export const metadata: Metadata = {
  title: "Online Alarm Clock - Loud Wake Up Bells",
  description: "Set a free online alarm clock with customizable sound shapes (Sine, Square, Triangle, Sawtooth), volume controls, and recurring scheduler intervals. Runs fully local and offline.",
  alternates: {
    canonical: "/alarm-clock",
  },
}

export default function AlarmClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Clockivo Online Alarm Clock",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Set a free online alarm clock with customizable sound types, volume settings, and recurring intervals (daily, weekdays, weekends). Features offline backup support.",
    "softwareVersion": "1.0",
    "browserRequirements": "Requires a modern browser with HTML5 Web Audio support (e.g. Chrome, Firefox, Safari, Edge)",
    "author": {
      "@type": "Organization",
      "name": "Clockivo",
      "url": "https://clockivo.com"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8">
        <div className="mb-6 mt-1 flex flex-col gap-2">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5">
            <AlarmClock className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Online Alarm Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            A precise, easy-to-use, and highly customizable browser alarm clock. Add multiple active alarms, modify alert sounds, configure repeat timers, and manage your schedule effortlessly.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Alarm />
        </div>

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BellRing className="w-5 h-5 text-primary" /> How to Set Your Online Alarm
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Setting an alarm is straightforward with Clockivo. Select the hour and minute using our intuitive picker, assign an optional descriptive label, choose your repeat recurrence (once, daily, weekdays, or weekends), and click <strong>Add Alarm</strong>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              When the predetermined threshold is reached, our system triggers a pleasant acoustic beep sequence based on your personalized sound parameters. Ensure your device is unmuted and the browser tab remains open.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary" /> Personalized Sound Options
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Clockivo gives you complete control over your alerts. Click on the <strong>Sound Settings</strong> panel to personalize the acoustic signature. Choose from a gentle <em>Sine Wave</em>, prominent <em>Square Wave</em>, clean <em>Triangle Wave</em>, or high-definition <em>Sawtooth Wave</em>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              You can also fine-tune the master decibel/volume slider and control repetition speed (slow, normal, or fast) to create the ideal sensory environment.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <CalendarRange className="w-5 h-5 text-primary" /> Flexible Recurring Schedules
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Simplify your weekly routines. Set recurring wake-up calls tailored specifically to weekdays (Monday through Friday) or weekends (Saturday and Sunday). This eliminates the friction of manually enabling and disabling alarms every night, preserving local browser storage safely.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
