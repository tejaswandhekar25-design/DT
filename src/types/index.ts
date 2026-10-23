// ============================================
// MindMate — Core Type Definitions
// ============================================

// --- User & Profile ---
export type AgeGroup = 'student' | 'professional' | 'adult' | 'older-adult';

export type LifeSituation =
  | 'exam-stress'
  | 'work-pressure'
  | 'family-responsibilities'
  | 'loneliness'
  | 'relationship-difficulties'
  | 'sleep-difficulties'
  | 'general-wellbeing';

export type WellnessGoal =
  | 'reduce-stress'
  | 'improve-sleep'
  | 'feel-happier'
  | 'build-habits'
  | 'improve-focus'
  | 'stay-active'
  | 'emotional-wellbeing';

export interface UserPreferences {
  language: string;
  availableTime: number; // minutes per day
  preferredActivities: string[];
  theme: 'light' | 'dark' | 'system';
  foodPreferences: 'vegetarian' | 'non-vegetarian' | 'vegan' | 'no-preference';
  allergies: string[];
  accessibilityNeeds: string[];
}

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  ageGroup?: AgeGroup;
  lifeSituations: LifeSituation[];
  wellnessGoals: WellnessGoal[];
  preferences: UserPreferences;
  onboardingComplete: boolean;
  createdAt: string;
  trustedContacts: TrustedContact[];
}

export interface TrustedContact {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  relationship: string;
}

// --- Mood ---
export type MoodType =
  | 'happy'
  | 'calm'
  | 'anxious'
  | 'sad'
  | 'angry'
  | 'tired'
  | 'lonely'
  | 'overwhelmed';

export interface MoodEntry {
  id: string;
  mood: MoodType;
  note?: string;
  date: string;
  timestamp: string;
}

// --- Journal ---
export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  mood?: MoodType;
  date: string;
  timestamp: string;
  tags: string[];
  isGratitude: boolean;
}

// --- Wellness Plan ---
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export interface WellnessActivity {
  id: string;
  title: string;
  description: string;
  duration: number; // minutes
  category: string;
  timeOfDay: TimeOfDay;
  completed: boolean;
  icon: string;
}

export interface WellnessPlan {
  id: string;
  date: string;
  activities: WellnessActivity[];
  completedCount: number;
  totalCount: number;
}

// --- Yoga & Exercise ---
export type ExerciseCategory =
  | 'beginner-yoga'
  | 'gentle-stretching'
  | 'breathing'
  | 'walking'
  | 'relaxation'
  | 'desk-stretches'
  | 'sleep-relaxation';

export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  category: ExerciseCategory;
  difficulty: DifficultyLevel;
  duration: number;
  steps: string[];
  benefits: string[];
  modifications: string[];
  safetyNotes: string[];
  icon: string;
  image?: string;
}

// --- Nutrition ---
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface MealSuggestion {
  id: string;
  name: string;
  description: string;
  mealType: MealType;
  isVegetarian: boolean;
  isVegan: boolean;
  allergens: string[];
  nutrients: string[];
  prepTime: number;
  isBudgetFriendly: boolean;
  icon: string;
  image?: string;
}

// --- Sound ---
export interface SoundTrack {
  id: string;
  name: string;
  category: string;
  icon: string;
  image?: string;
  audioUrl?: string;
  isPlaying: boolean;
  volume: number;
}

export interface SoundMix {
  id: string;
  name: string;
  tracks: { trackId: string; volume: number }[];
  createdAt: string;
  isFavorite: boolean;
}

// --- Chat ---
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actionCards?: ActionCard[];
}

export interface ActionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  action: string; // route or action identifier
  color: string;
}

// --- Challenges ---
export interface Challenge {
  id: string;
  title: string;
  description: string;
  days: number;
  tasks: ChallengeTask[];
  startDate?: string;
  isActive: boolean;
  completedDays: number;
  streak: number;
  badge?: string;
}

export interface ChallengeTask {
  id: string;
  day: number;
  title: string;
  description: string;
  completed: boolean;
  completedAt?: string;
}

// --- Habits ---
export interface HabitEntry {
  id: string;
  date: string;
  waterGlasses: number;
  sleepHours: number;
  exerciseMinutes: number;
  meditationMinutes: number;
}

// --- Progress ---
export interface WeeklyReflection {
  id: string;
  weekStart: string;
  weekEnd: string;
  highlights: string[];
  challenges: string[];
  goals: string[];
  overallMood: MoodType;
}

// --- Toast & Notifications ---
export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
