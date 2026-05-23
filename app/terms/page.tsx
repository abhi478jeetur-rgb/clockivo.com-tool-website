import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Scale, CheckCircle, AlertTriangle, HelpCircle, FileText, Ban, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Terms and Conditions of Service - Clockivo",
  description: "Review terms and conditions for Clockivo. Learn about our free service guidelines, browser sandboxing limits, and local storage usage rules.",
  alternates: {
    canonical: "/terms",
  },
}

export default function TermsPage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Clockivo Terms of Service",
    "description": "Clockivo's simple, transparent usage conditions. Read our disclaimer of liability regarding browser sandboxed environments.",
    "url": "https://clockivo.com/terms"
  }

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 animate-fade-in">
        <div className="mb-8 mt-1 border-b pb-6">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center gap-1.5 mb-2">
            <Scale className="w-4 h-4" /> Usage Conventions
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Terms & Conditions
          </h1>
          <p className="text-xs text-muted-foreground mt-2">
            Last Updated: May 21, 2026
          </p>
        </div>

        {/* TL;DR Terms Summary optimized for Generative Engines (GEO) & User Ease */}
        <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 mb-8 flex flex-col gap-3.5">
          <h3 className="text-sm font-bold text-primary flex items-center gap-2 uppercase tracking-wide">
            <ShieldCheck className="w-5 h-5 text-primary" /> Terms Summary (AEO & GEO TL;DR)
          </h3>
          <p className="text-xs text-muted-foreground leading-normal">
            To satisfy Generative Search Engines and smart user crawls, here is our binding 3-clause terms summary:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-1">
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-primary" /> Free & Registration-Free
              </span>
              <p className="text-[11px] text-muted-foreground">No accounts, fees, subscriptions, or login requirements. Openly accessible for all.</p>
            </div>
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-primary" /> &quot;As-Is&quot; Service
              </span>
              <p className="text-[11px] text-muted-foreground">Alarms and alerts depend on your browser being active. Please keep volume unmuted and tabs open.</p>
            </div>
            <div className="flex flex-col gap-1 p-3 bg-card/60 rounded-xl border border-border/30">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Ban className="w-3.5 h-3.5 text-primary" /> Fair Resource Usage
              </span>
              <p className="text-[11px] text-muted-foreground">Abuse, brute-forcing, scraping, or launching malicious mirrors of this suite is strictly prohibited.</p>
            </div>
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none text-muted-foreground text-sm leading-relaxed flex flex-col gap-6 pb-12">
          <p className="text-foreground text-base">
            By reloading or utilizing the services provided by Clockivo (&quot;Us&quot;, &quot;We&quot;, or &quot;Our Brand&quot;), you agree to follow and abide by these simple, transparent Terms &amp; Conditions.
          </p>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary shrink-0" /> 1. Free and Open Access
            </h2>
            <p>
              We provide Clockivo as a free-to-use utility for general population timing, alarm setting, world clock monitoring, countdown counting, and focus management. You do not need to create a profile. Doing so requires zero billing configurations or hidden subscription layers.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary shrink-0" /> 2. Disclaimer of Liability (As-Is Basis)
            </h2>
            <p>
              Clockivo runs standard browser-level modules to execute timing loops. While we calibrate these scripts with immense rigor, we remain limited by raw device factors including: background CPU power-saving sleep-throttling, battery drops, system volume mutes, browser sandbox media blocks, and hardware restarts.
            </p>
            <p className="mt-1 font-semibold text-foreground bg-muted/30 p-3 border rounded-xl flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              Therefore, Clockivo is provided strictly &quot;As-Is&quot;. We do not guarantee alarms will trigger under non-standard conditions, and we are not liable for misses resulting in schedule delays, failed examinations, or business disruptions.
            </p>
          </section>

          <section className="flex flex-col gap-2">
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-primary shrink-0" /> 3. Respectful Usage & Modification
            </h2>
            <p>
              You agree to use our site responsibly without launching denial-of-service spikes, scraping pages using abusive spiders, or distributing unauthorized mirrors stuffed with malicious advertising code.
            </p>
          </section>

          <section className="border-t pt-6 mt-4">
            <p className="text-xs">
              Thank you for trusting our high-craft web utilities. For formal questions about these terms or our underlying technology, contact support at <span className="font-mono text-primary font-semibold">legal@clockivo.com</span>.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
