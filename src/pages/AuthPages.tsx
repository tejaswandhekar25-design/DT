// ============================================
// MindMate — Authentication Pages
// Login, Sign Up, & Forgot Password with Validation
// ============================================

import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Brain, Eye, EyeOff, Lock, Mail, User, ArrowRight, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AuthPages() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : searchParams.get('mode') === 'forgot' ? 'forgot' : 'login';
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);

  const { login, signup, addToast } = useApp();
  const navigate = useNavigate();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please provide a valid email format (e.g. name@example.com).');
      return;
    }

    if (mode === 'forgot') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setForgotSent(true);
        addToast({ type: 'success', message: 'Password recovery email sent (demo simulation).' });
      }, 700);
      return;
    }

    if (!password) {
      setError('Please provide your password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'signup') {
      if (!name.trim()) {
        setError('Please enter your full or preferred name.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      if (!agreedTerms) {
        setError('Please accept our terms of service and privacy consent.');
        return;
      }

      setLoading(true);
      try {
        await signup(name, email, password);
        addToast({ type: 'success', message: 'Welcome to MindMate! Let’s personalize your journey.' });
        navigate('/onboarding');
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : 'Registration failed.');
      } finally {
        setLoading(false);
      }
      return;
    }

    // Login mode
    setLoading(true);
    try {
      await login(email, password);
      addToast({ type: 'success', message: 'Welcome back! Loaded your wellness sanctuary.' });
      navigate('/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid login credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoQuickLogin = async () => {
    setLoading(true);
    await login('demo.student@mindmate.app', 'demo123');
    addToast({ type: 'info', message: 'Logged in as Demo Student. Exploring all features!' });
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 140px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'var(--color-bg)',
    }}>
      <div style={{ maxWidth: '460px', width: '100%' }}>
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #3730A3, #6366F1)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px',
            boxShadow: 'var(--shadow-glow)',
          }}>
            <Brain size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 6px' }}>
            {mode === 'signup' && 'Create Your Safe Space'}
            {mode === 'login' && 'Welcome Back to MindMate'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: 0 }}>
            {mode === 'signup' && 'Begin your gentle, personalized wellness routine today.'}
            {mode === 'login' && 'Take a deep breath and continue your journey.'}
            {mode === 'forgot' && 'Enter your email to receive recovery instructions.'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="card" style={{ padding: '32px', borderRadius: '20px' }}>
          {/* Quick Demo Access Banner */}
          <div style={{
            background: 'var(--color-secondary)',
            borderRadius: '12px',
            padding: '12px 14px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.813rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              <Sparkles size={16} /> Instant Demo Access
            </div>
            <button
              type="button"
              onClick={handleDemoQuickLogin}
              className="btn btn-sm btn-primary"
              style={{ fontSize: '0.75rem', padding: '6px 12px' }}
            >
              1-Click Enter
            </button>
          </div>

          {error && (
            <div style={{
              background: '#FEE2E2',
              border: '1px solid #FECACA',
              color: '#991B1B',
              borderRadius: '10px',
              padding: '12px',
              fontSize: '0.813rem',
              marginBottom: '18px',
            }}>
              {error}
            </div>
          )}

          {forgotSent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 16px' }} />
              <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '8px' }}>Check Your Email</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '20px' }}>
                We've sent password reset guidelines to <strong>{email}</strong>. Please check your inbox and follow the steps.
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => { setForgotSent(false); setMode('login'); }}
                style={{ width: '100%' }}
              >
                Back to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mode === 'signup' && (
                <div>
                  <label className="label">Preferred Name</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="e.g. Alex Sharma"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      style={{ paddingLeft: '40px' }}
                    />
                    <User size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                  </div>
                </div>
              )}

              <div>
                <label className="label">Email Address</label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="email"
                    className="input"
                    placeholder="name@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ paddingLeft: '40px' }}
                  />
                  <Mail size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label className="label">Password</label>
                    {mode === 'login' && (
                      <button
                        type="button"
                        onClick={() => { setError(null); setMode('forgot'); }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="input"
                      placeholder="Minimum 6 characters"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      style={{ paddingLeft: '40px', paddingRight: '40px' }}
                    />
                    <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '12px', top: '13px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <>
                  <div>
                    <label className="label">Confirm Password</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="input"
                        placeholder="Re-enter your password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={{ paddingLeft: '40px' }}
                      />
                      <Lock size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '14px', top: '15px' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.813rem', color: 'var(--color-text-light)', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreedTerms}
                      onChange={e => setAgreedTerms(e.target.checked)}
                      style={{ marginTop: '3px', cursor: 'pointer' }}
                    />
                    <label htmlFor="terms" style={{ cursor: 'pointer', lineHeight: 1.4 }}>
                      I agree to MindMate's privacy policies and understand this service provides supportive wellness tools, not medical or psychiatric diagnosis.
                    </label>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary btn-lg"
                style={{ width: '100%', marginTop: '8px' }}
              >
                {loading ? (
                  <div className="spinner" style={{ width: '20px', height: '20px' }} />
                ) : (
                  <>
                    {mode === 'signup' && 'Create Account'}
                    {mode === 'login' && 'Sign In to MindMate'}
                    {mode === 'forgot' && 'Send Reset Link'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Switch Modes */}
          <div style={{
            marginTop: '24px',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-border)',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: 'var(--color-text-light)',
          }}>
            {mode === 'login' && (
              <p style={{ margin: 0 }}>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setError(null); setMode('signup'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Sign up free
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p style={{ margin: 0 }}>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setError(null); setMode('login'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Log in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p style={{ margin: 0 }}>
                Remember your password?{' '}
                <button
                  type="button"
                  onClick={() => { setError(null); setMode('login'); }}
                  style={{ background: 'none', border: 'none', color: 'var(--color-primary)', fontWeight: 700, cursor: 'pointer', padding: 0 }}
                >
                  Return to login
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Trust & Safety Note */}
        <div style={{
          textAlign: 'center',
          marginTop: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          fontSize: '0.75rem',
          color: 'var(--color-text-muted)',
        }}>
          <ShieldCheck size={14} /> Encrypted client storage • Non-diagnostic • No ads
        </div>
      </div>
    </div>
  );
}
