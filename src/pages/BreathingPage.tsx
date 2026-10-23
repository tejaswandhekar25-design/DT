// ============================================
// MindMate — Guided Breathing Studio
// Animated breathing circle, Box Breathing, 4-7-8,
// duration selector, background sound toggle, & calm pacing
// ============================================

import { useState, useEffect, useRef } from 'react';
import {
  Wind, Play, Pause, Square, Volume2, VolumeX, Sparkles,
  RotateCcw, CheckCircle2, Shield,
} from 'lucide-react';
import { audioSynthesizer } from '../services/audioSynthesizer';
import { useApp } from '../context/AppContext';

type BreathingTechnique = 'box' | '478' | 'calm';

interface TechniqueConfig {
  name: string;
  desc: string;
  phases: { name: 'inhale' | 'hold' | 'exhale' | 'holdEmpty'; duration: number; text: string }[];
}

const techniques: Record<BreathingTechnique, TechniqueConfig> = {
  box: {
    name: 'Box Breathing (4-4-4-4)',
    desc: 'Used by athletes and first responders to restore calm and focus.',
    phases: [
      { name: 'inhale', duration: 4, text: 'Inhale gently through nose...' },
      { name: 'hold', duration: 4, text: 'Hold your breath softly...' },
      { name: 'exhale', duration: 4, text: 'Exhale smoothly through mouth...' },
      { name: 'holdEmpty', duration: 4, text: 'Rest and pause empty...' },
    ],
  },
  '478': {
    name: '4-7-8 Relaxation Rhythm',
    desc: 'A calming natural tranquilizer for the nervous system, ideal before sleep.',
    phases: [
      { name: 'inhale', duration: 4, text: 'Inhale through nose...' },
      { name: 'hold', duration: 7, text: 'Gently hold breath...' },
      { name: 'exhale', duration: 8, text: 'Whoosh exhale completely...' },
    ],
  },
  calm: {
    name: 'Deep Calm (4-6 Flow)',
    desc: 'An extended exhale that signals safety to your parasympathetic system.',
    phases: [
      { name: 'inhale', duration: 4, text: 'Inhale peace...' },
      { name: 'exhale', duration: 6, text: 'Release all tension...' },
    ],
  },
};

