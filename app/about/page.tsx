import { Metadata } from 'next';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Shield, Zap, Globe } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | Clockivo - Premium Time Utilities',
  description: 'Learn about Clockivo, our mission, and why we built the fastest, most reliable, privacy-focused online time utilities.',
  alternates: {
    canonical: 'https://www.clockivo.com/about'
  }
};

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 px-4 sm:px-6 lg:px-8 mx-auto">
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
            About Clockivo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted companion for precise, reliable, and privacy-first time management tools.
          </p>
        </div>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              At Clockivo, we believe that time is your most valuable asset. Our mission is to provide the world with the most precise, user-friendly, and privacy-respecting time utilities available on the web. Whether you need a simple countdown timer for your study sessions, an alarm clock to wake up, or a reliable stopwatch for timing tasks, we've built the perfect digital tools for you.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-6">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-primary">
                  <Shield className="h-6 w-6" />
                  <h3 className="font-semibold text-lg text-foreground">100% Privacy First</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your data never leaves your device. All alarms, timers, and settings are saved locally in your browser. We don't track your personal alarm schedules or save them on any servers.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-primary">
                  <Zap className="h-6 w-6" />
                  <h3 className="font-semibold text-lg text-foreground">Lightning Fast</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Built on modern web technologies, Clockivo loads instantly and runs smoothly on any device, from powerful desktops to budget smartphones, without draining your battery.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-primary">
                  <Globe className="h-6 w-6" />
                  <h3 className="font-semibold text-lg text-foreground">Global Accuracy</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Our World Clock and timing engines are synced with atomic precision, handling complex timezones and Daylight Saving Time (DST) automatically.
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-primary">
                  <Clock className="h-6 w-6" />
                  <h3 className="font-semibold text-lg text-foreground">Always Free</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  We are committed to keeping our core utility tools completely free for everyone, forever. No hidden paywalls, no subscription fees for basic functionality.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardContent className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Who We Are</h2>
            <p className="text-muted-foreground leading-relaxed">
              Clockivo was born out of a frustration with existing online timer websites that were either cluttered with intrusive ads, incredibly slow, or visually outdated. We are a team of passionate developers and designers who wanted to create a "glassmorphic", premium-feeling workspace utility that professionals, students, and everyday users would actually enjoy keeping open in their browser tabs.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We continue to iterate and improve Clockivo based on user feedback, constantly adding new features like programmatic SEO tools, offline PWA support, and advanced tracking metrics.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
