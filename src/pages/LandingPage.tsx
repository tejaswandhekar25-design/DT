// ============================================
// MindMate — Landing Page
// "A Little More Calm. A Little More You."
// ============================================

import { Link } from 'react-router-dom';
import {
  Brain, Sparkles, Smile, Calendar, Dumbbell, Apple, Music,
  Shield, HeartHandshake, CheckCircle2, ArrowRight, Play,
  ChevronRight, Users, MessageSquareHeart, Star, Activity,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div style={{ overflowX: 'hidden' }}>
      {/* ================= HERO SECTION ================= */}
      <section
        className="gradient-hero"
        style={{
          padding: '80px 24px 100px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}>
            {/* Left Hero Content */}
            <div className="animate-fade-in-up">
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(8px)',
                borderRadius: '999px',
                border: '1px solid var(--color-border)',
                marginBottom: '24px',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#3730A3',
              }}>
                <Sparkles size={16} />
                <span>Your Safe Space for a Brighter You</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                marginBottom: '20px',
                color: 'var(--color-text)',
                letterSpacing: '-0.02em',
              }}>
                A Little More Calm.{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #3730A3, #6366F1)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                  A Little More You.
                </span>
              </h1>

              <p style={{
                fontSize: '1.125rem',
                color: 'var(--color-text-light)',
                lineHeight: 1.7,
                marginBottom: '32px',
                maxWidth: '540px',
              }}>
                MindMate helps students, working professionals, adults, and older adults navigate daily stress, build calming routines, track moods, and find gentle balance through personalized AI companion support.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center' }}>
                <Link
                  to="/signup"
                  className="btn btn-primary btn-lg"
                  style={{ textDecoration: 'none', borderRadius: '14px', fontWeight: 700 }}
                >
                  Start Your Wellness Journey <ArrowRight size={18} />
                </Link>
                <Link
                  to="/chat"
                  className="btn btn-outline btn-lg"
                  style={{ textDecoration: 'none', borderRadius: '14px', fontWeight: 600 }}
                >
                  <Sparkles size={18} /> Meet Seren AI
                </Link>
              </div>

              <div style={{
                marginTop: '36px',
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: '0.813rem',
                color: 'var(--color-text-light)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> Free & Private
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> No Diagnostic Pressure
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={16} color="#10B981" /> 4 Tailored Life Stages
                </div>
              </div>
            </div>

            {/* Right Hero: Serene Mountain & Lake Visual */}
            <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '500px',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: 'var(--shadow-lg)',
                  border: '1px solid rgba(255,255,255,0.4)',
                }}
              >
                {/* Custom Nature SVG Landscape: Mountains, Lake, Sun, Pine Trees */}
                <svg viewBox="0 0 600 450" style={{ width: '100%', height: 'auto', display: 'block' }}>
                  <defs>
                    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C7D2FE" />
                      <stop offset="50%" stopColor="#E0E7FF" />
                      <stop offset="100%" stopColor="#FED7AA" />
                    </linearGradient>
                    <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FEF08A" />
                      <stop offset="100%" stopColor="#F97316" />
                    </linearGradient>
                    <linearGradient id="mountFar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#818CF8" />
                      <stop offset="100%" stopColor="#4338CA" />
                    </linearGradient>
                    <linearGradient id="mountMid" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#312E81" />
                    </linearGradient>
                    <linearGradient id="lakeGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#60A5FA" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                  </defs>

                  {/* Sky */}
                  <rect width="600" height="450" fill="url(#skyGrad)" />

                  {/* Sun */}
                  <circle cx="300" cy="180" r="60" fill="url(#sunGrad)" opacity="0.85" />

                  {/* Distant Mountains */}
                  <polygon points="0,320 160,170 320,320" fill="url(#mountFar)" opacity="0.7" />
                  <polygon points="200,320 380,140 540,320" fill="url(#mountFar)" opacity="0.8" />
                  <polygon points="400,320 500,210 600,320" fill="url(#mountFar)" opacity="0.6" />

                  {/* Snowcaps */}
                  <polygon points="380,140 340,180 420,180" fill="#FFFFFF" opacity="0.9" />
                  <polygon points="160,170 130,200 190,200" fill="#FFFFFF" opacity="0.9" />

                  {/* Fore Mountains */}
                  <polygon points="-50,340 100,220 280,340" fill="url(#mountMid)" />
                  <polygon points="260,340 450,200 650,340" fill="url(#mountMid)" />

                  {/* Lake */}
                  <rect y="320" width="600" height="130" fill="url(#lakeGrad)" />

                  {/* Sun reflection on lake */}
                  <ellipse cx="300" cy="350" rx="45" ry="10" fill="#FEF08A" opacity="0.4" />
                  <ellipse cx="300" cy="380" rx="30" ry="6" fill="#FED7AA" opacity="0.3" />

                  {/* Pine Trees Silhouette */}
                  <polygon points="40,340 50,300 60,340" fill="#064E3B" />
                  <polygon points="55,345 65,290 75,345" fill="#065F46" />
                  <polygon points="70,350 80,305 90,350" fill="#064E3B" />
                  <polygon points="510,340 520,295 530,340" fill="#064E3B" />
                  <polygon points="525,345 535,285 545,345" fill="#065F46" />
                  <polygon points="540,350 550,310 560,350" fill="#064E3B" />
                </svg>

                {/* Floating Seren Preview Card */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '18px',
                    left: '18px',
                    right: '18px',
                    background: 'rgba(255, 255, 255, 0.94)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '16px',
                    padding: '14px 18px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                    border: '1px solid rgba(255,255,255,0.8)',
                  }}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Brain size={20} color="white" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.813rem', fontWeight: 700, color: '#1E1B4B' }}>Seren AI</div>
                    <div style={{ fontSize: '0.75rem', color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      “Let’s take 3 gentle breaths together right now.”
                    </div>
                  </div>
                  <Link
                    to="/chat"
                    className="btn btn-sm btn-primary"
                    style={{ fontSize: '0.75rem', padding: '6px 12px', textDecoration: 'none' }}
                  >
                    Reply
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FOUR AGE GROUPS SECTION ================= */}
      <section style={{ padding: '80px 24px', background: 'var(--color-card)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 14px',
            background: 'var(--color-secondary)',
            borderRadius: '999px',
            color: 'var(--color-primary)',
            fontSize: '0.813rem',
            fontWeight: 700,
            marginBottom: '14px',
          }}>
            <Users size={16} /> Tailored Life Stages
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '14px' }}>
            Wellness Designed Around Where You Are
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', maxWidth: '650px', margin: '0 auto 48px', lineHeight: 1.6 }}>
            A student preparing for finals has very different needs than a working parent or a retired adult. MindMate adapts its language, pace, and activities to your stage of life.
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            textAlign: 'left',
          }}>
            {/* Student */}
            <div className="card gradient-card-student" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🎓</div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Ages 13–22</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Student</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Study break schedules, exam anxiety reduction, peer balance, and healthy sleep routines during intense academic terms.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.813rem', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>✓ Exam anxiety calming tools</li>
                <li>✓ 25-minute Pomodoro breath breaks</li>
                <li>✓ Budget-friendly brain foods</li>
              </ul>
            </div>

            {/* Working Professional */}
            <div className="card gradient-card-professional" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>💼</div>
              <span className="badge badge-primary" style={{ marginBottom: '12px' }}>Ages 23–40</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Working Professional</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Workplace burnout prevention, desk ergonomics & stretches, boundary setting, and quick 5-minute mid-day grounding.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.813rem', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>✓ Quick desk & neck stretches</li>
                <li>✓ Work-life mental boundary rituals</li>
                <li>✓ Evening screen wind-down routines</li>
              </ul>
            </div>

            {/* Adult */}
            <div className="card gradient-card-adult" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🏡</div>
              <span className="badge badge-success" style={{ marginBottom: '12px' }}>Ages 41–59</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Adult</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Balancing family responsibilities, career shifts, personal vitality, restorative sleep, and quiet daily self-reflection.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.813rem', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>✓ Gentle joint-friendly yoga</li>
                <li>✓ Family stress balancing guides</li>
                <li>✓ Mindful evening walks & journaling</li>
              </ul>
            </div>

            {/* Older Adult */}
            <div className="card gradient-card-older" style={{ padding: '28px', borderRadius: '20px' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>🌿</div>
              <span className="badge badge-warning" style={{ marginBottom: '12px' }}>Ages 60+</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>Older Adult</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Peaceful garden ambience, gentle chair-based movements, social connection reminders, and comforting calming routines.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.813rem', color: 'var(--color-text-light)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li>✓ Seated & supported gentle movement</li>
                <li>✓ Soothing nature soundscapes</li>
                <li>✓ Comforting, accessible interface</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= COMPREHENSIVE FEATURES ================= */}
      <section id="features" style={{ padding: '90px 24px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <span className="badge badge-primary" style={{ marginBottom: '14px' }}>Complete Wellness Suite</span>
            <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '14px' }}>
              Everything You Need in One Safe Space
            </h2>
            <p style={{ fontSize: '1rem', color: 'var(--color-text-light)', maxWidth: '600px', margin: '0 auto' }}>
              No fragmented apps or confusing paywalls. A single, holistic wellness sanctuary crafted for real human lives.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}>
            {/* Feature 1: Seren AI */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Brain size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Seren AI Companion</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Talk anytime to an empathetic, non-judgmental wellness guide that offers compassionate support, gentle reflections, and clickable action steps.
              </p>
              <Link to="/chat" style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                Explore Seren AI <ChevronRight size={16} />
              </Link>
            </div>

            {/* Feature 2: Mood Tracking */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #10B981, #6EE7B7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Smile size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Daily Mood Tracking</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Log how you feel across 8 distinct emotional states. Visualize weekly and monthly trends with clear, non-diagnostic reflections.
              </p>
              <Link to="/mood" style={{ color: '#059669', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                Track Your Mood <ChevronRight size={16} />
              </Link>
            </div>

            {/* Feature 3: Personalized Routine */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #F59E0B, #FCD34D)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Calendar size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Personalized Daily Plan</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Receive structured morning, afternoon, evening, and bedtime routines. Complete tasks at your own pace without guilt or pressure.
              </p>
              <Link to="/wellness-plan" style={{ color: '#D97706', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                View Daily Schedule <ChevronRight size={16} />
              </Link>
            </div>

            {/* Feature 4: Yoga & Gentle Movement */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #8B5CF6, #C4B5FD)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Dumbbell size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Yoga & Gentle Movement</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Desk stretches, Child’s Pose, Mountain Pose, and beginner yoga routines with step-by-step instructions, modifications, and safety notes.
              </p>
              <Link to="/yoga" style={{ color: '#7C3AED', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                Explore Movements <ChevronRight size={16} />
              </Link>
            </div>

            {/* Feature 5: Nature Soundscape Studio */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #0284C7, #7DD3FC)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Music size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Nature Soundscape Studio</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Real procedural audio synthesizers generating soothing rain, ocean waves, distant thunder, forest birds, and calming piano tones with sleep timers.
              </p>
              <Link to="/sounds" style={{ color: '#0284C7', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                Open Sound Studio <ChevronRight size={16} />
              </Link>
            </div>

            {/* Feature 6: Nutrition & Nourishment */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #EC4899, #FBCFE8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Apple size={24} color="white" />
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Nourishment & Habits</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                Budget-friendly, allergy-conscious meal ideas, hydration reminders, and sleep hygiene practices to nurture your body gently.
              </p>
              <Link to="/nutrition" style={{ color: '#DB2777', fontWeight: 600, fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none', marginTop: 'auto' }}>
                Discover Meals <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" style={{ padding: '80px 24px', background: 'var(--color-card)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <span className="badge badge-success" style={{ marginBottom: '14px' }}>Simple & Thoughtful</span>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)', fontWeight: 800, marginBottom: '48px' }}>
            How MindMate Works in 4 Steps
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px',
            textAlign: 'left',
          }}>
            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3730A3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '14px' }}>1</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Select Your Stage</h4>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
                Choose whether you're a student, professional, adult, or older adult during our gentle 2-minute onboarding.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3730A3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '14px' }}>2</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Share How You Feel</h4>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
                Do a one-tap daily mood check-in or jot down private thoughts in your encrypted local journal.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3730A3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '14px' }}>3</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Receive Calming Guidance</h4>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
                Seren AI suggests actionable routines — 4-count breathing, a peaceful soundscape, or an easy stretch.
              </p>
            </div>

            <div style={{ padding: '20px', borderRadius: '16px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#3730A3', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, marginBottom: '14px' }}>4</div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>Build Lifelong Calm</h4>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5 }}>
                Join gentle 7-day self-care challenges, track hydration and sleep, and observe your emotional resilience grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= PRIVACY & ETHICS ================= */}
      <section id="about" style={{ padding: '80px 24px', background: 'var(--color-bg)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="card" style={{
            background: 'linear-gradient(135deg, #EDE9FE 0%, #FAFAFF 100%)',
            borderColor: '#DDD6FE',
            padding: '40px',
            borderRadius: '24px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#3730A3', fontWeight: 700, fontSize: '0.875rem', marginBottom: '12px' }}>
                  <Shield size={20} /> Ethical, Privacy-First Architecture
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '14px', color: '#1E1B4B' }}>
                  Your Thoughts Belong Only to You
                </h3>
                <p style={{ fontSize: '0.938rem', color: '#475569', lineHeight: 1.7, marginBottom: '20px' }}>
                  We believe mental wellness tools must earn your trust. Journal entries and personal reflections remain stored locally on your device by default. We never sell your data or use private thoughts for targeted advertisements.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.875rem', color: '#334155' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#4F46E5" /> Client-side encrypted local storage
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#4F46E5" /> Strictly non-diagnostic; no clinical labels
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={16} color="#4F46E5" /> Direct one-tap export and permanent deletion anytime
                  </div>
                </div>
              </div>

              <div style={{
                background: 'white',
                borderRadius: '20px',
                padding: '24px',
                boxShadow: '0 10px 30px rgba(79, 70, 229, 0.08)',
                border: '1px solid #E2E8F0',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <HeartHandshake size={28} color="#4F46E5" />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>Our Wellness Pledge</h4>
                    <span style={{ fontSize: '0.75rem', color: '#64748B' }}>Rooted in Empathy & Science</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.813rem', color: '#475569', lineHeight: 1.6 }}>
                  MindMate is designed as a compassionate daily companion, not an automated psychologist. Whenever severe distress is detected, we prioritize human safety and immediately surface certified emergency helplines.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section style={{
        padding: '90px 24px',
        background: 'linear-gradient(135deg, #3730A3 0%, #4F46E5 100%)',
        color: 'white',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, marginBottom: '16px', letterSpacing: '-0.02em' }}>
            Ready for a Calmer, More Balanced Mind?
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, lineHeight: 1.7, marginBottom: '36px' }}>
            Join thousands finding peace, steady breath, and daily encouragement. Experience MindMate in full interactive mode right now.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <Link
              to="/signup"
              className="btn btn-lg"
              style={{
                background: 'white',
                color: '#3730A3',
                fontWeight: 800,
                borderRadius: '14px',
                textDecoration: 'none',
              }}
            >
              Get Started for Free <ArrowRight size={18} />
            </Link>
            <Link
              to="/dashboard"
              className="btn btn-lg"
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '14px',
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
              }}
            >
              Explore Live Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
