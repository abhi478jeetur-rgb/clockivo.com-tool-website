import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Timer from "@/components/timer"
import AdContainer from "@/components/ad-container"
import { notFound } from "next/navigation"

// Helper to parse "25-minutes" into seconds (1500)
function parseDuration(durationStr: string): number | null {
  const match = durationStr.match(/^(\d+)-(second|seconds|minute|minutes|hour|hours)$/i);
  if (!match) return null;
  const val = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  if (unit.startsWith('second')) return val;
  if (unit.startsWith('minute')) return val * 60;
  if (unit.startsWith('hour')) return val * 3600;
  return null;
}

export function generateStaticParams() {
  return [
    { duration: '5-minutes' },
    { duration: '10-minutes' },
    { duration: '15-minutes' },
    { duration: '20-minutes' },
    { duration: '25-minutes' },
    { duration: '30-minutes' },
    { duration: '45-minutes' },
    { duration: '1-hour' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ duration: string }> }): Promise<Metadata> {
  const { duration } = await params;
  const parsed = parseDuration(duration);
  if (!parsed) return {};
  
  const formattedTitle = duration.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  return {
    title: `${formattedTitle} Timer Online - Free Fullscreen Countdown`,
    description: `Set a free ${formattedTitle} timer online. Features customizable alarms, fullscreen mode, and precision timing. Perfect for study, workout, or cooking.`,
    alternates: {
      canonical: `https://clockivo.com/timer/${duration}`,
    }
  }
}

export default async function DynamicTimerPage({ params }: { params: Promise<{ duration: string }> }) {
  const { duration } = await params;
  const parsedSeconds = parseDuration(duration);
  
  if (!parsedSeconds) {
    notFound();
  }
  
  const formattedTitle = duration.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

  // 60% Uniqueness logic
  let customContent = null;
  if (duration === '25-minutes') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">The Pomodoro Technique</h3>
        <p className="text-muted-foreground mb-4">A 25-minute timer is globally recognized as the standard duration for one "Pomodoro" sprint. Invented by Francesco Cirillo in the late 1980s, the technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Use this 25-minute timer to maximize your focus without burning out.</p>
      </>
    );
  } else if (duration === '5-minutes') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Perfect for Short Breaks</h3>
        <p className="text-muted-foreground mb-4">A 5-minute timer is perfect for a quick mental reset, steeping a perfect cup of tea, or the short break interval in the Pomodoro Technique. Taking short 5-minute breaks after intense focus sessions allows your brain to consolidate information and prevents cognitive fatigue.</p>
      </>
    );
  } else if (duration === '10-minutes') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">The 10-Minute Power Task</h3>
        <p className="text-muted-foreground mb-4">When you're procrastinating, commit to working for just 10 minutes. A 10-minute timer is the psychological trick you need to overcome the initial friction of starting a hard task. Often, once the 10 minutes are up, you'll find you want to keep going!</p>
      </>
    );
  } else {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Using Your {formattedTitle} Timer</h3>
        <p className="text-muted-foreground mb-4">This {formattedTitle} countdown timer runs entirely in your browser. It guarantees privacy by never sending your timing data to a server. Whether you are cooking, studying, doing yoga, or managing a presentation, this accurate digital timer will ensure you stay on schedule.</p>
      </>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 mt-16 sm:mt-24 w-full max-w-5xl mx-auto">
        
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {formattedTitle} Timer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready, set, go! Your {formattedTitle} countdown starts the moment you click play.
          </p>
        </div>

        <div className="w-full flex justify-center mb-12">
          <Timer defaultDuration={parsedSeconds} />
        </div>

        <AdContainer size="leaderboard" className="mb-12" />

        {/* SEO On-Page Content Foundations */}
        <section className="border-t pt-10 mt-12 pb-12 w-full max-w-3xl text-left">
          <div className="mb-10">
            {customContent}
          </div>
          
          <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
            <h3 className="font-semibold text-lg mb-3 text-foreground">Why use Clockivo's {formattedTitle} Timer?</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                Zero server lag: Runs purely in your local browser for millisecond precision.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                Audio alerts: Choose from 3 high-quality synthesizer alarm waves when time is up.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">✓</span>
                Privacy first: No logins, no tracking of your specific timer sessions.
              </li>
            </ul>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
