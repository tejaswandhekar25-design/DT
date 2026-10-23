// ============================================
// MindMate — Authenticated Dashboard Layout
// ============================================

import { Outlet, useLocation, Link, useNavigate } from 'react-router-dom';
import { Menu, Sun, Moon, AlertTriangle, Sparkles, User, Bell } from 'lucide-react';
import Sidebar from './Sidebar';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const titleMap: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': { title: 'Wellness Dashboard', subtitle: 'Welcome back to your safe space' },
  '/chat': { title: 'Seren AI Companion', subtitle: 'Your empathetic, non-judgmental wellness guide' },
  '/mood': { title: 'Mood Tracker & Insights', subtitle: 'Track your daily emotional journey with gentle clarity' },
  '/wellness-plan': { title: 'Personalized Daily Plan', subtitle: 'Flexible, realistic habits tailored to your rhythm' },
  '/yoga': { title: 'Yoga & Gentle Movement', subtitle: 'Mindful physical routines to ease body and mind' },
  '/nutrition': { title: 'Nourishment & Habits', subtitle: 'Balanced lifestyle suggestions and mindful hydration' },
  '/breathing': { title: 'Guided Breathing Studio', subtitle: 'Find your center with paced respiratory exercises' },
  '/calm': { title: 'Calm Corner', subtitle: 'Peaceful spaces for quiet reflection and grounding' },
  '/sounds': { title: 'Nature Soundscape Studio', subtitle: 'Mix soothing rain, ocean waves, and gentle forest sounds' },
  '/journal': { title: 'Private Wellness Journal', subtitle: 'Your private, secure sanctuary for thoughts and gratitude' },
  '/challenges': { title: 'Gentle Self-Care Challenges', subtitle: 'Build sustainable positive habits at your own pace' },
  '/progress': { title: 'Progress & Insights', subtitle: 'Reflect on your growth and consistency over time' },
  '/sos': { title: 'Emergency SOS & Helplines', subtitle: 'Immediate, verified support services and grounding tools' },
  '/settings': { title: 'Account & Preferences', subtitle: 'Manage your profile, goals, privacy, and theme' },
};

export default function DashboardLayout() {
  const { theme, toggleTheme } = useTheme();
  const { sidebarOpen, setSidebarOpen, user, toasts } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const currentInfo = titleMap[location.pathname] || {
    title: 'MindMate Wellness',
    subtitle: 'Your Safe Space for a Brighter You',
  };

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Sidebar />

      {/* Main Content Area */}
      <div
        className={`main-content ${!sidebarOpen ? 'sidebar-collapsed' : ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Top Header Bar */}
        <header
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: theme === 'dark' ? 'rgba(15, 23, 42, 0.92)' : 'rgba(250, 250, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            borderBottom: `1px solid ${theme === 'dark' ? 'var(--color-dark-border)' : 'var(--color-border)'}`,
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Left: Mobile Toggle & Page Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              className="btn btn-icon btn-ghost mobile-toggle-btn"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle navigation menu"
            >
              <Menu size={22} />
            </button>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, lineHeight: 1.2 }}>
                  {currentInfo.title}
                </h1>
                <span
                  style={{
                    fontSize: '0.75rem',
                    padding: '2px 8px',
                    borderRadius: '999px',
                    background: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'var(--color-accent-mint)',
                    color: theme === 'dark' ? '#6EE7B7' : '#065F46',
                    fontWeight: 600,
                  }}
                  className="desktop-only"
                >
                  {todayStr}
                </span>
              </div>
              <p
                style={{
                  fontSize: '0.813rem',
                  color: 'var(--color-text-light)',
                  margin: '2px 0 0',
                }}
                className="desktop-only"
              >
                {currentInfo.subtitle}
              </p>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quick Seren AI Button */}
            <Link
              to="/chat"
              className="btn btn-sm"
              style={{
                background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                color: 'white',
                borderRadius: '999px',
                padding: '8px 14px',
                textDecoration: 'none',
              }}
              title="Talk to Seren AI"
            >
              <Sparkles size={16} />
              <span className="desktop-only">Seren AI</span>
            </Link>

            {/* Quick SOS Link */}
            <Link
              to="/sos"
              className="btn btn-sm"
              style={{
                background: theme === 'dark' ? 'rgba(239, 68, 68, 0.2)' : '#FEE2E2',
                color: theme === 'dark' ? '#FCA5A5' : '#DC2626',
                border: theme === 'dark' ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid #FECACA',
                borderRadius: '999px',
                padding: '8px 14px',
                textDecoration: 'none',
                fontWeight: 700,
              }}
              title="Emergency SOS & Crisis Support"
            >
              <AlertTriangle size={16} />
              <span className="desktop-only">SOS Support</span>
            </Link>

            {/* Theme Toggle */}
            <button
              className="btn btn-icon btn-ghost"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Profile Avatar / Link */}
            <Link
              to="/settings"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'var(--color-secondary)',
                border: '2px solid var(--color-primary-light)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
              title="Profile & Settings"
            >
              {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <User size={18} />}
            </Link>
          </div>
        </header>

        {/* Demo Mode Notice Banner (Subtle & Dismissible) */}
        <div
          style={{
            background: 'var(--notice-bg)',
            borderBottom: '1px solid var(--notice-border)',
            padding: '8px 24px',
            fontSize: '0.813rem',
            color: 'var(--notice-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.875rem' }}>✨</span>
            <span>
              <strong>MindMate Interactive Demo Mode:</strong> All wellness tools, audio generators, and local state are active and fully functional.
            </span>
          </div>
          <Link
            to="/settings"
            style={{
              color: 'var(--notice-link)',
              fontWeight: 600,
              textDecoration: 'underline',
              fontSize: '0.75rem',
            }}
          >
            Manage Data & Cloud Config →
          </Link>
        </div>

        {/* Dynamic Nested Content */}
        <div style={{ flex: 1, padding: '24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Outlet />
          </div>
        </div>
      </div>

      <style>{`
        .mobile-toggle-btn { display: none; }
        @media (max-width: 1024px) {
          .mobile-toggle-btn { display: inline-flex !important; }
        }
      `}</style>
    </div>
  );
}
