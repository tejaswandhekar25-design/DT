// ============================================
// MindMate — Navbar Component
// Top navigation for public pages
// ============================================

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Brain } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="nav-bar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      backdropFilter: 'blur(16px)',
      background: theme === 'dark' ? 'rgba(15, 23, 42, 0.9)' : 'rgba(250, 250, 255, 0.9)',
      borderBottom: `1px solid ${theme === 'dark' ? 'var(--color-dark-border)' : 'var(--color-border)'}`,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #3730A3, #6366F1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Brain size={24} color="white" />
          </div>
          <span style={{
            fontSize: '1.25rem',
            fontWeight: 800,
            color: theme === 'dark' ? 'var(--color-dark-text)' : 'var(--color-text)',
          }}>
            Mind<span style={{ color: theme === 'dark' ? 'var(--color-dark-primary)' : 'var(--color-primary)' }}>Mate</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="desktop-nav" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
        }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className={`nav-link ${location.pathname === link.href ? 'active' : ''}`}
              style={{ fontSize: '0.875rem' }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-icon btn-ghost"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/login" className="btn btn-ghost btn-sm desktop-only" style={{ fontSize: '0.875rem' }}>
            Log in
          </Link>
          <Link to="/signup" className="btn btn-primary btn-sm desktop-only" style={{ fontSize: '0.875rem' }}>
            Get Started
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="btn btn-icon btn-ghost mobile-only"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="animate-slide-down" style={{
          padding: '16px 24px 24px',
          borderTop: `1px solid ${theme === 'dark' ? 'var(--color-dark-border)' : 'var(--color-border)'}`,
        }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="nav-link"
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', padding: '12px 16px' }}
            >
              {link.label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
            <Link to="/login" className="btn btn-outline" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
              Log in
            </Link>
            <Link to="/signup" className="btn btn-primary" onClick={() => setMobileOpen(false)} style={{ flex: 1 }}>
              Get Started
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex; }
        .desktop-only { display: inline-flex; }
        .mobile-only { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none; }
          .desktop-only { display: none !important; }
          .mobile-only { display: inline-flex !important; }
        }
      `}</style>
    </nav>
  );
}
