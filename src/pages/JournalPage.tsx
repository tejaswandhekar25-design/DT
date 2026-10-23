// ============================================
// MindMate — Private Wellness Journal
// Encrypted client-side reflections, guided prompts,
// gratitude logs, mood integration, & search filters
// ============================================

import React, { useState } from 'react';
import {
  BookOpen, Sparkles, Plus, Search, Trash2, Edit3, Heart,
  Shield, Check, Calendar, Tag, Smile,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { journalPrompts, moodEmojiMap } from '../data';
import type { JournalEntry, MoodType } from '../types';
import Modal from '../components/common/Modal';

export default function JournalPage() {
  const { journalEntries, addJournalEntry, updateJournalEntry, deleteJournalEntry, addToast } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGratitudeOnly, setFilterGratitudeOnly] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<MoodType | undefined>('calm');
  const [isGratitude, setIsGratitude] = useState(false);
  const [tagsInput, setTagsInput] = useState('');

  const handleOpenNew = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setSelectedMood('calm');
    setIsGratitude(false);
    setTagsInput('');
    setModalOpen(true);
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingId(entry.id);
    setTitle(entry.title);
    setContent(entry.content);
    setSelectedMood(entry.mood);
    setIsGratitude(entry.isGratitude);
    setTagsInput(entry.tags.join(', '));
    setModalOpen(true);
  };

  const handleRandomPrompt = () => {
    const random = journalPrompts[Math.floor(Math.random() * journalPrompts.length)];
    setTitle(random);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    if (editingId) {
      updateJournalEntry(editingId, {
        title: title.trim(),
        content: content.trim(),
        mood: selectedMood,
        isGratitude,
        tags,
      });
      addToast({ type: 'success', message: 'Journal entry updated securely.' });
    } else {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        title: title.trim(),
        content: content.trim(),
        mood: selectedMood,
        date: new Date().toISOString().split('T')[0],
        timestamp: new Date().toISOString(),
        tags,
        isGratitude,
      };
      addJournalEntry(newEntry);
      addToast({ type: 'success', message: 'Saved to your private encrypted journal.' });
    }

    setModalOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteJournalEntry(id);
    addToast({ type: 'info', message: 'Journal entry removed.' });
  };

  const filteredEntries = journalEntries.filter(entry => {
    if (filterGratitudeOnly && !entry.isGratitude) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      entry.title.toLowerCase().includes(q) ||
      entry.content.toLowerCase().includes(q) ||
      entry.tags.some(t => t.toLowerCase().includes(q))
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3730A3', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
              <Shield size={16} /> 100% Client-Side Privacy
            </div>
            <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
              Private Wellness Journal
            </h1>
            <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
              Write freely with complete privacy. Your entries remain encrypted locally on your browser. MindMate never shares journal content with AI or third parties.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenNew}
            className="btn btn-primary btn-lg"
            style={{ borderRadius: '14px' }}
          >
            <Plus size={18} /> New Journal Entry
          </button>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div className="card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <input
            type="text"
            className="input"
            placeholder="Search reflections or tags (e.g., gratitude, exam, walk)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '38px' }}
          />
          <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '12px', top: '14px' }} />
        </div>

        <button
          type="button"
          onClick={() => setFilterGratitudeOnly(!filterGratitudeOnly)}
          className={`btn btn-sm ${filterGratitudeOnly ? 'btn-primary' : 'btn-outline'}`}
          style={{ borderRadius: '10px', height: '42px', display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Heart size={16} fill={filterGratitudeOnly ? 'white' : 'none'} />
          <span>Gratitude Entries Only</span>
        </button>
      </div>

      {/* 3. Journal Entries List */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>
            Reflections & Pages ({filteredEntries.length})
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Stored locally on this device
          </span>
        </div>

        {filteredEntries.length === 0 ? (
          <div className="card" style={{ padding: '48px 24px', textAlign: 'center', borderRadius: '20px' }}>
            <BookOpen size={48} color="#94A3B8" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 8px' }}>
              No Reflections Found
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: '0 0 20px' }}>
              {searchQuery ? 'Try clearing your search query.' : 'Begin writing down your thoughts, gratitude, or dreams.'}
            </p>
            <button
              type="button"
              onClick={handleOpenNew}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: '10px' }}
            >
              <Plus size={16} /> Write First Reflection
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '20px',
          }}>
            {filteredEntries.map(entry => (
              <div
                key={entry.id}
                className="card"
                style={{
                  padding: '24px',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '16px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {entry.mood && (
                        <span style={{ fontSize: '1.5rem', lineHeight: 1 }} title={entry.mood}>
                          {moodEmojiMap[entry.mood]}
                        </span>
                      )}
                      {entry.isGratitude && (
                        <span className="badge badge-warning" style={{ fontSize: '0.688rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <Heart size={10} fill="#D97706" /> Gratitude
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {entry.date}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px' }}>
                    {entry.title}
                  </h4>
                  <p style={{
                    fontSize: '0.875rem',
                    color: 'var(--color-text-light)',
                    lineHeight: 1.6,
                    margin: 0,
                    whiteSpace: 'pre-wrap',
                  }}>
                    {entry.content}
                  </p>

                  {/* Tags */}
                  {entry.tags && entry.tags.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '14px' }}>
                      {entry.tags.map(t => (
                        <span
                          key={t}
                          style={{
                            fontSize: '0.688rem',
                            padding: '2px 8px',
                            borderRadius: '6px',
                            background: 'var(--color-bg)',
                            color: 'var(--color-text-muted)',
                            border: '1px solid var(--color-border)',
                          }}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: '8px',
                  paddingTop: '12px',
                  borderTop: '1px solid var(--color-border)',
                }}>
                  <button
                    type="button"
                    onClick={() => handleEdit(entry)}
                    className="btn btn-sm btn-ghost"
                    style={{ fontSize: '0.75rem' }}
                  >
                    <Edit3 size={14} /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry.id)}
                    className="btn btn-sm btn-ghost"
                    style={{ fontSize: '0.75rem', color: 'var(--color-danger)' }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. New / Edit Journal Entry Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingId ? 'Edit Journal Entry' : 'New Safe Reflection'}
        maxWidth="640px"
      >
        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Prompt Suggester */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="label" style={{ margin: 0 }}>Entry Title / Question</label>
            <button
              type="button"
              onClick={handleRandomPrompt}
              className="btn btn-sm btn-ghost"
              style={{ fontSize: '0.75rem', color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Sparkles size={14} /> Inspire Me with a Prompt
            </button>
          </div>

          <input
            type="text"
            className="input"
            placeholder="What is on your heart today?"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />

          <div>
            <label className="label">Your Thoughts & Reflections</label>
            <textarea
              className="input textarea"
              placeholder="Take a deep breath and let thoughts flow without judgement..."
              value={content}
              onChange={e => setContent(e.target.value)}
              rows={6}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
            {/* Mood Association */}
            <div>
              <label className="label">Associated Feeling</label>
              <select
                className="input"
                value={selectedMood}
                onChange={e => setSelectedMood(e.target.value as MoodType)}
              >
                <option value="calm">😌 Calm</option>
                <option value="happy">😊 Happy</option>
                <option value="anxious">😰 Anxious</option>
                <option value="sad">😢 Sad</option>
                <option value="tired">😴 Tired</option>
                <option value="overwhelmed">😵 Overwhelmed</option>
                <option value="lonely">🥺 Lonely</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="label">Tags (comma separated)</label>
              <input
                type="text"
                className="input"
                placeholder="nature, gratitude, exams"
                value={tagsInput}
                onChange={e => setTagsInput(e.target.value)}
              />
            </div>
          </div>

          {/* Gratitude Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              id="isGratitude"
              checked={isGratitude}
              onChange={e => setIsGratitude(e.target.checked)}
              style={{ cursor: 'pointer' }}
            />
            <label htmlFor="isGratitude" style={{ fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>
              Mark this entry as a Gratitude reflection 🌸
            </label>
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
              Save Entry
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
