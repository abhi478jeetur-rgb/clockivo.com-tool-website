import Stopwatch from "@/components/stopwatch"

export const metadata = {
  title: 'Embeddable Online Stopwatch | Clockivo',
  description: 'Clean, responsive online stopwatch embeddable for other sites.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function EmbedStopwatchPage() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 select-none overflow-hidden">
      <div className="w-full max-w-sm scale-90 sm:scale-100">
        <Stopwatch />
      </div>
    </div>
  )
}
