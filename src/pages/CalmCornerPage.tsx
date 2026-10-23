// ============================================
// MindMate — Calm Corner
// Peaceful digital relaxation space with tabs for
// Nature, Meditation, Gentle Music, Focus, & 5-4-3-2-1 Grounding
// ============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TreePine, Sparkles, Anchor, Compass, Music, Flame,
  Wind, Clock, Play, CheckCircle2, Heart, Eye, Hand,
  Volume2, Ear,
} from 'lucide-react';
import { audioSynthesizer } from '../services/audioSynthesizer';
import { useApp } from '../context/AppContext';

type CalmTab = 'nature' | 'meditation' | 'music' | 'focus' | 'grounding';

export default function CalmCornerPage() {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<CalmTab>('nature');

  // Grounding Step Tracker
  const [groundingStep, setGroundingStep] = useState(1);

  // Focus Timer
  const [focusTime, setFocusTime] = useState(25 * 60);
  const [focusRunning, setFocusRunning] = useState(false);

  const handlePlaySound = (trackId: string, name: string) => {
    audioSynthesizer.playTrack(trackId, 0.6);
    addToast({ type: 'info', message: `Playing soothing ${name} in the background.` });
  };

  const handleStopAllSound = () => {
    audioSynthesizer.stopAll();
    addToast({ type: 'info', message: 'All ambient sounds stopped.' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#3730A3', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <TreePine size={16} /> Digital Sanctuary
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          The Calm Corner
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Step away from digital noise and deadlines. Immerse in tranquil nature landscapes, sensory grounding exercises, soothing audio, and focused quiet time.
        </p>

        <div style={{ marginTop: '16px' }}>
          <button
            type="button"
            onClick={handleStopAllSound}
            className="btn btn-sm btn-ghost"
            style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
          >
            Mute All Background Sounds
          </button>
        </div>
      </div>

      {/* 2. Navigation Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'nature', label: 'Nature Landscapes', icon: <TreePine size={16} /> },
          { id: 'grounding', label: '5-4-3-2-1 Grounding', icon: <Anchor size={16} /> },
          { id: 'meditation', label: 'Mindful Meditation', icon: <Sparkles size={16} /> },
          { id: 'music', label: 'Gentle Music & Waves', icon: <Music size={16} /> },
          { id: 'focus', label: 'Focus & Reflection', icon: <Clock size={16} /> },
        ].map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id as CalmTab)}
            className={`btn btn-sm ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
            style={{ borderRadius: '999px', fontSize: '0.813rem', display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: NATURE LANDSCAPES */}
      {activeTab === 'nature' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {/* Card 1: Mountain Solitude */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{
              height: '190px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              color: 'white',
            }}>
              <div style={{
                width: '100%',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.85) 100%)',
              }}>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.25)', color: '#fff', backdropFilter: 'blur(4px)', marginBottom: '4px' }}>
                  Alpine Atmosphere
                </span>
                <div style={{ fontWeight: 800, fontSize: '1.35rem', color: '#fff' }}>Alpine Stillness</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Crisp mountain air touching your cheeks. High above the noise of deadlines and cities, the mountain stands unchanging, rooted, and serene.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handlePlaySound('wind', 'Mountain Wind')}
                  className="btn btn-sm btn-primary"
                  style={{ flex: 1 }}
                >
                  <Volume2 size={16} /> Play Wind & Stillness
                </button>
                <Link to="/breathing" className="btn btn-sm btn-outline">
                  Breathe
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Redwood Forest */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{
              height: '190px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              color: 'white',
            }}>
              <div style={{
                width: '100%',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.85) 100%)',
              }}>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.25)', color: '#fff', backdropFilter: 'blur(4px)', marginBottom: '4px' }}>
                  Forest Sanctuary
                </span>
                <div style={{ fontWeight: 800, fontSize: '1.35rem', color: '#fff' }}>Deep Forest Walk</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Sunlight filters gently through high green leaves. Birdsong echoes softly in the distance while moss and earth support each grounded step.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handlePlaySound('forest', 'Forest Ambience')}
                  className="btn btn-sm btn-primary"
                  style={{ flex: 1 }}
                >
                  <Volume2 size={16} /> Play Forest Birds
                </button>
                <Link to="/sounds" className="btn btn-sm btn-outline">
                  Custom Studio
                </Link>
              </div>
            </div>
          </div>

          {/* Card 3: Pacific Ocean Cove */}
          <div className="card" style={{ padding: 0, overflow: 'hidden', borderRadius: '20px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{
              height: '190px',
              backgroundImage: 'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              position: 'relative',
              display: 'flex',
              alignItems: 'flex-end',
              color: 'white',
            }}>
              <div style={{
                width: '100%',
                padding: '16px 20px',
                background: 'linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.85) 100%)',
              }}>
                <span className="badge" style={{ background: 'rgba(255, 255, 255, 0.25)', color: '#fff', backdropFilter: 'blur(4px)', marginBottom: '4px' }}>
                  Coastal Haven
                </span>
                <div style={{ fontWeight: 800, fontSize: '1.35rem', color: '#fff' }}>Quiet Ocean Cove</div>
              </div>
            </div>
            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.6, marginBottom: '16px' }}>
                Every wave comes in, peaks softly, and pulls away without rush. Notice how the ocean never forces itself, yet shapes stone over time.
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => handlePlaySound('ocean', 'Ocean Waves')}
                  className="btn btn-sm btn-primary"
                  style={{ flex: 1 }}
                >
                  <Volume2 size={16} /> Play Ocean Waves
                </button>
                <Link to="/breathing" className="btn btn-sm btn-outline">
                  Synchronize Breath
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 5-4-3-2-1 SENSORY GROUNDING */}
      {activeTab === 'grounding' && (
        <div className="card" style={{ padding: '36px', borderRadius: '24px' }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px' }}>
            <span className="badge badge-success" style={{ marginBottom: '10px' }}>Evidence-Based Grounding Tool</span>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, margin: '0 0 10px' }}>
              5-4-3-2-1 Sensory Grounding
            </h2>
            <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.6 }}>
              When overwhelming thoughts or anxiety pull you into the future or past, gently engage your 5 physical senses to anchor back to the safe, present room.
            </p>
          </div>

          {/* Stepper Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '32px' }}>
            {[1, 2, 3, 4, 5].map(stepNum => (
              <button
                key={stepNum}
                type="button"
                onClick={() => setGroundingStep(stepNum)}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '50%',
                  border: 'none',
                  background: groundingStep === stepNum ? 'var(--color-primary)' : 'var(--color-secondary)',
                  color: groundingStep === stepNum ? 'white' : 'var(--color-primary)',
                  fontWeight: 800,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
              >
                {6 - stepNum}
              </button>
            ))}
          </div>

          {/* Step Detail Card */}
          <div style={{
            background: 'var(--color-bg)',
            borderRadius: '20px',
            padding: '36px',
            textAlign: 'center',
            maxWidth: '560px',
            margin: '0 auto',
            border: '1px solid var(--color-border)',
          }}>
            {groundingStep === 1 && (
              <div>
                <Eye size={48} color="#4F46E5" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  Notice 5 Things You Can See
                </h3>
                <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Look around the room slowly. Spot five specific objects: a shadow on the wall, the grain of a desk, a plant leaf, a mug, or a patch of sunlight.
                </p>
              </div>
            )}

            {groundingStep === 2 && (
              <div>
                <Hand size={48} color="#059669" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  Notice 4 Things You Can Touch
                </h3>
                <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Feel the texture of your shirt fabric, the firmness of your chair supporting your spine, the cool glass of your phone screen, or your feet on the floor.
                </p>
              </div>
            )}

            {groundingStep === 3 && (
              <div>
                <Ear size={48} color="#2563EB" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  Notice 3 Things You Can Hear
                </h3>
                <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Listen past your thoughts. Can you hear the faint hum of a fan, birds outside a window, or the quiet sound of your own inhalation?
                </p>
              </div>
            )}

            {groundingStep === 4 && (
              <div>
                <Sparkles size={48} color="#D97706" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  Notice 2 Things You Can Smell
                </h3>
                <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Inhale gently. Notice the scent of soap, fresh air from a window, paper, or coffee. If no smell is noticeable, recall your favorite soothing scent.
                </p>
              </div>
            )}

            {groundingStep === 5 && (
              <div>
                <Heart size={48} color="#DC2626" style={{ margin: '0 auto 16px' }} />
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '10px' }}>
                  Notice 1 Thing You Can Taste or Affirm
                </h3>
                <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', lineHeight: 1.6 }}>
                  Notice any lingering taste of mint, tea, or water. Then whisper to yourself: <em>“I am here right now. I am breathing, and I am safe in this present moment.”</em>
                </p>
              </div>
            )}

            <div style={{ marginTop: '28px', display: 'flex', justifyContent: 'center', gap: '12px' }}>
              {groundingStep > 1 && (
                <button
                  type="button"
                  onClick={() => setGroundingStep(s => s - 1)}
                  className="btn btn-outline btn-sm"
                >
                  Previous Sense
                </button>
              )}
              {groundingStep < 5 ? (
                <button
                  type="button"
                  onClick={() => setGroundingStep(s => s + 1)}
                  className="btn btn-primary btn-sm"
                >
                  Next Sense →
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setGroundingStep(1);
                    addToast({ type: 'success', message: 'Grounding complete! You are centered in the present.' });
                  }}
                  className="btn btn-primary btn-sm"
                >
                  Complete & Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MINDFUL MEDITATION */}
      {activeTab === 'meditation' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}>
          {[
            {
              title: '3-Minute Body Unclench',
              desc: 'Progressively release tension in forehead, jaw, shoulders, and hands.',
              duration: '3 mins',
              sound: 'piano',
            },
            {
              title: 'Loving-Kindness Meditation',
              desc: 'Send warm, compassionate wishes to yourself, a loved one, and the world.',
              duration: '5 mins',
              sound: 'flute',
            },
            {
              title: 'Letting Go of Racing Thoughts',
              desc: 'Visualize thoughts as leaves floating down an autumn mountain river.',
              duration: '7 mins',
              sound: 'river',
            },
          ].map((med, i) => (
            <div key={i} className="card" style={{ padding: '24px', borderRadius: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span className="badge badge-primary">{med.duration}</span>
                <Sparkles size={16} color="var(--color-primary)" />
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 8px' }}>{med.title}</h3>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5, marginBottom: '20px' }}>
                {med.desc}
              </p>
              <button
                type="button"
                onClick={() => handlePlaySound(med.sound, med.title)}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', borderRadius: '10px' }}
              >
                <Play size={16} /> Begin Guided Space
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: GENTLE MUSIC & CHORDS */}
      {activeTab === 'music' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {[
            { title: 'Gentle Piano Drift', desc: 'Warm 432Hz synthesized piano chords for relaxation.', track: 'piano' },
            { title: 'Bamboo Flute Melody', desc: 'Pentatonic relaxing flute tones to calm breathing.', track: 'flute' },
            { title: 'Flowing Mountain River', desc: 'Gentle bubbling water tones with soft reverberation.', track: 'river' },
            { title: 'Distant Thunder & Rain', desc: 'Low calming rumble to release restlessness.', track: 'thunder' },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '22px', borderRadius: '18px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 6px' }}>{item.title}</h4>
              <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', margin: '0 0 16px', lineHeight: 1.5 }}>
                {item.desc}
              </p>
              <button
                type="button"
                onClick={() => handlePlaySound(item.track, item.title)}
                className="btn btn-primary btn-sm"
                style={{ width: '100%', borderRadius: '10px' }}
              >
                <Play size={14} /> Play Continuous Audio
              </button>
            </div>
          ))}
        </div>
      )}

      {/* TAB 5: FOCUS & REFLECTION */}
      {activeTab === 'focus' && (
        <div className="card" style={{ padding: '36px', textAlign: 'center', maxWidth: '520px', margin: '0 auto', borderRadius: '24px' }}>
          <Clock size={48} color="#4F46E5" style={{ margin: '0 auto 16px' }} />
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 8px' }}>
            Mindful Focus Interval
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', margin: '0 0 24px', lineHeight: 1.6 }}>
            Set a gentle, distraction-free study or creative interval. No loud buzzers or harsh alerts.
          </p>

          <div style={{ fontSize: '3rem', fontWeight: 800, color: '#3730A3', fontVariantNumeric: 'tabular-nums', marginBottom: '20px' }}>
            25:00
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button
              type="button"
              onClick={() => {
                handlePlaySound('rain', 'Focus Rain');
                addToast({ type: 'success', message: 'Focus interval started with gentle background rain.' });
              }}
              className="btn btn-primary"
              style={{ borderRadius: '12px', padding: '12px 28px' }}
            >
              Start 25m Focus Block
            </button>
            <Link to="/sounds" className="btn btn-outline" style={{ borderRadius: '12px' }}>
              Sound Mixer
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
