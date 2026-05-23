import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Stopwatch from "@/components/stopwatch"
import { Timer as TimerIcon, Trophy, Zap, RefreshCw } from "lucide-react"

export const metadata: Metadata = {
  title: "Online Stopwatch - Free Laptop Split Chronometer",
  description: "Track split intervals, log multiple lap sessions, and calculate speeds with millisecond hardware accuracy. High performance, zero delay, offline capable.",
  alternates: {
    canonical: "/stopwatch",
  },
}

export default function StopwatchPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Clockivo Online Stopwatch & Chronometer",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Track splits, record laps, and log complete stopwatch sessions with millisecond accuracy. Clean, fast, mobile-friendly browser chronometer with local storage backups.",
    "softwareVersion": "1.0",
    "browserRequirements": "Requires a modern browser with high-frequency requestAnimationFrame capabilities and LocalStorage support",
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
            <TimerIcon className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Online Stopwatch & Chronometer
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            Record precise lap splits with high-performance millisecond timing. Features clear tabular displays, visual delta calculations, and persistent session backups.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Stopwatch />
        </div>

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Millisecond Timing Accuracy
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Clockivo computes elapsed duration relative to high-resolution system timestamps, ensuring that background tab throttling or CPU sleep states do not drift your tracked records.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you are timing sprints, scientific tests, or speedruns, you can trust our browser-focused chronometer to capture time steps up to 1/100th of a second.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" /> Split & Lap Management
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Hit the <strong>Lap</strong> button while timing to instantly freeze and log a milestone split. Our analyzer calculates structural delta indicators, highlighting the difference between subsequent ticks.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your lap sheets are displayed in a clean, scrollable window so you can quickly compare iterations side-by-side.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <RefreshCw className="w-5 h-5 text-primary" /> Zero Loss Persistent Storage
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Accidentally closed your browser? When you hit reset, our system compiles your complete speed duration logs directly into your browser&apos;s LocalStorage. This means your previous high-performance session times remain retrievable inside the <strong>Session History</strong> module the moment you reload.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
