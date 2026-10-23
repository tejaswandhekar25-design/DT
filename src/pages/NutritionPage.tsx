// ============================================
// MindMate — Nourishment & Healthy Lifestyle Habits
// Balanced meal ideas, hydration tracker, allergy filters,
// sleep hygiene rules, & non-restrictive nourishment
// ============================================

import { useState } from 'react';
import {
  Apple, Droplets, Moon, Clock, DollarSign, ShieldAlert,
  Sparkles, CheckCircle2, Heart, Coffee, Check,
} from 'lucide-react';
import { mealSuggestions } from '../data';
import type { MealType, MealSuggestion } from '../types';
import { useApp } from '../context/AppContext';

export default function NutritionPage() {
  const { todayHabits, updateHabits, addToast, user } = useApp();

  const [mealTab, setMealTab] = useState<MealType | 'all'>('all');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');
  const [budgetOnly, setBudgetOnly] = useState(false);
  const [allergenExclusion, setAllergenExclusion] = useState<string[]>([]);

  const handleWaterAdd = () => {
    const current = todayHabits.waterGlasses || 0;
    updateHabits({ waterGlasses: Math.min(16, current + 1) });
    addToast({ type: 'success', message: 'Logged 1 glass of water!' });
  };

  const allergensList = ['gluten', 'dairy', 'eggs', 'tree-nuts', 'fish'];

  const toggleAllergen = (item: string) => {
    setAllergenExclusion(prev =>
      prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]
    );
  };

  const filteredMeals = mealSuggestions.filter(meal => {
    if (mealTab !== 'all' && meal.mealType !== mealTab) return false;
    if (dietFilter === 'veg' && !meal.isVegetarian) return false;
    if (dietFilter === 'non-veg' && meal.isVegetarian) return false;
    if (budgetOnly && !meal.isBudgetFriendly) return false;
    if (allergenExclusion.some(all => meal.allergens.includes(all))) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 1. Header Banner */}
      <div className="card gradient-hero" style={{ padding: '32px', borderRadius: '24px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.813rem', marginBottom: '10px' }}>
          <Sparkles size={16} /> Non-Restrictive, Mindful Nourishment
        </div>
        <h1 style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.3rem)', fontWeight: 800, margin: '0 0 10px' }}>
          Nourishment & Daily Habits
        </h1>
        <p style={{ fontSize: '0.938rem', color: 'var(--color-text-light)', margin: 0, maxWidth: '640px', lineHeight: 1.6 }}>
          Food is energy, comfort, and vitality. Discover balanced, budget-friendly meal ideas, stay mindfully hydrated, and cultivate soothing sleep hygiene routines without restrictive rules or guilt.
        </p>

        <div style={{
          marginTop: '20px',
          background: 'var(--hero-tag-bg)',
          padding: '10px 16px',
          borderRadius: '12px',
          fontSize: '0.75rem',
          color: 'var(--color-text)',
          border: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <ShieldAlert size={16} color="var(--color-primary)" />
          <span>MindMate does not prescribe medical diets, promise mental health cures through food, or calculate restrictive calorie counts.</span>
        </div>
      </div>

      {/* 2. Hydration & Sleep Rhythm Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '24px',
      }}>
        {/* Hydration Card */}
        <div className="card" style={{ background: 'var(--habit-water-bg)', borderColor: 'var(--habit-water-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--habit-water-text)', fontWeight: 800, fontSize: '1rem' }}>
              <Droplets size={20} /> Daily Hydration Goal
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--habit-water-text)' }}>
              {todayHabits.waterGlasses || 0} / 8 Glasses
            </span>
          </div>

          <p style={{ fontSize: '0.813rem', color: 'var(--habit-water-text)', lineHeight: 1.5, marginBottom: '16px' }}>
            Mild dehydration can subtly increase fatigue, brain fog, and irritability. Drinking a glass of water upon waking gives your body an instant gentle boost.
          </p>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: '10px',
                  borderRadius: '999px',
                  background: i < (todayHabits.waterGlasses || 0) ? '#3B82F6' : 'rgba(147, 197, 253, 0.35)',
                }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleWaterAdd}
            className="btn btn-primary btn-sm"
            style={{ width: '100%', borderRadius: '10px' }}
          >
            + Drink a Glass of Water
          </button>
        </div>

        {/* Sleep Hygiene Habits */}
        <div className="card" style={{ background: 'var(--habit-sleep-bg)', borderColor: 'var(--habit-sleep-border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--habit-sleep-text)', fontWeight: 800, fontSize: '1rem', marginBottom: '12px' }}>
            <Moon size={20} /> Mindful Sleep Hygiene
          </div>
          <p style={{ fontSize: '0.813rem', color: 'var(--habit-sleep-text)', lineHeight: 1.5, marginBottom: '14px' }}>
            Sleep directly influences emotional resilience. Try these evidence-based micro-habits tonight:
          </p>

          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.813rem', color: 'var(--color-text)' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--color-primary)" /> Dim bright overhead lights 45 minutes before bedtime.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--color-primary)" /> Replace scrolling with 5 minutes of 4-7-8 breathing or soft music.
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={16} color="var(--color-primary)" /> Avoid heavy caffeine after 3:00 PM to protect deep sleep phases.
            </li>
          </ul>
        </div>
      </div>

      {/* 3. Meal Filters: Categories, Diet, Allergies, Budget */}
      <div className="card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, margin: '0 0 16px' }}>
          Filter Balanced Meal Suggestions
        </h3>

        {/* Meal Type Tabs */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {[
            { id: 'all', label: 'All Meals' },
            { id: 'breakfast', label: 'Breakfast' },
            { id: 'lunch', label: 'Lunch' },
            { id: 'dinner', label: 'Dinner' },
            { id: 'snack', label: 'Mindful Snacks' },
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setMealTab(tab.id as any)}
              className={`btn btn-sm ${mealTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ borderRadius: '999px', fontSize: '0.813rem' }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Secondary Dietary Preferences */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: '16px',
          paddingTop: '16px',
          borderTop: '1px solid var(--color-border)',
          fontSize: '0.813rem',
        }}>
          {/* Vegetarian Toggle */}
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              type="button"
              onClick={() => setDietFilter('all')}
              className={`btn btn-sm ${dietFilter === 'all' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              All Diets
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('veg')}
              className={`btn btn-sm ${dietFilter === 'veg' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              🥦 Vegetarian
            </button>
            <button
              type="button"
              onClick={() => setDietFilter('non-veg')}
              className={`btn btn-sm ${dietFilter === 'non-veg' ? 'btn-secondary' : 'btn-ghost'}`}
              style={{ fontSize: '0.75rem', padding: '4px 10px' }}
            >
              🍗 Non-Vegetarian
            </button>
          </div>

          {/* Budget Friendly */}
          <button
            type="button"
            onClick={() => setBudgetOnly(!budgetOnly)}
            className={`btn btn-sm ${budgetOnly ? 'btn-primary' : 'btn-outline'}`}
            style={{ fontSize: '0.75rem', padding: '4px 10px', borderRadius: '8px' }}
          >
            <DollarSign size={14} /> Budget-Friendly Only
          </button>

          {/* Allergy Exclusions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>Exclude:</span>
            {allergensList.map(item => {
              const excluded = allergenExclusion.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleAllergen(item)}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontSize: '0.688rem',
                    cursor: 'pointer',
                    background: excluded ? '#FEE2E2' : 'var(--color-bg)',
                    color: excluded ? '#991B1B' : 'var(--color-text)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {item} {excluded && '✕'}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Meal Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '20px',
      }}>
        {filteredMeals.map(meal => (
          <div
            key={meal.id}
            className="card"
            style={{
              padding: 0,
              borderRadius: '20px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: 'var(--shadow-sm)',
              border: '1px solid var(--color-border)',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
          >
            <div>
              {/* Photo Banner */}
              <div style={{ position: 'relative', height: '160px', width: '100%', overflow: 'hidden', background: '#F1F5F9' }}>
                <img
                  src={meal.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80'}
                  alt={meal.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                    transition: 'transform 0.3s ease',
                  }}
                  loading="lazy"
                />
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  right: '12px',
                  display: 'flex',
                  gap: '6px',
                }}>
                  <span className="badge badge-primary" style={{ textTransform: 'capitalize', backdropFilter: 'blur(6px)', background: 'rgba(79, 70, 229, 0.9)' }}>
                    {meal.mealType}
                  </span>
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  background: 'rgba(0, 0, 0, 0.6)',
                  backdropFilter: 'blur(4px)',
                  color: '#fff',
                  borderRadius: '20px',
                  padding: '2px 10px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <span>{meal.icon}</span>
                  <span>{meal.isVegetarian ? 'Vegetarian' : 'Non-Veg'}</span>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, margin: '0 0 6px', color: 'var(--color-text)' }}>
                  {meal.name}
                </h4>
                <p style={{ fontSize: '0.813rem', color: 'var(--color-text-light)', lineHeight: 1.5, margin: '0 0 14px' }}>
                  {meal.description}
                </p>

                {/* Nutrients & prep time */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {meal.nutrients.map((n, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.688rem',
                        background: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        padding: '3px 9px',
                        borderRadius: '999px',
                        color: 'var(--color-text-light)',
                        fontWeight: 600,
                      }}
                    >
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 20px',
              borderTop: '1px solid var(--color-border)',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
              background: 'rgba(248, 250, 252, 0.5)',
            }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                <Clock size={13} /> {meal.prepTime > 0 ? `${meal.prepTime}m prep` : 'Instant ready'}
              </span>
              {meal.isBudgetFriendly && (
                <span style={{ color: '#059669', fontWeight: 700, background: '#D1FAE5', padding: '2px 8px', borderRadius: '6px' }}>
                  💰 Budget Friendly
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
