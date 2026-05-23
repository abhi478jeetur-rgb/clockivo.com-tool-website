let globalAudioContext: AudioContext | null = null;
let audioUnlockedFlag = false;

export const getSoundSettings = () => {
    if (typeof window === 'undefined') return { volume: 50, type: "sine", speed: "normal" };
    try {
        const saved = localStorage.getItem("clockivo_sound");
        if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { volume: 50, type: "sine", speed: "normal" };
}

export const setSoundSettings = (settings: any) => {
    localStorage.setItem("clockivo_sound", JSON.stringify(settings));
}

export const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  if (!globalAudioContext) {
    try {
      globalAudioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }
  return globalAudioContext;
};

export const isAudioUnlocked = (): boolean => {
  if (typeof window === 'undefined') return false;
  const ctx = getAudioContext();
  if (ctx && ctx.state === "running") {
    audioUnlockedFlag = true;
  }
  return audioUnlockedFlag;
};

export const unlockAudio = async (): Promise<boolean> => {
  if (typeof window === 'undefined') return false;
  
  if (audioUnlockedFlag) return true;

  try {
    // 1. Unlock Web Audio API Context
    const ctx = getAudioContext();
    if (ctx) {
      if (ctx.state === "suspended") {
        await ctx.resume();
      }
    }

    // 2. Unlock HTML5 Audio element constraints (using silent inline wav)
    const silentWav = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAAAA==";
    const dummyAudio = new Audio(silentWav);
    await dummyAudio.play();

    // 3. Play a very low-volume short tone via Oscillator to fully activate AudioContext
    if (ctx) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      osc.type = "sine";
      osc.frequency.setValueAtTime(1000, ctx.currentTime);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }

    audioUnlockedFlag = true;
    window.dispatchEvent(new Event("audioUnlockedStateChanged"));
    console.log("🔊 Clockivo: Audio systems unlocked via user gesture successfully!");
    return true;
  } catch (err) {
    console.warn("🔊 Clockivo: Autoplay unlock failed or pending gesture:", err);
    return false;
  }
};

export const playBeep = (durationMs = 500, frequency = 800, type: OscillatorType | string = "sine", volume = 0.5) => {
  try {
    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    // Auto-resume if suspended inside user interaction loop
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type as OscillatorType;
    oscillator.frequency.value = frequency;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    oscillator.start();
    setTimeout(() => {
      try {
        oscillator.stop();
      } catch (e) {}
    }, durationMs);
  } catch (e) {
    console.warn("Web Audio API error", e);
  }
};

export const playAlarmSound = () => {
    const settings = getSoundSettings();
    let volume = settings.volume / 100;
    if (volume === 0) volume = 0.01;
    const type = settings.type || "sine";
    const speed = settings.speed || "normal";
    
    let delay = 300;
    if (speed === "fast") delay = 150;
    if (speed === "slow") delay = 600;

    playBeep(200, 800, type, volume);
    setTimeout(() => playBeep(200, 800, type, volume), delay);
    setTimeout(() => playBeep(200, 800, type, volume), delay * 2);
    setTimeout(() => playBeep(200, 800, type, volume), delay * 3);
};

export const playFeedbackClick = () => {
  // Safe no-op to completely eliminate any potential UI errors or audio interface conflicts
};

