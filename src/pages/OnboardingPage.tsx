// ============================================
// MindMate — Multi-Step Onboarding Experience
// Personalization for Age, Life Situation, Goals, & Preferences
// ============================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap, Briefcase, Home, Flower2, Check, ArrowRight,
  ArrowLeft, Sparkles, Clock, Globe, Heart, Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { AgeGroup, LifeSituation, WellnessGoal } from '../types';

export default function OnboardingPage() {
  const {
    user,
    setAgeGroup,
    setLifeSituations,
    setWellnessGoals,
    setPreferences,
    completeOnboarding,
    addToast,
  } = useApp();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);

  // Form selections
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(user?.ageGroup || 'student');
  const [selectedSituations, setSelectedSituations] = useState<LifeSituation[]>(
    user?.lifeSituations || ['exam-stress']
  );
  const [selectedGoals, setSelectedGoals] = useState<WellnessGoal[]>(
    user?.wellnessGoals || ['reduce-stress', 'improve-sleep']
  );
  const [language, setLanguage] = useState(user?.preferences?.language || 'English');
  const [availableTime, setAvailableTime] = useState(user?.preferences?.availableTime || 20);
  const [foodPreference, setFoodPreference] = useState(user?.preferences?.foodPreferences || 'no-preference');

  // Toggle helpers
  const toggleSituation = (s: LifeSituation) => {
    setSelectedSituations(prev =>
      prev.includes(s) ? prev.filter(item => item !== s) : [...prev, s]
    );
  };

  const toggleGoal = (g: WellnessGoal) => {
    setSelectedGoals(prev =>
      prev.includes(g) ? prev.filter(item => item !== g) : [...prev, g]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setAgeGroup(selectedAge);
      setStep(2);
    } else if (step === 2) {
      setLifeSituations(selectedSituations);
      setStep(3);
    } else if (step === 3) {
      setWellnessGoals(selectedGoals);
      setStep(4);
    } else if (step === 4) {
      setPreferences({
        language,
        availableTime,
        foodPreferences: foodPreference as any,
      });
      completeOnboarding();
      addToast({
        type: 'success',
        message: 'Your personal wellness space has been customized! Welcome home.',
      });
      navigate('/dashboard');
    }
  };

  const handleSkip = () => {
    completeOnboarding();
    navigate('/dashboard');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-bg)',
      padding: '40px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <div style={{ maxWidth: '840px', width: '100%' }}>
        {/* Progress Header */}
        <div style={{ marginBottom: '36px', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '999px',
            background: 'var(--color-secondary)',
            color: 'var(--color-primary)',
            fontSize: '0.813rem',
            fontWeight: 700,
            marginBottom: '12px',
          }}>
            <Sparkles size={16} /> Personalizing Your Journey • Step {step} of 4
          </div>

          <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.4rem)', fontWeight: 800, margin: '0 0 10px' }}>
            {step === 1 && 'Which life stage best describes you?'}
            {step === 2 && 'What is currently on your mind?'}
            {step === 3 && 'What are your wellness goals?'}
            {step === 4 && 'A few gentle preferences'}
          </h1>

          <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '600px', marginInline: 'auto' }}>
            {step === 1 && 'MindMate tailors its calming suggestions, activities, and tone to your everyday reality.'}
            {step === 2 && 'Select any challenges or feelings you are navigating. You can update these anytime.'}
            {step === 3 && 'Choose the areas you would like to gently nurture. Select as many as you wish.'}
            {step === 4 && 'Tell us how much daily time feels comfortable for you. You can adjust this later.'}
          </p>

          {/* Progress Bar */}
          <div className="progress-bar" style={{ marginTop: '24px', height: '8px' }}>
            <div
              className="progress-fill"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: 4 Illustrated Age Group Cards */}
        {step === 1 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
          }}>
            {/* Student */}
            <div
              className={`card gradient-card-student ${selectedAge === 'student' ? 'selected-card' : ''}`}
              onClick={() => setSelectedAge('student')}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '28px',
                border: selectedAge === 'student' ? '3px solid #3730A3' : '2px solid transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {selectedAge === 'student' && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#3730A3',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={16} />
                </div>
              )}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#DBEAFE',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <GraduationCap size={32} color="#1E40AF" />
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Ages 13–22</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 8px' }}>Student</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                High school or university life, exams, study breaks, peer connections, and balancing sleep with deadlines.
              </p>
            </div>

            {/* Working Professional */}
            <div
              className={`card gradient-card-professional ${selectedAge === 'professional' ? 'selected-card' : ''}`}
              onClick={() => setSelectedAge('professional')}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '28px',
                border: selectedAge === 'professional' ? '3px solid #3730A3' : '2px solid transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {selectedAge === 'professional' && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#3730A3',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={16} />
                </div>
              )}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#E0E7FF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Briefcase size={32} color="#3730A3" />
              </div>
              <span className="badge badge-primary" style={{ marginBottom: '8px' }}>Ages 23–40</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 8px' }}>Working Professional</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                Career responsibilities, workplace stress, desk posture, boundary setting, and preventing burnout.
              </p>
            </div>

            {/* Adult */}
            <div
              className={`card gradient-card-adult ${selectedAge === 'adult' ? 'selected-card' : ''}`}
              onClick={() => setSelectedAge('adult')}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '28px',
                border: selectedAge === 'adult' ? '3px solid #065F46' : '2px solid transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {selectedAge === 'adult' && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#065F46',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={16} />
                </div>
              )}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#D1FAE5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Home size={32} color="#065F46" />
              </div>
              <span className="badge badge-success" style={{ marginBottom: '8px' }}>Ages 41–59</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 8px' }}>Adult</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                Family obligations, parenting or eldercare, career transitions, physical vitality, and finding quiet personal time.
              </p>
            </div>

            {/* Older Adult */}
            <div
              className={`card gradient-card-older ${selectedAge === 'older-adult' ? 'selected-card' : ''}`}
              onClick={() => setSelectedAge('older-adult')}
              style={{
                cursor: 'pointer',
                borderRadius: '20px',
                padding: '28px',
                border: selectedAge === 'older-adult' ? '3px solid #9A3412' : '2px solid transparent',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {selectedAge === 'older-adult' && (
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  background: '#9A3412',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Check size={16} />
                </div>
              )}
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#FFEDD5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}>
                <Flower2 size={32} color="#9A3412" />
              </div>
              <span className="badge badge-warning" style={{ marginBottom: '8px' }}>Ages 60+</span>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '4px 0 8px' }}>Older Adult</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: 0 }}>
                Gentle chair movements, peaceful garden ambience, restorative sleep, social connection, and comforting routines.
              </p>
            </div>
          </div>
        )}

        {/* STEP 2: Current Life Situation */}
        {step === 2 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {[
              { id: 'exam-stress', label: 'Exam or Academic Stress', emoji: '📚', desc: 'Deadlines, studying, academic performance' },
              { id: 'work-pressure', label: 'Work Pressure & Burnout', emoji: '💻', desc: 'Workload, meetings, overtime fatigue' },
              { id: 'family-responsibilities', label: 'Family Responsibilities', emoji: '🏡', desc: 'Caregiving, home management, balance' },
              { id: 'sleep-difficulties', label: 'Sleep Difficulties', emoji: '🌙', desc: 'Trouble falling asleep or staying rested' },
              { id: 'loneliness', label: 'Loneliness & Isolation', emoji: '🌱', desc: 'Desire for meaningful connection' },
              { id: 'relationship-difficulties', label: 'Relationship Difficulties', emoji: '🤝', desc: 'Navigating conflict or social anxiety' },
              { id: 'general-wellbeing', label: 'General Well-being', emoji: '✨', desc: 'Just building healthy self-care habits' },
            ].map(item => {
              const active = selectedSituations.includes(item.id as LifeSituation);
              return (
                <div
                  key={item.id}
                  className="card"
                  onClick={() => toggleSituation(item.id as LifeSituation)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    padding: '20px',
                    border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: active ? 'var(--color-secondary)' : 'var(--color-card)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '1.75rem', lineHeight: 1 }}>{item.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: '0.938rem', marginBottom: '4px' }}>{item.label}</div>
                    <div style={{ fontSize: '0.813rem', color: 'var(--color-text-light)' }}>{item.desc}</div>
                  </div>
                  {active && (
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={14} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 3: Wellness Goals */}
        {step === 3 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {[
              { id: 'reduce-stress', label: 'Reduce Stress & Anxiety', icon: '🌿' },
              { id: 'improve-sleep', label: 'Improve Sleep Quality', icon: '🌙' },
              { id: 'feel-happier', label: 'Feel Happier & Positive', icon: '☀️' },
              { id: 'build-habits', label: 'Build Healthy Habits', icon: '💧' },
              { id: 'improve-focus', label: 'Improve Focus & Clarity', icon: '🎯' },
              { id: 'stay-active', label: 'Stay Gently Active', icon: '🧘' },
              { id: 'emotional-wellbeing', label: 'Emotional Balance', icon: '🤍' },
            ].map(goal => {
              const active = selectedGoals.includes(goal.id as WellnessGoal);
              return (
                <div
                  key={goal.id}
                  className="card"
                  onClick={() => toggleGoal(goal.id as WellnessGoal)}
                  style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    padding: '22px 18px',
                    border: active ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                    background: active ? 'var(--color-secondary)' : 'var(--color-card)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{goal.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.938rem', flex: 1 }}>{goal.label}</span>
                  {active && (
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Check size={12} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* STEP 4: Preferences */}
        {step === 4 && (
          <div className="card" style={{ padding: '32px', borderRadius: '20px', marginBottom: '40px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {/* Available Time */}
              <div>
                <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Clock size={18} /> How much time can you comfortably dedicate to wellness daily?
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '10px' }}>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="5"
                    value={availableTime}
                    onChange={e => setAvailableTime(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <span style={{
                    minWidth: '90px',
                    textAlign: 'center',
                    padding: '6px 14px',
                    background: 'var(--color-secondary)',
                    color: 'var(--color-primary)',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}>
                    {availableTime} mins/day
                  </span>
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Globe size={18} /> Preferred Language
                </label>
                <select
                  className="input"
                  value={language}
                  onChange={e => setLanguage(e.target.value)}
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Spanish">Spanish (Español)</option>
                  <option value="French">French (Français)</option>
                  <option value="German">German (Deutsch)</option>
                </select>
              </div>

              {/* Food Preference */}
              <div>
                <label className="label" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Heart size={18} /> Dietary Preference (Optional)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                  {[
                    { id: 'vegetarian', label: 'Vegetarian' },
                    { id: 'non-vegetarian', label: 'Non-Vegetarian' },
                    { id: 'vegan', label: 'Vegan' },
                    { id: 'no-preference', label: 'No Preference' },
                  ].map(p => (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => setFoodPreference(p.id as any)}
                      className="btn btn-sm"
                      style={{
                        background: foodPreference === p.id ? 'var(--color-primary)' : 'var(--color-bg)',
                        color: foodPreference === p.id ? 'white' : 'var(--color-text)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}>
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="btn btn-outline"
            >
              <ArrowLeft size={18} /> Back
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSkip}
              className="btn btn-ghost"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Skip for now
            </button>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            {step < 4 && (
              <button
                type="button"
                onClick={handleSkip}
                className="btn btn-ghost"
                style={{ color: 'var(--color-text-muted)' }}
              >
                Skip
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              className="btn btn-primary btn-lg"
            >
              {step === 4 ? 'Finish & Open MindMate' : 'Continue'} <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
