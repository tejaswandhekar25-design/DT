// ============================================
// MindMate — Seren AI Service
// Handles Gemini API requests via backend endpoint
// with graceful fallback to natural, empathetic companion
// ============================================

import type { ActionCard, UserProfile } from '../types';

export interface SerenResponse {
  message: string;
  actionCards?: ActionCard[];
  source: 'live-gemini' | 'demo-counselor';
}

const crisisKeywords = [
  'suicide',
  'kill myself',
  'end my life',
  'self harm',
  'cutting myself',
  'want to die',
  'cannot go on',
  'no reason to live',
];

export async function askSeren(
  userQuery: string,
  userProfile?: UserProfile | null,
  chatHistory: { role: 'user' | 'assistant'; content: string }[] = []
): Promise<SerenResponse> {
  // 1. Immediate Crisis Detection Check
  const lower = userQuery.toLowerCase();
  const hasCrisisIntent = crisisKeywords.some(kw => lower.includes(kw));

  if (hasCrisisIntent) {
    return {
      message: `I hear how much pain you are in right now, and I want you to know that your life matters and you do not have to carry this alone. 💙

Please connect with caring human professionals right now who are ready to support you 24/7:

• **India Tele-MANAS (24/7 Free):** 14416 or 1800-891-4416
• **Kiran Mental Health Helpline:** 1800-599-0019
• **Vandrevala Foundation:** +91 9999 666 555
• **US/Canada 988 Crisis Line:** Call or text 988
• **UK Crisis Line:** Text SHOUT to 85258

Please reach out to one of these resources or contact a trusted friend or family member right away.`,
      actionCards: [
        {
          id: 'crisis-sos',
          title: 'Emergency SOS Page',
          description: 'Access emergency helplines and prewritten SOS SMS to loved ones.',
          icon: 'alert-triangle',
          action: '/sos',
          color: '#FEE2E2',
        },
        {
          id: 'crisis-grounding',
          title: '5-4-3-2-1 Grounding Tool',
          description: 'A gentle exercise to steady your mind right now.',
          icon: 'anchor',
          action: '/calm',
          color: '#DBEAFE',
        },
      ],
      source: 'live-gemini',
    };
  }

  // 2. Try Backend Endpoint (/api/seren)
  try {
    const res = await fetch('/api/seren', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userQuery,
        profile: userProfile,
        history: chatHistory.slice(-6),
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.reply && !data.fallbackToDemo) {
        return {
          message: data.reply,
          actionCards: data.actionCards || generateContextualCards(userQuery),
          source: 'live-gemini',
        };
      }
    }
  } catch (err) {
    // Backend endpoint not active, fall through to smart natural companion
  }

  // 3. Natural Empathetic Companion Fallback
  return generateDemoResponse(userQuery, userProfile);
}

