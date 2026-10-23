// ============================================
// MindMate — Gentle Self-Care Challenges
// 7-Day journeys, habit streaks, progress celebrations,
// and zero-guilt encouragement
// ============================================

import { useState } from 'react';
import {
  Trophy, CheckCircle2, Circle, Flame, Sparkles, Award,
  ArrowRight, ShieldCheck, Heart, RefreshCw,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function ChallengesPage() {
  const { challenges, startChallenge, completeTask, addToast } = useApp();

  const handleStart = (challengeId: string) => {
    startChallenge(challengeId);
    addToast({
      type: 'success',
      message: 'Challenge activated! Remember: take each day gently with zero pressure.',
    });
  };

  const handleToggleTask = (challengeId: string, taskId: string) => {
    completeTask(challengeId, taskId);
    addToast({
      type: 'info',
      message: 'Task updated! Celebrate small steps.',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3730A3', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Trophy size={16} /> Gentle Habit Building
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Self-Care Challenges
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Transform daily life through small, realistic steps. Miss a day? No worries at all — wellness is a journey of self-compassion, never perfection.
        </p>

        <div style={{
          marginTop: '18px',
          background: 'rgba(255,255,255,0.85)',
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: '0.75rem',
          color: '#334155',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Heart size={14} color="#EF4444" fill="#EF4444" />
          <span>Zero Guilt Policy: Taking a rest day is a genuine form of self-care.</span>
        </div>
      </div>

      {/* 2. Challenges List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
        {challenges.map(challenge => {
          const completedCount = challenge.tasks.filter(t => t.completed).length;
          const totalTasks = challenge.tasks.length;
          const percent = Math.round((completedCount / totalTasks) * 100);

          return (
            <div
              key={challenge.id}
              className="card"
              style={{ padding: '28px', borderRadius: '22px' }}
            >
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                gap: '16px',
                marginBottom: '20px',
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '2rem' }}>{challenge.badge || '🌟'}</span>
                    <div>
                      <h2 style={{ fontSize: '1.35rem', fontWeight: 800, margin: 0 }}>
                        {challenge.title}
                      </h2>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {challenge.days}-Day Journey • {challenge.isActive ? 'In Progress' : 'Ready to Begin'}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '580px', lineHeight: 1.5 }}>
                    {challenge.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {challenge.isActive ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: 'var(--color-accent-peach)',
                      padding: '8px 14px',
                      borderRadius: '12px',
                      border: '1px solid #FED7AA',
                    }}>
                      <Flame size={20} color="#EA580C" />
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.875rem', fontWeight: 800, color: '#C2410C' }}>
                          {completedCount} Day Streak
                        </div>
                        <div style={{ fontSize: '0.688rem', color: '#9A3412' }}>Keep glowing</div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStart(challenge.id)}
                      className="btn btn-primary"
                      style={{ borderRadius: '12px' }}
                    >
                      Start Challenge <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.813rem', fontWeight: 700, marginBottom: '6px' }}>
                  <span>Overall Challenge Progress</span>
                  <span>{completedCount} of {totalTasks} Days ({percent}%)</span>
                </div>
                <div className="progress-bar" style={{ height: '10px' }}>
                  <div className="progress-fill" style={{ width: `${percent}%` }} />
                </div>
              </div>

              {/* Daily Tasks Checkbox Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '14px',
              }}>
                {challenge.tasks.map(task => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(challenge.id, task.id)}
                    style={{
                      padding: '16px',
                      borderRadius: '14px',
                      border: '1px solid var(--color-border)',
                      background: task.completed ? 'var(--color-bg)' : 'var(--color-card)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                        color: task.completed ? '#10B981' : 'var(--color-text-muted)',
                        marginTop: '2px',
                      }}
                      aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
                    >
                      {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
                    </button>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.688rem', fontWeight: 700, color: 'var(--color-primary)' }}>
                          DAY {task.day}
                        </span>
                        {task.completed && (
                          <span style={{ fontSize: '0.688rem', color: '#059669', fontWeight: 700 }}>
                            Done ✓
                          </span>
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        margin: '2px 0 4px',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                      }}>
                        {task.title}
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.4 }}>
                        {task.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
