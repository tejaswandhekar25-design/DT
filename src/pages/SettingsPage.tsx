// ============================================
// MindMate — Profile, Preferences & Settings
// Profile management, trusted contacts, dietary choices,
// theme toggles, JSON data export & deletion
// ============================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Settings, User, Moon, Sun, Download, Trash2, Shield,
  Bell, Heart, Globe, Users, Plus, Check, LogOut,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useApp } from '../context/AppContext';
import type { AgeGroup, TrustedContact } from '../types';

export default function SettingsPage() {
  const { theme, toggleTheme, setTheme } = useTheme();
  const { user, updateProfile, logout, addToast } = useApp();
  const navigate = useNavigate();

  // Form states
  const [displayName, setDisplayName] = useState(user?.displayName || 'Friend');
  const [ageGroup, setAgeGroupState] = useState<AgeGroup>(user?.ageGroup || 'student');
  const [foodPref, setFoodPref] = useState(user?.preferences?.foodPreferences || 'no-preference');
  const [availableTime, setAvailableTime] = useState(user?.preferences?.availableTime || 20);

  // Trusted contact form
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactRel, setContactRel] = useState('Friend');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      displayName,
      ageGroup,
      preferences: {
        ...(user?.preferences || { language: 'English', preferredActivities: [], theme: 'system', allergies: [], accessibilityNeeds: [] }),
        foodPreferences: foodPref as any,
        availableTime,
      },
    });
    addToast({ type: 'success', message: 'Profile & preferences saved successfully.' });
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim()) return;

    const newContact: TrustedContact = {
      id: Date.now().toString(),
      name: contactName.trim(),
      phone: contactPhone.trim() || undefined,
      relationship: contactRel,
    };

    const currentContacts = user?.trustedContacts || [];
    updateProfile({ trustedContacts: [...currentContacts, newContact] });
    setContactName('');
    setContactPhone('');
    addToast({ type: 'success', message: `Added ${newContact.name} to trusted contacts.` });
  };

  const handleRemoveContact = (id: string) => {
    const updated = (user?.trustedContacts || []).filter(c => c.id !== id);
    updateProfile({ trustedContacts: updated });
    addToast({ type: 'info', message: 'Removed trusted contact.' });
  };

  const handleExportData = () => {
    const dataToExport = {
      userProfile: user,
      exportTimestamp: new Date().toISOString(),
      platform: 'MindMate Mental Wellness Platform',
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(dataToExport, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `mindmate_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();

    addToast({ type: 'success', message: 'Personal wellness data exported to JSON.' });
  };

  const handleDeleteAllData = () => {
    if (window.confirm('Are you sure you want to delete all local wellness data? This will clear your mood history, journal reflections, and preferences from this browser.')) {
      localStorage.clear();
      logout();
      navigate('/');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#3730A3', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Settings size={16} /> Account & Configuration
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Profile & Preferences
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Manage your personal details, life stage, dietary choices, theme appearance, and trusted support network.
        </p>
      </div>

      {/* 2. Personal Profile & Stage Form */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 20px' }}>
          Personal Information
        </h2>

        <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label className="label">Preferred Name</label>
              <input
                type="text"
                className="input"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="label">Life Stage / Age Group</label>
              <select
                className="input"
                value={ageGroup}
                onChange={e => setAgeGroupState(e.target.value as AgeGroup)}
              >
                <option value="student">Student (13–22)</option>
                <option value="professional">Working Professional (23–40)</option>
                <option value="adult">Adult (41–59)</option>
                <option value="older-adult">Older Adult (60+)</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            <div>
              <label className="label">Dietary Preference</label>
              <select
                className="input"
                value={foodPref}
                onChange={e => setFoodPref(e.target.value as any)}
              >
                <option value="vegetarian">Vegetarian</option>
                <option value="non-vegetarian">Non-Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="no-preference">No Preference</option>
              </select>
            </div>

            <div>
              <label className="label">Daily Wellness Time ({availableTime} mins/day)</label>
              <input
                type="range"
                min="5"
                max="60"
                step="5"
                value={availableTime}
                onChange={e => setAvailableTime(Number(e.target.value))}
                style={{ width: '100%', marginTop: '10px' }}
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignSelf: 'flex-start', borderRadius: '12px', marginTop: '8px' }}
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* 3. Appearance & Theme Settings */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 16px' }}>
          Theme & Display
        </h2>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setTheme('light')}
            className={`btn ${theme === 'light' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Sun size={18} /> Light Mode (Warm White & Lavender)
          </button>
          <button
            type="button"
            onClick={() => setTheme('dark')}
            className={`btn ${theme === 'dark' ? 'btn-primary' : 'btn-outline'}`}
            style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Moon size={18} /> Dark Mode (Deep Navy & Indigo)
          </button>
        </div>
      </div>

      {/* 4. Trusted Contacts Network */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <Users size={22} color="var(--color-primary)" />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Trusted Support Contacts
          </h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: '0 0 20px', lineHeight: 1.5 }}>
          Add trusted friends, family, or mentors you feel safe reaching out to during tough times. MindMate never contacts them automatically.
        </p>

        {/* Existing Contacts List */}
        {(user?.trustedContacts || []).length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {user?.trustedContacts.map(contact => (
              <div
                key={contact.id}
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
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{contact.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    {contact.relationship} {contact.phone && `• ${contact.phone}`}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveContact(contact.id)}
                  className="btn btn-sm btn-ghost"
                  style={{ color: 'var(--color-danger)' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add Contact Form */}
        <form onSubmit={handleAddContact} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr)) auto',
          gap: '12px',
          alignItems: 'flex-end',
        }}>
          <div>
            <label className="label">Contact Name</label>
            <input
              type="text"
              className="input"
              placeholder="e.g. Maya Sharma"
              value={contactName}
              onChange={e => setContactName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Phone / WhatsApp</label>
            <input
              type="tel"
              className="input"
              placeholder="+91 98765 43210"
              value={contactPhone}
              onChange={e => setContactPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="label">Relationship</label>
            <select
              className="input"
              value={contactRel}
              onChange={e => setContactRel(e.target.value)}
            >
              <option value="Friend">Friend</option>
              <option value="Family Member">Family Member</option>
              <option value="Partner">Partner</option>
              <option value="Mentor / Counselor">Mentor / Counselor</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ borderRadius: '12px', height: '44px' }}
          >
            <Plus size={16} /> Add Contact
          </button>
        </form>
      </div>

      {/* 5. Privacy, Data Export & Account Deletion */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px', borderLeft: '6px solid #EF4444' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px', color: '#991B1B' }}>
          Data Privacy & Data Sovereignty
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: '0 0 20px', lineHeight: 1.5 }}>
          You have complete ownership of your wellness history. Export a full copy of your records in JSON format, or permanently wipe your local records anytime.
        </p>

        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleExportData}
            className="btn btn-outline"
            style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Download size={18} /> Download All Data (JSON)
          </button>

          <button
            type="button"
            onClick={handleDeleteAllData}
            className="btn btn-danger"
            style={{ borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <Trash2 size={18} /> Permanently Delete My Data
          </button>
        </div>
      </div>
    </div>
  );
}
