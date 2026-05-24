import Timer from "@/components/timer"

export const metadata = {
  title: 'Embeddable Online Timer | Clockivo',
  description: 'Clean, responsive online countdown timer embeddable for other sites.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function EmbedTimerPage() {
  return (
    <div className="min-h-screen bg-transparent flex items-center justify-center p-2 select-none overflow-hidden">
      <div className="w-full max-w-sm scale-90 sm:scale-100">
        <Timer defaultDuration={300} />
      </div>
    </div>
  )
}
