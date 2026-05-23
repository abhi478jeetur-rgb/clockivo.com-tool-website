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

export const playBeep = (durationMs = 500, frequency = 800, type: OscillatorType | string = "sine", volume = 0.5) => {
  try {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = type as OscillatorType;
    oscillator.frequency.value = frequency;

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);

    oscillator.start();
    setTimeout(() => {
      oscillator.stop();
      audioCtx.close();
    }, durationMs);
  } catch (e) {
    console.warn("Web Audio API not supported", e);
  }
};

export const playAlarmSound = () => {
    const settings = getSoundSettings();
    let volume = settings.volume / 100;
    if (volume === 0) volume = 0.01; // Avoid completely silent if intended to test, but user can mute. Let's strictly use formula.
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
