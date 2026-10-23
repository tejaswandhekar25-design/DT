// ============================================
// MindMate — Nature Soundscape Studio
// Full multi-track ambient audio mixer powered by Web Audio API
// Master volume, individual sliders, custom mixes, & sleep timer
// ============================================

import { useState, useEffect } from 'react';
import {
  Music, Play, Pause, Volume2, VolumeX, Save, Trash2,
  Clock, Sparkles, Star, RotateCcw, Sliders, Check,
} from 'lucide-react';
import { soundTracks as initialTracks } from '../data';
import { audioSynthesizer } from '../services/audioSynthesizer';
import { useApp } from '../context/AppContext';
import type { SoundMix, SoundTrack } from '../types';

export default function SoundscapePage() {
  const { savedMixes, saveMix, deleteMix, addToast } = useApp();

  const [tracks, setTracks] = useState<SoundTrack[]>(initialTracks);
  const [masterVolume, setMasterVolume] = useState(0.8);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);
  const [sleepSecondsLeft, setSleepSecondsLeft] = useState<number | null>(null);
  const [newMixName, setNewMixName] = useState('');
  const [favorites, setFavorites] = useState<string[]>(['rain', 'ocean', 'piano']);

  // Sleep timer countdown
  useEffect(() => {
    let interval: any = null;
    if (sleepSecondsLeft !== null && sleepSecondsLeft > 0) {
      interval = setInterval(() => {
        setSleepSecondsLeft(prev => {
          if (prev === null || prev <= 1) {
            handleSleepTimerFinish();
            return null;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sleepSecondsLeft]);

  const handleSleepTimerFinish = () => {
    audioSynthesizer.stopAll();
    setTracks(prev => prev.map(t => ({ ...t, isPlaying: false })));
    setSleepTimerMinutes(null);
    setSleepSecondsLeft(null);
    addToast({
      type: 'info',
      message: 'Sleep timer reached! All soundscapes gently faded out.',
    });
  };

  const handleToggleTrack = (trackId: string) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === trackId) {
          const nextState = !t.isPlaying;
          if (nextState) {
            audioSynthesizer.playTrack(t.id, t.volume);
          } else {
            audioSynthesizer.stopTrack(t.id);
          }
          return { ...t, isPlaying: nextState };
        }
        return t;
      })
    );
  };

  const handleTrackVolumeChange = (trackId: string, val: number) => {
    setTracks(prev =>
      prev.map(t => {
        if (t.id === trackId) {
          audioSynthesizer.setTrackVolume(trackId, val);
          return { ...t, volume: val };
        }
        return t;
      })
    );
  };

  const handleMasterVolumeChange = (val: number) => {
    setMasterVolume(val);
    audioSynthesizer.setMasterVolume(val);
  };

  const handleStopAll = () => {
    audioSynthesizer.stopAll();
    setTracks(prev => prev.map(t => ({ ...t, isPlaying: false })));
    addToast({ type: 'info', message: 'Paused all active sound layers.' });
  };

  const handleSetSleepTimer = (mins: number) => {
    setSleepTimerMinutes(mins);
    setSleepSecondsLeft(mins * 60);
    addToast({ type: 'success', message: `Sleep timer set for ${mins} minutes.` });
  };

  const handleSaveCurrentMix = () => {
    if (!newMixName.trim()) {
      addToast({ type: 'error', message: 'Please give your sound mix a name.' });
      return;
    }

    const playingTracks = tracks
      .filter(t => t.isPlaying)
      .map(t => ({ trackId: t.id, volume: t.volume }));

    if (playingTracks.length === 0) {
      addToast({ type: 'error', message: 'Turn on at least one sound track to save a mix.' });
      return;
    }

    const newMix: SoundMix = {
      id: Date.now().toString(),
      name: newMixName.trim(),
      tracks: playingTracks,
      createdAt: new Date().toISOString(),
      isFavorite: false,
    };

    saveMix(newMix);
    setNewMixName('');
    addToast({ type: 'success', message: `Saved custom mix: "${newMix.name}"!` });
  };

  const handleLoadMix = (mix: SoundMix) => {
    audioSynthesizer.stopAll();
    setTracks(prev =>
      prev.map(t => {
        const match = mix.tracks.find(mt => mt.trackId === t.id);
        if (match) {
          audioSynthesizer.playTrack(t.id, match.volume);
          return { ...t, isPlaying: true, volume: match.volume };
        } else {
          return { ...t, isPlaying: false };
        }
      })
    );
    addToast({ type: 'info', message: `Loaded soundscape mix: "${mix.name}"` });
  };

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev =>
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  const anyPlaying = tracks.some(t => t.isPlaying);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Music size={16} /> Procedural Sound Synthesis Studio
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Nature Soundscape Studio
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Layer calming rain, gentle wind, ocean waves, and soft instrumental chords. Real procedural audio generated directly in your browser — zero broken links, zero buffering.
        </p>

        {/* Master Controls & Sleep Timer */}
        <div style={{
          marginTop: '24px',
          background: 'var(--hero-tag-bg)',
          backdropFilter: 'blur(8px)',
          padding: '16px 20px',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          border: '1px solid var(--color-border)',
        }}>
          {/* Master Volume */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: '220px' }}>
            <Volume2 size={20} color="var(--color-primary)" />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text)', marginBottom: '4px' }}>
                Master Volume ({Math.round(masterVolume * 100)}%)
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={masterVolume}
                onChange={e => handleMasterVolumeChange(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Sleep Timer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Clock size={14} /> Sleep Timer:
            </span>
            {[5, 10, 15, 30, 60].map(mins => (
              <button
                key={mins}
                type="button"
                onClick={() => handleSetSleepTimer(mins)}
                className={`btn btn-sm ${sleepTimerMinutes === mins ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}
              >
                {mins}m
              </button>
            ))}
            {sleepSecondsLeft !== null && (
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', background: '#D1FAE5', padding: '4px 8px', borderRadius: '6px' }}>
                {Math.floor(sleepSecondsLeft / 60)}m {sleepSecondsLeft % 60}s left
              </span>
            )}
          </div>

          {anyPlaying && (
            <button
              type="button"
              onClick={handleStopAll}
              className="btn btn-sm btn-outline"
              style={{ borderRadius: '10px' }}
            >
              <VolumeX size={16} /> Pause All
            </button>
          )}
        </div>
      </div>

      {/* 2. Sound Mixing Rack Grid */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px' }}>
          Ambient Audio Layers
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {tracks.map(track => {
            const isFav = favorites.includes(track.id);
            const bgImage = track.image || 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80';
            return (
              <div
                key={track.id}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  boxShadow: track.isPlaying ? '0 12px 28px -6px rgba(79, 70, 229, 0.4)' : 'var(--shadow-sm)',
                  border: track.isPlaying ? '2px solid #818CF8' : '1px solid rgba(255, 255, 255, 0.15)',
                  transform: track.isPlaying ? 'translateY(-2px)' : 'none',
                  transition: 'all 0.25s ease',
                }}
              >
                {/* Dark Glassmorphic Scenery Overlay */}
                <div style={{
                  padding: '22px',
                  background: track.isPlaying
                    ? 'linear-gradient(180deg, rgba(15, 23, 42, 0.42) 0%, rgba(15, 23, 42, 0.86) 100%)'
                    : 'linear-gradient(180deg, rgba(15, 23, 42, 0.55) 0%, rgba(15, 23, 42, 0.88) 100%)',
                  backdropFilter: 'blur(3px)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '100%',
                  color: '#FFFFFF',
                }}>
                  {/* Card Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <button
                        type="button"
                        onClick={() => handleToggleTrack(track.id)}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          border: 'none',
                          background: track.isPlaying ? '#4F46E5' : 'rgba(255, 255, 255, 0.25)',
                          backdropFilter: 'blur(8px)',
                          color: '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          boxShadow: track.isPlaying ? '0 0 16px rgba(99, 102, 241, 0.8)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                        aria-label={track.isPlaying ? `Pause ${track.name}` : `Play ${track.name}`}
                      >
                        {track.isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </button>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1rem', color: '#FFFFFF', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                          {track.name}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                          <span style={{
                            fontSize: '0.688rem',
                            fontWeight: 700,
                            padding: '2px 8px',
                            borderRadius: '999px',
                            background: track.isPlaying ? '#10B981' : 'rgba(255, 255, 255, 0.2)',
                            color: '#FFFFFF',
                            textTransform: 'capitalize',
                          }}>
                            {track.category}
                          </span>
                          <span style={{ fontSize: '0.688rem', color: track.isPlaying ? '#6EE7B7' : '#CBD5E1', fontWeight: 600 }}>
                            {track.isPlaying ? '● Playing' : 'Muted'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => toggleFavorite(track.id)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.15)',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        color: isFav ? '#FBBF24' : '#E2E8F0',
                        transition: 'transform 0.15s ease',
                      }}
                      aria-label="Favorite sound"
                    >
                      <Star size={16} fill={isFav ? '#FBBF24' : 'none'} />
                    </button>
                  </div>

                  {/* Track Volume Slider */}
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: '#E2E8F0', marginBottom: '6px' }}>
                      <span>Layer Volume</span>
                      <span>{Math.round(track.volume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={track.volume}
                      onChange={e => handleTrackVolumeChange(track.id, Number(e.target.value))}
                      style={{
                        width: '100%',
                        accentColor: '#818CF8',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Custom Mix Presets & Saving */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 16px' }}>
          Custom Sound Presets
        </h3>

        {/* Save Current Mix Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          flexWrap: 'wrap',
          marginBottom: '24px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--color-border)',
        }}>
          <input
            type="text"
            className="input"
            placeholder="Name your current sound mix (e.g., Midnight Rain in Kyoto)..."
            value={newMixName}
            onChange={e => setNewMixName(e.target.value)}
            style={{ maxWidth: '400px' }}
          />
          <button
            type="button"
            onClick={handleSaveCurrentMix}
            className="btn btn-primary"
            style={{ borderRadius: '12px' }}
          >
            <Save size={16} /> Save Current Mix
          </button>
        </div>

        {/* Pre-built Inspiring Presets */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '10px' }}>
            Curated Calming Presets:
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {[
              {
                name: '🌧️ Cozy Rainy Day',
                tracks: [{ trackId: 'rain', volume: 0.8 }, { trackId: 'thunder', volume: 0.3 }],
              },
              {
                name: '🌊 Pacific Shoreline',
                tracks: [{ trackId: 'ocean', volume: 0.7 }, { trackId: 'wind', volume: 0.4 }],
              },
              {
                name: '🌲 Forest Sanctuary',
                tracks: [{ trackId: 'forest', volume: 0.7 }, { trackId: 'river', volume: 0.5 }],
              },
              {
                name: '🎹 Peaceful Meditation',
                tracks: [{ trackId: 'piano', volume: 0.6 }, { trackId: 'rain', volume: 0.4 }],
              },
            ].map((preset, i) => (
              <button
                key={i}
                type="button"
                onClick={() =>
                  handleLoadMix({
                    id: `preset-${i}`,
                    name: preset.name,
                    tracks: preset.tracks,
                    createdAt: new Date().toISOString(),
                    isFavorite: false,
                  })
                }
                className="btn btn-sm btn-outline"
                style={{ borderRadius: '10px' }}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>

        {/* User Saved Mixes List */}
        {savedMixes.length > 0 && (
          <div>
            <div style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '10px' }}>
              Your Saved Mixes:
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {savedMixes.map(mix => (
                <div
                  key={mix.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Sliders size={16} color="var(--color-primary)" />
                    <span style={{ fontWeight: 700, fontSize: '0.875rem' }}>{mix.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      ({mix.tracks.length} sound layers)
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleLoadMix(mix)}
                      className="btn btn-sm btn-primary"
                      style={{ fontSize: '0.75rem', padding: '4px 12px' }}
                    >
                      <Play size={12} /> Play Mix
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMix(mix.id)}
                      className="btn btn-sm btn-ghost"
                      style={{ color: 'var(--color-danger)' }}
                      title="Delete mix"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
