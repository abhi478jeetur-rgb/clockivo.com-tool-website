import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Clock from "@/components/clock"
import { Clock as ClockIcon, Globe, MapPin, Compass } from "lucide-react"

export const metadata: Metadata = {
  title: "Online World Clock - Live Local Times & Worldwide Time Zones",
  description: "Check the exact local time and date in cities and different timezones worldwide. Monitor offsets from Tokyo, London, and New York with automated daylight-saving updates.",
  alternates: {
    canonical: "/world-clock",
  },
}

export default function WorldClockPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Clockivo Online World Clock",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Check the exact local time and date in cities and different timezones worldwide. Monitor offsets from Tokyo, London, and New York with automated daylight-saving updates.",
    "softwareVersion": "1.0",
    "browserRequirements": "Requires a modern browser with high-precision internationalization API (Intl) capabilities",
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
            Online World Clock
          </h1>
          <p className="text-muted-foreground text-base max-w-2.5xl leading-relaxed">
            Monitor synchronized international times from our clean, global dashboard. Track multiple timezone zones simultaneously without registration or bloated browser extensions.
          </p>
        </div>

        {/* The Actual Tool */}
        <div className="mb-12">
          <Clock defaultMode="digital" />
        </div>

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" /> Global Time Synchronization
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Modern remote cooperation and server operations require strict temporal alignment. Clockivo provides immediate live clocks across principal coordinate benchmarks, enabling synchronized project calls and operational workflows.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We leverage built-in high-precision localization tables to render exact hour indices across disparate meridians instantly.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" /> Key Financial Hubs
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Keep international deadlines within perspective. Clockivo tracks and formats times for:
            </p>
            <ul className="list-disc pl-5 text-sm text-muted-foreground flex flex-col gap-2 leading-relaxed">
              <li><strong>New York (EST/EDT)</strong> - Track US Wall Street hours.</li>
              <li><strong>London (GMT/BST)</strong> - Crucial coordinate transition boundary for transcontinental operations.</li>
              <li><strong>Tokyo (JST)</strong> - Major Eastern Asian financial and industrial epicenter.</li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" /> Dynamic Daylight-Saving Adjustments
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Clockivo computes localized timezone rules recursively, protecting user records against calendar calculation mistakes during spring/autumn changes. When cities shift between standard times and active daylight offsets, our widget&apos;s display panels adapt instantly, ensuring high timing safety.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
