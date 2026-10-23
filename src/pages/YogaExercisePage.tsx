// ============================================
// MindMate — Yoga & Gentle Movement Library
// Categories: Beginner Yoga, Desk Stretches, Relaxation,
// Detailed guidance, safety disclaimers, & live practice timer
// ============================================

import React, { useState, useEffect } from 'react';
import {
  Dumbbell, Filter, Clock, Sparkles, Play, Pause, RotateCcw,
  CheckCircle2, AlertTriangle, ShieldCheck, Heart, Info, X,
} from 'lucide-react';
import { exercises } from '../data';
import type { Exercise, ExerciseCategory } from '../types';
import Modal from '../components/common/Modal';
import { useApp } from '../context/AppContext';

export default function YogaExercisePage() {
  const { addToast } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<ExerciseCategory | 'all'>('all');
  const [activeExercise, setActiveExercise] = useState<Exercise | null>(null);

  // Live Practice Timer states inside modal
  const [timerRunning, setTimerRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);

  useEffect(() => {
    if (activeExercise) {
      setSecondsRemaining(activeExercise.duration * 60);
      setTimerRunning(false);
    }
  }, [activeExercise]);

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
      }, 1000);
    } else if (timerRunning && secondsRemaining === 0) {
      setTimerRunning(false);
      addToast({
        type: 'success',
        message: `Wonderful job! Completed ${activeExercise?.name}.`,
      });
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining, activeExercise, addToast]);

  const categories: { id: ExerciseCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Poses & Routines' },
    { id: 'beginner-yoga', label: 'Beginner Yoga' },
    { id: 'desk-stretches', label: 'Desk Stretches' },
    { id: 'gentle-stretching', label: 'Gentle Stretching' },
    { id: 'breathing', label: 'Breathing Techniques' },
    { id: 'walking', label: 'Mindful Walking' },
    { id: 'relaxation', label: 'Body Relaxation' },
    { id: 'sleep-relaxation', label: 'Sleep Wind-Down' },
  ];

  const filteredExercises = exercises.filter(
    ex => selectedCategory === 'all' || ex.category === selectedCategory
  );

  const formatTimer = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Sparkles size={16} /> Accessible, Non-Competitive Movement
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Yoga & Gentle Movement Library
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Calm your nervous system and release muscle tension with beginner-friendly poses, desk stretches, and seated modifications. No flexibility required.
        </p>

        <div style={{
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.75rem',
          color: 'var(--color-text)',
          background: 'var(--hero-tag-bg)',
          border: '1px solid var(--color-border)',
          padding: '8px 14px',
          borderRadius: '10px',
          width: 'fit-content',
        }}>
          <ShieldCheck size={14} color="var(--color-primary)" />
          <span>Movement practices support well-being but do not replace clinical physical therapy or psychiatric care.</span>
        </div>
      </div>

      {/* 2. Category Filter Pills */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px' }}>
        {categories.map(cat => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`btn btn-sm ${selectedCategory === cat.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.813rem', whiteSpace: 'nowrap' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* 3. Exercise Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {filteredExercises.map(ex => (
          <div
            key={ex.id}
            className="card"
            style={{
              padding: 0,
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              {/* Photo Banner */}
              <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden', background: '#F1F5F9' }}>
                <img
                  src={ex.image || 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&q=80'}
                  alt={ex.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '6px',
                }}>
                  <span className="badge badge-primary" style={{ textTransform: 'capitalize', backdropFilter: 'blur(6px)', background: 'rgba(79, 70, 229, 0.9)' }}>
                    {ex.category.replace('-', ' ')}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '3px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Clock size={12} /> {ex.duration} mins • <span style={{ textTransform: 'capitalize' }}>{ex.difficulty}</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '22px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px', color: 'var(--color-text)' }}>
                  {ex.name}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                  {ex.description}
                </p>

                {/* Sample Steps Preview */}
                <div style={{ marginTop: '16px', padding: '12px 14px', background: 'var(--color-bg)', borderRadius: '12px', fontSize: '0.813rem', color: 'var(--color-text-light)', border: '1px solid var(--color-border)' }}>
                  <strong style={{ color: 'var(--color-text)' }}>Step 1:</strong> {ex.steps[0]}
                </div>
              </div>
            </div>

            <div style={{ padding: '0 22px 22px' }}>
              <button
                type="button"
                onClick={() => setActiveExercise(ex)}
                className="btn btn-primary"
                style={{ width: '100%', borderRadius: '12px' }}
              >
                <Play size={16} /> View Steps & Practice
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 4. Exercise Detail & Practice Modal */}
      {activeExercise && (
        <Modal
          isOpen={!!activeExercise}
          onClose={() => { setActiveExercise(null); setTimerRunning(false); }}
          title={activeExercise.name}
          maxWidth="680px"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Live Interactive Timer Widget */}
            <div style={{
              background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)',
              padding: '20px',
              borderRadius: '16px',
              textAlign: 'center',
              border: '1px solid #C7D2FE',
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#4338CA', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Guided Practice Timer
              </span>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 800,
                color: '#312E81',
                margin: '6px 0 14px',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {formatTimer(secondsRemaining)}
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setTimerRunning(!timerRunning)}
                  className="btn btn-primary btn-sm"
                  style={{ borderRadius: '10px', padding: '8px 20px' }}
                >
                  {timerRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start</>}
                </button>
                <button
                  type="button"
                  onClick={() => { setTimerRunning(false); setSecondsRemaining(activeExercise.duration * 60); }}
                  className="btn btn-outline btn-sm"
                  style={{ borderRadius: '10px' }}
                >
                  <RotateCcw size={16} /> Reset
                </button>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '10px' }}>
                Step-by-Step Instructions
              </h4>
              <ol style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', color: 'var(--color-text)', lineHeight: 1.5 }}>
                {activeExercise.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>

            {/* Cautiously Framed Benefits */}
            <div style={{ background: 'var(--color-accent-mint)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text)', fontWeight: 700, fontSize: '0.875rem', marginBottom: '8px' }}>
                <Heart size={16} color="#10B981" /> Potential Well-being Benefits
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.813rem', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {activeExercise.benefits.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>

            {/* Beginner & Accessibility Modifications */}
            <div>
              <h4 style={{ fontSize: '0.938rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-primary)' }}>
                Beginner & Chair Modifications
              </h4>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.813rem', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {activeExercise.modifications.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            </div>

            {/* Safety Guidance */}
            <div style={{ background: '#FEF3C7', padding: '14px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontWeight: 700, fontSize: '0.813rem', marginBottom: '6px' }}>
                <AlertTriangle size={16} /> Gentle Safety Reminders
              </div>
              <ul style={{ paddingLeft: '18px', margin: 0, fontSize: '0.75rem', color: '#78350F', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {activeExercise.safetyNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
