"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Settings2, Volume2 } from "lucide-react"
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

const playAlarmSound = () => {
    if (audioLib && typeof audioLib.playAlarmSound === "function") {
        audioLib.playAlarmSound()
    }
}

export function SoundSettings() {
    const [volume, setVolume] = useState(50)
    const [type, setType] = useState("sine")
    const [speed, setSpeed] = useState("normal")
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const s = getSoundSettings()
        setTimeout(() => {
            setVolume(s.volume ?? 50)
            setType(s.type || "sine")
            setSpeed(s.speed || "normal")
        }, 0)
    }, [])

    const handleSave = (v: number, t: string, s: string) => {
        setSoundSettings({ volume: v, type: t, speed: s })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 gap-2 text-muted-foreground">
                <Settings2 className="w-4 h-4" /> Sound Settings
            </DialogTrigger>
            <DialogContent className="sm:max-w-xs">
                <DialogHeader>
                    <DialogTitle>Sound Settings</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-6 py-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <Label>Volume: {volume}%</Label>
                            <Volume2 className="w-4 h-4 text-muted-foreground" />
                        </div>
                        <Slider 
                            value={[volume]} 
                            onValueChange={(val) => {
                                const v = Array.isArray(val) ? val[0] : val;
                                setVolume(v);
                                handleSave(v, type, speed);
                            }} 
                            max={100} 
                            step={1} 
                        />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                        <Label>Sound Type</Label>
                        <Select 
                            value={type} 
                            onValueChange={(val) => {
                                if(val) {
                                  setType(val);
                                  handleSave(volume, val, speed);
                                }
                            }}
                        >
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sine">Sine Wave (Soft)</SelectItem>
                                <SelectItem value="square">Square Wave (Harsh)</SelectItem>
                                <SelectItem value="sawtooth">Sawtooth Wave</SelectItem>
                                <SelectItem value="triangle">Triangle Wave</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <Label>Repeat Speed</Label>
                        <Select 
                            value={speed} 
                            onValueChange={(val) => {
                                if(val) {
                                  setSpeed(val);
                                  handleSave(volume, type, val);
                                }
                            }}
                        >
                            <SelectTrigger><SelectValue/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="slow">Slow</SelectItem>
                                <SelectItem value="normal">Normal</SelectItem>
                                <SelectItem value="fast">Fast</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button variant="secondary" onClick={() => playAlarmSound()} className="mt-2 w-full gap-2">
                        <Volume2 className="w-4 h-4"/> Test Sound
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
