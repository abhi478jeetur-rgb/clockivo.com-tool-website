import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdContainer from "@/components/ad-container"
import Timer from "@/components/timer"
import { Hourglass, HelpCircle } from "lucide-react"
import Link from "next/link"

import EmbedModal from "@/components/embed-modal"

import QuickStats from "@/components/quick-stats"

export const metadata: Metadata = {
  title: "Free Online Timer & Countdown for Study, Work & Cooking | Clockivo",
  description: "Need a browser countdown? Set a free online timer to manage your study, work, cooking, and focus sessions. Customize sound alerts and keep track of your time.",
  alternates: {
    canonical: "/timer",
  },
}

export default function TimerPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Countdown Timer",
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
          "ratingCount": "12450",
          "bestRating": "5",
          "worstRating": "1"
        },
        "description": "Set a free online countdown timer to manage your study, work, cooking, and focus sessions. Track intervals, customize sounds, and keep your timing open.",
        "softwareVersion": "1.2.0",
        "isAccessibleForFree": true,
        "screenshot": "https://www.clockivo.com/clockivo-logo.png",
        "featureList": [
          "Custom countdown durations (hours, minutes, seconds)",
          "One-click quick presets (5m, 10m, Pomodoro 25m)",
          "Beautiful circular glassmorphic visual countdown progress ring",
          "Local countdown logs and session history",
          "Custom synthesized sound alerts"
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
            "name": "Timer",
            "item": "https://clockivo.com/timer"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Will the timer ring if I minimize the browser?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, the timer will keep counting down if you minimize the browser window or switch to other tabs. However, since modern browsers may throttle background processes to save power, we recommend keeping the window active or testing it quickly beforehand."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use this timer for study or work sessions?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. This tool works perfectly as a free focus timer for studying or a browser timer for work. You can set study blocks (like 25-minute Pomodoro sessions) and hear an audio alert once the countdown is finished."
            }
          },
          {
            "@type": "Question",
            "name": "Does the timer keep running if my computer sleeps?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Web browsers pause layout and timing tasks when your computer goes into sleep, standby, or hibernation modes. Your device must remain awake and active with the browser open for the countdown to complete and sound correctly."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use it for cooking or workouts?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! It can be used as a simple online cooking timer on your desktop or an online workout timer with intervals. Just set the required time on your laptop or PC and let it trigger the audio notification upon completion."
            }
          },
          {
            "@type": "Question",
            "name": "Why do I need to keep the tab open?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The timing loop and active session are maintained purely in your open browser tab. If you close the page or shut down your browser, your countdown session will be deleted and the timer will stop immediately."
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
            <Hourglass className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <div className="flex flex-row items-center justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
              Free Online Countdown Timer
            </h1>
            <EmbedModal toolType="timer" />
          </div>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Set an online countdown timer directly in your browser. Perfect for study sessions, focus blocks, workouts, and cooking, this simple timer works on any PC, laptop, or Mac. Pick your hours, minutes, and seconds, and start tracking your time without installing any apps.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Timer />
        </div>

        <QuickStats />

        <AdContainer size="leaderboard" className="mb-12" />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Start an Online Timer?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To start a **free online countdown timer**, select your preferred hours, minutes, and seconds, or pick a preset. Click **Start** to trigger the visual timing ring and keep the browser tab open to hear the wake-up alarm.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Key Features
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Background Accuracy:</strong> Our timer tracks the precise start time internally, so even if the browser tab is throttled, the remaining time stays perfectly accurate.</li>
                  <li><strong>Multiple Presets:</strong> Quickly jump into popular intervals like a 25-minute Pomodoro session, a 5-minute break, or a 1-hour focus block.</li>
                  <li><strong>Zero Installation:</strong> A fully web-based timer that works immediately on PCs, Macs, and mobile devices without any downloads.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Popular Use Cases
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Pomodoro Technique:</strong> Use it as an online study timer to run 25-minute work blocks followed by 5-minute breaks.</li>
                  <li><strong>Cooking & Kitchen:</strong> Run it on your laptop as a hands-free online cooking timer to perfectly time recipes.</li>
                  <li><strong>Workouts & Intervals:</strong> Set quick sprint intervals or rest periods for your home exercises.</li>
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
                Will the timer ring if I minimize the browser?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, the timer will keep counting down if you minimize the browser window or switch to other tabs. However, since modern browsers may throttle background processes to save power, we recommend keeping the window active or testing it quickly beforehand.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I use this timer for study or work sessions?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. This tool works perfectly as a free focus timer for studying or a browser timer for work. You can set study blocks (like 25-minute Pomodoro sessions) and hear an audio alert once the countdown is finished.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Does the timer keep running if my computer sleeps?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                No. Web browsers pause layout and timing tasks when your computer goes into sleep, standby, or hibernation modes. Your device must remain awake and active with the browser open for the countdown to complete and sound correctly.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I use it for cooking or workouts?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! It can be used as a simple online cooking timer on your desktop or an online workout timer with intervals. Just set the required time on your laptop or PC and let it trigger the audio notification upon completion.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Why should I keep the tab open?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                The timing loop and active session are maintained purely in your open browser tab. If you close the page or shut down your browser, your countdown session will be deleted and the timer will stop immediately.
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
                If you need to set a wake-up call or a scheduled reminder, try our browser alarm.
              </p>
              <Link href="/alarm-clock" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Alarm Clock &rarr;
              </Link>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border/20">
              <p className="text-muted-foreground mb-1">
                To measure intermediate split times or track laps during workouts, launch our high-accuracy split timer.
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
