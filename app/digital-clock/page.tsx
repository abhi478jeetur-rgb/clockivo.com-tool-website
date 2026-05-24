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
    "@type": "SoftwareApplication",
    "name": "Clockivo Online Digital Clock",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "View an accurate online digital clock displaying seconds, hours, and live date updates. Features fullscreen theater layout, adjustable night colors, and hourly chime warnings.",
    "softwareVersion": "1.0",
    "browserRequirements": "Requires a modern browser with SVG and LocalStorage support",
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
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Tv className="w-5 h-5 text-primary" /> Fullscreen Display Mode
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Turn any device into an elegant bedside table clock or static wall display. Tap the <strong>Maximize</strong> icon in the corner to trigger full-screen rendering. The layout auto-scales to deliver beautiful visual readability even from across large rooms.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              This layout is perfectly responsive on smartphones, tablets, Chromebooks, and smart TVs.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Moon className="w-5 h-5 text-primary" /> Night Glow Presets
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Avoid sleep cycle disruptions. While in full screen, select specialized ambient colors like <em>Deep Red</em> for warm sleep environments, <em>Sunset Amber</em>, or <em>Muted Green</em>.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              These monochromatic profiles emit minimum high-frequency blue rays, keeping your bedroom dark and peaceful.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" /> Multi-Format Synchronization
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Set your preferred readability standard. Clockivo offers multiple formatting presets, including full readable weekdays (e.g. Wednesday, October 15th), standard European numeric sequences (DD/MM/YYYY), or classic US paths (MM/DD/YYYY). All offsets are evaluated from your browser&apos;s internal system timezone automatically.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
