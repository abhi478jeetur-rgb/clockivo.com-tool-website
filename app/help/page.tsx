import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { HelpCircle, BellRing, Hourglass, Pocket, HelpCircle as FaqIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "Help & FAQ - Troubleshooting & Guide - Clockivo",
  description: "Get answers to frequently asked questions about setting alarms, running timers, managing stopwatch laps, customizing sounds, and offline support on Clockivo.",
  alternates: {
    canonical: "/help",
  },
}

export default function HelpPage() {
  const faqs = [
    {
      q: "Does the alarm trigger if I close the browser tab?",
      a: "No, since Clockivo is a pure browser-based tool, the browser tab must remain open for the audio cues to play. However, you can minimize the window or use other applications as long as the page is alive in the background."
    },
    {
      q: "Are my sound and custom settings saved?",
      a: "Yes! Your master volume slider, oscillator wave selections, repeat speed, stopwatch lap history, and active alarm presets are safely stored inside your browser's localStorage. This means they are immediately restored the minute you reopen Clockivo."
    },
    {
      q: "Does Clockivo require an active internet connection to function?",
      a: "Once loaded, Clockivo's core utility modules (alarm timers, stopwatch tickers, and standard clocks) execute fully client-side on your hardware. This means the tools continue working even if your device drops offline or has limited bandwidth."
    },
    {
      q: "Why is my alarm not making any sound?",
      a: "First, click on the Sound Settings panel to trigger a test sound. If you hear nothing, ensure your device's physical speakers are unmuted, browser notifications are enabled, and your system has given the browser permissions to play media content."
    }
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
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
            <HelpCircle className="w-4 h-4" /> Clockivo Resource Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Frequently Asked Questions & Help
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed mt-2">
            Discover guidelines, settings diagnostics, and optimization walkthroughs to unlock the full potential of our online timing dashboard.
          </p>
        </div>

        {/* Guided Troubleshooting Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="border rounded-xl p-5 bg-card shadow-sm hover:border-primary/20 transition-all">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary w-fit mb-3">
              <BellRing className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-2">Alarm Diagnostics</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Always inspect your physical sound switches. Browser sandboxing requires an active user click interaction before allowing audio playbacks.
            </p>
          </div>
          <div className="border rounded-xl p-5 bg-card shadow-sm hover:border-primary/20 transition-all">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary w-fit mb-3">
              <Hourglass className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-2">Timer Sessions</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Our background scheduler persists countdown checkpoints. Even if high-stress calculations lag your browser thread, timestamps remain rigid.
            </p>
          </div>
          <div className="border rounded-xl p-5 bg-card shadow-sm hover:border-primary/20 transition-all">
            <div className="p-2.5 rounded-full bg-primary/10 text-primary w-fit mb-3">
              <Pocket className="w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-2">Offline Mechanics</h3>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Because Clockivo avoids cloud uploads, your timing datasets, records, and active sound arrays are kept fully private.
            </p>
          </div>
        </div>

        {/* FAQ list */}
        <section className="bg-card border rounded-2xl p-6 sm:p-10 shadow-sm mb-12">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FaqIcon className="w-5 h-5 text-primary" /> Core FAQs
          </h2>
          <div className="flex flex-col gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0 pb-6 last:pb-0 border-border/50">
                <h3 className="font-bold text-base text-foreground mb-2 flex items-start gap-1">
                  <span className="text-primary font-mono select-none">Q.</span> {faq.q}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground pl-5">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
