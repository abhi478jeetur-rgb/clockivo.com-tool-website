import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Clock from "@/components/clock"
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
        "operatingSystem": "All",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "Check current local times and time zones worldwide with Clockivo. Coordinate international meetings and remote workflows.",
        "softwareVersion": "1.0",
        "browserRequirements": "Requires a modern browser with high-precision internationalization API (Intl) capabilities",
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

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 pb-12">
          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs md:col-span-2">
            <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" /> How to Check Time in Different Cities
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To check time zones online, type a location in the search bar or select from our lists of major world cities. The browser world clock for remote teams instantly loads active cards representing current local time by city, keeping offset differences clear so you can view multiple regions at once.
            </p>
            <div className="mt-5 pt-5 border-t border-border/20 grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs text-muted-foreground">
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

          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" /> Useful for Remote Work, Meetings, and Travel Planning
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Coordination becomes simple with an online world clock for meetings. Remote workers, online trainers, and educators can align clocks across time zone transitions smoothly. It serves as a live timezone tracker for global corporations to schedule tasks and compare time zones online.
            </p>
          </div>

          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs">
            <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" /> World Clock Features That Help You Compare Time Zones
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clockivo offers a high-precision digital world clock in browser that fits neatly on Chromebooks, PCs, and laptops. You can toggle analog views, track local coordinate offsets relative to UTC, and maintain list sequences easily. There is no external software requirement.
            </p>
          </div>

          <div className="bg-card/40 p-5 rounded-2xl border border-border/30 shadow-xs md:col-span-2">
            <h2 className="text-lg font-bold tracking-tight mb-2.5 flex items-center gap-2 text-foreground">
              <span className="w-2 h-2 rounded-full bg-primary" /> Important Notes About Time Zones and Daylight Saving Time
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Please note that seasonal daylight saving changes can temporarily alter your local city offset distances. Our tool parses regional browser localization settings recursively. Check standard guidelines when scheduling key events around transition dates if regional parameters shift.
            </p>
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

