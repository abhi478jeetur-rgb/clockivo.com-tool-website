import type {Metadata} from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://clockivo.com'),
  title: {
    default: 'Clockivo - Free Online Alarm Clock, Timer & Stopwatch Suite',
    template: '%s | Clockivo'
  },
  description: 'An elegant, browser-first, and completely secure timing suite. Set customizable alarms with synthesizer waves, countdown timers, stopwatch split sheets, and world clocks instantly with local storage storage.',
  keywords: [
    'online alarm clock', 'free online timer', 'online stopwatch', 'stopwatch split laps', 'digital clock fullscreen', 'analog clock sweep seconds', 'world clock time', 'clockivo', 'privacy-safe clock', 'pomodoro focus timer'
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Clockivo - Free Online Alarm Clock, Timer & Stopwatch Suite',
    description: 'An elegant, browser-first, and completely secure timing suite. Set customizable alarms with synthesizer waves, countdown timers, stopwatch split sheets, and world clocks instantly with local storage storage.',
    url: 'https://clockivo.com',
    siteName: 'Clockivo',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clockivo - Free Online Alarm Clock, Timer & Stopwatch Suite',
    description: 'An elegant, browser-first, and completely secure timing suite. Set customizable alarms with synthesizer waves, countdown timers, stopwatch split sheets, and world clocks instantly with local storage storage.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'productivity',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" suppressHydrationWarning className={cn("font-sans", inter.variable, jetbrainsMono.variable)}>
      <body suppressHydrationWarning className="min-h-screen bg-background antialiased flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
