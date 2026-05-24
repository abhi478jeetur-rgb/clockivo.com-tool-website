import { Metadata } from 'next';
import Header from "@/components/header"
import Footer from "@/components/footer"
import Timer from "@/components/timer"
import Stopwatch from "@/components/stopwatch"
import AdContainer from "@/components/ad-container"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Clock, ShieldAlert, Award, Compass } from "lucide-react"

export const metadata: Metadata = {
  title: 'Timer vs Stopwatch: Which Time Tool Should You Use? | Clockivo',
  description: 'Confused between a timer and a stopwatch? Read our comprehensive comparison guide, try both side-by-side, and discover which is best for studying, exercise, or productivity.',
  alternates: {
    canonical: 'https://clockivo.com/timer-vs-stopwatch',
  }
};

export default function TimerVsStopwatchPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between a timer and a stopwatch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A countdown timer counts down from a specific duration to zero and triggers an alarm alert when complete. A stopwatch, on the other hand, counts up from zero to measure elapsed duration, often supporting lap/split splits."
        }
      },
      {
        "@type": "Question",
        "name": "When should I use a timer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use a countdown timer when you want to allocate a fixed time block for a task (e.g., 25 minutes for Pomodoro studying, 5 minutes for cooking, or gym interval rounds)."
        }
      },
      {
        "@type": "Question",
        "name": "When should I use a stopwatch?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use a stopwatch when you want to measure exactly how long a task takes to complete (e.g., running laps, speedrunning code tasks, or tracking exact billable hours)."
        }
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Breadcrumbs */}
      <nav className="max-w-5xl mx-auto w-full px-4 sm:px-8 mt-24 sm:mt-28 text-xs text-muted-foreground flex gap-2">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <span>/</span>
        <span className="text-foreground font-semibold">Timer vs Stopwatch</span>
      </nav>

      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 mt-4 w-full max-w-5xl mx-auto">
        
        <div className="text-center mb-8 sm:mb-12 space-y-4">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            Timer vs Stopwatch
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Which tool is perfect for your workflow? Compare specifications, use-cases, and test both side-by-side.
          </p>
        </div>

        {/* Side-by-side interactive playground */}
        <div className="grid md:grid-cols-2 gap-8 w-full mb-12">
          <Card className="border-border/50 bg-card/45 backdrop-blur-sm shadow-xl flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Clock className="h-5 w-5" />
                  <h2 className="text-xl font-bold">Countdown Timer</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Counts down from a specified duration to zero. Triggers an alarm wave once finished. Best for limiting time.
                </p>
              </div>
              <div className="w-full flex justify-center py-4 bg-muted/20 rounded-2xl border border-border/20">
                <Timer defaultDuration={1500} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/45 backdrop-blur-sm shadow-xl flex flex-col">
            <CardContent className="p-6 flex-1 flex flex-col justify-between">
              <div className="mb-6">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <ArrowRightLeft className="h-5 w-5" />
                  <h2 className="text-xl font-bold">Split Stopwatch</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Counts up from zero to measure elapsed duration. Supports split laps with millisecond accuracy.
                </p>
              </div>
              <div className="w-full flex justify-center py-4 bg-muted/20 rounded-2xl border border-border/20">
                <Stopwatch />
              </div>
            </CardContent>
          </Card>
        </div>

        <AdContainer size="leaderboard" className="mb-12" />

        {/* Comparison Details Section */}
        <section className="w-full max-w-3xl space-y-12 text-left">
          
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Specifications Comparison</h2>
            <div className="overflow-x-auto rounded-xl border border-border/50">
              <table className="w-full text-sm text-left text-muted-foreground">
                <thead className="text-xs text-foreground uppercase bg-muted/40">
                  <tr>
                    <th scope="col" className="px-6 py-4">Feature / Spec</th>
                    <th scope="col" className="px-6 py-4">Timer</th>
                    <th scope="col" className="px-6 py-4">Stopwatch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr className="bg-transparent">
                    <td className="px-6 py-4 font-semibold text-foreground">Direction</td>
                    <td className="px-6 py-4">Backward (Counts down to zero)</td>
                    <td className="px-6 py-4">Forward (Counts up from zero)</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="px-6 py-4 font-semibold text-foreground">Primary Purpose</td>
                    <td className="px-6 py-4">Time management & boundaries</td>
                    <td className="px-6 py-4">Measuring task/lap performance</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="px-6 py-4 font-semibold text-foreground">Trigger / Alert</td>
                    <td className="px-6 py-4">Alarm audio alert once finished</td>
                    <td className="px-6 py-4">None (Manual stopping required)</td>
                  </tr>
                  <tr className="bg-transparent">
                    <td className="px-6 py-4 font-semibold text-foreground">Key Feature</td>
                    <td className="px-6 py-4">Presets (5m, 10m, 25m Pomodoro)</td>
                    <td className="px-6 py-4">Lap splits tracking sheet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                <Award className="h-5 w-5 text-primary" />
                When to use a Timer
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• **Study blocks:** Use for Pomodoro sprint focus sessions.</li>
                <li>• **Cooking tasks:** Ensure cookies or eggs don't burn.</li>
                <li>• **Gym rounds:** Time rest durations or circuit intervals.</li>
                <li>• **Presentations:** Keep public speeches within assigned slots.</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold flex items-center gap-2 text-foreground">
                <Compass className="h-5 w-5 text-primary" />
                When to use a Stopwatch
              </h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• **Running laps:** Track exact split pace improvements.</li>
                <li>• **Speedrunning:** Measure gaming or work execution speeds.</li>
                <li>• **Billable hours:** Track freelance design or coding work accurately.</li>
                <li>• **Diagnostic tasks:** Check browser loading or processing speeds.</li>
              </ul>
            </div>
          </div>

          {/* Direct Answer Architecture (GEO/AI Overviews) */}
          <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl space-y-2">
            <h3 className="font-bold text-lg text-primary">Summary: Timer vs Stopwatch</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Use a **Timer** when you want to enforce a strict time boundary or sprint block (counting down). Use a **Stopwatch** when you need to record the precise duration elapsed (counting up) with lap capabilities. Both run locally on Clockivo with millisecond precision and 100% data privacy.
            </p>
          </div>

        </section>

      </main>

      {/* Inject FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Footer />
    </div>
  );
}
