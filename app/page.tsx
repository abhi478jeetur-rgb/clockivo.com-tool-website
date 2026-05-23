import type { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import HomeDashboard from "@/components/home-dashboard"
import Link from "next/link"
import { AlarmClock, Timer as TimerIcon, Hourglass, Clock as ClockIcon, Shield, Smartphone, Zap, HelpCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Free Online Time Tools & Utilities - Alarm, Timer & Clocks | Clockivo",
  description: "Explore Clockivo's collection of free browser-based time tools. Access our reliable online alarm clock, countdown timers, stopwatches, and world clocks instantly.",
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Time Tools Suite",
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Access all your essential time-management tools online. Setup customizable alarms, countdown timers, high-precision lap stopwatches, and live world clocks instantly.",
        "softwareVersion": "1.0",
        "browserRequirements": "Requires a modern browser with HTML5 and LocalStorage support",
        "author": {
          "@type": "Organization",
          "name": "Clockivo",
          "url": "https://clockivo.com"
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will these online time tools work if my browser is closed?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Because Clockivo runs purely in your web browser, all active timers, stopwatch counts, and sound alarms operate within the active tab memory. If you close the browser window or turn off your device, the actions will stop immediately."
            }
          },
          {
            "@type": "Question",
            "name": "Can I run multiple countdown timers or stopwatches simultaneously?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! You can run multiple instances of our time tools by opening distinct pages in separate browser tabs. For example, you can have a tab for tracking a workout stopwatch while running a study block timer in another."
            }
          },
          {
            "@type": "Question",
            "name": "Do Clockivo's utilities require downloading an app?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Not at all. Clockivo is completely browser-based and works on any PC, laptop, Mac, or Chromebook without installation, plugin registration, or software downloads."
            }
          },
          {
            "@type": "Question",
            "name": "Is my personal data safe when using these tools?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, your absolute privacy is preserved. All your alarm configurations, countdown timers, stopwatch splits, and local history logs are stored purely inside your own browser's LocalStorage. No data is sent to external cloud servers."
            }
          },
          {
            "@type": "Question",
            "name": "Do these browser time tools work on mobile and Chromebooks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Our tool layout is fully hand-crafted to be adaptive and mobile-responsive. They function seamlessly across desktop computers, tablets, mobile browsers, and Chromebook environments."
            }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Clockivo Time Suite",
            "item": "https://clockivo.com"
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

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 flex flex-col items-center">
        {/* Hub Header Content */}
        <div className="mb-8 mt-1 text-center flex flex-col items-center gap-2">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5 font-mono">
            <ClockIcon className="w-4 h-4" /> Clockivo Web Suite
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Free Online Time Tools & Utilities
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-2xl leading-relaxed">
            Configure alarms, intervals, and split laps instantly using our free, browser-based clock utilities. Coordinate your routine, optimize your productivity workflow, and manage time zones without installing software.
          </p>
        </div>

        {/* Live Interactive Dashboard Panel */}
        <div className="w-full mb-12">
          <HomeDashboard />
        </div>

        {/* SEO On-Page Category Content Structure */}
        <section className="w-full border-t border-border/30 pt-10 mt-6 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          
          {/* Section 1: Productivity Tools */}
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                <Hourglass className="w-5 h-5 text-primary" /> Productivity Tools
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Track study sprints, presentation times, or exercise intervals with high precision. Use our free tool range to structure tasks, improve focus, and review cumulative histories locally. Check out our dedicated utilities:
              </p>
            </div>
            <div className="space-y-2 mt-2">
              <Link href="/timer" className="block text-sm font-semibold text-primary hover:underline">
                Use our Free Online Timer &rarr;
              </Link>
              <Link href="/stopwatch" className="block text-sm font-semibold text-primary hover:underline">
                Open Online Stopwatch & Lap Tracker &rarr;
              </Link>
            </div>
          </div>

          {/* Section 2: Reminders & Alarms */}
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                <AlarmClock className="w-5 h-5 text-primary" /> Reminders & Alarms
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Set wake-up calls or critical alerts directly inside your web browser. Customize acoustic alert types using custom synthesizers and easily manage alarm loops. Try our alarms below:
              </p>
            </div>
            <div className="mt-2">
              <Link href="/alarm-clock" className="block text-sm font-semibold text-primary hover:underline">
                Open Online Alarm Clock &rarr;
              </Link>
            </div>
          </div>

          {/* Section 3: Global & Display Clocks */}
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
                <ClockIcon className="w-5 h-5 text-primary" /> Global & Display Clocks
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Align schedules across distant cities, coordinate remote team meetings easily, and view custom clock variants. Explore world clocks, analog, and digital dashboard display tools:
              </p>
            </div>
            <div className="space-y-2 mt-2">
              <Link href="/world-clock" className="block text-sm font-semibold text-primary hover:underline">
                Check Time Zones with World Clock &rarr;
              </Link>
              <div className="flex gap-4 text-xs font-medium text-muted-foreground">
                <Link href="/digital-clock" className="hover:text-primary hover:underline">Digital Clock Page</Link>
                <span>|</span>
                <Link href="/analog-clock" className="hover:text-primary hover:underline">Analog Clock Page</Link>
              </div>
            </div>
          </div>

          {/* Section 4: Why Use Clockivo's Browser Utilities? */}
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-3 flex items-center gap-2 text-foreground">
              <Zap className="w-5 h-5 text-primary" /> Why Use Clockivo&apos;s Browser Utilities?
            </h2>
            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
              <div className="flex items-start gap-2.5">
                <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p><strong>100% Privacy First:</strong> Complete local operations keep your settings, focus cycles, and alarm alerts sealed within your computer browser without external cloud storage dependencies.</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Smartphone className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <p><strong>Universal Device Sync:</strong> Runs on Chromebooks, PCs, laptops, and mobile screens instantly, scaling seamlessly to full screen view modes.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Visible HTML FAQ */}
        <section className="w-full border-t border-border/30 pt-10 pb-12">
          <h2 className="text-2xl font-extrabold tracking-tight mb-6 flex items-center gap-2 text-foreground">
            <HelpCircle className="w-6 h-6 text-primary" /> Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Will these online time tools work if my browser is closed?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No. Because Clockivo runs purely in your web browser, all active timers, stopwatch counts, and sound alarms operate within the active tab memory. If you close the browser window or turn off your device, the actions will stop immediately.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I run multiple countdown timers or stopwatches simultaneously?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! You can run multiple instances of our time tools by opening distinct pages in separate browser tabs. For example, you can have a tab for tracking a workout stopwatch while running a study block timer in another.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Do Clockivo&apos;s utilities require downloading an app?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Not at all. Clockivo is completely browser-based and works on any PC, laptop, Mac, or Chromebook without installation, plugin registration, or software downloads.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Is my personal data safe when using these tools?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, your absolute privacy is preserved. All your alarm configurations, countdown timers, stopwatch splits, and local history logs are stored purely inside your own browser&apos;s LocalStorage. No data is sent to external cloud servers.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Do these browser time tools work on mobile and Chromebooks?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes. Our tool layout is fully hand-crafted to be adaptive and mobile-responsive. They function seamlessly across desktop computers, tablets, mobile browsers, and Chromebook environments.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
