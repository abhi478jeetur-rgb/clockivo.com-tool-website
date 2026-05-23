import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Sparkles, Leaf, EyeOff, Bolt } from "lucide-react"

export const metadata: Metadata = {
  title: "About Us - Our Philosophy & Story - Clockivo",
  description: "Learn more about the design and development philosophy of Clockivo. We make browser utilities lightweight, fast, beautiful, and completely offline-compatible.",
  alternates: {
    canonical: "/about",
  },
}

export default function AboutPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Clockivo",
    "description": "Clockivo is a browser-first timing suite engineered to deliver high utility without cognitive overload, visual clutter, or database trackers.",
    "url": "https://clockivo.com/about",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Clockivo browser-first timing app",
      "applicationCategory": "UtilitiesApplication"
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
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center justify-center sm:justify-start gap-1.5 mb-2">
            <Sparkles className="w-4 h-4" /> Who We Are
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            About Clockivo
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed mt-2 animate-fade-in">
            Clockivo is a browser-first timing suite engineered to deliver high utility without cognitive overload, visual clutter, or database trackers.
          </p>
        </div>

        {/* Narrative columns */}
        <div className="flex flex-col gap-12 pb-12 leading-relaxed">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b pb-10">
            <div>
              <h2 className="text-xl font-bold tracking-tight mb-4">Our Core Philosophy</h2>
              <p className="text-sm text-muted-foreground mb-4">
                We believe standard tools like clocks, stopwatches, and timers belong on your local processor, not on a remote server. The web is filled with websites requiring logins and tracking scripts just to trigger a simple sound cue.
              </p>
              <p className="text-sm text-muted-foreground">
                Clockivo is built differently. By relying entirely on client-side state engines and the HTML Web Audio API, we eliminate background payloads, optimizing your batter life and focus.
              </p>
            </div>
            <div className="flex flex-col gap-4 justify-center bg-muted/20 border rounded-2xl p-6">
              <div className="flex gap-3">
                <Leaf className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Lightweight footprint</h4>
                  <p className="text-xs text-muted-foreground">Renders instantly under sub-optimal cell networks, minimizing RAM overhead.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <EyeOff className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Offline First Privacy</h4>
                  <p className="text-xs text-muted-foreground">No cookies or tracking pixels tracking your sleep schedule or deadlines.</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Bolt className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-sm">Hardware Acceleration</h4>
                  <p className="text-xs text-muted-foreground">Uses hardware clocks directly for perfect second precision.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight mb-4">A Modern Approach to Everyday Clocks</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Designed as an elegant, clutter-free alternative to traditional site clocks, Clockivo bridges reliable native browser timers with responsive, minimalist design. We combine beautiful micro-animations and immersive full-screen night modes without the bloated background baggage.
            </p>
            <p className="text-sm text-muted-foreground">
              We look forward to continuously expanding our set of secure offline widgets. Feel free to explore our settings panel, adjust sound parameters, and use us for your daily studying, fitness, cooking, or work routines.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
