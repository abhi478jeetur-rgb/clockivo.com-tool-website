import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Clock from "@/components/clock"
import QuickStats from "@/components/quick-stats"
import { Clock as ClockIcon, Tv, Moon, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Online Digital Clock - Fullscreen Theatre Time Display",
  description: "View an accurate, eye-friendly online digital clock with seconds, customizable night themes (green, red, amber), hourly notifications, and fullscreen functionality.",
  alternates: {
    canonical: "/digital-clock",
  },
}

export default function DigitalClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "name": "Clockivo Online Digital Clock",
        "operatingSystem": "Windows, macOS, Linux, iOS, Android, ChromeOS",
        "applicationCategory": "UtilitiesApplication",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "description": "View an accurate online digital clock displaying seconds, hours, and live date updates. Features fullscreen theater layout, adjustable night colors, and hourly chime warnings.",
        "softwareVersion": "1.2.0",
        "isAccessibleForFree": true,
        "screenshot": "https://www.clockivo.com/clockivo-logo.png",
        "featureList": [
          "Accurate digital clock display with optional seconds",
          "Fullscreen theater mode for wall or bedside displays",
          "Eye-friendly neon color profiles (Red, Amber, Green) for night use",
          "Intl API driven automatic timezone sync",
          "Configurable hourly notification chime alarms"
        ],
        "browserRequirements": "Requires a modern browser with SVG and LocalStorage support",
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
            "name": "Digital Clock",
            "item": "https://clockivo.com/digital-clock"
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
            Online Digital Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            Monitor the exact, synchronized global time in beautiful monospace format. Features custom date layouts, fullscreen mode, eye-friendly neon night colors, and configurable hourly notification beats.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Clock defaultMode="digital" />
        </div>

        <QuickStats />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 text-foreground pb-12">
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-4 text-foreground">
              How to Use the Online Digital Clock?
            </h2>
            {/* Direct Answer for AI Overviews */}
            <p className="text-lg leading-relaxed font-medium bg-muted/30 p-5 rounded-2xl border border-border/50 shadow-sm mb-6">
              To read our **online digital clock**, keep this browser window open. It renders precise system time with seconds, supports neon sleep glow styles (red, amber, green), and displays a clear fullscreen theater layout.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Tv className="w-5 h-5 text-primary" /> Fullscreen Display Mode
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Turn any device into an elegant bedside table clock or static wall display. Tap the <strong>Maximize</strong> icon in the corner to trigger full-screen rendering. The layout auto-scales to deliver beautiful visual readability even from across large rooms.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This layout is perfectly responsive on smartphones, tablets, Chromebooks, and smart TVs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <Moon className="w-5 h-5 text-primary" /> Night Glow Presets
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Avoid sleep cycle disruptions. While in full screen, select specialized ambient colors like <em>Deep Red</em> for warm sleep environments, <em>Sunset Amber</em>, or <em>Muted Green</em>.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These monochromatic profiles emit minimum high-frequency blue rays, keeping your bedroom dark and peaceful.
              </p>
            </div>

            <div className="md:col-span-2 border-t pt-6 mt-4">
              <h3 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> Multi-Format Time Synchronization
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Set your preferred readability standard. Clockivo offers multiple formatting presets, including full readable weekdays (e.g. Wednesday, October 15th), standard European numeric sequences (DD/MM/YYYY), or classic US paths (MM/DD/YYYY). All offsets are evaluated from your browser&apos;s internal system timezone automatically.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
