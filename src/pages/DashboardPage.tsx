// ============================================
// MindMate — Main Wellness Dashboard
// Personalized daily overview, check-ins, habits & plan
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, Smile, Wind, Dumbbell, Apple, Music, BookOpen,
  Calendar, CheckCircle2, Circle, Droplets, Moon, Activity,
  AlertTriangle, ArrowRight, TrendingUp, HeartHandshake, Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { moodEmojiMap, moodColorMap } from '../data';
import type { MoodType } from '../types';

export default function DashboardPage() {
  const {
    user,
    todayActivities,
    toggleActivity,
    todayHabits,
    updateHabits,
    moodHistory,
    addMood,
    addToast,
  } = useApp();

  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [moodNote, setMoodNote] = useState('');
  const [moodSaved, setMoodSaved] = useState(false);

  const completedActivities = todayActivities.filter(a => a.completed).length;
  const totalActivities = todayActivities.length;
  const planProgress = totalActivities > 0 ? Math.round((completedActivities / totalActivities) * 100) : 0;

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const moodsList: { type: MoodType; label: string }[] = [
    { type: 'happy', label: 'Happy' },
    { type: 'calm', label: 'Calm' },
    { type: 'anxious', label: 'Anxious' },
    { type: 'sad', label: 'Sad' },
    { type: 'angry', label: 'Angry' },
    { type: 'tired', label: 'Tired' },
    { type: 'lonely', label: 'Lonely' },
    { type: 'overwhelmed', label: 'Overwhelmed' },
  ];

  const handleSaveMood = () => {
    if (!selectedMood) return;
    const now = new Date();
    addMood({
      id: Date.now().toString(),
      mood: selectedMood,
      note: moodNote.trim() || undefined,
      date: now.toISOString().split('T')[0],
      timestamp: now.toISOString(),
    });
    setMoodSaved(true);
    addToast({
      type: 'success',
      message: `Your ${selectedMood} mood check-in was saved gently.`,
    });
  };

  const handleWaterIncrement = () => {
    const current = todayHabits.waterGlasses || 0;
    updateHabits({ waterGlasses: Math.min(16, current + 1) });
    addToast({ type: 'info', message: 'Hydration logged! Keep nourishing your body.' });
  };

  const handleWaterDecrement = () => {
    const current = todayHabits.waterGlasses || 0;
    if (current > 0) updateHabits({ waterGlasses: current - 1 });
  };

  const handleSleepChange = (hours: number) => {
    updateHabits({ sleepHours: hours });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Welcome Greeting Banner */}
      <div
        className="card gradient-hero"
        style={{
          padding: '32px',
          borderRadius: '24px',
          border: '1px solid var(--color-border)',
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: 'var(--hero-tag-bg)',
              borderRadius: '999px',
              fontSize: '0.75rem',
              fontWeight: 700,
              color: 'var(--hero-tag-text)',
              marginBottom: '10px',
            }}>
              <Calendar size={14} /> {todayStr}
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 8px' }}>
              Good day, {user?.displayName || 'Friend'} 🌿
            </h1>
            <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '540px', lineHeight: 1.6 }}>
              “Every small breath, glass of water, and mindful moment is a gentle victory.” Take today one step at a time.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              to="/chat"
              className="btn btn-primary"
              style={{ borderRadius: '12px', textDecoration: 'none' }}
            >
              <Sparkles size={18} /> Talk with Seren AI
            </Link>
            <Link
              to="/breathing"
              className="btn btn-outline"
              style={{ borderRadius: '12px', textDecoration: 'none' }}
            >
              <Wind size={18} /> 3-Min Reset
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Main 2-Column Responsive Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '28px',
      }}>
        {/* LEFT COLUMN: Daily Mood Check-In & Today's Plan */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Daily Mood Check-In Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smile size={20} color="var(--color-primary)" />
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Daily Mood Check-In</h2>
              </div>
              <Link to="/mood" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>
                View Mood Log →
              </Link>
            </div>

            <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
              How is your heart and mind feeling right now? Select an emotion to log your day.
            </p>

            {/* Mood Emotion Selector */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '10px',
              marginBottom: '16px',
            }}>
              {moodsList.map(m => {
                const isSelected = selectedMood === m.type;
                return (
                  <button
                    key={m.type}
                    type="button"
                    onClick={() => { setSelectedMood(m.type); setMoodSaved(false); }}
                    className={`mood-btn ${isSelected ? 'selected' : ''}`}
                    style={{
                      padding: '12px 6px',
                    }}
                  >
                    <span className="mood-emoji">{moodEmojiMap[m.type]}</span>
                    <span className="mood-label" style={{ fontSize: '0.75rem' }}>{m.label}</span>
                  </button>
                );
              })}
            </div>

            {selectedMood && !moodSaved && (
              <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Optional: Add a brief gentle thought or reflection..."
                  value={moodNote}
                  onChange={e => setMoodNote(e.target.value)}
                  style={{ fontSize: '0.813rem' }}
                />
                <button
                  type="button"
                  onClick={handleSaveMood}
                  className="btn btn-primary btn-sm"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Save Today's Mood
                </button>
              </div>
            )}

            {moodSaved && (
              <div style={{
                background: 'var(--color-accent-mint)',
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: 'var(--color-text)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                fontSize: '0.813rem',
                fontWeight: 600,
              }}>
                <CheckCircle2 size={18} color="#10B981" />
                <span>Today's mood ({selectedMood}) recorded with care. Thank you for checking in with yourself.</span>
              </div>
            )}
          </div>

          {/* Today's Wellness Schedule Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calendar size={20} color="var(--color-primary)" />
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>Your Wellness Plan Today</h2>
              </div>
              <span className="badge badge-primary">
                {completedActivities} / {totalActivities} Completed ({planProgress}%)
              </span>
            </div>

            <div className="progress-bar" style={{ marginBottom: '18px' }}>
              <div className="progress-fill" style={{ width: `${planProgress}%` }} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {todayActivities.slice(0, 5).map(act => (
                <div
                  key={act.id}
                  onClick={() => toggleActivity(act.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 14px',
                    borderRadius: '12px',
                    background: act.completed ? 'var(--color-bg)' : 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <button
                    type="button"
                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: act.completed ? '#10B981' : 'var(--color-text-muted)' }}
                    aria-label={act.completed ? 'Mark incomplete' : 'Mark complete'}
                  >
                    {act.completed ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                  </button>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      textDecoration: act.completed ? 'line-through' : 'none',
                      color: act.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                    }}>
                      {act.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {act.duration} mins • {act.timeOfDay}
                    </div>
                  </div>
                  <span className="badge badge-primary" style={{ fontSize: '0.688rem', textTransform: 'capitalize' }}>
                    {act.category}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <Link to="/wellness-plan" style={{ fontSize: '0.813rem', fontWeight: 600, color: 'var(--color-primary)', textDecoration: 'none' }}>
                Open Full Schedule & Customizer →
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Quick Habit Trackers & Quick Actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {/* Daily Habits: Water & Sleep */}
          <div className="card">
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 16px' }}>Daily Habit Trackers</h2>

            {/* Hydration Tracker */}
            <div style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--habit-water-bg)',
              marginBottom: '16px',
              border: '1px solid var(--habit-water-border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--habit-water-text)', fontWeight: 700, fontSize: '0.875rem' }}>
                  <Droplets size={18} /> Water & Hydration
                </div>
                <span style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--habit-water-text)' }}>
                  {todayHabits.waterGlasses || 0} / 8 Glasses
                </span>
              </div>

              {/* Water glasses visual dots */}
              <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', flexWrap: 'wrap' }}>
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      minWidth: '24px',
                      height: '8px',
                      borderRadius: '999px',
                      background: i < (todayHabits.waterGlasses || 0) ? '#3B82F6' : 'rgba(147, 197, 253, 0.35)',
                      transition: 'all 0.2s ease',
                    }}
                  />
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleWaterIncrement}
                  className="btn btn-sm btn-primary"
                  style={{ flex: 1, fontSize: '0.75rem' }}
                >
                  + Add 1 Glass
                </button>
                <button
                  type="button"
                  onClick={handleWaterDecrement}
                  className="btn btn-sm btn-ghost"
                  style={{ fontSize: '0.75rem' }}
                  disabled={!todayHabits.waterGlasses}
                >
                  Remove
                </button>
              </div>
            </div>

            {/* Sleep Rest Tracker */}
            <div style={{
              padding: '16px',
              borderRadius: '16px',
              background: 'var(--habit-sleep-bg)',
              border: '1px solid var(--habit-sleep-border)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--habit-sleep-text)', fontWeight: 700, fontSize: '0.875rem' }}>
                  <Moon size={18} /> Last Night's Sleep
                </div>
                <span style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--habit-sleep-text)' }}>
                  {todayHabits.sleepHours ? `${todayHabits.sleepHours} Hours` : 'Not logged'}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {[5, 6, 7, 8, 9].map(h => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => handleSleepChange(h)}
                    className="btn btn-sm"
                    style={{
                      flex: 1,
                      fontSize: '0.75rem',
                      background: todayHabits.sleepHours === h ? 'var(--color-primary)' : 'var(--color-card)',
                      color: todayHabits.sleepHours === h ? 'white' : 'var(--habit-sleep-text)',
                      border: '1px solid var(--habit-sleep-border)',
                    }}
                  >
                    {h} hrs
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Access Wellness Tiles */}
          <div className="card" style={{ padding: '24px', borderRadius: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>Quick Wellness Tools</h2>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700 }}>6 Mindful Spaces</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '14px',
            }}>
              {[
                {
                  to: '/breathing',
                  title: 'Breathing',
                  subtitle: 'Box & 4-7-8',
                  image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=400&q=80',
                  icon: <Wind size={18} color="#A7F3D0" />,
                },
                {
                  to: '/sounds',
                  title: 'Soundscapes',
                  subtitle: 'Rain & waves',
                  image: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=400&q=80',
                  icon: <Music size={18} color="#BAE6FD" />,
                },
                {
                  to: '/yoga',
                  title: 'Gentle Yoga',
                  subtitle: 'Desk stretches',
                  image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80',
                  icon: <Dumbbell size={18} color="#DDD6FE" />,
                },
                {
                  to: '/calm',
                  title: 'Calm Corner',
                  subtitle: 'Sanctuary & 5-4-3-2-1',
                  image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=400&q=80',
                  icon: <Sparkles size={18} color="#FDE68A" />,
                },
                {
                  to: '/nutrition',
                  title: 'Nourishment',
                  subtitle: 'Balanced meals',
                  image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
                  icon: <Apple size={18} color="#FED7AA" />,
                },
                {
                  to: '/journal',
                  title: 'Private Journal',
                  subtitle: 'Reflect & Gratitude',
                  image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=400&q=80',
                  icon: <BookOpen size={18} color="#FECDD3" />,
                },
              ].map((tool, idx) => (
                <Link
                  key={idx}
                  to={tool.to}
                  style={{
                    position: 'relative',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    height: '100px',
                    backgroundImage: `url(${tool.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'var(--shadow-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  }}
                >
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(15, 23, 42, 0.45) 0%, rgba(15, 23, 42, 0.85) 100%)',
                    backdropFilter: 'blur(2px)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{
                        width: '30px',
                        height: '30px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.2)',
                        backdropFilter: 'blur(4px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        {tool.icon}
                      </div>
                      <ArrowRight size={14} color="rgba(255, 255, 255, 0.7)" />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.813rem', fontWeight: 800, color: '#FFFFFF', textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}>
                        {tool.title}
                      </div>
                      <div style={{ fontSize: '0.688rem', color: '#E2E8F0' }}>
                        {tool.subtitle}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* SOS Immediate Support Highlight */}
          <div style={{
            background: '#FEE2E2',
            border: '1px solid #FECACA',
            borderRadius: '16px',
            padding: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 700, fontSize: '0.875rem' }}>
                <AlertTriangle size={18} /> In Need of Urgent Support?
              </div>
              <p style={{ fontSize: '0.75rem', color: '#7F1D1D', margin: '4px 0 0' }}>
                Free, 24/7 verified helplines and quick grounding tools are always available.
              </p>
            </div>
            <Link
              to="/sos"
              className="btn btn-sm btn-danger"
              style={{ borderRadius: '10px', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Open SOS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