export default function BreathingPage() {
  const { addToast } = useApp();

  const [activeTechnique, setActiveTechnique] = useState<BreathingTechnique>('box');
  const [sessionMinutes, setSessionMinutes] = useState(2);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Cycle counters
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [phaseSeconds, setPhaseSeconds] = useState(0);
  const [totalSecondsLeft, setTotalSecondsLeft] = useState(sessionMinutes * 60);
  const [completedSession, setCompletedSession] = useState(false);

  const currentTechnique = techniques[activeTechnique];
  const currentPhase = currentTechnique.phases[phaseIndex];

  // Sync session minutes to timer
  useEffect(() => {
    if (!isActive) {
      setTotalSecondsLeft(sessionMinutes * 60);
    }
  }, [sessionMinutes, isActive]);

  // Audio synthesizer trigger
  useEffect(() => {
    if (soundEnabled && isActive && !isPaused) {
      audioSynthesizer.playTrack('ocean', 0.4);
    } else {
      audioSynthesizer.stopTrack('ocean');
    }
    return () => {
      audioSynthesizer.stopTrack('ocean');
    };
  }, [soundEnabled, isActive, isPaused]);

  // Main breathing pacing clock
  useEffect(() => {
    let timer: any = null;

    if (isActive && !isPaused) {
      timer = setInterval(() => {
        // Overall countdown
        setTotalSecondsLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });

        // Phase cycling
        setPhaseSeconds(prev => {
          if (prev + 1 >= currentPhase.duration) {
            setPhaseIndex(p => (p + 1) % currentTechnique.phases.length);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isActive, isPaused, currentPhase, currentTechnique]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
    setPhaseIndex(0);
    setPhaseSeconds(0);
    setCompletedSession(false);
    setTotalSecondsLeft(sessionMinutes * 60);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsPaused(false);
    setPhaseIndex(0);
    setPhaseSeconds(0);
    setTotalSecondsLeft(sessionMinutes * 60);
    audioSynthesizer.stopTrack('ocean');
  };

  const handleComplete = () => {
    setIsActive(false);
    setIsPaused(false);
    setCompletedSession(true);
    audioSynthesizer.stopTrack('ocean');
    addToast({
      type: 'success',
      message: 'Breathing session complete! Take notice of how your body feels.',
    });
  };

  // Compute visual circle scale based on phase
  let circleScale = 1;
  let circleColor = 'radial-gradient(circle, #818CF8 0%, #3730A3 100%)';
  if (isActive && !isPaused) {
    if (currentPhase.name === 'inhale') {
      const progress = (phaseSeconds + 1) / currentPhase.duration;
      circleScale = 1 + progress * 0.45;
      circleColor = 'radial-gradient(circle, #6EE7B7 0%, #059669 100%)';
    } else if (currentPhase.name === 'hold') {
      circleScale = 1.45;
      circleColor = 'radial-gradient(circle, #93C5FD 0%, #2563EB 100%)';
    } else if (currentPhase.name === 'exhale') {
      const progress = (phaseSeconds + 1) / currentPhase.duration;
      circleScale = 1.45 - progress * 0.45;
      circleColor = 'radial-gradient(circle, #FCD34D 0%, #D97706 100%)';
    } else {
      circleScale = 1;
      circleColor = 'radial-gradient(circle, #C4B5FD 0%, #7C3AED 100%)';
    }
  }

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Wind size={16} /> Respiratory Grounding
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Guided Breathing Studio
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
          Regulate your autonomic nervous system with rhythmic, paced breathing. Choose your preferred pattern and allow the visual circle to guide your breath.
        </p>
      </div>

      {/* 2. Technique & Duration Selectors */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '20px',
      }}>
        {/* Technique Picker */}
        <div className="card" style={{ padding: '20px' }}>
          <label className="label" style={{ marginBottom: '12px' }}>Choose Breathing Technique</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {(Object.keys(techniques) as BreathingTechnique[]).map(key => {
              const tech = techniques[key];
              const isSelected = activeTechnique === key;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => { if (!isActive) setActiveTechnique(key); }}
                  disabled={isActive}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: isSelected ? 'var(--color-secondary)' : 'var(--color-bg)',
                    textAlign: 'left',
                    cursor: isActive ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-text)' }}>
                    {tech.name}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
                    {tech.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Duration & Sound Settings */}
        <div className="card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <label className="label" style={{ marginBottom: '12px' }}>Session Duration</label>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              {[1, 2, 5, 10].map(mins => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => { if (!isActive) setSessionMinutes(mins); }}
                  disabled={isActive}
                  className={`btn btn-sm ${sessionMinutes === mins ? 'btn-primary' : 'btn-outline'}`}
                  style={{ flex: 1, borderRadius: '10px' }}
                >
                  {mins} min
                </button>
              ))}
            </div>

            <label className="label" style={{ marginBottom: '10px' }}>Calming Ambient Sound</label>
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="btn btn-sm btn-ghost"
              style={{
                width: '100%',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                color: soundEnabled ? '#2563EB' : 'var(--color-text-muted)',
              }}
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              <span>{soundEnabled ? 'Ocean Waves: Active' : 'Sound Muted'}</span>
            </button>
          </div>

          <div style={{
            fontSize: '0.75rem',
            color: 'var(--color-text-muted)',
            background: 'var(--color-bg)',
            padding: '10px',
            borderRadius: '10px',
            marginTop: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Shield size={14} /> Stop anytime if you feel dizzy or lightheaded.
          </div>
        </div>
      </div>

      {/* 3. Main Immersive Breathing Arena */}
      <div className="card" style={{
        padding: '50px 24px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '440px',
        position: 'relative',
        background: 'var(--color-card)',
        borderRadius: '24px',
      }}>
        {/* Animated Circle */}
        <div
          className="breathing-circle"
          style={{
            transform: `scale(${circleScale})`,
            background: circleColor,
            transition: 'transform 1s ease-in-out, background 1s ease',
            boxShadow: isActive ? '0 10px 40px rgba(79, 70, 229, 0.25)' : 'none',
          }}
        >
          <div style={{ textAlign: 'center', padding: '16px' }}>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'capitalize' }}>
              {isActive ? currentPhase.name.replace('holdEmpty', 'Pause') : 'Ready'}
            </div>
            {isActive && (
              <div style={{ fontSize: '0.813rem', opacity: 0.9, marginTop: '4px' }}>
                {currentPhase.duration - phaseSeconds}s
              </div>
            )}
          </div>
        </div>

        {/* Phase Instruction Text */}
        <div style={{ marginTop: '36px', minHeight: '60px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 6px' }}>
            {isActive ? currentPhase.text : completedSession ? 'Session Completed! 🌸' : 'Find a comfortable seated position'}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: 0 }}>
            {isActive ? `Time Remaining: ${formatTime(totalSecondsLeft)}` : completedSession ? 'You gave your nervous system a restorative pause.' : 'Drop your shoulders away from your ears, relax your jaw, and click start.'}
          </p>
        </div>

        {/* Control Buttons */}
        <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
          {!isActive ? (
            <button
              type="button"
              onClick={handleStart}
              className="btn btn-primary btn-lg"
              style={{ padding: '14px 36px', borderRadius: '14px', fontWeight: 800 }}
            >
              <Play size={20} /> Start Session
            </button>
          ) : (
            <>
              {isPaused ? (
                <button
                  type="button"
                  onClick={handleResume}
                  className="btn btn-primary"
                  style={{ borderRadius: '12px' }}
                >
                  <Play size={18} /> Resume
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handlePause}
                  className="btn btn-outline"
                  style={{ borderRadius: '12px' }}
                >
                  <Pause size={18} /> Pause
                </button>
              )}
              <button
                type="button"
                onClick={handleStop}
                className="btn btn-danger"
                style={{ borderRadius: '12px' }}
              >
                <Square size={18} /> End
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
