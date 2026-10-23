// ============================================
// MindMate — Mood Tracking & Insights
// Comprehensive emotional logging, calendar view,
// Recharts trend visualizations, & gentle non-diagnostic patterns
// ============================================

import { useState } from 'react';
import {
  SmilePlus, Calendar, BarChart3, Trash2, CheckCircle2,
  Sparkles, Info, TrendingUp, HeartHandshake, Shield,
} from 'lucide-react';
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, AreaChart, Area,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { moodEmojiMap, moodColorMap } from '../data';
import type { MoodType, MoodEntry } from '../types';

export default function MoodTrackerPage() {
  const { moodHistory, addMood, deleteMood, addToast } = useApp();

  const [selectedMood, setSelectedMood] = useState<MoodType>('calm');
  const [note, setNote] = useState('');
  const [customDate, setCustomDate] = useState(() => new Date().toISOString().split('T')[0]);

  const moodsList: { type: MoodType; label: string; score: number }[] = [
    { type: 'happy', label: 'Happy', score: 5 },
    { type: 'calm', label: 'Calm', score: 4 },
    { type: 'tired', label: 'Tired', score: 3 },
    { type: 'lonely', label: 'Lonely', score: 2 },
    { type: 'anxious', label: 'Anxious', score: 2 },
    { type: 'sad', label: 'Sad', score: 1 },
    { type: 'angry', label: 'Angry', score: 1 },
    { type: 'overwhelmed', label: 'Overwhelmed', score: 1 },
  ];

  const handleSave = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      note: note.trim() || undefined,
      date: customDate,
      timestamp: new Date().toISOString(),
    };
    addMood(newEntry);
    setNote('');
    addToast({
      type: 'success',
      message: `Logged ${selectedMood} mood check-in for ${customDate}!`,
    });
  };

  const handleDelete = (id: string) => {
    deleteMood(id);
    addToast({ type: 'info', message: 'Mood log removed.' });
  };

  // Recharts Data: Aggregation by mood count
  const moodCounts = moodsList.map(m => {
    const count = moodHistory.filter(h => h.mood === m.type).length;
    return { name: m.label, mood: m.type, count, fill: moodColorMap[m.type] || '#818CF8' };
  });

  // Chronological timeline data (last 7 logs)
  const timelineData = [...moodHistory]
    .slice(0, 10)
    .reverse()
    .map(h => {
      const match = moodsList.find(m => m.type === h.mood);
      return {
        date: h.date.slice(5),
        mood: h.mood,
        score: match ? match.score : 3,
        note: h.note || '',
      };
    });

  // Calculate most frequent mood
  const moodFrequency: Record<string, number> = {};
  moodHistory.forEach(h => {
    moodFrequency[h.mood] = (moodFrequency[h.mood] || 0) + 1;
  });
  const topMood = Object.keys(moodFrequency).reduce((a, b) => (moodFrequency[a] > moodFrequency[b] ? a : b), 'calm');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header & Non-Diagnostic Notice */}
      <div style={{
        background: 'var(--color-card)',
        padding: '24px',
        borderRadius: '20px',
        border: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <SmilePlus size={24} color="var(--color-primary)" />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, margin: 0 }}>Emotional Balance & Insights</h1>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '650px' }}>
            Notice patterns, understand triggers, and track the ebb and flow of daily emotions with unconditional gentleness.
          </p>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--color-secondary)',
          padding: '8px 14px',
          borderRadius: '999px',
          fontSize: '0.75rem',
          color: 'var(--color-primary)',
          fontWeight: 600,
        }}>
          <Shield size={14} /> Non-Diagnostic Self-Reflection
        </div>
      </div>

      {/* 2. Top Interactive Logger Card */}
      <div className="card">
        <h2 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 16px' }}>
          Record How You Feel
        </h2>

        {/* Emotion Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
          gap: '12px',
          marginBottom: '20px',
        }}>
          {moodsList.map(m => {
            const isSelected = selectedMood === m.type;
            return (
              <button
                key={m.type}
                type="button"
                onClick={() => setSelectedMood(m.type)}
                className={`mood-btn ${isSelected ? 'selected' : ''}`}
                style={{
                  background: isSelected ? 'var(--color-secondary)' : 'var(--color-card)',
                }}
              >
                <span className="mood-emoji">{moodEmojiMap[m.type]}</span>
                <span className="mood-label">{m.label}</span>
              </button>
            );
          })}
        </div>

        {/* Note & Date Picker */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
          marginBottom: '20px',
        }}>
          <div>
            <label className="label">Add a personal reflection (optional)</label>
            <input
              type="text"
              className="input"
              placeholder="What factors contributed to this feeling today?"
              value={note}
              onChange={e => setNote(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Check-In Date</label>
            <input
              type="date"
              className="input"
              value={customDate}
              onChange={e => setCustomDate(e.target.value)}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className="btn btn-primary"
          style={{ borderRadius: '12px', padding: '12px 24px' }}
        >
          <CheckCircle2 size={18} /> Save Mood Entry
        </button>
      </div>

      {/* 3. Recharts Insights & Patterns */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Mood Distribution Chart */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Emotional Frequency Distribution</h3>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Total check-ins logged across all emotional spectrums.
          </p>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moodCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={11} tickLine={false} />
                <YAxis allowDecimals={false} fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(val: number) => [`${val} times`, 'Logged']}
                  contentStyle={{ background: 'var(--color-card)', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {moodCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Timeline Energy Wave */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <TrendingUp size={20} color="#10B981" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>Recent Emotional Flow</h3>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Chronological reflection of feeling states over your recent check-ins.
          </p>

          <div style={{ width: '100%', height: '220px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="moodWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#818CF8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="date" fontSize={11} tickLine={false} />
                <YAxis domain={[1, 5]} ticks={[1, 2, 3, 4, 5]} fontSize={11} tickLine={false} />
                <Tooltip
                  formatter={(_v: number, _name: string, props: any) => [
                    `${props.payload.mood.toUpperCase()}: ${props.payload.note || 'No note'}`,
                    'Mood',
                  ]}
                  contentStyle={{ background: 'var(--color-card)', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}
                />
                <Area type="monotone" dataKey="score" stroke="#4F46E5" fillOpacity={1} fill="url(#moodWave)" strokeWidth={2.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Non-Diagnostic Gentle Reflection Suggestion */}
      <div className="card gradient-calm" style={{ borderRadius: '20px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          }}>
            <Sparkles size={20} color="#3730A3" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 800, margin: '0 0 6px', color: '#1E1B4B' }}>
              Gentle Reflection & Observation
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: 1.6, margin: '0 0 10px' }}>
              Your most frequent recent reflection has been <strong>{topMood.toUpperCase()}</strong> {moodEmojiMap[topMood]}. Remember that all emotions — whether calm, anxious, or tired — carry valid signals about your energy and needs.
            </p>
            <div style={{ fontSize: '0.75rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Info size={14} /> Mood reflections are for personal self-awareness and never intended as psychiatric diagnosis.
            </div>
          </div>
        </div>
      </div>

      {/* 5. Complete Log History Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 16px' }}>Check-In History</h3>

        {moodHistory.length === 0 ? (
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
            No mood logs yet. Choose a mood above to create your first entry!
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {moodHistory.map(entry => (
              <div
                key={entry.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  background: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  gap: '12px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.75rem' }}>{moodEmojiMap[entry.mood]}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', textTransform: 'capitalize' }}>
                        {entry.mood}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {entry.date}
                      </span>
                    </div>
                    {entry.note && (
                      <div style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginTop: '2px' }}>
                        “{entry.note}”
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(entry.id)}
                  className="btn btn-icon btn-ghost"
                  style={{ color: 'var(--color-danger)' }}
                  title="Delete log"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
