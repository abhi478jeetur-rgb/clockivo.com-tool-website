import type {Metadata} from 'next';
import './globals.css';
import { Inter, JetBrains_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from '@/components/theme-provider';
import PWAProvider from '@/components/pwa-provider';
import AudioUnlocker from '@/components/audio-unlocker';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

export const metadata: Metadata = {
  metadataBase: new URL('https://clockivo.com'),
  manifest: '/manifest.json',
  icons: {
    icon: '/clockivo-logo.png',
    shortcut: '/clockivo-logo.png',
    apple: '/clockivo-logo.png',
  },
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
    images: [
      {
        url: 'https://ik.imagekit.io/a57jpcchpv/hubber%20web/clock.com/Astronaut_3--working_in_202604271400-ezgif.com-optijpeg.jpg?updatedAt=1777278711822',
        width: 1200,
        height: 630,
        alt: 'Clockivo timing suite preview with an adorable working astronaut logo',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Clockivo - Free Online Alarm Clock, Timer & Stopwatch Suite',
    description: 'An elegant, browser-first, and completely secure timing suite. Set customizable alarms with synthesizer waves, countdown timers, stopwatch split sheets, and world clocks instantly with local storage storage.',
    images: ['https://ik.imagekit.io/a57jpcchpv/hubber%20web/clock.com/Astronaut_3--working_in_202604271400-ezgif.com-optijpeg.jpg?updatedAt=1777278711822'],
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
          <PWAProvider />
          <AudioUnlocker />
        </ThemeProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
      </body>
    </html>
  );
}
