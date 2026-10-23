// ============================================
// MindMate — SOS & Immediate Crisis Support
// Verified 24/7 Helplines (India, US, UK, Global),
// Pre-written trusted message drafter, & emergency distinction
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle, PhoneCall, MessageSquare, Anchor, ShieldCheck,
  Heart, Copy, Check, ExternalLink, UserCheck, AlertCircle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function SosPage() {
  const { user, addToast } = useApp();

  const [copied, setCopied] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<'india' | 'us' | 'uk' | 'global'>('india');

  const prewrittenMessage = `Hi, I’m currently going through a really difficult moment and feeling overwhelmed. I don’t need you to fix everything right now, but I would really appreciate having someone safe to talk to or just sit with me for a bit. Could we connect?`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(prewrittenMessage);
    setCopied(true);
    addToast({ type: 'success', message: 'Message copied to clipboard! You can paste it into SMS or WhatsApp.' });
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Critical Emergency Alert Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FEE2E2 0%, #FEF2F2 100%)',
        border: '2px solid #F87171',
        borderRadius: '24px',
        padding: '32px',
        color: '#991B1B',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: '#EF4444',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}>
            <AlertTriangle size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, margin: 0 }}>
              You Are Not Alone. Immediate Support is Available.
            </h1>
            <span style={{ fontSize: '0.813rem', fontWeight: 700, color: '#B91C1C' }}>
              Free, Confidential, and Available 24 Hours a Day, 7 Days a Week
            </span>
          </div>
        </div>

        <p style={{ fontSize: '0.938rem', lineHeight: 1.6, color: '#7F1D1D', margin: '0 0 20px', maxWidth: '750px' }}>
          If you are experiencing overwhelming emotional pain, thinking about harming yourself, or in immediate danger, please connect directly with real, trained human counselors who care deeply and are ready to listen right now.
        </p>

        {/* Urgent vs Non-Emergency Distinction */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '16px 20px',
          border: '1px solid #FECACA',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          color: '#1F2937',
        }}>
          <div>
            <div style={{ fontWeight: 800, color: '#DC2626', fontSize: '0.875rem', marginBottom: '4px' }}>
              🚨 Urgent Emergency:
            </div>
            <p style={{ fontSize: '0.813rem', color: '#4B5563', margin: 0, lineHeight: 1.4 }}>
              Immediate risk of physical harm or severe medical crisis. Please call emergency services (112 in India, 911 in US) or go to the nearest hospital emergency room.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 800, color: '#2563EB', fontSize: '0.875rem', marginBottom: '4px' }}>
              💬 Confidential Crisis Helpline:
            </div>
            <p style={{ fontSize: '0.813rem', color: '#4B5563', margin: 0, lineHeight: 1.4 }}>
              Heavy anxiety, depression, feeling isolated, or needing a compassionate person to talk you through a hard night. Call or text the numbers below.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Country Selector */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'india', label: '🇮🇳 India Helplines' },
          { id: 'us', label: '🇺🇸 United States & Canada' },
          { id: 'uk', label: '🇬🇧 United Kingdom' },
          { id: 'global', label: '🌍 Global International Directory' },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedCountry(tab.id as any)}
            className={`btn btn-sm ${selectedCountry === tab.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.813rem', whiteSpace: 'nowrap' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. Verified Helplines Directory */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '20px',
      }}>
        {selectedCountry === 'india' && (
          <>
            {/* Tele-MANAS */}
            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #4F46E5' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-success">Govt of India • 24/7 Free</span>
                <PhoneCall size={20} color="#4F46E5" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Tele-MANAS</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                National Tele Mental Health Programme of India. Available in 20+ regional languages.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <a
                  href="tel:14416"
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1, textDecoration: 'none', borderRadius: '10px' }}
                >
                  <PhoneCall size={16} /> Call 14416
                </a>
                <a
                  href="tel:18008914416"
                  className="btn btn-outline btn-sm"
                  style={{ flex: 1, textDecoration: 'none', borderRadius: '10px' }}
                >
                  1800-891-4416
                </a>
              </div>
            </div>

            {/* Kiran Helpline */}
            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #059669' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-primary">Ministry of Social Justice</span>
                <PhoneCall size={20} color="#059669" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Kiran Mental Health</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                24/7 toll-free helpline providing early screening, first-aid psychological counseling, and distress management.
              </p>
              <a
                href="tel:18005990019"
                className="btn btn-primary btn-sm"
                style={{ width: '100%', textDecoration: 'none', borderRadius: '10px', background: '#059669' }}
              >
                <PhoneCall size={16} /> Call 1800-599-0019
              </a>
            </div>

            {/* Vandrevala Foundation */}
            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #D97706' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span className="badge badge-warning">NGO • 24/7 Free Support</span>
                <PhoneCall size={20} color="#D97706" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Vandrevala Foundation</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Free, confidential emotional support & crisis intervention counseling via phone and WhatsApp.
              </p>
              <a
                href="tel:+919999666555"
                className="btn btn-primary btn-sm"
                style={{ width: '100%', textDecoration: 'none', borderRadius: '10px', background: '#D97706' }}
              >
                <PhoneCall size={16} /> Call +91 9999 666 555
              </a>
            </div>
          </>
        )}

        {selectedCountry === 'us' && (
          <>
            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #2563EB' }}>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>US & Canada 24/7</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>988 Suicide & Crisis Lifeline</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Call or text 988 anywhere in the United States or Canada for immediate confidential care.
              </p>
              <a href="tel:988" className="btn btn-primary btn-sm" style={{ width: '100%', textDecoration: 'none', borderRadius: '10px' }}>
                <PhoneCall size={16} /> Call / Text 988
              </a>
            </div>

            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #7C3AED' }}>
              <span className="badge badge-secondary" style={{ marginBottom: '8px' }}>Text Line</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Crisis Text Line</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Free 24/7 crisis support via SMS. Text HOME to 741741 to connect with a crisis volunteer.
              </p>
              <a href="sms:741741?body=HOME" className="btn btn-primary btn-sm" style={{ width: '100%', textDecoration: 'none', borderRadius: '10px', background: '#7C3AED' }}>
                <MessageSquare size={16} /> Text HOME to 741741
              </a>
            </div>
          </>
        )}

        {selectedCountry === 'uk' && (
          <>
            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #059669' }}>
              <span className="badge badge-success" style={{ marginBottom: '8px' }}>UK NHS 24/7</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>NHS 111 Mental Health</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Select mental health options to speak with local NHS crisis teams directly.
              </p>
              <a href="tel:111" className="btn btn-primary btn-sm" style={{ width: '100%', textDecoration: 'none', borderRadius: '10px' }}>
                <PhoneCall size={16} /> Call 111
              </a>
            </div>

            <div className="card" style={{ padding: '24px', borderRadius: '18px', borderLeft: '6px solid #4F46E5' }}>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Shout 85258</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 4px' }}>Shout Crisis Text Line</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
                Free, confidential, 24/7 text support service. Text SHOUT to 85258.
              </p>
              <a href="sms:85258?body=SHOUT" className="btn btn-primary btn-sm" style={{ width: '100%', textDecoration: 'none', borderRadius: '10px' }}>
                <MessageSquare size={16} /> Text SHOUT to 85258
              </a>
            </div>
          </>
        )}

        {selectedCountry === 'global' && (
          <div className="card" style={{ padding: '24px', borderRadius: '18px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px' }}>International Crisis Resources</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
              Befrienders Worldwide and Find A Helpline provide verified directories of free emotional support helplines in over 130 countries.
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <a
                href="https://findahelpline.com"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ textDecoration: 'none', borderRadius: '10px' }}
              >
                Find A Helpline Directory <ExternalLink size={14} />
              </a>
              <a
                href="https://www.befrienders.org"
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm"
                style={{ textDecoration: 'none', borderRadius: '10px' }}
              >
                Befrienders Worldwide <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 4. Prewritten Message to Reach Out to a Friend */}
      <div className="card" style={{ padding: '28px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <UserCheck size={22} color="var(--color-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Reach Out to a Trusted Person
          </h3>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, margin: '0 0 16px' }}>
          When we feel down, finding the words to ask for help can feel exhausting. You can copy this prewritten message and send it to a trusted friend, family member, or mentor:
        </p>

        <div style={{
          background: 'var(--color-bg)',
          padding: '18px 20px',
          borderRadius: '14px',
          border: '1px solid var(--color-border)',
          fontStyle: 'italic',
          color: 'var(--color-text)',
          fontSize: '0.938rem',
          lineHeight: 1.6,
          marginBottom: '16px',
        }}>
          “{prewrittenMessage}”
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleCopyMessage}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: '10px' }}
          >
            {copied ? <><Check size={16} /> Copied to Clipboard!</> : <><Copy size={16} /> Copy Message Text</>}
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(prewrittenMessage)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm"
            style={{ borderRadius: '10px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <MessageSquare size={16} /> Share via WhatsApp
          </a>
        </div>
      </div>

      {/* 5. Quick Grounding Tool Link */}
      <div className="card gradient-calm" style={{ padding: '24px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Anchor size={28} color="#3730A3" />
          <div>
            <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem', fontWeight: 800, color: '#1E1B4B' }}>
              Need to Steady Your Mind Right This Second?
            </h4>
            <p style={{ margin: 0, fontSize: '0.813rem', color: '#334155' }}>
              Follow our guided 5-4-3-2-1 Sensory Grounding tool or 3-minute soothing breath.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <Link to="/calm" className="btn btn-primary btn-sm" style={{ textDecoration: 'none', borderRadius: '10px' }}>
            Open Grounding Tool
          </Link>
          <Link to="/breathing" className="btn btn-outline btn-sm" style={{ textDecoration: 'none', borderRadius: '10px' }}>
            Breathing Reset
          </Link>
        </div>
      </div>
    </div>
  );
}
