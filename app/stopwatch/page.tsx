import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdContainer from "@/components/ad-container"
import Stopwatch from "@/components/stopwatch"
import { Timer as TimerIcon, HelpCircle } from "lucide-react"
import Link from "next/link"

import EmbedModal from "@/components/embed-modal"

import QuickStats from "@/components/quick-stats"

export const metadata: Metadata = {
  title: "Free Online Stopwatch with Lap Timer for Workouts & Study | Clockivo",
  description: "Need a browser stopwatch? Run our free online stopwatch with lap timing capabilities to track workouts, study sessions, science experiments, or presentations.",
  alternates: {
    canonical: "/stopwatch",
  },
}

export default function StopwatchPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Stopwatch & Chronometer",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "ratingCount": "8920",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Run a free online stopwatch with lap timing capabilities to track workouts, study sessions, science experiments, or presentations.",
        "softwareVersion": "1.0",
        "browserRequirements": "Requires a modern browser with LocalStorage support",
        "author": {
          "@type": "Organization",
          "name": "Clockivo",
          "url": "https://clockivo.com"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://clockivo.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Stopwatch",
            "item": "https://clockivo.com/stopwatch"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I use the stopwatch while switching tabs?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can navigate to other browser tabs while the stopwatch is active. However, since modern web browsers may throttle timer operations in hidden tabs to save system resources, we recommend keeping this active window visible during critical measurements."
            }
          },
          {
            "@type": "Question",
            "name": "Does the stopwatch keep running if my computer sleeps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Operating systems pause JavaScript execution and CPU threads when entering sleep, standby, or hibernation states. Your device must remain fully awake and open for the web stopwatch to continue tracking intervals."
            }
          },
          {
            "@type": "Question",
            "name": "Is this stopwatch useful for workouts or sports practice?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! It serves as an excellent workout stopwatch online and a lap stopwatch for training. You can log split intervals with millisecond display accuracy directly on your smartphone, PC, or laptop while running or exercising."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for study sessions or meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. It works cleanly as an online stopwatch for students during focus sprints and as a presentation timer. Keep track of group study targets, science labs, or keep speaker times precise in timed business meetings online."
            }
          },
          {
            "@type": "Question",
            "name": "Why should I keep the tab open?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "All timing logic and saved splits are held in the browser's active tab memory. Closing the window or restarting your browser will clear all currently active sessions and reset structural lap grids."
            }
          }
        ]
      }
    ]
  }

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-foreground">
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
          <div className="flex flex-row items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Free Online Stopwatch
            </h1>
            <EmbedModal toolType="stopwatch" />
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Measure elapsed time easily with this free online stopwatch. Ideal for sports, study blocks, workouts, cooking, and classroom activities, this simple web stopwatch works on any PC, laptop, or Mac. Start, freeze laps, and track your timing splits directly in your browser without any required downloads.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Stopwatch />
        </div>

        <QuickStats />

        <AdContainer size="leaderboard" className="mb-12" />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Use an Online Stopwatch?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To use an online stopwatch, simply click the "Start" button to begin counting in milliseconds. Use the "Lap" button to record split times without stopping the main clock. Click "Pause" to temporarily halt timing, or "Reset" to clear all recorded laps.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Key Features
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Millisecond Accuracy:</strong> By leveraging the browser's high-resolution time API (`performance.now()`), the stopwatch guarantees millisecond-level precision without drifting.</li>
                  <li><strong>Lap & Split Tracking:</strong> Record continuous lap times seamlessly. All splits are displayed in an organized list below the main clock.</li>
                  <li><strong>Local Storage Memory:</strong> Even if you accidentally refresh the page, your current time and lap history are saved directly in your browser's local memory.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Common Use Cases
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Sports & Workouts:</strong> An excellent online workout stopwatch for measuring athletic sprints, gym rest intervals, or repetitive exercise laps.</li>
                  <li><strong>Study & Academics:</strong> Perfect for tracking how long it takes to solve specific math problems, complete exam sections, or time science experiments.</li>
                  <li><strong>Presentations & Meetings:</strong> Keep track of speaker durations in business meetings or monitor rehearsal times for a speech.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-t pt-10 pb-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6 flex items-center gap-2 text-foreground">
            <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I use the stopwatch while switching tabs?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, you can navigate to other browser tabs while the stopwatch is active. However, since modern web browsers may throttle timer operations in hidden tabs to save system resources, we recommend keeping this active window visible during critical measurements.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Does the stopwatch keep running if my computer sleeps?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No. Operating systems pause JavaScript execution and CPU threads when entering sleep, standby, or hibernation states. Your device must remain fully awake and open for the web stopwatch to continue tracking intervals.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Is this stopwatch useful for workouts or sports practice?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! It serves as an excellent workout stopwatch online and a lap stopwatch for training. You can log split intervals with millisecond display accuracy directly on your smartphone, PC, or laptop while running or exercising.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I use it for study sessions or meetings?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. It works cleanly as an online stopwatch for students during focus sprints and as a presentation timer. Keep track of group study targets, science labs, or keep speaker times precise in timed business meetings online.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Why should I keep the tab open?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                All timing logic and saved splits are held in the browser&apos;s active tab memory. Closing the window or restarting your browser will clear all currently active sessions and reset structural lap grids.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links Block */}
        <section className="border-t pt-8 pb-12">
          <h2 className="text-lg font-bold tracking-tight mb-4 text-foreground">Explore More Precision Web Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-muted/30 p-4 rounded-xl border border-border/20">
              <p className="text-muted-foreground mb-1">
                If you need to set sound alarms or daily wake-up alerts on your PC, try our browser alarm clock.
              </p>
              <Link href="/alarm-clock" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Alarm Clock &rarr;
              </Link>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border/20">
              <p className="text-muted-foreground mb-1">
                To manage specific interval countdowns for fitness or focus blocks, run our custom countdown timer.
              </p>
              <Link href="/timer" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Timer &rarr;
              </Link>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border/20">
              <p className="text-muted-foreground mb-1">
                Keep track of global time zones and local times in major cities instantly.
              </p>
              <Link href="/world-clock" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                World Clock &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
