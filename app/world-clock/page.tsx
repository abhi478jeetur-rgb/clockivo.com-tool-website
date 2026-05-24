import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import AdContainer from "@/components/ad-container"
import Clock from "@/components/clock"
import QuickStats from "@/components/quick-stats"
import { Clock as ClockIcon, HelpCircle } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Free Online World Clock & Time Zone Checker | Clockivo",
  description: "Check current local time across cities and different time zones with our free online world clock. Compare times for meetings, remote work, and travel planning.",
  alternates: {
    canonical: "/world-clock",
  },
}

export default function WorldClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online World Clock",
        "operatingSystem": "Windows, macOS, Linux, iOS, Android, ChromeOS",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Check current local times and time zones worldwide with Clockivo. Coordinate international meetings and remote workflows.",
        "softwareVersion": "1.2.0",
        "isAccessibleForFree": true,
        "screenshot": "https://www.clockivo.com/clockivo-logo.png",
        "featureList": [
          "Check multiple world cities simultaneously",
          "High precision time synchronization via local Intl APIs",
          "Analog and digital timezone visual clock modules",
          "Automatic Daylight Saving Time adjustment updates",
          "Custom searchable cities dashboard interface"
        ],
        "browserRequirements": "Requires a modern browser with high-precision internationalization API (Intl) capabilities",
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
            "name": "World Clock",
            "item": "https://clockivo.com/world-clock"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "Can I use this world clock for remote team meetings?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, our online world clock for meetings is perfect for remote teams and distributed workers. You can keep this tab active on your desktop or laptop to align on time slots and coordinate schedules easily across different international offices."
            }
          },
          {
            "@type": "Question",
            "name": "Does the page show current local time in different cities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes! The tool displays the current local time by city based on coordinate locations. You can browse live city times directly in your browser with automated hours, minutes, and seconds."
            }
          },
          {
            "@type": "Question",
            "name": "Can I compare multiple cities at once?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can track several global cities simultaneously. Add, remove, or pin custom city locations on your personal browser world clock dashboard to check differences in one glance."
            }
          },
          {
            "@type": "Question",
            "name": "Why do time differences change during daylight saving time?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Some regions shift between standard winter time and daylight saving time (DST). Standard web clock tools adapt to these offsets automatically using built-in system parameters, causing relative time differences between cities to change seasonally."
            }
          },
          {
            "@type": "Question",
            "name": "Is this world clock useful for travel or scheduling?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Absolutely. Use it as an online timezone checker to plan future calls, schedule international tasks, or double-check local hours beforehand without downloading external applications."
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
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5 font-mono">
            <ClockIcon className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Free Online World Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed">
            Check current local times and coordinates instantly with our free online world clock. Perfect for remote teams, coordinators, and travelers, this tool helps you compare time zones across major cities quickly. Keep track of international boundaries directly in your browser without downloading any apps.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Clock defaultMode="digital" />
        </div>

        <QuickStats />

        <AdContainer size="leaderboard" className="mb-12" />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Check Time Zones Online?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To check international times on our **free online world clock**, type a city name in the search bar. The tool instantly displays the synchronized local hours, minutes, and daylight saving offsets of global locations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Key Technical Features
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Native API Integration:</strong> The clock uses the modern `Intl.DateTimeFormat` browser API. This guarantees 100% accurate time-zone conversions without relying on third-party server pings.</li>
                  <li><strong>Automated DST Adjustments:</strong> The tool automatically recalculates offsets when a region enters or exits Daylight Saving Time (DST).</li>
                  <li><strong>Multi-City Tracking:</strong> Add multiple global cities to your dashboard. All clocks synchronize in real-time seamlessly within the browser.</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary" /> Popular Uses
                </h3>
                <ul className="space-y-3 text-muted-foreground list-disc pl-5">
                  <li><strong>Remote Teams:</strong> Ensure your distributed workers are aligned. Check if a colleague in London or Tokyo is currently in working hours before sending a message.</li>
                  <li><strong>Travel Planning:</strong> Easily understand the time difference at your destination to manage jetlag and coordinate flights.</li>
                  <li><strong>Global Events:</strong> Accurately sync your calendar for international sports broadcasts, keynote presentations, or stock market openings.</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs mt-8">
            <h2 className="text-lg font-bold tracking-tight mb-4 text-foreground">
              Major Time Zone Reference Guide
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-bold text-foreground font-mono block mb-2 text-[11px] uppercase tracking-wider text-primary">Americas</span>
                <ul className="space-y-1.5">
                  <li className="flex justify-between"><span>New York</span> <span className="font-mono text-[10px]">EST/EDT</span></li>
                  <li className="flex justify-between"><span>Los Angeles</span> <span className="font-mono text-[10px]">PST/PDT</span></li>
                  <li className="flex justify-between"><span>Chicago</span> <span className="font-mono text-[10px]">CST/CDT</span></li>
                  <li className="flex justify-between"><span>Mexico City</span> <span className="font-mono text-[10px]">CST</span></li>
                  <li className="flex justify-between"><span>Toronto</span> <span className="font-mono text-[10px]">EST/EDT</span></li>
                  <li className="flex justify-between"><span>São Paulo</span> <span className="font-mono text-[10px]">BRT</span></li>
                  <li className="flex justify-between"><span>Buenos Aires</span> <span className="font-mono text-[10px]">ART</span></li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-foreground font-mono block mb-2 text-[11px] uppercase tracking-wider text-primary">Europe</span>
                <ul className="space-y-1.5">
                  <li className="flex justify-between"><span>London</span> <span className="font-mono text-[10px]">GMT/BST</span></li>
                  <li className="flex justify-between"><span>Paris</span> <span className="font-mono text-[10px]">CET/CEST</span></li>
                  <li className="flex justify-between"><span>Berlin</span> <span className="font-mono text-[10px]">CET/CEST</span></li>
                  <li className="flex justify-between"><span>Rome</span> <span className="font-mono text-[10px]">CET/CEST</span></li>
                  <li className="flex justify-between"><span>Moscow</span> <span className="font-mono text-[10px]">MSK</span></li>
                  <li className="flex justify-between"><span>Istanbul</span> <span className="font-mono text-[10px]">TRT</span></li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-foreground font-mono block mb-2 text-[11px] uppercase tracking-wider text-primary">Asia & Pacific</span>
                <ul className="space-y-1.5 flex flex-col justify-between">
                  <li className="flex justify-between"><span>Tokyo</span> <span className="font-mono text-[10px]">JST</span></li>
                  <li className="flex justify-between"><span>Mumbai</span> <span className="font-mono text-[10px]">IST</span></li>
                  <li className="flex justify-between"><span>Singapore</span> <span className="font-mono text-[10px]">SGT</span></li>
                  <li className="flex justify-between"><span>Shanghai</span> <span className="font-mono text-[10px]">CST</span></li>
                  <li className="flex justify-between"><span>Hong Kong</span> <span className="font-mono text-[10px]">HKT</span></li>
                  <li className="flex justify-between"><span>Sydney</span> <span className="font-mono text-[10px]">AEST/AEDT</span></li>
                  <li className="flex justify-between"><span>Seoul</span> <span className="font-mono text-[10px]">KST</span></li>
                  <li className="flex justify-between"><span>Bangkok</span> <span className="font-mono text-[10px]">ICT</span></li>
                  <li className="flex justify-between"><span>Auckland</span> <span className="font-mono text-[10px]">NZST/NZDT</span></li>
                </ul>
              </div>
              <div>
                <span className="font-bold text-foreground font-mono block mb-2 text-[11px] uppercase tracking-wider text-primary">Mid East & Africa</span>
                <ul className="space-y-1.5">
                  <li className="flex justify-between"><span>Dubai</span> <span className="font-mono text-[10px]">GST</span></li>
                  <li className="flex justify-between"><span>Riyadh</span> <span className="font-mono text-[10px]">AST</span></li>
                  <li className="flex justify-between"><span>Cairo</span> <span className="font-mono text-[10px]">EET</span></li>
                  <li className="flex justify-between"><span>Johannesburg</span> <span className="font-mono text-[10px]">SAST</span></li>
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
                Can I use this world clock for remote team meetings?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, our online world clock for meetings is perfect for remote teams and distributed workers. You can keep this tab active on your desktop or laptop to align on time slots and coordinate schedules easily across different international offices.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Does the page show current local time in different cities?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes! The tool displays the current local time by city based on coordinate locations. You can browse live city times directly in your browser with automated hours, minutes, and seconds.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Can I compare multiple cities at once?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Yes, you can track several global cities simultaneously. Add, remove, or pin custom city locations on your personal browser world clock dashboard to check differences in one glance.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Why do time differences change during daylight saving time?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Some regions shift between standard winter time and daylight saving time (DST). Standard web clock tools adapt to these offsets automatically using built-in system parameters, causing relative time differences between cities to change seasonally.
              </p>
            </div>

            <div className="bg-card/25 p-5 rounded-2xl border border-border/30">
              <h3 className="font-bold text-foreground text-sm sm:text-base mb-1.5">
                Is this world clock useful for travel or scheduling?
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Absolutely. Use it as an online timezone checker to plan future calls, schedule international tasks, or double-check local hours beforehand without downloading external applications.
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
                Track intervals and measure splits with our simple digital stopwatch.
              </p>
              <Link href="/stopwatch" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">
                Online Stopwatch &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

