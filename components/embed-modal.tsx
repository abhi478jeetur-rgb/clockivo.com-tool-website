"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Code, Copy, Check } from "lucide-react"

interface EmbedModalProps {
  toolType: "timer" | "stopwatch"
}

export default function EmbedModal({ toolType }: EmbedModalProps) {
  const [copied, setCopied] = useState(false)
  const embedUrl = `https://clockivo.com/embed/${toolType}`
  const iframeCode = `<iframe src="${embedUrl}" width="100%" height="380" style="border:none;border-radius:16px;background:transparent;" allow="autoplay"></iframe>`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy embed code: ", err)
    }
  }

  return (
    <Dialog>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" className="gap-2 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 transition-all text-xs">
            <Code className="h-3.5 w-3.5" />
            Embed Tool
          </Button>
        }
      />
      <DialogContent className="sm:max-w-md border-border/50 bg-card/95 backdrop-blur-lg shadow-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            Embed {toolType === "timer" ? "Timer" : "Stopwatch"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-xs">
            Copy and paste this HTML code into your website's editor. This responsive, borderless widget runs perfectly on other frameworks (WordPress, Ghost, Webflow, Shopify).
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 pt-2">
          <div className="grid flex-1 gap-2">
            <Input
              id="embed-code"
              readOnly
              value={iframeCode}
              className="font-mono text-xs border-border/50 bg-muted/40 focus-visible:ring-primary"
            />
          </div>
          <Button size="sm" className="px-3 shrink-0" onClick={handleCopy}>
            <span className="sr-only">Copy</span>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="text-[10px] text-muted-foreground pt-1 flex items-center justify-between">
          <span>✔️ Fully responsive layout</span>
          <span>✔️ Auto-adjusts theme colors</span>
        </div>
      </DialogContent>
    </Dialog>
  )
}
