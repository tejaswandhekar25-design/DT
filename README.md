# MindMate — Complete AI-Powered Mental Wellness Website

> **“Your Safe Space for a Brighter You.”**

MindMate is a modern, responsive, full-featured mental wellness platform designed to help students, working professionals, adults, and older adults manage everyday stress, build healthy habits, navigate life transitions, and find calming routines through personalized AI assistance.

---

## 🌟 Key Highlights & Features

### 1. 🌿 4 Tailored Life Stages
MindMate specifically adapts its guidance, language, and suggested rhythms to four distinct life groups:
- **Student (13–22):** Campus stress, exam pressure, study break schedules, budget-friendly brain foods, and peer balance.
- **Working Professional (23–40):** Workplace burnout prevention, desk ergonomics, neck stretches, and boundary setting.
- **Adult (41–59):** Family responsibilities, career shifts, personal vitality, and mindful restorative routines.
- **Older Adult (60+):** Peaceful garden ambience, seated chair yoga, and gentle social connection reminders.

### 2. 🤖 Seren AI Wellness Companion
- **Warm & Empathetic:** Supportive, non-judgmental conversational guide.
- **Interactive Action Cards:** Clicking suggestions instantly launches the actual breathing exercise, yoga routine, soundscape, or daily plan.
- **Crisis Detection:** Real-time sensitive keyword triage that immediately surfaces verified emergency helplines.
- **Secure Backend Integration:** Connects securely to Google Gemini (`gemini-1.5-flash`) via an Express proxy server with strict system instructions and medical disclaimer guardrails.
- **Graceful Fallback:** If offline or in demo mode, Seren switches seamlessly to a smart local counselor.

### 3. 🎵 Nature Soundscape Studio
- **Real Procedural Audio Synthesizer:** Built directly on the browser's native **Web Audio API** — generates authentic rain, distant thunder, soft wind gusts, ocean waves, flowing river bubbling, waterfall, forest birds, evening crickets, night ambience, and calming piano/flute chords.
- **Zero 404s or Missing MP3s:** Sounds are synthesized in real-time, working 100% offline and in all modern browsers.
- **Multi-Track Mixing:** Individual volume sliders, master volume, favorite pins, custom mix saving, and sleep timers (5, 10, 15, 30, 60 minutes).

### 4. 📊 Mood Tracking & Non-Diagnostic Insights
- **8 Emotional States:** Happy, Calm, Anxious, Sad, Angry, Tired, Lonely, and Overwhelmed.
- **Visual Analytics:** Interactive Recharts area wave and frequency bar charts.
- **Ethical Design:** Strictly non-diagnostic; presents patterns for gentle self-awareness rather than clinical labeling.

### 5. 🌬️ Guided Breathing Studio
- Animated expanding/contracting breathing circle with live second countdown.
- **Techniques:** Box Breathing (4-4-4-4), 4-7-8 Relaxation Rhythm, and Deep Calm (4-6 Flow).
- Optional background ocean wave soundscapes and duration selector (1, 2, 5, 10 minutes).

### 6. 🧘 Yoga & Gentle Movement Library
- Poses include **Mountain Pose (Tadasana)**, **Child's Pose (Balasana)**, **Cat-Cow Stretch**, **Seated Spinal Twist**, and **Neck and Shoulder Desk Stretch**.
- Step-by-step instructions, cautious well-being benefits, beginner/chair modifications, safety notes, and live practice countdown timers.

### 7. 🥗 Nourishment & Healthy Lifestyle Habits
- Balanced breakfast, lunch, dinner, and mindful snack ideas.
- Filter by Vegetarian, Non-Vegetarian, Vegan, and Budget-Friendly.
- Allergy exclusions (Gluten, Dairy, Eggs, Tree Nuts, Fish).
- Hydration glasses tracker and evidence-based sleep hygiene guidelines.

### 8. 🌸 Calm Corner & 5-4-3-2-1 Sensory Grounding
- Nature landscape immersion cards with instant audio.
- Step-by-step interactive **5-4-3-2-1 Sensory Grounding Tool** (Sight, Touch, Hearing, Smell, Taste/Affirmation) for panic and acute anxiety.
- Guided meditations and 25-minute mindful focus timer.

### 9. 🔒 Private Wellness Journal
- 100% client-side privacy; reflections are stored locally and never sent to third-party servers.
- Mood tags, gratitude checkboxes, tag filtering, search, and random prompt generator.

### 10. 🏆 Gentle Self-Care Challenges
- 7-Day Self-Care Challenge and Mindful Week.
- Checkboxes, streak counters, progress bars, and zero-guilt encouragement.

### 11. 🚨 Verified 24/7 SOS Support
- Emergency vs. confidential crisis helpline distinction.
- **India Resources:** Tele-MANAS (14416 / 1800-891-4416), Kiran (1800-599-0019), Vandrevala Foundation (+91 9999 666 555).
- **US & Canada:** 988 Suicide & Crisis Lifeline, Crisis Text Line (741741).
- **UK:** NHS 111, Shout (85258).
- **Prewritten Reaching-Out Message:** Click-to-copy or share directly via WhatsApp to a trusted loved one.

### 12. ⚙️ Profile & Data Sovereignty
- Life stage updates, dietary preferences, theme switcher (Light/Dark mode), and trusted contact management.
- **Export & Delete:** One-click JSON export of your complete wellness history, or permanent local data purge.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React 19, TypeScript, Vite |
| **Routing** | React Router 7 |
| **Styling** | Tailwind CSS v4, Custom CSS Tokens, Glassmorphism, Responsive Grid |
| **Icons** | Lucide React |
| **Charts** | Recharts |
| **Sound Synthesis** | Native Web Audio API procedural sound engine |
| **Backend & AI Proxy**| Node.js, Express, `@google/generative-ai` (Gemini 1.5 Flash) |
| **Authentication & Storage** | Firebase Authentication & Firestore (ready-to-plug) + Encrypted Local Storage Demo mode |

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
git clone <repository-url>
cd DT_Project
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Ensure your `.env` contains:
```env
# Gemini API Key (Backend server only — NEVER exposed to browser)
GEMINI_API_KEY=your_gemini_api_key_here

# App Mode
VITE_APP_MODE=demo
```

### 3. Run Development Servers

**Option A — Run Frontend & Backend together:**
In terminal 1 (Vite frontend):
```bash
npm run dev
```
In terminal 2 (Express Gemini proxy backend):
```bash
npm run server
```

The frontend will be available at:
👉 **`http://localhost:5173`** (or `http://localhost:5174`)

The secure backend will be running at:
👉 **`http://localhost:3001`**

### 4. Build for Production
```bash
npm run build
```
Creates a production-ready bundle in the `dist/` directory.

---

## 🛡️ Privacy, Safety & Ethical Guidelines

1. **Non-Diagnostic:** MindMate is designed for personal self-awareness, everyday stress relief, and habit formation. It never provides psychiatric diagnoses or prescribes medical treatments.
2. **Medical Disclaimers:** Visible disclaimers are present on all exercise, nutrition, and AI interaction screens.
3. **Data Minimization:** Journal entries and private notes are stored in local browser storage by default and are never transmitted to external AI endpoints without explicit user consent.
4. **Crisis Protocols:** If severe distress or self-harm keywords are detected, Seren AI immediately surfaces crisis helplines and offers the 5-4-3-2-1 grounding exercise.

---

## 📄 License
Crafted for educational, computer engineering, and wellness technology exploration.
MindMate — *“Your Safe Space for a Brighter You.”*
