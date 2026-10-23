// ============================================
// MindMate — High-Fidelity Ambient Audio Synthesizer
// Realistic, distinct procedural audio generation
// Completely avoids generic white-noise static
// ============================================

class AmbientSynthesizer {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeGenerators: Map<string, { gain: GainNode; stop: () => void }> = new Map();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMasterVolume(vol: number) {
    this.initContext();
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
    }
  }

  public setTrackVolume(trackId: string, vol: number) {
    const gen = this.activeGenerators.get(trackId);
    if (gen && this.ctx) {
      gen.gain.gain.setTargetAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime, 0.05);
    }
  }

  public playTrack(trackId: string, volume: number = 0.7) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    if (this.activeGenerators.has(trackId)) {
      this.setTrackVolume(trackId, volume);
      return;
    }

    const trackGain = this.ctx.createGain();
    trackGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    trackGain.connect(this.masterGain);

    let stopFn: () => void = () => {};

    switch (trackId) {
      case 'rain':
        stopFn = this.createRain(trackGain);
        break;
      case 'thunder':
        stopFn = this.createThunder(trackGain);
        break;
      case 'wind':
        stopFn = this.createWind(trackGain);
        break;
      case 'ocean':
        stopFn = this.createOcean(trackGain);
        break;
      case 'river':
        stopFn = this.createRiver(trackGain);
        break;
      case 'waterfall':
        stopFn = this.createWaterfall(trackGain);
        break;
      case 'forest':
        stopFn = this.createForest(trackGain);
        break;
      case 'birds':
        stopFn = this.createBirdChirps(trackGain);
        break;
      case 'crickets':
        stopFn = this.createCrickets(trackGain);
        break;
      case 'night':
        stopFn = this.createNight(trackGain);
        break;
      case 'piano':
        stopFn = this.createAmbientChords(trackGain);
        break;
      case 'flute':
        stopFn = this.createGentleFlute(trackGain);
        break;
      default:
        stopFn = this.createRain(trackGain);
    }

    this.activeGenerators.set(trackId, { gain: trackGain, stop: stopFn });
  }

  public stopTrack(trackId: string) {
    const gen = this.activeGenerators.get(trackId);
    if (gen) {
      gen.stop();
      this.activeGenerators.delete(trackId);
    }
  }

  public stopAll() {
    this.activeGenerators.forEach(gen => gen.stop());
    this.activeGenerators.clear();
  }

  public isTrackPlaying(trackId: string): boolean {
    return this.activeGenerators.has(trackId);
  }

  // --- Acoustic Buffers: Pink & Brown Noise for organic natural sound ---
  private createPinkNoiseBuffer(duration = 6): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  private createBrownNoiseBuffer(duration = 6): AudioBuffer {
    if (!this.ctx) throw new Error('No audio context');
    const bufferSize = this.ctx.sampleRate * duration;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain scaling for warmth
    }
    return buffer;
  }

  // ============================================
  // 1. GENTLE RAIN (Pink noise bed + distinct randomized raindrop patter)
  // ============================================
  private createRain(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;

    // Bed of soft pink rain
    const pinkSource = this.ctx.createBufferSource();
    pinkSource.buffer = this.createPinkNoiseBuffer(6);
    pinkSource.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.5, this.ctx.currentTime);

    pinkSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(dest);
    pinkSource.start();

    // Individual water droplet taps on window/leaves
    const dropTimer = setInterval(() => {
      if (!isRunning || !this.ctx) return;
      const dropOsc = this.ctx.createOscillator();
      const dropGain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      // Realistic water droplet frequency shift
      const freq = 1200 + Math.random() * 1600;
      dropOsc.type = 'sine';
      dropOsc.frequency.setValueAtTime(freq, now);
      dropOsc.frequency.exponentialRampToValueAtTime(freq * 0.6, now + 0.04);

      dropGain.gain.setValueAtTime(0.06 * Math.random(), now);
      dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

      dropOsc.connect(dropGain);
      dropGain.connect(dest);
      dropOsc.start(now);
      dropOsc.stop(now + 0.045);
    }, 70 + Math.random() * 60);

    return () => {
      isRunning = false;
      clearInterval(dropTimer);
      try {
        pinkSource.stop();
        pinkSource.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 2. OCEAN WAVES (Deep brown tide swell + receding wave foam)
  // ============================================
  private createOcean(dest: GainNode): () => void {
    if (!this.ctx) return () => {};

    // Low-end swell
    const brownSource = this.ctx.createBufferSource();
    brownSource.buffer = this.createBrownNoiseBuffer(6);
    brownSource.loop = true;

    const swellFilter = this.ctx.createBiquadFilter();
    swellFilter.type = 'lowpass';
    swellFilter.frequency.setValueAtTime(280, this.ctx.currentTime);

    const swellGain = this.ctx.createGain();
    swellGain.gain.setValueAtTime(0.3, this.ctx.currentTime);

    // 7.5 second rhythmic wave cycle
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.13, this.ctx.currentTime); // ~7.7s period

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(0.4, this.ctx.currentTime);

    const filterMod = this.ctx.createGain();
    filterMod.gain.setValueAtTime(320, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(swellGain.gain);
    lfo.connect(filterMod);
    filterMod.connect(swellFilter.frequency);

    brownSource.connect(swellFilter);
    swellFilter.connect(swellGain);
    swellGain.connect(dest);

    // Wave foam hiss layer
    const foamSource = this.ctx.createBufferSource();
    foamSource.buffer = this.createPinkNoiseBuffer(6);
    foamSource.loop = true;

    const foamFilter = this.ctx.createBiquadFilter();
    foamFilter.type = 'bandpass';
    foamFilter.frequency.setValueAtTime(1800, this.ctx.currentTime);
    foamFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

    const foamGain = this.ctx.createGain();
    foamGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    lfoGain.connect(foamGain.gain);

    foamSource.connect(foamFilter);
    foamFilter.connect(foamGain);
    foamGain.connect(dest);

    brownSource.start();
    foamSource.start();
    lfo.start();

    return () => {
      try {
        brownSource.stop();
        foamSource.stop();
        lfo.stop();
        brownSource.disconnect();
        foamSource.disconnect();
        lfo.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 3. FLOWING RIVER (Bubbling, rippling liquid eddies)
  // ============================================
  private createRiver(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;

    // Pink noise base for water stream
    const pink = this.ctx.createBufferSource();
    pink.buffer = this.createPinkNoiseBuffer(5);
    pink.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(750, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.0, this.ctx.currentTime);

    pink.connect(filter);
    filter.connect(dest);
    pink.start();

    // Fast bubbling droplet modulation
    const bubbleTimer = setInterval(() => {
      if (!isRunning || !this.ctx) return;
      const bOsc = this.ctx.createOscillator();
      const bGain = this.ctx.createGain();
      const now = this.ctx.currentTime;

      const baseFreq = 500 + Math.random() * 600;
      bOsc.type = 'sine';
      bOsc.frequency.setValueAtTime(baseFreq, now);
      bOsc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.06);

      bGain.gain.setValueAtTime(0.05 * Math.random(), now);
      bGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      bOsc.connect(bGain);
      bGain.connect(dest);
      bOsc.start(now);
      bOsc.stop(now + 0.065);
    }, 90);

    return () => {
      isRunning = false;
      clearInterval(bubbleTimer);
      try {
        pink.stop();
        pink.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 4. WATERFALL (Heavy roaring brown bass + aerated mist shimmer)
  // ============================================
  private createWaterfall(dest: GainNode): () => void {
    if (!this.ctx) return () => {};

    // Heavy bass roar
    const brown = this.ctx.createBufferSource();
    brown.buffer = this.createBrownNoiseBuffer(6);
    brown.loop = true;

    const lowFilter = this.ctx.createBiquadFilter();
    lowFilter.type = 'lowpass';
    lowFilter.frequency.setValueAtTime(220, this.ctx.currentTime);

    const lowGain = this.ctx.createGain();
    lowGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

    brown.connect(lowFilter);
    lowFilter.connect(lowGain);
    lowGain.connect(dest);

    // Mist spray shimmer
    const pink = this.ctx.createBufferSource();
    pink.buffer = this.createPinkNoiseBuffer(6);
    pink.loop = true;

    const highFilter = this.ctx.createBiquadFilter();
    highFilter.type = 'highpass';
    highFilter.frequency.setValueAtTime(1800, this.ctx.currentTime);

    const highGain = this.ctx.createGain();
    highGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    pink.connect(highFilter);
    highFilter.connect(highGain);
    highGain.connect(dest);

    brown.start();
    pink.start();

    return () => {
      try {
        brown.stop();
        pink.stop();
        brown.disconnect();
        pink.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 5. DISTANT THUNDER (Deep 40Hz sub-bass rolling reverberation)
  // ============================================
  private createThunder(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;

    const triggerBoom = () => {
      if (!isRunning || !this.ctx) return;
      const now = this.ctx.currentTime;

      const brown = this.ctx.createBufferSource();
      brown.buffer = this.createBrownNoiseBuffer(4);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(85, now);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.55, now + 0.5);
      g.gain.linearRampToValueAtTime(0.2, now + 1.6);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 4.5);

      brown.connect(filter);
      filter.connect(g);
      g.connect(dest);

      brown.start(now);

      const next = 10000 + Math.random() * 12000;
      setTimeout(triggerBoom, next);
    };

    triggerBoom();

    return () => {
      isRunning = false;
    };
  }

  // ============================================
  // 6. SOFT WIND (Organic howling gusts & gentle drafts)
  // ============================================
  private createWind(dest: GainNode): () => void {
    if (!this.ctx) return () => {};

    const brown = this.ctx.createBufferSource();
    brown.buffer = this.createBrownNoiseBuffer(6);
    brown.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

    // Two slow LFOs for gust variations
    const lfo1 = this.ctx.createOscillator();
    lfo1.type = 'sine';
    lfo1.frequency.setValueAtTime(0.08, this.ctx.currentTime);

    const lfo1Gain = this.ctx.createGain();
    lfo1Gain.gain.setValueAtTime(180, this.ctx.currentTime);

    lfo1.connect(lfo1Gain);
    lfo1Gain.connect(filter.frequency);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.45, this.ctx.currentTime);

    brown.connect(filter);
    filter.connect(windGain);
    windGain.connect(dest);

    brown.start();
    lfo1.start();

    return () => {
      try {
        brown.stop();
        lfo1.stop();
        brown.disconnect();
        lfo1.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 7. MORNING BIRDS (Natural multi-note melodic trills)
  // ============================================
  private createBirdChirps(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;

    const chirpSequence = () => {
      if (!isRunning || !this.ctx) return;
      const now = this.ctx.currentTime;
      const count = 2 + Math.floor(Math.random() * 3);

      for (let i = 0; i < count; i++) {
        const offset = now + i * 0.14;
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();

        osc.type = 'sine';
        const startFreq = 2600 + Math.random() * 1000;
        osc.frequency.setValueAtTime(startFreq, offset);
        osc.frequency.exponentialRampToValueAtTime(startFreq + 600, offset + 0.05);
        osc.frequency.exponentialRampToValueAtTime(startFreq - 200, offset + 0.11);

        g.gain.setValueAtTime(0.001, offset);
        g.gain.linearRampToValueAtTime(0.06, offset + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, offset + 0.11);

        osc.connect(g);
        g.connect(dest);
        osc.start(offset);
        osc.stop(offset + 0.12);
      }

      const next = 2200 + Math.random() * 3500;
      setTimeout(chirpSequence, next);
    };

    setTimeout(chirpSequence, 800);

    return () => {
      isRunning = false;
    };
  }

  // ============================================
  // 8. EVENING CRICKETS (Authentic 4.8kHz stridulation bursts)
  // ============================================
  private createCrickets(dest: GainNode): () => void {
    if (!this.ctx) return () => {};

    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(4600, this.ctx.currentTime);

    // Stridulation rhythm AM
    const mod = this.ctx.createOscillator();
    mod.type = 'square';
    mod.frequency.setValueAtTime(14, this.ctx.currentTime);

    const modGain = this.ctx.createGain();
    modGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    mod.connect(modGain.gain);
    osc.connect(modGain);
    modGain.connect(dest);

    osc.start();
    mod.start();

    return () => {
      try {
        osc.stop();
        mod.stop();
        osc.disconnect();
        mod.disconnect();
      } catch {}
    };
  }

  // ============================================
  // 9. FOREST AMBIENCE (Rustling leaves + gentle breeze + songbirds)
  // ============================================
  private createForest(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    const stopWind = this.createWind(dest);
    const stopBirds = this.createBirdChirps(dest);
    return () => {
      stopWind();
      stopBirds();
    };
  }

  // ============================================
  // 10. NIGHT AMBIENCE (Deep nocturnal breeze + distant crickets)
  // ============================================
  private createNight(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    const stopCrickets = this.createCrickets(dest);
    const stopWind = this.createWind(dest);
    return () => {
      stopCrickets();
      stopWind();
    };
  }

  // ============================================
  // 11. GENTLE PIANO (Harmonic acoustic chords with slow felt decay)
  // ============================================
  private createAmbientChords(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [174.61, 220.00, 261.63, 329.63], // Fmaj7
      [196.00, 246.94, 293.66, 392.00], // G6
    ];
    let chordIdx = 0;

    const playChord = () => {
      if (!isRunning || !this.ctx) return;
      const freqs = chords[chordIdx % chords.length];
      chordIdx++;

      freqs.forEach(freq => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;

        // Fundamental
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(0.035, now + 0.15);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 5.5);

        // Warm 2nd harmonic
        const harm = this.ctx.createOscillator();
        const harmGain = this.ctx.createGain();
        harm.type = 'sine';
        harm.frequency.setValueAtTime(freq * 2, now);
        harmGain.gain.setValueAtTime(0.0001, now);
        harmGain.gain.linearRampToValueAtTime(0.012, now + 0.1);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);

        osc.connect(g);
        g.connect(dest);
        harm.connect(harmGain);
        harmGain.connect(dest);

        osc.start(now);
        harm.start(now);
        osc.stop(now + 5.8);
        harm.stop(now + 3.8);
      });

      setTimeout(playChord, 5200);
    };

    playChord();

    return () => {
      isRunning = false;
    };
  }

  // ============================================
  // 12. BAMBOO FLUTE (Warm breathy pentatonic phrasing with vibrato)
  // ============================================
  private createGentleFlute(dest: GainNode): () => void {
    if (!this.ctx) return () => {};
    let isRunning = true;
    const notes = [293.66, 349.23, 392.00, 440.00, 523.25]; // D minor pentatonic

    const playPhrase = () => {
      if (!isRunning || !this.ctx) return;
      const freq = notes[Math.floor(Math.random() * notes.length)];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Vibrato
      const vib = this.ctx.createOscillator();
      vib.frequency.setValueAtTime(5.2, now);
      const vibGain = this.ctx.createGain();
      vibGain.gain.setValueAtTime(5, now);
      vib.connect(vibGain);
      vibGain.connect(osc.frequency);

      const g = this.ctx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.045, now + 0.6);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

      osc.connect(g);
      g.connect(dest);

      osc.start(now);
      vib.start(now);
      osc.stop(now + 4.0);
      vib.stop(now + 4.0);

      const next = 3800 + Math.random() * 2500;
      setTimeout(playPhrase, next);
    };

    playPhrase();

    return () => {
      isRunning = false;
    };
  }
}

export const audioSynthesizer = new AmbientSynthesizer();
