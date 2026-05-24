import { cn } from "@/lib/utils"

type AdSize = "leaderboard" | "medium-rectangle"

const adSizes: Record<AdSize, { width: string; height: string; label: string }> = {
  leaderboard: {
    width: "w-full max-w-[728px]",
    height: "h-[90px]",
    label: "728 x 90",
  },
  "medium-rectangle": {
    width: "w-full max-w-[300px]",
    height: "h-[250px]",
    label: "300 x 250",
  },
}

interface AdContainerProps {
  size?: AdSize
  className?: string
}

/**
 * CLS-safe ad placeholder.
 * Fixed min-height + min-width ensures the space is reserved before any
 * ad script loads, keeping Cumulative Layout Shift at 0.05 or below.
 */
export default function AdContainer({
  size = "leaderboard",
  className,
}: AdContainerProps) {
  const { width, height, label } = adSizes[size]

  return (
    <div
      className={cn(
        "flex items-center justify-center mx-auto rounded-xl",
        "bg-muted/20 backdrop-blur-sm border border-border/20",
        "text-xs text-muted-foreground/40 tracking-wide select-none",
        width,
        height,
        className
      )}
      aria-hidden="true"
    >
      <span>Advertisement</span>
    </div>
  )
}
