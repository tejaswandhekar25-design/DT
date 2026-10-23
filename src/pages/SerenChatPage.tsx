// ============================================
// MindMate — Seren AI Wellness Companion
// Warm, empathetic, non-judgmental chat interface
// with interactive action cards & conversation controls
// ============================================

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain, Send, Sparkles, Trash2, Wind, Dumbbell, Calendar,
  Music, BookOpen, AlertTriangle, ShieldCheck, RefreshCw,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { askSeren } from '../services/geminiService';
import type { ChatMessage, ActionCard } from '../types';

const conversationStarters = [
  'I feel so tired today, what should I do?',
  'I am stressed about my exams and studying.',
  'Work has been completely overwhelming this week.',
  'Can you help me calm my racing thoughts?',
  'I’ve been having trouble sleeping lately.',
  'What’s a comforting, healthy snack I can eat?',
];

export default function SerenChatPage() {
  const { user, chatMessages, addChatMessage, clearChat, addToast } = useApp();
  const navigate = useNavigate();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSource, setActiveSource] = useState<'live-gemini' | 'demo-counselor'>('demo-counselor');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, loading]);

  // Initial welcome greeting from Seren if chat is empty
  useEffect(() => {
    if (chatMessages.length === 0) {
      const welcomeName = user?.displayName ? user.displayName : 'there';
      const initialGreeting: ChatMessage = {
        id: 'initial-seren-msg',
        role: 'assistant',
        content: `Hello ${welcomeName}, I'm Seren. 🌿 Welcome to your safe space.

I'm here to listen without judgment, offer calming perspective, and help you find steady breathing, gentle stretches, or peaceful routines whenever you need them.

How is your day feeling right now? You can share anything on your mind or choose one of the prompts below.`,
        timestamp: new Date().toISOString(),
        actionCards: [
          {
            id: 'card-breathe',
            title: '3-Minute Mindful Breathing',
            description: 'Box breathing to steady your nervous system.',
            icon: 'wind',
            action: '/breathing',
            color: '#D1FAE5',
          },
          {
            id: 'card-sounds',
            title: 'Soothing Nature Soundscapes',
            description: 'Gentle rain, ocean waves, or soft piano.',
            icon: 'music',
            action: '/sounds',
            color: '#DBEAFE',
          },
          {
            id: 'card-plan',
            title: 'Daily Wellness Plan',
            description: 'Check today’s calm routine.',
            icon: 'calendar',
            action: '/wellness-plan',
            color: '#EDE9FE',
          },
        ],
      };
      addChatMessage(initialGreeting);
    }
  }, [chatMessages.length, user?.displayName, addChatMessage]);

  const handleSend = async (messageText?: string) => {
    const textToSend = messageText || input;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: textToSend.trim(),
      timestamp: new Date().toISOString(),
    };

    addChatMessage(userMsg);
    if (!messageText) setInput('');
    setLoading(true);

    try {
      const history = chatMessages.map(m => ({ role: m.role, content: m.content }));
      const response = await askSeren(textToSend.trim(), user, history);
      setActiveSource(response.source);

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date().toISOString(),
        actionCards: response.actionCards,
      };

      addChatMessage(assistantMsg);
    } catch (err) {
      addToast({
        type: 'error',
        message: 'Could not connect with Seren. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleActionClick = (action: string) => {
    navigate(action);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 170px)',
      minHeight: '520px',
      background: 'var(--color-card)',
      borderRadius: '24px',
      border: '1px solid var(--color-border)',
      overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
    }}>
      {/* 1. Chat Header Bar */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--color-bg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)',
          }}>
            <Brain size={24} color="white" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 800, margin: 0 }}>Seren AI</h2>
              <span className="badge badge-success" style={{ fontSize: '0.688rem', padding: '2px 8px' }}>
                Online & Listening
              </span>
              <span style={{
                fontSize: '0.688rem',
                padding: '2px 8px',
                borderRadius: '999px',
                background: activeSource === 'live-gemini' ? '#DBEAFE' : 'var(--color-secondary)',
                color: activeSource === 'live-gemini' ? '#1E40AF' : 'var(--color-primary)',
                fontWeight: 600,
              }}>
                {activeSource === 'live-gemini' ? '⚡ Gemini 1.5 Live' : '🌿 Empathetic Mode'}
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: '2px 0 0' }}>
              Empathetic AI Wellness Companion • Non-diagnostic & Safe
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            type="button"
            onClick={() => {
              clearChat();
              addToast({ type: 'info', message: 'Chat history cleared. Starting fresh.' });
            }}
            className="btn btn-sm btn-ghost"
            title="Clear conversation history"
            style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}
          >
            <Trash2 size={16} />
            <span className="desktop-only">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* 2. Messages Scroll Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}>
        {chatMessages.map(msg => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: isUser ? 'flex-end' : 'flex-start',
                width: '100%',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                maxWidth: '85%',
                flexDirection: isUser ? 'row-reverse' : 'row',
              }}>
                {!isUser && (
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '10px',
                    background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}>
                    <Brain size={18} color="white" />
                  </div>
                )}

                <div>
                  <div
                    className={`chat-bubble ${isUser ? 'user' : 'assistant'}`}
                    style={{
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {msg.content}
                  </div>

                  {/* Interactive Action Cards */}
                  {msg.actionCards && msg.actionCards.length > 0 && (
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '12px',
                      marginTop: '12px',
                    }}>
                      {msg.actionCards.map(card => (
                        <div
                          key={card.id}
                          className="card"
                          style={{
                            padding: '14px 16px',
                            borderRadius: '14px',
                            background: 'var(--color-bg)',
                            border: '1px solid var(--color-border)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '8px',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: '8px',
                              background: card.color || '#EDE9FE',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}>
                              <Sparkles size={16} color="#3730A3" />
                            </div>
                            <span style={{ fontSize: '0.813rem', fontWeight: 700, color: 'var(--color-text)' }}>
                              {card.title}
                            </span>
                          </div>

                          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', margin: 0, lineHeight: 1.4 }}>
                            {card.description}
                          </p>

                          <button
                            type="button"
                            onClick={() => handleActionClick(card.action)}
                            className="btn btn-sm btn-primary"
                            style={{
                              marginTop: '4px',
                              fontSize: '0.75rem',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              width: '100%',
                            }}
                          >
                            <span>Open Tool</span>
                            <ExternalLink size={12} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div style={{
                    fontSize: '0.688rem',
                    color: 'var(--color-text-muted)',
                    marginTop: '4px',
                    textAlign: isUser ? 'right' : 'left',
                  }}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #4F46E5, #818CF8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Brain size={18} color="white" />
            </div>
            <div
              className="chat-bubble assistant"
              style={{
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.813rem',
                color: 'var(--color-text-light)',
              }}
            >
              <div className="spinner" style={{ width: '14px', height: '14px' }} />
              <span>Seren is reflecting warmly...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 3. Suggested Conversation Starters */}
      <div style={{
        padding: '10px 24px',
        borderTop: '1px solid var(--color-border)',
        background: 'var(--color-bg)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
      }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', flexShrink: 0 }}>
          Suggestions:
        </span>
        {conversationStarters.map((starter, i) => (
          <button
            key={i}
            type="button"
            onClick={() => handleSend(starter)}
            disabled={loading}
            style={{
              background: 'var(--color-card)',
              border: '1px solid var(--color-border)',
              borderRadius: '999px',
              padding: '4px 12px',
              fontSize: '0.75rem',
              color: 'var(--color-text)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'all 0.15s ease',
            }}
          >
            {starter}
          </button>
        ))}
      </div>

      {/* 4. Text Input & Send */}
      <div className="chat-input-area">
        <textarea
          className="input textarea"
          placeholder="Type whatever you are feeling... (e.g., 'I am stressed about my exams')"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          style={{
            minHeight: '44px',
            maxHeight: '120px',
            resize: 'none',
            padding: '10px 14px',
            fontSize: '0.875rem',
          }}
        />

        <button
          type="button"
          onClick={() => handleSend()}
          disabled={!input.trim() || loading}
          className="btn btn-primary"
          style={{ height: '44px', padding: '0 20px', borderRadius: '12px' }}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>

      {/* 5. Safety Micro-Disclaimer */}
      <div style={{
        padding: '6px 24px',
        background: 'var(--color-card)',
        borderTop: '1px solid var(--color-border)',
        fontSize: '0.688rem',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
      }}>
        <ShieldCheck size={12} />
        <span>Seren is an AI companion for wellness support and cannot provide medical diagnosis. In emergency, please call 14416 (India) or 988 (US).</span>
      </div>
    </div>
  );
}
