import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Clock from "@/components/clock"
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
    "@type": "SoftwareApplication",
    "name": "Clockivo Online Analog Clock",
    "operatingSystem": "All",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "View an elegant, synchronized online analog clock with traditional second, minute, and hour hands. Clean, fluid, retro and fullscreen design with optional chime noises.",
    "softwareVersion": "1.0",
    "browserRequirements": "Requires a modern browser with SVG vector support and high-performance requestAnimationFrame capabilities",
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

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-foreground pb-12">
          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Disc className="w-5 h-5 text-primary" /> Traditional Graphic Dial
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our dial references classical wristwatch proportions, drawing clean numeric indices with sub-second markers, an active red second sweep, and robust hour/minute indicators that update perfectly according to state cycles.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Crafted fully in vector HTML (SVG), it renders perfectly sharp on high-definition Retina screens and large public-facing monitors.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Compass className="w-5 h-5 text-primary" /> Multi-Timezone Calibration
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Keep tabs on global deadlines. In addition to local dial renderings, you can review live digital offsets spanning major financial capitals such as Tokyo, London, and New York right in the bottom panel.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Both systems auto-adjust as diurnal daylight-saving shifts occur in their respective systems.
            </p>
          </div>

          <div className="md:col-span-2">
            <h2 className="text-xl font-bold tracking-tight mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" /> Continuous Sync Design
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We connect Clockivo directly to your operating system&apos;s internal hardware timers. High-performance requestAnimationFrame callbacks ensure coordinate mathematics execute without causing noticeable thread stutter, keeping memory consumption extremely optimized for passive browser tabs.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
