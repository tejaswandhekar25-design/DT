// ============================================
// MindMate — Main Application Router & Entry
// ============================================

import { Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './components/layout/PublicLayout';
import DashboardLayout from './components/layout/DashboardLayout';
import ToastContainer from './components/common/ToastContainer';

// Pages
import LandingPage from './pages/LandingPage';
import AuthPages from './pages/AuthPages';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import SerenChatPage from './pages/SerenChatPage';
import MoodTrackerPage from './pages/MoodTrackerPage';
import WellnessPlanPage from './pages/WellnessPlanPage';
import YogaExercisePage from './pages/YogaExercisePage';
import NutritionPage from './pages/NutritionPage';
import BreathingPage from './pages/BreathingPage';
import CalmCornerPage from './pages/CalmCornerPage';
import SoundscapePage from './pages/SoundscapePage';
import JournalPage from './pages/JournalPage';
import ChallengesPage from './pages/ChallengesPage';
import ProgressPage from './pages/ProgressPage';
import SosPage from './pages/SosPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public Routes with Navbar and Footer */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<AuthPages />} />
          <Route path="/signup" element={<AuthPages />} />
        </Route>

        {/* Onboarding Flow */}
        <Route path="/onboarding" element={<OnboardingPage />} />

        {/* Authenticated / Demo Dashboard Layout with Sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/chat" element={<SerenChatPage />} />
          <Route path="/mood" element={<MoodTrackerPage />} />
          <Route path="/wellness-plan" element={<WellnessPlanPage />} />
          <Route path="/yoga" element={<YogaExercisePage />} />
          <Route path="/nutrition" element={<NutritionPage />} />
          <Route path="/breathing" element={<BreathingPage />} />
          <Route path="/calm" element={<CalmCornerPage />} />
          <Route path="/sounds" element={<SoundscapePage />} />
          <Route path="/journal" element={<JournalPage />} />
          <Route path="/challenges" element={<ChallengesPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/sos" element={<SosPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