function generateDemoResponse(query: string, profile?: UserProfile | null): SerenResponse {
  const q = query.toLowerCase();
  const userName = profile?.displayName ? profile.displayName : 'there';

  // Check Marathi / Hindi cues
  const isMarathiOrHindi = /thaklo|thakle|tras|kaay|kasa|kay|ahe|karan|kuch|kaisa|karu/.test(q);

  // A. Tired / Exhausted / Burnout / "What should I do"
  if (
    q.includes('tired') ||
    q.includes('exhaust') ||
    q.includes('drained') ||
    q.includes('fatigue') ||
    q.includes('thaklo') ||
    q.includes('no energy') ||
    q.includes('burnout') ||
    (q.includes('sleepy') && !q.includes('trouble sleeping'))
  ) {
    return {
      message: `I hear you, ${userName}. Feeling completely wiped out is so tough, especially when there's still a voice inside telling you to keep going. 💙

First of all, take all the pressure off yourself right now. You don't have to power through everything on 5% battery.

Here's what you can do right now with zero stress:
1. **Drink a tall glass of cold water** — subtle dehydration drains energy without us even noticing.
2. **Rest your eyes for 5 to 10 minutes** — lean back in your chair, put your phone face down, and just let your body relax without forcing sleep.
3. **Pick just one priority for today** — look at what's in front of you, do the single thing that actually needs attention, and let everything else wait until tomorrow.

How does the tiredness feel right now? Are your eyes and body physically heavy, or is your mind just completely drained from thinking?`,
      actionCards: [
        {
          id: 'rest-calm',
          title: 'Gentle Resting Space',
          description: 'Step into the Calm Corner for 5 minutes of quiet time.',
          icon: 'anchor',
          action: '/calm',
          color: '#DBEAFE',
        },
        {
          id: 'rain-sounds',
          title: 'Soft Rain & River Audio',
          description: 'Put on relaxing background rain to rest your senses.',
          icon: 'music',
          action: '/sounds',
          color: '#EDE9FE',
        },
        {
          id: 'nourish-boost',
          title: 'Gentle Energy Snacks',
          description: 'A handful of nuts or fresh fruit for natural energy.',
          icon: 'apple',
          action: '/nutrition',
          color: '#D1FAE5',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // B. Trouble Sleeping / Insomnia / Night Thoughts
  if (q.includes('sleep') || q.includes('insomnia') || q.includes('cant sleep') || q.includes("can't sleep") || q.includes('awake')) {
    return {
      message: `Lying awake when all you want is to sleep is so frustrating, ${userName}. 🌙 

The tricky thing is, the harder we try to force sleep, the more alert our brain gets. Let's switch the goal from "I have to sleep right now" to just "I'm going to let my body rest quietly."

Try this right now:
• Unclench your jaw, drop your shoulders away from your ears, and let your hands go soft.
• Try 4 slow cycles of 4-7-8 breathing (inhale for 4 seconds, hold gently for 7, exhale through your mouth for 8).
• Put on gentle rain or crickets soundscape with a 15-minute sleep timer.

Would you like to try a quick breathing cycle together right now?`,
      actionCards: [
        {
          id: '478-sleep',
          title: '4-7-8 Sleep Breathing',
          description: 'Guided rhythm to slow down your heart rate.',
          icon: 'wind',
          action: '/breathing',
          color: '#EDE9FE',
        },
        {
          id: 'sleep-sounds',
          title: 'Night & Rain Soundscape',
          description: 'Soothing rain and crickets with automatic sleep timer.',
          icon: 'music',
          action: '/sounds',
          color: '#DBEAFE',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // C. Stress / Overwhelm / Deadlines / Work Pressure
  if (q.includes('stress') || q.includes('overwhelm') || q.includes('work') || q.includes('deadline') || q.includes('pressure') || q.includes('too much')) {
    return {
      message: `Take a slow, deep breath with me right now. You have been carrying a lot, ${userName}, and it makes total sense that you're feeling overwhelmed. 🌿

When everything feels like an emergency, our brains get stuck in high gear. But you don't have to tackle the whole mountain in this single hour.

Here is a practical way to break the freeze:
1. Write down whatever 3 things are shouting loudest in your head on a piece of paper or in your private journal.
2. Circle just ONE of them. Hide the rest for now.
3. Set a timer for 15 minutes to work gently on that one thing, or step away completely for a 5-minute breather.

What's the heaviest thing sitting on your mind today?`,
      actionCards: [
        {
          id: 'box-breathe',
          title: 'Box Breathing (4-4-4-4)',
          description: 'A 2-minute reset to clear mental fog.',
          icon: 'wind',
          action: '/breathing',
          color: '#D1FAE5',
        },
        {
          id: 'journal-dump',
          title: 'Brain-Dump in Journal',
          description: 'Get racing thoughts out of your head and onto the page.',
          icon: 'book-open',
          action: '/journal',
          color: '#FFEDD5',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // D. Anxiety / Panic / Racing Heart / Scared
  if (q.includes('anxi') || q.includes('panic') || q.includes('racing') || q.includes('heart') || q.includes('scared') || q.includes('nervous')) {
    return {
      message: `You are safe right now, ${userName}. Feel both of your feet planted firmly on the floor. 🌿

Anxiety makes everything feel urgent and dangerous, but feelings — even really intense ones — are waves that peak and always come down.

Look around your room right now and name:
• 3 things you can see (like a window, a chair, your mug)
• 2 things you can physically touch (the texture of your jeans, your desk)
• 1 sound you can hear in the distance.

I am right here with you. Take one slow, easy breath out. How are you feeling right this second?`,
      actionCards: [
        {
          id: 'grounding-54321',
          title: '5-4-3-2-1 Sensory Grounding',
          description: 'Interactive tool to bring your mind back to the present room.',
          icon: 'anchor',
          action: '/calm',
          color: '#D1FAE5',
        },
        {
          id: 'deep-breathing',
          title: 'Deep Calming Breath',
          description: 'Follow the gentle visual rhythm to slow your heart rate.',
          icon: 'wind',
          action: '/breathing',
          color: '#DBEAFE',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // E. Lonely / Sad / Down / Crying
  if (q.includes('lonely') || q.includes('sad') || q.includes('down') || q.includes('cry') || q.includes('alone') || q.includes('hurt')) {
    return {
      message: `I'm really glad you reached out, ${userName}. When sadness or loneliness hits, it can feel like you're behind thick glass where nobody sees you. 🌸

Please be super gentle with yourself right now. You don't have to force a smile or pretend everything is okay. It's completely okay to not be okay.

If it feels comfortable, wrap yourself in something warm, sip a warm cup of water or tea, and know that you are worthy of care and kindness.

Do you want to talk about what's making you feel this way, or would you rather just listen to something quiet and relaxing together?`,
      actionCards: [
        {
          id: 'comfort-sounds',
          title: 'Gentle Piano & Ocean Waves',
          description: 'Quiet, soothing ambient music for emotional comfort.',
          icon: 'music',
          action: '/sounds',
          color: '#EDE9FE',
        },
        {
          id: 'warm-journal',
          title: 'Private Journal',
          description: 'Express what you feel in a safe, encrypted space.',
          icon: 'book-open',
          action: '/journal',
          color: '#FFEDD5',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // F. Exam / Studies / College / School
  if (q.includes('exam') || q.includes('study') || q.includes('test') || q.includes('college') || q.includes('school')) {
    return {
      message: `Exam stress is so intense, ${userName}, but please remember: your exam results do not define your worth or your future. 💙

Your brain actually remembers much more when it's rested than when it's cramming in panic mode. 

Try the 25/5 rhythm today:
• 25 minutes of steady, single-task studying (no notifications).
• 5 minutes of standing up, stretching your neck, and drinking water.

How is your study schedule looking right now? Do you want to set a quick focus session?`,
      actionCards: [
        {
          id: 'focus-timer',
          title: 'Study Focus Timer',
          description: '25-minute Pomodoro focus block in the Calm Corner.',
          icon: 'clock',
          action: '/calm',
          color: '#DBEAFE',
        },
        {
          id: 'desk-stretches',
          title: 'Desk & Neck Stretches',
          description: 'Quick poses to release stiffness from studying.',
          icon: 'dumbbell',
          action: '/yoga',
          color: '#D1FAE5',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // G. Food / Nutrition / "What should I eat"
  if (q.includes('eat') || q.includes('food') || q.includes('hungry') || q.includes('meal') || q.includes('diet') || q.includes('snack')) {
    return {
      message: `Nourishing your body is one of the kindest things you can do, ${userName}! 🥑

When we are stressed or tired, our bodies crave simple, stabilizing foods that give lasting energy instead of sharp sugar crashes.

A few great options depending on what you feel like:
• **Warm comfort:** Steamed dal with rice or a warm vegetable wrap.
• **Quick snack:** Fresh seasonal fruit with plain yogurt, or a small handful of almonds and walnuts.
• **Instant hydration:** A large glass of water with a slice of lemon.

Head over to our Nourishment page to filter balanced, budget-friendly meal ideas for breakfast, lunch, or snacks!`,
      actionCards: [
        {
          id: 'meal-ideas',
          title: 'Explore Balanced Meals',
          description: 'Budget-friendly, non-restrictive recipes with photos.',
          icon: 'apple',
          action: '/nutrition',
          color: '#D1FAE5',
        },
        {
          id: 'track-water',
          title: 'Hydration Tracker',
          description: 'Log your daily glasses of water.',
          icon: 'droplets',
          action: '/nutrition',
          color: '#DBEAFE',
        },
      ],
      source: 'demo-counselor',
    };
  }

  // H. Greetings / "Hi" / "Who are you"
  if (q.startsWith('hi') || q.startsWith('hello') || q.startsWith('hey') || q === 'how are you' || q.includes('who are you')) {
    return {
      message: `Hey ${userName}! It's so nice to hear from you. 🌿

I'm Seren, your everyday wellness companion. I'm here anytime you need to vent, unwind after a long day, find soothing soundscapes, or just take a minute to breathe.

How are you doing today? What's on your mind?`,
      actionCards: generateContextualCards(q),
      source: 'demo-counselor',
    };
  }

  // General Warm Empathetic Response
  return {
    message: `Thank you for sharing that with me, ${userName}. I'm listening with an open heart. 🌿

You don't have to carry everything alone or have everything figured out right now. Whatever you're dealing with, we can take it one small, gentle step at a time.

What would feel most helpful to you right now — a quick breathing exercise, some peaceful ambient soundscapes, or just talking through what's going on?`,
    actionCards: generateContextualCards(q),
    source: 'demo-counselor',
  };
}

function generateContextualCards(query: string): ActionCard[] {
  return [
    {
      id: 'daily-breathing',
      title: '3-Minute Mindful Breathing',
      description: 'Quick calming respiratory reset.',
      icon: 'wind',
      action: '/breathing',
      color: '#D1FAE5',
    },
    {
      id: 'soothing-sounds',
      title: 'Nature Soundscapes',
      description: 'Layer rain, rivers, and gentle piano tones.',
      icon: 'music',
      action: '/sounds',
      color: '#DBEAFE',
    },
    {
      id: 'calm-sanctuary',
      title: 'The Calm Corner',
      description: 'Peaceful nature scenery and 5-4-3-2-1 grounding.',
      icon: 'anchor',
      action: '/calm',
      color: '#EDE9FE',
    },
  ];
}
