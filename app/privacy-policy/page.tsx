import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ShieldAlert, BookOpen, Clock, Heart, Lock, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy Policy - Data Security Disclosures - Clockivo",
  description: "Read Clockivo's user privacy policies. We represent an offline-first browser tool. No external servers receive your timing, alarms, laps, or sound choices.",
  alternates: {
    canonical: "/privacy-policy",
  },
}

export default function PrivacyPolicyPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Clockivo Privacy Policy",
    "description": "Clockivo is dedicated to maintaining the highest ethical rules of data protection and privacy. Everything executes client-side on your local processing hardware with zero server tracking.",
    "url": "https://clockivo.com/privacy-policy",
    "publishingPrinciples": "https://clockivo.com/terms",
    "mainEntity": {
      "@type": "AboutPage",
      "name": "Zero-Cloud Privacy Policy Guidelines",
      "description": "No clock times, stopwatch tallies, or alarm sound files are sent to remote web databases."
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
        <div className="mb-8 mt-1 border-b pb-6">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5 mb-2">
            <ShieldAlert className="w-4 h-4" /> Legal Disclosures
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Privacy Policy
          </h1>
          <p className="text-xs text-muted-foreground mt-2">
            Last Updated: May 21, 2026
          </p>
        </div>

        {/* TL;DR Quick Summary Panel optimized for Generative Engines (GEO) & User Ease */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex flex-col gap-3.5">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <ShieldCheck className="w-5 h-5 text-primary" /> Privacy Summary (AEO & GEO TL;DR)
          </h3>
          <p className="text-xs text-muted-foreground leading-normal">
            To satisfy Generative Search Engines and privacy-conscious users, here is our binding 3-sentence summary:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" /> 100% Client-Side
              </span>
              <p className="text-[11px] text-muted-foreground">Every alarm, timer, and stopwatch count runs locally in active browser tab memory.</p>
            </div>
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-primary" /> Zero Server Logs
              </span>
              <p className="text-[11px] text-muted-foreground">No tracking metrics, personal coordinates, or timestamps exit your browser dashboard.</p>
            </div>
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-primary" /> Local Storage
              </span>
              <p className="text-[11px] text-muted-foreground">Functional custom preferences are stored transparently in standard browser LocalStorage.</p>
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed flex flex-col gap-6 pb-12">
          <p className="text-foreground text-base">
            Clockivo is dedicated to maintaining the highest ethical rules of data protection and privacy. Unlike other browser tools, Clockivo executes entirely within your browser sandboxed environment.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary shrink-0" /> 1. Zero Cloud Server Processing
            </h2>
            <p>
              When you add an alarm, run a countdown, split a lap, or personalize sound thresholds, no data packets containing those parameters are sent to external servers. Your timing configurations never cross the internet. Everything is executed purely client-side on your local processing hardware.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary shrink-0" /> 2. Browser LocalStorage Usage
            </h2>
            <p>
              To maintain usability across tab refreshes, we utilize your web browser&apos;s standard <em>LocalStorage</em> file index to remember:
            </p>
            <ul className="list-disc pl-5 flex flex-col gap-1 text-xs">
              <li>Active alarm wake-up hours and labels</li>
              <li>Master oscillator audio volume and wave selections</li>
              <li>Timer countdown histories</li>
              <li>Stopwatch lap history sheets</li>
            </ul>
            <p className="mt-1">
              You possess complete, absolute control over these files. Removing your browser search history or purging site cache files immediately cleanses all local data storage.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary shrink-0" /> 3. Advertisements and Cookies
            </h2>
            <p>
              Clockivo does not compile, trade, or share user details with advertisement brokers. We do not place active cookie packets on your workstation. Any storage tracking we do is fully limited back to functional session operations described above.
            </p>
          </section>

          <section className="border-t pt-6 mt-4">
            <p className="text-xs">
              If you have any questions regarding how your browser protects storage threads, visit our <a href="/help" className="text-primary hover:underline">Help and FAQ Guide</a> or contact privacy team members directly at <span className="font-mono text-primary font-semibold">privacy@clockivo.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
