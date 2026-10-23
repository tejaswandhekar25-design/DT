// ============================================
// MindMate — Sidebar Component
// Left sidebar for authenticated dashboard pages
// ============================================

import { NavLink, useNavigate } from 'react-router-dom';
import {
  Brain, LayoutDashboard, MessageCircle, SmilePlus, CalendarHeart,
  Dumbbell, Apple, Wind, TreePine, Music, BookOpen, Trophy,
  BarChart3, AlertTriangle, Settings, LogOut, ChevronLeft,
  ChevronRight, Sun, Moon, Sparkles,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useApp } from '../../context/AppContext';

const sidebarLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Seren AI', icon: MessageCircle, path: '/chat' },
  { label: 'Mood Tracker', icon: SmilePlus, path: '/mood' },
  { label: 'Wellness Plan', icon: CalendarHeart, path: '/wellness-plan' },
  { label: 'Yoga & Exercise', icon: Dumbbell, path: '/yoga' },
  { label: 'Nutrition', icon: Apple, path: '/nutrition' },
  { label: 'Breathing', icon: Wind, path: '/breathing' },
  { label: 'Calm Corner', icon: TreePine, path: '/calm' },
  { label: 'Soundscapes', icon: Music, path: '/sounds' },
  { label: 'Journal', icon: BookOpen, path: '/journal' },
  { label: 'Challenges', icon: Trophy, path: '/challenges' },
  { label: 'Progress', icon: BarChart3, path: '/progress' },
  { label: 'SOS Support', icon: AlertTriangle, path: '/sos' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar() {
  const { theme, toggleTheme } = useTheme();
  const { sidebarOpen, setSidebarOpen, logout, user } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 35,
            display: 'none',
          }}
        />
      )}

      <aside
        className={`sidebar ${sidebarOpen ? 'open' : ''}`}
        style={{
          width: sidebarOpen ? '280px' : '72px',
          transition: 'all 0.3s ease',
        }}
      >
        {/* Logo area */}
        <div style={{
          padding: sidebarOpen ? '20px 20px 12px' : '20px 12px 12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'space-between' : 'center',
          borderBottom: `1px solid ${theme === 'dark' ? 'var(--color-dark-border)' : 'var(--color-border)'}`,
          marginBottom: '8px',
          paddingBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3730A3, #6366F1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Brain size={20} color="white" />
            </div>
            {sidebarOpen && (
              <span style={{
                fontSize: '1.125rem',
                fontWeight: 800,
                whiteSpace: 'nowrap',
                color: theme === 'dark' ? 'var(--color-dark-text)' : 'var(--color-text)',
              }}>
                Mind<span style={{ color: theme === 'dark' ? 'var(--color-dark-primary)' : 'var(--color-primary)' }}>Mate</span>
              </span>
            )}
          </div>
          <button
            className="btn btn-icon btn-ghost collapse-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label={sidebarOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            style={{ flexShrink: 0 }}
          >
            {sidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* User greeting */}
        {sidebarOpen && user && (
          <div style={{
            padding: '8px 16px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--color-accent-mint), var(--color-accent-sky))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Sparkles size={18} color="#3730A3" />
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{
                fontSize: '0.813rem',
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                color: theme === 'dark' ? 'var(--color-dark-text)' : 'var(--color-text)',
              }}>
                {user.displayName}
              </div>
              <div style={{
                fontSize: '0.688rem',
                color: theme === 'dark' ? 'var(--color-dark-text-muted)' : 'var(--color-text-muted)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {user.email}
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {sidebarLinks.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              title={link.label}
              onClick={() => {
                if (window.innerWidth <= 1024) setSidebarOpen(false);
              }}
            >
              <link.icon size={20} style={{ flexShrink: 0 }} />
              {sidebarOpen && <span>{link.label}</span>}
            </NavLink>
          ))}
        </div>

        {/* Bottom actions */}
        <div style={{
          padding: '12px 8px',
          borderTop: `1px solid ${theme === 'dark' ? 'var(--color-dark-border)' : 'var(--color-border)'}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          <button
            className="sidebar-link"
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              width: '100%',
              textAlign: 'left',
            }}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            {sidebarOpen && <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>}
          </button>

          <button
            className="sidebar-link"
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              width: '100%',
              textAlign: 'left',
              color: 'var(--color-danger)',
            }}
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <style>{`
        .sidebar-overlay { display: none; }
        .collapse-btn { display: inline-flex; }
        @media (max-width: 1024px) {
          .sidebar-overlay { display: block !important; }
          .collapse-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
