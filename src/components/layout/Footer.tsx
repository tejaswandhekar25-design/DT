// ============================================
// MindMate — Footer Component
// Public footer with branding, links, and safety notice
// ============================================

import { Link } from 'react-router-dom';
import { Brain, Heart, Shield, PhoneCall, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-card)',
      borderTop: '1px solid var(--color-border)',
      padding: '48px 24px 24px',
      marginTop: 'auto',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '36px',
          marginBottom: '40px',
        }}>
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #3730A3, #6366F1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Brain size={22} color="white" />
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                Mind<span style={{ color: '#4F46E5' }}>Mate</span>
              </span>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
              “Your Safe Space for a Brighter You.” Dedicated to supporting students, working professionals, adults, and older adults with accessible, personalized mental wellness tools.
            </p>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: 'var(--color-secondary)', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-primary)' }}>
              <Sparkles size={14} /> Powered by Seren AI
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.938rem', fontWeight: 700, marginBottom: '16px' }}>Wellness Hub</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link to="/chat" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Seren AI Companion</Link></li>
              <li><Link to="/breathing" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Breathing Exercises</Link></li>
              <li><Link to="/sounds" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Nature Soundscapes</Link></li>
              <li><Link to="/yoga" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Yoga & Gentle Movement</Link></li>
              <li><Link to="/calm" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Calm Corner</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 style={{ fontSize: '0.938rem', fontWeight: 700, marginBottom: '16px' }}>Tools & Habits</h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem' }}>
              <li><Link to="/mood" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Daily Mood Tracker</Link></li>
              <li><Link to="/wellness-plan" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Personalized Routine</Link></li>
              <li><Link to="/journal" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Private Journal</Link></li>
              <li><Link to="/challenges" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>7-Day Self-Care</Link></li>
              <li><Link to="/nutrition" style={{ color: 'var(--color-text-light)', textDecoration: 'none' }}>Nutrition & Habits</Link></li>
            </ul>
          </div>

          {/* Emergency & Safety Notice */}
          <div>
            <div style={{
              background: 'var(--color-accent-peach)',
              borderRadius: '14px',
              padding: '16px',
              border: '1px solid #FED7AA',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#9A3412', fontWeight: 700, fontSize: '0.875rem', marginBottom: '8px' }}>
                <PhoneCall size={18} /> In Crisis? Reach Out
              </div>
              <p style={{ fontSize: '0.813rem', color: '#7C2D12', lineHeight: 1.5, marginBottom: '10px' }}>
                If you or someone you know is in immediate distress or having thoughts of self-harm, please connect with a qualified crisis line immediately.
              </p>
              <Link to="/sos" className="btn btn-sm" style={{ background: '#EA580C', color: 'white', width: '100%', textDecoration: 'none', textAlign: 'center', justifyContent: 'center' }}>
                View Emergency Helplines
              </Link>
            </div>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          alignItems: 'center',
          textAlign: 'center',
          fontSize: '0.813rem',
          color: 'var(--color-text-muted)',
        }}>
          <p style={{ maxWidth: '850px', lineHeight: 1.6 }}>
            <Shield size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
            <strong>Important Medical Disclaimer:</strong> MindMate and Seren AI provide supportive wellness exercises, mindfulness techniques, and lifestyle habit suggestions. MindMate is <strong>not</strong> a medical provider, diagnostic tool, or substitute for professional psychiatric, psychological, or medical treatment.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
            <span>© {new Date().getFullYear()} MindMate. All rights reserved.</span>
            <span>•</span>
            <Link to="/#privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy Policy</Link>
            <span>•</span>
            <Link to="/#terms" style={{ color: 'inherit', textDecoration: 'underline' }}>Terms of Service</Link>
            <span>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              Crafted with <Heart size={12} color="#EF4444" fill="#EF4444" /> for everyday mental well-being
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
