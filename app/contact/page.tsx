import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Mail, HelpCircle, Bug, Sparkles } from "lucide-react"

export const metadata: Metadata = {
  title: "Contact Us - Feedback & Bug Reports - Clockivo",
  description: "Get in touch with the Clockivo development team. Share your feature recommendations, report timer or sound bugs, or send utility collaboration suggestions.",
  alternates: {
    canonical: "/contact",
  },
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 max-w-4xl mx-auto w-full p-4 sm:p-8 animate-fade-in">
        <div className="mb-10 text-center sm:text-left">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase flex items-center justify-center sm:justify-start gap-1.5 mb-2">
            <Mail className="w-4 h-4" /> Got Feedback?
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
            Contact Support & Engineering
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl leading-relaxed mt-2">
            Clockivo is a simple, web-first timing suite built to assist your day-to-day focus. If you discover timing anomalies, oscillator sound issues, or want to recommend ideas, write to us!
          </p>
        </div>

        {/* Contact info blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border rounded-2xl p-6 bg-card flex flex-col gap-3 shadow-sm hover:border-primary/20 transition-all">
            <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground">General Support</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Have questions regarding browser storage limits or hourly buzzer settings? Let us explain.
            </p>
            <span className="text-sm font-semibold text-primary mt-1 font-mono">support@clockivo.com</span>
          </div>

          <div className="border rounded-2xl p-6 bg-card flex flex-col gap-3 shadow-sm hover:border-primary/20 transition-all">
            <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
              <Bug className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground">Bug Reporting</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              If your web browser blocks oscillators, include your device specs and browser version.
            </p>
            <span className="text-sm font-semibold text-primary mt-1 font-mono">bugs@clockivo.com</span>
          </div>

          <div className="border rounded-2xl p-6 bg-card flex flex-col gap-3 shadow-sm hover:border-primary/20 transition-all">
            <div className="p-3 bg-primary/10 text-primary rounded-full w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-foreground">Design Agency</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Clockivo is built and maintained by our AI Web Design Agency division. Let&apos;s build clean layout projects together.
            </p>
            <span className="text-sm font-semibold text-primary mt-1 font-mono">agency@clockivo.com</span>
          </div>
        </div>

        {/* Notice */}
        <div className="border-2 border-dashed bg-muted/10 rounded-2xl p-6 sm:p-8 text-center text-muted-foreground max-w-xl mx-auto mb-12">
          <HelpCircle className="w-8 h-8 text-primary/60 mx-auto mb-3" />
          <h4 className="font-semibold text-foreground mb-1 text-sm">Need immediate troubleshooting?</h4>
          <p className="text-xs leading-relaxed max-w-sm mx-auto mb-4">
            Most layout loading or silent trigger issues can be resolved easily by visiting our diagnostic guide first.
          </p>
          <a href="/help" className="inline-flex items-center justify-center px-4 py-2 text-xs font-semibold text-primary-foreground bg-primary rounded-full hover:bg-opacity-95 transition-all">
            Check FAQ & Help Hub
          </a>
        </div>
      </main>

      <Footer />
    </div>
  )
}
