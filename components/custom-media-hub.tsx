"use client"

import { useState, useEffect, useRef } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Youtube, Play, Pause, Music, Sliders, Sparkles, Volume2, Globe, WifiOff, RefreshCw, Rewind, FastForward, SlidersHorizontal, VolumeX, Check } from "lucide-react"
import * as audioLib from "@/lib/audio"

const getSoundSettings = () => {
  if (audioLib && typeof audioLib.getSoundSettings === "function") {
    return audioLib.getSoundSettings()
  }
  return { volume: 50, type: "sine", speed: "normal" }
}

const setSoundSettings = (settings: any) => {
  if (audioLib && typeof audioLib.setSoundSettings === "function") {
    audioLib.setSoundSettings(settings)
  }
}

// Extract YouTube ID helper supporting embed / shorts / standard formats
const extractYoutubeId = (url: string) => {
  if (!url) return ""
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
  const match = url.match(regExp)
  return (match && match[2].length === 11) ? match[2] : ""
}

// Format duration to MM:SS style
const formatTime = (secs: number) => {
  if (isNaN(secs) || secs === undefined || secs === null) return "0:00"
  const m = Math.floor(secs / 60)
  const s = Math.floor(secs % 60)
  return `${m}:${s < 10 ? '0' : ''}${s}`
}

