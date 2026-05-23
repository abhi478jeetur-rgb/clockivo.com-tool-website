import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Timer from "@/components/timer"
import { Hourglass, PlayCircle, History, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Online Countdown Timer - Free Productivity Study Clock",
  description: "Set a free online countdown timer with loud audio feedback. Ideal for cooking, studying, workouts, and Pomodoro focus blocks. View completed session histories locally.",
  alternates: {
    canonical: "/timer",
  },
}

export default function TimerPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Clockivo Online Countdown Timer",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Set a free online countdown timer with loud audio feedback. Ideal for cooking, studying, workouts, and Pomodoro focus blocks. View completed session histories.",
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
            <Hourglass className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Online Countdown Timer
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            Configure hours, minutes, and seconds to run an instant, highly accurate browser-based countdown. Equipped with customizable alarm warnings, persistent local history, and rapid presets.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Timer />
        </div>

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-primary" /> How to Use the Countdown Timer
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our timer is optimized for rapid setup. Simply click on the hours, minutes, or seconds display block (or press the edit action) to inputs your target time. You can also utilize our rapid predefined increment pads to quickly add minutes or hours.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Once you trigger the <strong>Start</strong> engine, our countdown ticks down smoothly using precise high-frequency browser intervals. You can pause or reset the timer at any moment.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-primary" /> Track Focus Session History
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Improve your time management skills. Clockivo silently preserves complete logs of all successfully finished countdown durations inside your localized storage engine.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Review exactly when and how long you practiced, cooked, or coded using our <strong>Session History</strong> drawer, keeping you accountable without cloud synchronization lags.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" /> Ideal Applications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="border rounded-xl p-4 bg-muted/10">
                <strong className="text-foreground block mb-1">Study & Pomodoro</strong> Set a 25-minute study chunk followed by a refreshing 5-minute breather to maintain peak cognitive stamina.
              </div>
              <div className="border rounded-xl p-4 bg-muted/10">
                <strong className="text-foreground block mb-1">Culinary Tracker</strong> Ensure your recipes boil, bake, or roast perfectly using multiple active timers across browser tabs.
              </div>
              <div className="border rounded-xl p-4 bg-muted/10">
                <strong className="text-foreground block mb-1">Gym & HIIT</strong> Alternate rest states and intense muscular intervals precisely with clear mechanical alarms.
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
