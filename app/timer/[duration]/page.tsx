import { Metadata } from "next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Timer from "@/components/timer"
import AdContainer from "@/components/ad-container"
import { notFound } from "next/navigation"

// Helper to parse dynamic keyword routes or standard durations into seconds
function parseDuration(durationStr: string): number | null {
  const lower = durationStr.toLowerCase();
  if (lower === 'pomodoro' || lower === 'pomodoro-timer' || lower === 'study-timer') return 1500; // 25m
  if (lower === 'presentation-timer') return 900; // 15m
  if (lower === 'workout-timer' || lower === 'gym-timer' || lower === 'tabata-timer') return 300; // 5m
  if (lower === 'egg-timer' || lower === 'tea-timer') return 180; // 3m

  const match = durationStr.match(/^(\d+)-(second|seconds|minute|minutes|hour|hours)$/i);
  if (!match) return null;
  const val = parseInt(match[1], 10);
  const unit = match[2].toLowerCase();
  if (unit.startsWith('second')) return val;
  if (unit.startsWith('minute')) return val * 60;
  if (unit.startsWith('hour')) return val * 3600;
  return null;
}

// Format the dynamic title seamlessly based on route parameter
function getFormattedTitle(durationStr: string): string {
  const lower = durationStr.toLowerCase();
  if (lower === 'pomodoro' || lower === 'pomodoro-timer') return 'Pomodoro';
  if (lower === 'study-timer') return 'Study';
  if (lower === 'presentation-timer') return 'Presentation';
  if (lower === 'workout-timer' || lower === 'gym-timer' || lower === 'tabata-timer') return 'Workout & Interval';
  if (lower === 'egg-timer' || lower === 'tea-timer') return 'Egg & Tea';

  return durationStr.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
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
    { duration: 'pomodoro-timer' },
    { duration: 'study-timer' },
    { duration: 'presentation-timer' },
    { duration: 'workout-timer' },
    { duration: 'egg-timer' },
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ duration: string }> }): Promise<Metadata> {
  const { duration } = await params;
  const parsed = parseDuration(duration);
  if (!parsed) return {};
  
  const title = getFormattedTitle(duration);
  return {
    title: `${title} Timer Online - Free Fullscreen Countdown`,
    description: `Use Clockivo's premium, free ${title.toLowerCase()} timer online. Features custom synthesizer alarms, responsive fullscreen mode, and local storage data privacy. Perfect for timing studies, workouts, presentations, or cooking.`,
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
  
  const title = getFormattedTitle(duration);
  const lowerDuration = duration.toLowerCase();

  // Dynamically serve deeply unique content to satisfy the 60% uniqueness rule (pSEO)
  let customContent = null;
  if (lowerDuration === 'pomodoro' || lowerDuration === 'pomodoro-timer') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Maximize Focus with the Pomodoro Technique</h3>
        <p className="text-muted-foreground mb-4">
          This 25-minute Pomodoro timer is custom-calibrated for high-performance productivity sprint cycles. The Pomodoro Technique, created by Francesco Cirillo in the late 1980s, uses structured time blocks to break down your task load into manageable sprints. Traditionally, each sprint is 25 minutes of absolute, zero-distraction work, followed by a rejuvenating 5-minute break. Use this tool to lock in your focus, track intervals, and bypass cognitive fatigue.
        </p>
      </>
    );
  } else if (lowerDuration === 'study-timer') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Optimizing Your Study Sprints</h3>
        <p className="text-muted-foreground mb-4">
          Scientific research on learning shows that studying in brief, highly focused blocks—often termed "study sprints"—is vastly superior to long cramming marathons. By using this study timer, you leverage the brain's natural rhythm of intense focus (which typically tapers off after 25-30 minutes). After your timer signals completion, take a 5-minute cognitive rest: walk, hydrate, or stretch. This helps consolidate information from short-term memory to long-term storage.
        </p>
      </>
    );
  } else if (lowerDuration === 'presentation-timer') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Keep Your Presentations and Pitch Slides On Pacing</h3>
        <p className="text-muted-foreground mb-4">
          A successful 15-minute presentation requires precision pacing. Professional speakers structure 15-minute slots using the 3-10-2 rule: 3 minutes for setting the hooks and introduction, 10 minutes for delivering the core evidence-based slides, and 2 minutes for wrapping up and triggering a clear call to action. Keep this clean, distraction-free presentation countdown running in your browser to master your pacing and never overrun your slot.
        </p>
      </>
    );
  } else if (lowerDuration === 'workout-timer') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">High-Intensity Interval Training & Tabata Workouts</h3>
        <p className="text-muted-foreground mb-4">
          Lock in your workout intervals with our precise 5-minute gym clock. Perfect for timing Tabata rounds, dynamic warm-ups, core circuits, or high-intensity interval training (HIIT). Research demonstrates that short, highly-concentrated workout segments maximize calorie burn and metabolic rate. Our local-synthesizer audio alerts ensure you know exactly when your round wraps up, even if you are not staring directly at your mobile screen.
        </p>
      </>
    );
  } else if (lowerDuration === 'egg-timer') {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Boil the Perfect Egg and Brew Delicate Teas</h3>
        <p className="text-muted-foreground mb-4">
          Kitchen timing requires accurate precision. A 3-minute egg timer is ideal for boiling soft, runny-yolk eggs or brewing delicate green teas which turn bitter if steeped too long. For reference: boil for exactly 3 minutes for a soft egg, 5 minutes for a firm yolk, and 8-10 minutes for hard-boiled. Keep this timer open on your mobile or tablet to ensure consistency in every single batch.
        </p>
      </>
    );
  } else {
    customContent = (
      <>
        <h3 className="text-xl font-bold mb-3">Precision Browsing Timer Engine</h3>
        <p className="text-muted-foreground mb-4">
          This digital countdown timer runs entirely locally inside your browser, ensuring complete privacy while guaranteeing millisecond accuracy. Whether you are timing professional presentation slots, studying for tests, cooking recipes, or keeping track of exercise routines, this tool operates independently without sending your personal timing metadata to external servers.
        </p>
      </>
    );
  }

  // Schema Markup - FAQ & SoftwareApplication
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Is the ${title} timer accurate?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our timers run completely inside your local browser using performance APIs, bypassing server lag for absolute millisecond-level precision."
        }
      },
      {
        "@type": "Question",
        "name": "Does the alarm sound if my screen goes to sleep?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Most modern browsers will allow background audio alerts to trigger when the tab is active. We recommend setting your computer or phone sleep settings to allow keeping tabs open during long timers."
        }
      }
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": `Clockivo ${title} Timer`,
    "operatingSystem": "All",
    "applicationCategory": "ProductivityApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumbs for SEO structural interlinking */}
      <nav className="max-w-5xl mx-auto w-full px-4 sm:px-8 mt-24 sm:mt-28 text-xs text-muted-foreground flex gap-2">
        <a href="/" className="hover:text-primary transition-colors">Home</a>
        <span>/</span>
        <a href="/timer" className="hover:text-primary transition-colors">Timer</a>
        <span>/</span>
        <span className="text-foreground font-semibold">{title}</span>
      </nav>

      <main className="flex-1 flex flex-col items-center p-4 sm:p-8 mt-4 w-full max-w-5xl mx-auto">
        
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
            {title} Timer
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready, set, go! Your {title.toLowerCase()} countdown starts the moment you click play.
          </p>
        </div>

        <div className="w-full flex justify-center mb-12">
          <Timer defaultDuration={parsedSeconds} />
        </div>

        <AdContainer size="leaderboard" className="mb-12" />

        {/* Dynamic unique textual blocks */}
        <section className="border-t pt-10 mt-12 pb-12 w-full max-w-3xl text-left">
          <div className="mb-10">
            {customContent}
          </div>
          
          <div className="bg-muted/30 p-6 rounded-2xl border border-border/50">
            <h3 className="font-semibold text-lg mb-3 text-foreground">Why use Clockivo's {title} Timer?</h3>
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

      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <Footer />
    </div>
  )
}