export default function CustomMediaHub() {
  const [activeTab, setActiveTab] = useState<"file" | "youtube">("file")
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedFileName, setUploadedFileName] = useState<string>("")
  const [customAudioUrl, setCustomAudioUrl] = useState<string>("")
  const [isOffline, setIsOffline] = useState(false)

  // YouTube States
  const [ytUrl, setYtUrl] = useState("")
  const [activeYtId, setActiveYtId] = useState<string>("")
  const [ytBackupPlaying, setYtBackupPlaying] = useState(false)

  // YouTube Audio Player States & API interface
  const [ytCurrentTime, setYtCurrentTime] = useState(0)
  const [ytDuration, setYtDuration] = useState(0)
  const [ytPlaying, setYtPlaying] = useState(false)
  const [ytVolume, setYtVolume] = useState(80)
  const [ytSpeed, setYtSpeed] = useState(1.0)
  const [ytMuted, setYtMuted] = useState(false)
  
  const ytIframeRef = useRef<HTMLIFrameElement | null>(null)

  // Helper command dispatcher for YouTube iframe PostMessage API
  const sendYtCommand = (func: string, args: any[] = []) => {
    const iframe = ytIframeRef.current
    if (iframe && iframe.contentWindow) {
      try {
        iframe.contentWindow.postMessage(
          JSON.stringify({
            event: "command",
            func: func,
            args: args,
          }),
          "*"
        )
      } catch (e) {
        console.warn("Could not post message to YouTube iframe:", e)
      }
    }
  }

  const handleYtPlayToggle = () => {
    if (ytPlaying) {
      sendYtCommand("pauseVideo")
      setYtPlaying(false)
    } else {
      sendYtCommand("playVideo")
      setYtPlaying(true)
    }
  }

  const handleYtSeek = (seconds: number) => {
    sendYtCommand("seekTo", [seconds, true])
    setYtCurrentTime(seconds)
  }

  const handleYtVolumeChange = (volValue: number) => {
    setYtVolume(volValue)
    sendYtCommand("setVolume", [volValue])
    if (volValue > 0 && ytMuted) {
      setYtMuted(false)
      sendYtCommand("unMute")
    }
  }

  const handleYtMuteToggle = () => {
    if (ytMuted) {
      sendYtCommand("unMute")
      sendYtCommand("setVolume", [ytVolume])
      setYtMuted(false)
    } else {
      sendYtCommand("mute")
      setYtMuted(true)
    }
  }

  const handleYtSpeedChange = (speedVal: number) => {
    setYtSpeed(speedVal)
    sendYtCommand("setPlaybackRate", [speedVal])
  }

  // Listen to message reports broadcasted by the embedded YouTube Iframe to sync state parameters
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== "string") return
      if (!event.origin.includes("youtube.com")) return

      try {
        const data = JSON.parse(event.data)
        if (data.event === "infoDelivery" && data.info) {
          const info = data.info
          if (info.currentTime !== undefined) {
            setYtCurrentTime(info.currentTime)
          }
          if (info.duration !== undefined) {
            setYtDuration(info.duration)
          }
          if (info.volume !== undefined) {
            setYtVolume(info.volume)
          }
          if (info.playerState !== undefined) {
            // 1 = playing, 2 = paused, 3 = buffering
            if (info.playerState === 1) {
              setYtPlaying(true)
            } else if (info.playerState === 2) {
              setYtPlaying(false)
            }
          }
        }
      } catch (e) {
        // Suppress parsing error of foreign iframe messages
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  // Playback & Sound state
  const [isPlaying, setIsPlaying] = useState(false)
  const [visualizerType, setVisualizerType] = useState<"bars" | "wave" | "circle">("bars")
  const [soundMode, setSoundMode] = useState<"standard" | "custom" | "youtube">("standard")

  // Refs for audio analyzer
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Sync general sound settings on load
  useEffect(() => {
    const settings = getSoundSettings()
    setTimeout(() => {
      if (settings.type === "custom") {
        setSoundMode("custom")
      } else if (settings.type === "youtube") {
        setSoundMode("youtube")
      } else {
        setSoundMode("standard")
      }

      // Sync any saved uploaded file metadata
      try {
        const savedName = localStorage.getItem("clockivo_uploaded_name")
        const savedUrl = localStorage.getItem("clockivo_uploaded_url")
        if (savedName) setUploadedFileName(savedName)
        if (savedUrl) setCustomAudioUrl(savedUrl)

        const savedYt = localStorage.getItem("clockivo_youtube_link")
        if (savedYt) {
          setYtUrl(savedYt)
          const matched = extractYoutubeId(savedYt)
          if (matched) setActiveYtId(matched)
        }
      } catch (e) {}

      // Check offline capability
      setIsOffline(!navigator.onLine)
    }, 0)

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Setup HTML5 Audio element
  useEffect(() => {
    const audio = new Audio()
    audio.loop = true
    audio.crossOrigin = "anonymous"
    audioRef.current = audio

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)

    return () => {
      audio.pause()
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      if (audioRef.current) {
        audioRef.current = null
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Sync offline custom audio updates
  useEffect(() => {
    if (audioRef.current && customAudioUrl) {
      const wasPlaying = isPlaying
      audioRef.current.src = customAudioUrl
      if (wasPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      }
    }
  }, [customAudioUrl, isPlaying])

  // Handle Drag-and-Drop file uploads
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      processAudioFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processAudioFile(files[0])
    }
  }

  const processAudioFile = (file: File) => {
    if (!file.type.startsWith("audio/")) {
      alert("Please select a valid audio file (MP3, WAV, etc.)")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setUploadedFileName(file.name)
    setCustomAudioUrl(objectUrl)
    setIsPlaying(false)

    try {
      localStorage.setItem("clockivo_uploaded_name", file.name)
      // Save data url reference in session or local cache safely
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result && typeof e.target.result === "string") {
          try {
            // Save base64 data for persistent custom alarm tone block
            localStorage.setItem("clockivo_uploaded_url", e.target.result)
          } catch (err) {
            console.warn("Audio file is larger than LocalStorage limits, storing in session memory instead.")
          }
        }
      }
      reader.readAsDataURL(file)
    } catch (e) {}

    // Auto set the sound mode to custom uploaded sound
    handleSetSoundMode("custom")
  }

  // Handle interactive YouTube alarm configuration
  const handleYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const id = extractYoutubeId(ytUrl)
    if (id) {
      setActiveYtId(id)
      try {
        localStorage.setItem("clockivo_youtube_link", ytUrl)
        localStorage.setItem("clockivo_youtube_id", id)
      } catch (err) {}
      handleSetSoundMode("youtube")
    } else {
      alert("Invalid YouTube Link. Please copy and paste a direct video URL.")
    }
  }

  // Set standard vs uploaded vs youtube configuration
  const handleSetSoundMode = (mode: "standard" | "custom" | "youtube") => {
    setSoundMode(mode)
    const settings = getSoundSettings()
    
    let targetType = "sine"
    if (mode === "custom") targetType = "custom"
    if (mode === "youtube") targetType = "youtube"

    setSoundSettings({
      ...settings,
      type: targetType
    })
    window.dispatchEvent(new Event("clockivo_sound_updated"))
  }

  // Toggle local custom file player
  const togglePlay = () => {
    if (!audioRef.current || !customAudioUrl) return

    // Initialize audio analyzer nodes on first actual user interaction/play
    if (!audioContextRef.current) {
      setupVisualizerNode()
    }

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
        startVisualizerDrawing()
      }).catch(err => {
        console.warn("Audio playback aborted by browser security policy:", err)
      })
    }
  }

  // Wire Web Audio API analyzer block
  const setupVisualizerNode = () => {
    if (!audioRef.current || typeof window === "undefined") return

    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
      const ctx = new AudioContextClass()
      audioContextRef.current = ctx

      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      analyserRef.current = analyser

      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)
      sourceRef.current = source
    } catch (e) {
      console.warn("Failed to mount custom Web Audio node:", e)
    }
  }

  // Start Canvas animation looping
  const startVisualizerDrawing = () => {
    if (!canvasRef.current || !analyserRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const analyser = analyserRef.current
    const bufferLength = analyser.frequencyBinCount
    const dataArray = new Uint8Array(bufferLength)

    const draw = () => {
      animationFrameRef.current = requestAnimationFrame(draw)
      analyser.getByteFrequencyData(dataArray)

      // Background reset
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = "rgba(15, 23, 42, 0.3)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      if (visualizerType === "bars") {
        // Option A: Clean horizontal bars
        const barWidth = (canvas.width / bufferLength) * 1.6
        let barHeight
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          barHeight = (dataArray[i] / 255) * canvas.height * 0.8
          
          // Color gradient blending primary theme colors
          const r = Math.floor(59 + (barHeight * 0.3))
          const g = Math.floor(130 + (barHeight * 0.1))
          const b = Math.floor(246 - (barHeight * 0.2))

          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
          ctx.fillRect(x, canvas.height - barHeight, barWidth - 1, barHeight)

          x += barWidth + 1
        }
      } else if (visualizerType === "wave") {
        // Option B: Dynamic waving neon line
        ctx.lineWidth = 3
        ctx.strokeStyle = "#3b82f6"
        ctx.beginPath()

        const sliceWidth = canvas.width / bufferLength
        let x = 0

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 128.0
          const y = (v * canvas.height) / 2

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }

          x += sliceWidth
        }

        ctx.lineTo(canvas.width, canvas.height / 2)
        ctx.stroke()
      } else {
        // Option C: Pulsing circular ring
        const centerX = canvas.width / 2
        const centerY = canvas.height / 2
        const baseRadius = Math.min(canvas.width, canvas.height) * 0.25

        ctx.strokeStyle = "#60a5fa"
        ctx.lineWidth = 2
        ctx.beginPath()

        for (let i = 0; i < bufferLength; i += 2) {
          const angle = (i / bufferLength) * Math.PI * 2
          const amp = (dataArray[i] / 255) * 45
          const r = baseRadius + amp
          const x = centerX + Math.cos(angle) * r
          const y = centerY + Math.sin(angle) * r

          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.stroke()

        // Core pulsating neon circle
        ctx.fillStyle = "rgba(59, 130, 246, 0.15)"
        ctx.beginPath()
        ctx.arc(centerX, centerY, baseRadius + (dataArray[10]/255)*12, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    draw()
  }

  // Render a simulated visualizer with synthesized/random ambient pulses when audio analysis is inactive
  useEffect(() => {
    if (!isPlaying && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      let frameId: number
      const mockBuffer: number[] = Array.from({ length: 40 }).map(() => Math.random() * 20)

      const drawMock = () => {
        frameId = requestAnimationFrame(drawMock)
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = "rgba(15, 23, 42, 0.4)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const barWidth = canvas.width / mockBuffer.length
        mockBuffer.forEach((val, index) => {
          // Slow continuous organic breathing wave
          const wave = Math.sin((Date.now() / 400) + index * 0.25) * 12 + 15
          ctx.fillStyle = "rgba(71, 85, 105, 0.25)"
          ctx.fillRect(index * barWidth, canvas.height - wave, barWidth - 2, wave)
        })
      }
      
      drawMock()
      return () => cancelAnimationFrame(frameId)
    }
  }, [isPlaying, visualizerType])

  return (
    <Card className="p-5 sm:p-8 border border-border/40 bg-card rounded-3xl shadow-xl w-full max-w-xl mx-auto flex flex-col gap-6 mt-6 md:col-span-2">
      
      {/* Visual Identity Title banner */}
      <div className="flex flex-col gap-1.5 border-b border-border/45 pb-4">
        <div className="flex items-center gap-2 text-foreground">
          <Sparkles className="w-5 h-5 text-primary rotate-12" />
          <h2 className="text-lg font-bold tracking-tight">Clockivo Media & Ambient Center</h2>
        </div>
        <p className="text-xs text-muted-foreground">
          Custom audio uploader with real-time waveform visualizers and background streaming interfaces.
        </p>
      </div>

      {/* Mode selectors */}
      <div className="grid grid-cols-3 gap-2 bg-muted/30 p-1.5 rounded-xl border border-border/20">
        {[
          { key: "standard", label: "Beep Tone", icon: Volume2 },
          { key: "custom", label: "Custom File", icon: Music },
          { key: "youtube", label: "YouTube Player", icon: Youtube },
        ].map((item) => {
          const Icon = item.icon
          const isActive = soundMode === item.key
          return (
            <button
              key={item.key}
              onClick={() => handleSetSoundMode(item.key as any)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2 px-1 sm:px-3 text-xs font-bold rounded-lg transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:bg-muted/70 hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      {/* Conditionally reveal alert descriptions */}
      {soundMode === "standard" && (
        <div className="p-4 rounded-xl border bg-muted/10 text-xs text-muted-foreground flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-foreground">Standard Beep Activator Active</span>
            <p>Your alarms will trigger traditional soft synthetic sine waves. Zero data required.</p>
          </div>
          <Volume2 className="w-10 h-10 text-primary/20 shrink-0" />
        </div>
      )}

      {soundMode === "custom" && (
        <div className="flex flex-col gap-4">
          {/* Drag & Drop File Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`cursor-pointer transition-all border-2 border-dashed rounded-2xl p-6 text-center flex flex-col items-center justify-center gap-3 bg-muted/10 hover:bg-muted/30 ${
              isDragOver ? "border-primary bg-primary/5 scale-[1.01]" : "border-border"
            }`}
            onClick={() => document.getElementById("audio-hub-file-upload")?.click()}
          >
            <input
              id="audio-hub-file-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileInput}
            />
            <div className="p-3 rounded-full bg-primary/10 text-primary">
              <Upload className="w-5 h-5" />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-sm font-semibold text-foreground">
                {uploadedFileName ? "Replace custom audio track" : "Upload your ringtone / MP3 track"}
              </span>
              <p className="text-xs text-muted-foreground max-w-xs">
                Drag & drop your files here, or click to open dashboard. Runs fully locally in cache.
              </p>
            </div>
            {uploadedFileName && (
              <span className="mt-1 px-3 py-1 font-mono text-[10px] bg-primary/5 text-primary border border-primary/20 rounded-md max-w-full truncate">
                {uploadedFileName}
              </span>
            )}
          </div>

          {/* Canvas Wave Visualizer */}
          <div className="relative rounded-2xl overflow-hidden border border-border/40 bg-slate-950 h-32 flex flex-col justify-end">
            <canvas
              ref={canvasRef}
              width={400}
              height={128}
              className="w-full h-full block"
            />
            
            {/* Play/Pause float controls on visualizer */}
            {customAudioUrl && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px] opacity-0 hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="rounded-full shadow-lg" onClick={togglePlay}>
                  {isPlaying ? <Pause className="w-5 h-5 text-primary" /> : <Play className="w-5 h-5 text-primary" />}
                </Button>
              </div>
            )}

            {/* Visualizer type selector tabs */}
            <div className="absolute bottom-2 right-2 flex bg-black/70 rounded-lg p-0.5 border border-white/5 gap-1">
              {["bars", "wave", "circle"].map((type) => (
                <button
                  key={type}
                  onClick={() => setVisualizerType(type as any)}
                  className={`px-2 py-0.5 text-[9px] font-bold rounded-md uppercase transition-colors ${
                    visualizerType === type ? "bg-primary text-primary-foreground" : "text-white/50 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {soundMode === "youtube" && (
        <div className="flex flex-col gap-4">
          {isOffline ? (
            <div className="p-5 border border-dashed rounded-xl bg-destructive/5 text-destructive flex flex-col items-center gap-2 text-center text-xs">
              <WifiOff className="w-8 h-8" />
              <div>
                <span className="font-bold">Offline Connection Detected</span>
                <p className="text-muted-foreground mt-1 max-w-xs">YouTube features require active internet routing. Please check your system link before streaming.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleYoutubeSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label htmlFor="yt-link-val">Paste YouTube Video Link</Label>
                <div className="flex gap-2">
                  <Input
                    id="yt-link-val"
                    value={ytUrl}
                    onChange={(e) => setYtUrl(e.target.value)}
                    placeholder="E.g., https://www.youtube.com/watch?v=5qap5aO4i9A"
                    className="flex-1 rounded-xl"
                  />
                  <Button type="submit" className="rounded-xl flex gap-1 font-bold">
                    <Youtube className="w-4 h-4" /> Loop Audio
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Supports full streaming background. Video parameters are saved locally so loops open during alarm trigger events.
                </p>
              </div>
            </form>
          )}

          {activeYtId && !isOffline && (
            <div className="p-5 rounded-3xl border border-primary/20 bg-linear-to-b from-primary/5 to-primary/10 shadow-lg flex flex-col gap-5">
              
              {/* Invisible background stream engine element keeping sound active */}
              <iframe
                ref={ytIframeRef}
                src={`https://www.youtube.com/embed/${activeYtId}?enablejsapi=1&autoplay=1&loop=1&playlist=${activeYtId}&controls=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                title="YouTube background play engine"
                allow="autoplay; encrypted-media"
                style={{
                  position: "absolute",
                  width: "1px",
                  height: "1px",
                  opacity: 0,
                  pointerEvents: "none",
                  top: "-1000px",
                  left: "-1000px",
                  border: "none",
                }}
                frameBorder="0"
              />

              {/* Deck Badge Header */}
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center animate-pulse">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-foreground">YouTube Background Audio Player</span>
                    <span className="text-[10px] font-mono text-muted-foreground/80 truncate max-w-[200px]">ID: {activeYtId}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 font-mono text-[9px] font-extrabold text-primary uppercase animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  Visual-Free Stream
                </div>
              </div>

              {/* Progress Tracker Slider with formatted times */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                  <span>{formatTime(ytCurrentTime)}</span>
                  <span>{formatTime(ytDuration)}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={ytDuration || 100}
                  value={ytCurrentTime}
                  onChange={(e) => handleYtSeek(Number(e.target.value))}
                  className="w-full h-1 bg-muted/55 rounded-lg appearance-none cursor-pointer accent-primary border-none focus:outline-hidden"
                />
              </div>

              {/* Speed rate controls block */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground/90">
                  <span className="flex items-center gap-1"><SlidersHorizontal className="w-3 h-3 text-primary/70" /> Playback Speed / Fast Rate</span>
                  <span className="font-mono text-primary font-bold">{ytSpeed}x</span>
                </div>
                <div className="grid grid-cols-5 gap-1">
                  {[0.5, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => handleYtSpeedChange(rate)}
                      className={`py-1 text-[10px] font-mono font-bold rounded-md border transition-all ${
                        ytSpeed === rate
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background/40 hover:bg-background/85 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {rate === 1.0 ? "Normal" : `${rate}x`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Playback Controls & Vol Bar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 border-t border-primary/10 pt-4 justify-between">
                
                {/* Control buttons block */}
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full border-border/80 hover:bg-muted/50"
                    title="Rewind 10s"
                    onClick={() => handleYtSeek(Math.max(0, ytCurrentTime - 10))}
                  >
                    <Rewind className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                  
                  <Button
                    type="button"
                    variant={ytPlaying ? "default" : "secondary"}
                    className="w-11 h-11 rounded-full shadow-md shrink-0 flex items-center justify-center p-0"
                    onClick={handleYtPlayToggle}
                  >
                    {ytPlaying ? (
                      <Pause className="w-5 h-5 text-primary-foreground fill-primary-foreground" />
                    ) : (
                      <Play className="w-5 h-5 text-foreground fill-foreground ml-0.5" />
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 rounded-full border-border/80 hover:bg-muted/50"
                    title="Forward 10s"
                    onClick={() => handleYtSeek(Math.min(ytDuration || 9999, ytCurrentTime + 10))}
                  >
                    <FastForward className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                  </Button>
                </div>

                {/* Volume slider control block */}
                <div className="flex items-center gap-2 bg-background/35 px-4 py-2 border border-border/40 rounded-full w-full sm:w-auto sm:max-w-[200px] flex-1">
                  <button
                    type="button"
                    onClick={handleYtMuteToggle}
                    className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                  >
                    {ytMuted || ytVolume === 0 ? (
                      <VolumeX className="w-4 h-4 text-muted-foreground" />
                    ) : (
                      <Volume2 className="w-4 h-4 text-primary" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={ytMuted ? 0 : ytVolume}
                    onChange={(e) => handleYtVolumeChange(Number(e.target.value))}
                    className="w-full h-1 bg-muted/60 rounded-lg appearance-none cursor-pointer accent-primary animate-none"
                    title="Volume"
                  />
                  <span className="text-[10px] font-mono min-w-[24px] text-right font-medium text-muted-foreground/90">
                    {ytMuted ? 0 : ytVolume}%
                  </span>
                </div>

              </div>

              {/* Info text box */}
              <div className="text-[10px] text-muted-foreground/80 leading-normal bg-card/65 p-2 rounded-xl border border-border/20">
                ⚠️ <strong>Sound Info:</strong> For custom alarm streaming, browsing contexts require clicking on the screen initially to authorize media protocols. Clockivo must remain in an open active background tab to keep timers ticking and YouTube sounding cleanly.
              </div>
            </div>
          )}
        </div>
      )}

    </Card>
  )
}
