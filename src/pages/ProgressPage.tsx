// ============================================
// MindMate — Progress & Achievements
// Visual summaries, habits records, consistency streaks,
// & gentle weekly reflections (Non-clinical metrics)
// ============================================

import { useState } from 'react';
import {
  BarChart3, TrendingUp, Sparkles, Droplets, Moon, CheckCircle2,
  Calendar, Shield, Award, Heart,
} from 'lucide-react';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, Tooltip, CartesianGrid,
} from 'recharts';
import { useApp } from '../context/AppContext';

export default function ProgressPage() {
  const { moodHistory, journalEntries, todayActivities, todayHabits, challenges } = useApp();
  const [period, setPeriod] = useState<'7d' | '30d'>('7d');

  // Completed counts
  const totalCompletedActivities = todayActivities.filter(a => a.completed).length;
  const totalJournalCount = journalEntries.length;
  const gratitudeCount = journalEntries.filter(j => j.isGratitude).length;
  const activeChallengesCount = challenges.filter(c => c.isActive).length;

  // Mock past 7 days activity & habit data for charts
  const habitTrendData = [
    { day: 'Mon', water: 6, sleep: 7.5, activities: 4 },
    { day: 'Tue', water: 7, sleep: 8.0, activities: 5 },
    { day: 'Wed', water: 5, sleep: 6.5, activities: 3 },
    { day: 'Thu', water: 8, sleep: 7.0, activities: 6 },
    { day: 'Fri', water: 7, sleep: 7.5, activities: 4 },
    { day: 'Sat', water: 8, sleep: 8.5, activities: 5 },
    { day: 'Sun', water: todayHabits.waterGlasses || 7, sleep: todayHabits.sleepHours || 8, activities: totalCompletedActivities },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3730A3', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
              <TrendingUp size={16} /> Non-Clinical Personal Growth
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
              Your Wellness Journey & Milestones
            </h1>
            <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
              Reflect on small habits, days checked in, and moments of intentional calm. Progress in mental wellness is about consistency and kindness to yourself.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setPeriod('7d')}
              className={`btn btn-sm ${period === '7d' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '10px' }}
            >
              Past 7 Days
            </button>
            <button
              type="button"
              onClick={() => setPeriod('30d')}
              className={`btn btn-sm ${period === '30d' ? 'btn-primary' : 'btn-outline'}`}
              style={{ borderRadius: '10px' }}
            >
              Past 30 Days
            </button>
          </div>
        </div>

        <div style={{
          marginTop: '20px',
          background: 'rgba(255,255,255,0.8)',
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: '0.75rem',
          color: '#334155',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Shield size={14} color="#4F46E5" />
          <span>These metrics represent self-reported habit consistency, not medical diagnostic health scores.</span>
        </div>
      </div>

      {/* 2. Top Metric Highlights Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
      }}>
        {/* Card 1: Check-Ins */}
        <div className="card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CheckCircle2 size={20} color="#065F46" />
            </div>
            <span style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Mood Check-Ins</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>
            {moodHistory.length}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#059669', marginTop: '4px' }}>
            Consistent awareness logged
          </div>
        </div>

        {/* Card 2: Journal Entries */}
        <div className="card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#DBEAFE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={20} color="#1E40AF" />
            </div>
            <span style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Journal Reflections</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>
            {totalJournalCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#2563EB', marginTop: '4px' }}>
            {gratitudeCount} gratitude entries
          </div>
        </div>

        {/* Card 3: Today's Activities */}
        <div className="card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#EDE9FE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Calendar size={20} color="#5B21B6" />
            </div>
            <span style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Activities Today</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>
            {totalCompletedActivities}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#7C3AED', marginTop: '4px' }}>
            Out of {todayActivities.length} planned
          </div>
        </div>

        {/* Card 4: Water glasses */}
        <div className="card" style={{ padding: '20px', borderRadius: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#FFEDD5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Droplets size={20} color="#9A3412" />
            </div>
            <span style={{ fontSize: '0.813rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>Hydration Today</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--color-text)' }}>
            {todayHabits.waterGlasses || 0}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#D97706', marginTop: '4px' }}>
            Glasses of water logged
          </div>
        </div>
      </div>

      {/* 3. Recharts Visualizations */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '24px',
      }}>
        {/* Habit Completion Activity Chart */}
        <div className="card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <BarChart3 size={20} color="var(--color-primary)" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Completed Wellness Activities ({period === '7d' ? '7 Days' : '30 Days'})
            </h3>
          </div>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={habitTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" fontSize={11} tickLine={false} />
                <YAxis allowDecimals={false} fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--color-card)', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}
                />
                <Bar dataKey="activities" fill="#4F46E5" radius={[6, 6, 0, 0]} name="Activities Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sleep and Hydration Trends */}
        <div className="card" style={{ padding: '24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingUp size={20} color="#059669" />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>
              Sleep (Hours) & Water (Glasses) Flow
            </h3>
          </div>
          <div style={{ width: '100%', height: '240px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={habitTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="sleepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#C4B5FD" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#93C5FD" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" fontSize={11} tickLine={false} />
                <YAxis fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: 'var(--color-card)', borderRadius: '10px', border: '1px solid var(--color-border)', fontSize: '0.75rem' }}
                />
                <Area type="monotone" dataKey="sleep" stroke="#7C3AED" fill="url(#sleepGrad)" name="Sleep Hours" strokeWidth={2} />
                <Area type="monotone" dataKey="water" stroke="#2563EB" fill="url(#waterGrad)" name="Water Glasses" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 4. Weekly Reflection Box */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
          <Award size={24} color="#D97706" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Gentle Weekly Reflection
          </h3>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          <div style={{ background: 'var(--color-bg)', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '0.938rem', fontWeight: 700, marginBottom: '6px', color: '#059669' }}>
              🌟 What went well this week
            </h4>
            <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.5 }}>
              You prioritized logging your feelings and gave yourself permission to do short breathing resets during high-stress hours.
            </p>
          </div>

          <div style={{ background: 'var(--color-bg)', padding: '18px', borderRadius: '14px', border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: '0.938rem', fontWeight: 700, marginBottom: '6px', color: '#4F46E5' }}>
              🌿 One gentle focus for next week
            </h4>
            <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.5 }}>
              Try placing your phone in another room 30 minutes before sleep to support deeper, restorative rest.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
