// ============================================
// MindMate — App Context
// Global state management for user data, moods,
// journals, and wellness activities
// ============================================

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type {
  UserProfile,
  MoodEntry,
  JournalEntry,
  WellnessActivity,
  HabitEntry,
  Challenge,
  SoundMix,
  ChatMessage,
  Toast,
  AgeGroup,
  LifeSituation,
  WellnessGoal,
  UserPreferences,
} from '../types';
import {
  sampleMoodHistory,
  sampleJournalEntries,
  sampleActivities,
  defaultChallenges,
} from '../data';

interface AppContextType {
  // Auth & User
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Onboarding
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  setAgeGroup: (ag: AgeGroup) => void;
  setLifeSituations: (ls: LifeSituation[]) => void;
  setWellnessGoals: (goals: WellnessGoal[]) => void;
  setPreferences: (prefs: Partial<UserPreferences>) => void;
  completeOnboarding: () => void;

  // Moods
  moodHistory: MoodEntry[];
  addMood: (mood: MoodEntry) => void;
  deleteMood: (id: string) => void;

  // Journal
  journalEntries: JournalEntry[];
  addJournalEntry: (entry: JournalEntry) => void;
  updateJournalEntry: (id: string, updates: Partial<JournalEntry>) => void;
  deleteJournalEntry: (id: string) => void;

  // Wellness Plan
  todayActivities: WellnessActivity[];
  toggleActivity: (id: string) => void;

  // Habits
  todayHabits: HabitEntry;
  updateHabits: (updates: Partial<HabitEntry>) => void;

  // Challenges
  challenges: Challenge[];
  startChallenge: (id: string) => void;
  completeTask: (challengeId: string, taskId: string) => void;

  // Sounds
  savedMixes: SoundMix[];
  saveMix: (mix: SoundMix) => void;
  deleteMix: (id: string) => void;

  // Chat
  chatMessages: ChatMessage[];
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;

