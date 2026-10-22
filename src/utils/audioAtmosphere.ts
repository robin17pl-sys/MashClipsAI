/**
 * Subtle cinematic ambient drone generator using the browser Web Audio API.
 * Provides an authentic film studio soundscape when enabled by user click.
 */

class AudioAtmosphereEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtxClass) return;
    this.ctx = new AudioCtxClass();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.play();
      return true;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public play() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stop();

    const now = this.ctx.currentTime;
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.06, now + 2);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(320, now);
    this.filter.Q.setValueAtTime(3, now);

    // Warm sub-bass cinematic frequencies (D minor drone: 73.4Hz D2, 110Hz A2, 146.8Hz D3)
    const freqs = [73.41, 110.0, 146.83, 220.0];
    this.oscillators = freqs.map((f, i) => {
      const osc = this.ctx!.createOscillator();
      const oscGain = this.ctx!.createGain();

      osc.type = i === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, now);
      // subtle detune for analog cinematic warmth
      osc.detune.setValueAtTime((i - 1.5) * 4, now);

      oscGain.gain.setValueAtTime(i === 0 ? 0.8 : 0.35, now);

      osc.connect(oscGain);
      oscGain.connect(this.filter!);
      osc.start(now);
      return osc;
    });

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.isPlaying) return;

    const now = this.ctx.currentTime;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
    }

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // ignore
        }
      });
      this.oscillators = [];
      this.isPlaying = false;
    }, 1300);
  }

  // Quick sound click feedback for interactions
  public playClickBeep(freq = 440) {
    if (!this.isPlaying) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch {
      // ignore
    }
  }
}

export const audioAtmosphere = new AudioAtmosphereEngine();
