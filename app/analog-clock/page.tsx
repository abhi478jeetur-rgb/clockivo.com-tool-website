import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Clock from "@/components/clock"
import QuickStats from "@/components/quick-stats"
import { Clock as ClockIcon, Disc, Compass, Layers } from "lucide-react"

export const metadata: Metadata = {
  title: "Online Analog Clock - Fullscreen Symmetrical Sweep Dial",
  description: "View an elegant, highly polished online analog clock with beautiful fluid sweeps of the second hand. Highly accurate, customizable layout with zero lag.",
  alternates: {
    canonical: "/analog-clock",
  },
}

export default function AnalogClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Analog Clock",
        "operatingSystem": "Windows, macOS, Linux, iOS, Android, ChromeOS",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "View an elegant, synchronized online analog clock with traditional second, minute, and hour hands. Clean, fluid, retro and fullscreen design with optional chime noises.",
        "softwareVersion": "1.2.0",
        "isAccessibleForFree": true,
        "screenshot": "https://www.clockivo.com/clockivo-logo.png",
        "featureList": [
          "Traditional analog clock face ticking with fluid sweep second hands",
          "Vector-based SVG smooth UI dial display with zero lag",
          "Fullscreen theater mode layout with dark ambient background styles",
          "Intl API timezone alignment with system offsets",
          "Optional system sound bells or chime alerts"
        ],
        "browserRequirements": "Requires a modern browser with SVG vector support and high-performance requestAnimationFrame capabilities",
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
            "name": "Analog Clock",
            "item": "https://clockivo.com/analog-clock"
          }
        ]
      }
    ]
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
            <ClockIcon className="w-4 h-4" /> Clockivo Utility Tool
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Online Analog Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            A beautiful, traditional dial clock ticking with smooth, browser-rendered vector animations. Experience classical design integrated with multi-timezone sync, dark background modes, and full screen support.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Clock defaultMode="analog" />
        </div>

        <QuickStats />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 text-foreground pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Read the Online Analog Clock?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To read our **online analog clock**, open this browser page. It displays classic hour, minute, and sweeping second hands using sharp vector dials, fully synchronized with your device&apos;s system timezone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Disc className="w-5 h-5 text-primary" /> Traditional Graphic Dial
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Our dial references classical wristwatch proportions, drawing clean numeric indices with sub-second markers, an active red second sweep, and robust hour/minute indicators that update perfectly according to state cycles.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Crafted fully in vector HTML (SVG), it renders perfectly sharp on high-definition Retina screens and large public-facing monitors.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary" /> Multi-Timezone Calibration
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Keep tabs on global deadlines. In addition to local dial renderings, you can review live digital offsets spanning major financial capitals such as Tokyo, London, and New York right in the bottom panel.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Both systems auto-adjust as diurnal daylight-saving shifts occur in their respective systems.
              </p>
            </div>

            <div className="md:col-span-2 border-t pt-6 mt-4">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" /> Continuous Sync Design
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We connect Clockivo directly to your operating system&apos;s internal hardware timers. High-performance requestAnimationFrame callbacks ensure coordinate mathematics execute without causing noticeable thread stutter, keeping memory consumption extremely optimized for passive browser tabs.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