  // Toasts
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;

  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const defaultPreferences: UserPreferences = {
  language: 'English',
  availableTime: 30,
  preferredActivities: [],
  theme: 'system',
  foodPreferences: 'no-preference',
  allergies: [],
  accessibilityNeeds: [],
};

const today = new Date().toISOString().split('T')[0];

export function AppProvider({ children }: { children: ReactNode }) {
  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mindmate-auth') === 'true';
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('mindmate-user');
    return saved ? JSON.parse(saved) : null;
  });

  // Onboarding
  const [onboardingStep, setOnboardingStep] = useState(1);

  // Data
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>(() => {
    const saved = localStorage.getItem('mindmate-moods');
    return saved ? JSON.parse(saved) : sampleMoodHistory;
  });

  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>(() => {
    const saved = localStorage.getItem('mindmate-journal');
    return saved ? JSON.parse(saved) : sampleJournalEntries;
  });

  const [todayActivities, setTodayActivities] = useState<WellnessActivity[]>(() => {
    const saved = localStorage.getItem('mindmate-activities');
    return saved ? JSON.parse(saved) : sampleActivities;
  });

  const [todayHabits, setTodayHabits] = useState<HabitEntry>(() => {
    const saved = localStorage.getItem('mindmate-habits');
    return saved ? JSON.parse(saved) : {
      id: 'today',
      date: today,
      waterGlasses: 0,
      sleepHours: 0,
      exerciseMinutes: 0,
      meditationMinutes: 0,
    };
  });

  const [challenges, setChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem('mindmate-challenges');
    return saved ? JSON.parse(saved) : defaultChallenges;
  });

  const [savedMixes, setSavedMixes] = useState<SoundMix[]>(() => {
    const saved = localStorage.getItem('mindmate-mixes');
    return saved ? JSON.parse(saved) : [];
  });

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('mindmate-chat');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Persist helper
  const persist = (key: string, data: unknown) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Auth methods (demo mode — uses localStorage)
  const login = useCallback(async (_email: string, _password: string) => {
    // In demo mode, accept any credentials
    const demoUser: UserProfile = {
      uid: 'demo-user-1',
      displayName: user?.displayName || 'Demo User',
      email: _email,
      ageGroup: user?.ageGroup,
      lifeSituations: user?.lifeSituations || [],
      wellnessGoals: user?.wellnessGoals || [],
      preferences: user?.preferences || defaultPreferences,
      onboardingComplete: user?.onboardingComplete || false,
      createdAt: new Date().toISOString(),
      trustedContacts: [],
    };
    setUser(demoUser);
    setIsAuthenticated(true);
    persist('mindmate-user', demoUser);
    localStorage.setItem('mindmate-auth', 'true');
  }, [user]);

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    const newUser: UserProfile = {
      uid: 'demo-user-' + Date.now(),
      displayName: name,
      email,
      lifeSituations: [],
      wellnessGoals: [],
      preferences: defaultPreferences,
      onboardingComplete: false,
      createdAt: new Date().toISOString(),
      trustedContacts: [],
    };
    setUser(newUser);
    setIsAuthenticated(true);
    persist('mindmate-user', newUser);
    localStorage.setItem('mindmate-auth', 'true');
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('mindmate-auth');
    localStorage.removeItem('mindmate-user');
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      persist('mindmate-user', updated);
      return updated;
    });
  }, []);

  // Onboarding
  const setAgeGroup = useCallback((ag: AgeGroup) => {
    updateProfile({ ageGroup: ag });
  }, [updateProfile]);

  const setLifeSituations = useCallback((ls: LifeSituation[]) => {
    updateProfile({ lifeSituations: ls });
  }, [updateProfile]);

  const setWellnessGoals = useCallback((goals: WellnessGoal[]) => {
    updateProfile({ wellnessGoals: goals });
  }, [updateProfile]);

  const setPreferences = useCallback((prefs: Partial<UserPreferences>) => {
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, preferences: { ...prev.preferences, ...prefs } };
      persist('mindmate-user', updated);
      return updated;
    });
  }, []);

  const completeOnboarding = useCallback(() => {
    updateProfile({ onboardingComplete: true });
  }, [updateProfile]);

  // Moods
  const addMood = useCallback((mood: MoodEntry) => {
    setMoodHistory(prev => {
      const updated = [mood, ...prev];
      persist('mindmate-moods', updated);
      return updated;
    });
  }, []);

  const deleteMood = useCallback((id: string) => {
    setMoodHistory(prev => {
      const updated = prev.filter(m => m.id !== id);
      persist('mindmate-moods', updated);
      return updated;
    });
  }, []);

  // Journal
  const addJournalEntry = useCallback((entry: JournalEntry) => {
    setJournalEntries(prev => {
      const updated = [entry, ...prev];
      persist('mindmate-journal', updated);
      return updated;
    });
  }, []);

  const updateJournalEntry = useCallback((id: string, updates: Partial<JournalEntry>) => {
    setJournalEntries(prev => {
      const updated = prev.map(e => e.id === id ? { ...e, ...updates } : e);
      persist('mindmate-journal', updated);
      return updated;
    });
  }, []);

  const deleteJournalEntry = useCallback((id: string) => {
    setJournalEntries(prev => {
      const updated = prev.filter(e => e.id !== id);
      persist('mindmate-journal', updated);
      return updated;
    });
  }, []);

  // Activities
  const toggleActivity = useCallback((id: string) => {
    setTodayActivities(prev => {
      const updated = prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a);
      persist('mindmate-activities', updated);
      return updated;
    });
  }, []);

  // Habits
  const updateHabits = useCallback((updates: Partial<HabitEntry>) => {
    setTodayHabits(prev => {
      const updated = { ...prev, ...updates };
      persist('mindmate-habits', updated);
      return updated;
    });
  }, []);

  // Challenges
  const startChallenge = useCallback((id: string) => {
    setChallenges(prev => {
      const updated = prev.map(c => c.id === id ? { ...c, isActive: true, startDate: today } : c);
      persist('mindmate-challenges', updated);
      return updated;
    });
  }, []);

  const completeTask = useCallback((challengeId: string, taskId: string) => {
    setChallenges(prev => {
      const updated = prev.map(c => {
        if (c.id !== challengeId) return c;
        const tasks = c.tasks.map(t =>
          t.id === taskId ? { ...t, completed: !t.completed, completedAt: !t.completed ? new Date().toISOString() : undefined } : t
        );
        const completedDays = tasks.filter(t => t.completed).length;
        return { ...c, tasks, completedDays, streak: completedDays };
      });
      persist('mindmate-challenges', updated);
      return updated;
    });
  }, []);

  // Sounds
  const saveMix = useCallback((mix: SoundMix) => {
    setSavedMixes(prev => {
      const updated = [...prev, mix];
      persist('mindmate-mixes', updated);
      return updated;
    });
  }, []);

  const deleteMix = useCallback((id: string) => {
    setSavedMixes(prev => {
      const updated = prev.filter(m => m.id !== id);
      persist('mindmate-mixes', updated);
      return updated;
    });
  }, []);

  // Chat
  const addChatMessage = useCallback((msg: ChatMessage) => {
    setChatMessages(prev => {
      const updated = [...prev, msg];
      persist('mindmate-chat', updated);
      return updated;
    });
  }, []);

  const clearChat = useCallback(() => {
    setChatMessages([]);
    localStorage.removeItem('mindmate-chat');
  }, []);

  // Toasts
  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString();
    const newToast = { ...toast, id };
    setToasts(prev => [...prev, newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, toast.duration || 4000);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        signup,
        logout,
        updateProfile,
        onboardingStep,
        setOnboardingStep,
        setAgeGroup,
        setLifeSituations,
        setWellnessGoals,
        setPreferences,
        completeOnboarding,
        moodHistory,
        addMood,
        deleteMood,
        journalEntries,
        addJournalEntry,
        updateJournalEntry,
        deleteJournalEntry,
        todayActivities,
        toggleActivity,
        todayHabits,
        updateHabits,
        challenges,
        startChallenge,
        completeTask,
        savedMixes,
        saveMix,
        deleteMix,
        chatMessages,
        addChatMessage,
        clearChat,
        toasts,
        addToast,
        removeToast,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
