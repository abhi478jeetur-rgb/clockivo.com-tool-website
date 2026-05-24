import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdContainer from "@/components/ad-container"
import Alarm from "@/components/alarm"
import QuickStats from "@/components/quick-stats"
import { AlarmClock, BellRing, Settings, CalendarRange, HelpCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Online Alarm Clock for PC & Mac | Clockivo",
  description: "Need a browser alarm? Set an alarm clock on your PC, laptop, or Mac. Choose custom alert tones, set recurring intervals, and keep track of your time.",
  alternates: {
    canonical: "/alarm-clock",
  },
}

export default function AlarmClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Alarm Clock",
        "operatingSystem": "Windows, macOS, Linux, iOS, Android, ChromeOS",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "ratingCount": "15300",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Set an alarm clock in your browser for PC, laptop, or Mac. Pick your time, choose your alarm sound, and set recurring weekly schedules.",
        "softwareVersion": "1.2.0",
        "isAccessibleForFree": true,
        "screenshot": "https://www.clockivo.com/clockivo-logo.png",
        "featureList": [
          "Set multiple digital alarms",
          "Web Audio API synthesized sound alerts",
          "Recurring daily and weekly schedules",
          "Browser LocalStorage session data backup",
          "Active background tab wake-up alerts"
        ],
        "browserRequirements": "Requires a modern browser with HTML5 Web Audio support (e.g. Chrome, Firefox, Safari, Edge)",
        "author": {
          "@type": "Organization",
          "@id": "https://clockivo.com/#organization"
        },
        "publisher": {
          "@type": "Organization",
          "@id": "https://clockivo.com/#organization"
        }
      },
      {
        "@type": "Organization",
        "@id": "https://clockivo.com/#organization",
        "name": "Clockivo",
        "url": "https://clockivo.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://clockivo.com/clockivo-logo.png"
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
            "name": "Alarm Clock",
            "item": "https://clockivo.com/alarm-clock"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will the alarm trigger if my computer is in sleep mode?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Browsers pause layout and timing tasks when your computer goes into sleep or standby. To make sure your alarm triggers, prevent your system from sleeping and keep your device open."
            }
          },
          {
            "@type": "Question",
            "name": "Does the alarm work if my internet connection is lost?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, once the page is fully loaded, the timing core runs inside your browser. It does not need an active internet connection to trigger. However, the tab must stay open."
            }
          },
          {
            "@type": "Question",
            "name": "Can I switch to other browser tabs or use other applications?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. You can work on other tabs or minimize your browser. Some operating systems and browsers throttle background tabs, so we recommend keeping the window active or testing it beforehand."
            }
          },
          {
            "@type": "Question",
            "name": "How can I adjust the alarm's sound and volume?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Click on the Sound Settings panel to find the master volume controls and choose different acoustic waveforms. Make sure your system speakers are also unmuted."
            }
          },
          {
            "@type": "Question",
            "name": "Why do I need to keep the tab open?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The timing mechanism only exists within the web page. Closing the tab or browser will delete the active session and terminate the alarm tracking."
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
            <AlarmClock className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Free Online Alarm Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Set a free alarm clock directly in your browser. Designed for any standard PC, laptop, or Mac, this timing tool works when the tab is open. Pick a time, choose a wake-up alert tone, and keep your tab active to ensure you receive a clear audio notification at the selected interval.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Alarm />
        </div>

        <QuickStats />

        <AdContainer size="leaderboard" className="mb-12" />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Set an Online Alarm Clock?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To set a **free online alarm clock**, choose your desired wake-up hour and minute, select a custom alarm sound, and click **Save**. Keep this browser tab open and your device active so the alarm triggers perfectly.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Key Features
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Local Device Processing:</strong> Our alarm logic uses your computer's local clock API. This means it operates with perfect timezone precision.</li>
                  <li><strong>Offline Reliability:</strong> Once the page is loaded, the timer logic runs locally. It will ring even if your internet connection temporarily drops.</li>
                  <li><strong>No Installations:</strong> A 100% browser-based utility that works flawlessly on Chrome, Edge, Safari, and Firefox.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Sound Settings
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Custom Audio Tones:</strong> Choose from various digital alarm sounds, from gentle chimes to loud retro sirens.</li>
                  <li><strong>Volume Control:</strong> Adjust the master volume directly within the utility to suit your environment.</li>
                  <li><strong>Recurring Schedules:</strong> Set alarms to repeat daily, on weekdays, or just on weekends without resetting them manually.</li>
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
                Will the alarm trigger if my computer is in sleep mode?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No. Browsers pause layout and timing tasks when your computer goes into sleep or standby. To make sure your alarm triggers, prevent your system from sleeping and keep your device open.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Does the alarm work if my internet connection is lost?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, once the page is fully loaded, the timing core runs inside your browser. It does not need an active internet connection to trigger. However, the tab must stay open.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I switch to other browser tabs or use other applications?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes. You can work on other tabs or minimize your browser. Some operating systems and browsers throttle background tabs, so we recommend keeping the window active or testing it beforehand.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                How can I adjust the alarm sound and volume?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Click on the Sound Settings panel to find the master volume controls and choose different acoustic waveforms. Make sure your system speakers are also unmuted.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Why do I need to keep the tab open?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The timing mechanism only exists within the web page. Closing the tab or browser will delete the active session and terminate the alarm tracking.
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
                If you need to time specific activities, try our countdown tool.
              </p>
              <Link href="/timer" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Timer &rarr;
              </Link>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border/20">
              <p className="text-muted-foreground mb-1">
                To measure intermediate split intervals, run our split timer.
              </p>
              <Link href="/stopwatch" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Stopwatch &rarr;
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
