// Sound Manager - Call of Duty inspired sound effects using Web Audio API
// All sounds are generated programmatically using oscillators and noise

class SoundManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private muted: boolean = false;
  private volume: number = 0.3;
  private lastPlayTime: Map<string, number> = new Map();
  private debounceMs: number = 50;

  private shouldPlay(soundId: string): boolean {
    const now = Date.now();
    const lastTime = this.lastPlayTime.get(soundId) || 0;
    if (now - lastTime < this.debounceMs) return false;
    this.lastPlayTime.set(soundId, now);
    return true;
  }

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  private getOutput(): GainNode {
    this.getContext();
    return this.masterGain!;
  }

  setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : this.volume;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.masterGain) {
      this.masterGain.gain.value = this.muted ? 0 : this.volume;
    }
    return this.muted;
  }

  isMuted() {
    return this.muted;
  }

  // Military radio click - short, sharp
  playUIClick() {
    if (this.muted || !this.shouldPlay('click')) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1800, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.04);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  // Hover sound - subtle tick
  playUIHover() {
    if (this.muted || !this.shouldPlay('hover')) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(2200, now);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.03);
  }

  // Character/operator select confirmation - dramatic hit
  playSelectConfirm() {
    if (this.muted || !this.shouldPlay('confirm')) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    // Low impact hit
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(80, now);
    osc1.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    osc1.connect(gain1);
    gain1.connect(out);
    osc1.start(now);
    osc1.stop(now + 0.4);

    // High stinger
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(800, now);
    osc2.frequency.setValueAtTime(600, now + 0.05);
    osc2.frequency.setValueAtTime(400, now + 0.1);
    gain2.gain.setValueAtTime(0.2, now);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc2.connect(gain2);
    gain2.connect(out);
    osc2.start(now);
    osc2.stop(now + 0.2);

    // Noise burst for impact texture
    this.playNoiseBurst(0.15, 0.12);
  }

  // Mission deploy / transition whoosh
  playDeploy() {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    // Rising sweep
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, now);
    osc.frequency.exponentialRampToValueAtTime(2000, now + 0.3);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.setValueAtTime(0.2, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.5);

    // Sub bass thump
    const sub = ctx.createOscillator();
    const subGain = ctx.createGain();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(60, now + 0.25);
    sub.frequency.exponentialRampToValueAtTime(20, now + 0.6);
    subGain.gain.setValueAtTime(0, now);
    subGain.gain.setValueAtTime(0.3, now + 0.25);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    sub.connect(subGain);
    subGain.connect(out);
    sub.start(now + 0.25);
    sub.stop(now + 0.7);
  }

  // Boot / loading sequence beep pattern
  playBootBeep(pitch: number = 1) {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(1200 * pitch, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Section transition - tactical swoosh
  playSectionTransition() {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.15);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Ambient radio static (short burst)
  playRadioStatic() {
    if (this.muted) return;
    this.playNoiseBurst(0.08, 0.2);
  }

  // HUD notification ping
  playNotification() {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    [0, 0.1].forEach((delay, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(i === 0 ? 880 : 1100, now + delay);
      gain.gain.setValueAtTime(0.1, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.12);
      osc.connect(gain);
      gain.connect(out);
      osc.start(now + delay);
      osc.stop(now + delay + 0.12);
    });
  }

  // Countdown tick
  playCountdownTick() {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1000, now);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  // Error / denied
  playError() {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    [0, 0.12].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now + delay);
      gain.gain.setValueAtTime(0.12, now + delay);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.1);
      osc.connect(gain);
      gain.connect(out);
      osc.start(now + delay);
      osc.stop(now + delay + 0.1);
    });
  }

  // Ambient background hum (for loading screen)
  playAmbientHum(duration: number = 3) {
    if (this.muted) return;
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(55, now);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.5);
    gain.gain.setValueAtTime(0.06, now + duration - 0.5);
    gain.gain.linearRampToValueAtTime(0, now + duration);
    osc.connect(gain);
    gain.connect(out);
    osc.start(now);
    osc.stop(now + duration);
  }

  private playNoiseBurst(vol: number, dur: number) {
    const ctx = this.getContext();
    const out = this.getOutput();
    const now = ctx.currentTime;
    const bufferSize = ctx.sampleRate * dur;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.5;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.Q.setValueAtTime(0.5, now);
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(out);
    source.start(now);
    source.stop(now + dur);
  }
}

// Singleton
const soundManager = new SoundManager();
export default soundManager;
