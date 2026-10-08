import { useState, useRef, useEffect, type FormEvent, type KeyboardEvent } from 'react';
import { avatarAiThumbsUp } from '../assets/images';
import { useI18n } from '../i18n/useI18n';
import { contacts, resume } from '../data/contacts';
import {
  processAiMessage,
  getInitialGreeting,
  type AiEmotion,
  type ChatAction,
  type AiResponse,
} from '../utils/aiChatEngine';
import { onExplanation } from '../utils/explanationStore';
import styles from './AiAssistantChat.module.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  emotion?: AiEmotion;
  actions?: ChatAction[];
  timestamp: string;
}

export function AiAssistantChat() {
  const { locale } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Play subtle futuristic UI sound using Web Audio API
  const playUiSound = (type: 'send' | 'receive' | 'open') => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'send') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'receive') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'open') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(523.25, now + 0.1);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      }
    } catch {
      // Audio not supported or blocked
    }
  };

  // Initialize or reset greeting when locale changes
  useEffect(() => {
    const greeting = getInitialGreeting(locale);
    const initialMsg: Message = {
      id: 'greeting',
      sender: 'bot',
      text: greeting.reply,
      emotion: 'thumbsup',
      actions: greeting.actions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMsg]);
  }, [locale]);

  // Listen to explanations triggered across the portfolio
  useEffect(() => {
    const unsubscribe = onExplanation((_term, explanation, projectName) => {
      setIsOpen(true);
      playUiSound('receive');

      const isEn = locale === 'en-US';
      const projectHeader = projectName
        ? isEn
          ? `📁 **Project:** ${projectName}\n\n`
          : `📁 **Projeto:** ${projectName}\n\n`
        : '';

      const botMsg: Message = {
        id: `exp-${Date.now()}`,
        sender: 'bot',
        text: `💡 ${projectHeader}${explanation}`,
        emotion: 'thumbsup',
        actions: [
          {
            label: isEn ? 'View Projects' : 'Ver Projetos',
            actionType: 'quick_reply',
            payload: isEn ? 'What are your main projects?' : 'Quais são seus principais projetos?',
          },
          {
            label: isEn ? 'Tech Stack' : 'Habilidades Técnicas',
            actionType: 'quick_reply',
            payload: isEn ? 'What technologies do you know?' : 'Quais tecnologias você domina?',
          },
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    });

    return () => {
      unsubscribe();
    };
  }, [locale]);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const toggleChat = () => {
    if (!isOpen) {
      playUiSound('open');
      setIsOpen(true);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    } else {
      setIsOpen(false);
    }
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isTyping) return;

    playUiSound('send');
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate smart thinking & responsive typewriter
    const thinkingDelay = Math.min(650, 250 + text.length * 8);

    setTimeout(() => {
      try {
        const response: AiResponse = processAiMessage(text, locale);
        playUiSound('receive');

        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text: response.reply,
          emotion: 'thumbsup',
          actions: response.actions,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        console.error('Error processing AI message:', err);
        const fallbackMsg: Message = {
          id: `bot-${Date.now()}`,
          sender: 'bot',
          text:
            locale === 'en-US'
              ? 'Sorry, I encountered an unexpected error. Please ask again!'
              : 'Desculpe, tive um imprevisto ao processar sua pergunta. Pode tentar novamente?',
          emotion: 'confused',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      } finally {
        setIsTyping(false);
      }
    }, thinkingDelay);
  };

  const handleActionClick = (action: ChatAction) => {
    if (action.actionType === 'copy_email') {
      navigator.clipboard.writeText(contacts.email).then(() => {
        setCopiedNotification(locale === 'en-US' ? 'Email copied!' : 'E-mail copiado!');
        setTimeout(() => setCopiedNotification(null), 3000);
      });
      return;
    }

    if (action.actionType === 'download_cv') {
      window.open(resume.href, '_blank');
      return;
    }

    if (action.actionType === 'open_link' && action.url) {
      window.open(action.url, '_blank');
      return;
    }

    if (action.actionType === 'quick_reply' && action.payload) {
      handleSendMessage(action.payload);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    const greeting = getInitialGreeting(locale);
    const initialMsg: Message = {
      id: `greeting-${Date.now()}`,
      sender: 'bot',
      text: greeting.reply,
      emotion: 'thumbsup',
      actions: greeting.actions,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialMsg]);
  };

  const renderFormattedMarkdown = (text: string) => {
    const lines = text.split('\n');
    return (
      <div className={styles.markdownText}>
        {lines.map((line, idx) => {
          if (!line.trim()) return <br key={idx} />;

          // Bullet points
          if (line.trim().startsWith('• ') || line.trim().startsWith('* ') || line.trim().startsWith('- ')) {
            const clean = line.replace(/^[•*-]\s*/, '');
            return (
              <ul key={idx}>
                <li>{parseInlineFormatting(clean)}</li>
              </ul>
            );
          }

          // Numbered lists e.g. "1. "
          if (line.match(/^\d+\.\s/)) {
            return (
              <p key={idx} style={{ paddingLeft: '8px', margin: '4px 0' }}>
                {parseInlineFormatting(line)}
              </p>
            );
          }

          return <p key={idx}>{parseInlineFormatting(line)}</p>;
        })}
      </div>
    );
  };

  const parseInlineFormatting = (str: string) => {
    // Regex splits on **bold**, `code`, and [label](url) without getting stuck
    const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
    const tokens = str.split(regex);

    return tokens.map((token, index) => {
      if (token.startsWith('**') && token.endsWith('**') && token.length >= 4) {
        return <strong key={index}>{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('`') && token.endsWith('`') && token.length >= 2) {
        return <code key={index}>{token.slice(1, -1)}</code>;
      }
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
      if (linkMatch) {
        return (
          <a key={index} href={linkMatch[2]} target="_blank" rel="noopener noreferrer">
            {linkMatch[1]}
          </a>
        );
      }
      return <span key={index}>{token}</span>;
    });
  };

  const getStatusLabel = () => {
    if (isTyping) return locale === 'en-US' ? 'Generating answer...' : 'Digitando resposta...';
    return locale === 'en-US' ? 'AI Assistant Online' : 'Assistente IA Online';
  };

  return (
    <aside className={styles.chatWidget} aria-label={locale === 'en-US' ? 'AI Assistant Chat' : 'Chat do Assistente IA'}>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          className={styles.launcherBtn}
          onClick={toggleChat}
          aria-label={locale === 'en-US' ? 'Open Gustavo AI Assistant' : 'Abrir Assistente Virtual do Gustavo'}
        >
          <div className={styles.launcherAvatarWrapper}>
            <img
              src={avatarAiThumbsUp}
              alt="Gustavo AI"
              className={styles.launcherAvatarImg}
            />
            <span className={styles.onlineBadge} />
          </div>
          <div className={styles.launcherInfo}>
            <span className={styles.launcherTitle}>
              Gustavo AI <span className={styles.pulseBeacon} />
            </span>
            <span className={styles.launcherSubtitle}>
              {locale === 'en-US' ? 'Ask anything about my CV' : 'Tire dúvidas sobre o currículo'}
            </span>
          </div>
        </button>
      )}

      {/* Main Chat Window */}
      {isOpen && (
        <div className={styles.chatWindow} role="dialog" aria-modal="false">
          {/* Header */}
          <div className={styles.chatHeader}>
            <div className={styles.headerLeft}>
              <div className={styles.headerAvatarFrame}>
                <img
                  src={avatarAiThumbsUp}
                  alt="Gustavo AI"
                  className={styles.headerAvatarImg}
                />
                <span className={styles.headerOnlineDot} />
              </div>
              <div className={styles.headerTitles}>
                <div className={styles.headerName}>
                  Gustavo AI <span className={styles.headerBadge}>AI AGENT</span>
                </div>
                <div className={styles.headerStatus}>
                  <span className={styles.pulseBeacon} /> {getStatusLabel()}
                </div>
              </div>
            </div>
            <div className={styles.headerActions}>
              <button
                type="button"
                className={styles.headerBtn}
                onClick={handleClearChat}
                title={locale === 'en-US' ? 'Restart Chat' : 'Reiniciar conversa'}
                aria-label={locale === 'en-US' ? 'Restart Chat' : 'Reiniciar conversa'}
              >
                🔄
              </button>
              <button
                type="button"
                className={styles.headerBtn}
                onClick={toggleChat}
                title={locale === 'en-US' ? 'Close Chat' : 'Fechar chat'}
                aria-label={locale === 'en-US' ? 'Close Chat' : 'Fechar chat'}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className={styles.messagesContainer}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`${styles.messageRow} ${msg.sender === 'user' ? styles.user : styles.bot}`}
              >
                {msg.sender === 'bot' && (
                  <img
                    src={avatarAiThumbsUp}
                    alt=""
                    className={styles.messageAvatar}
                  />
                )}
                <div className={styles.messageBubble}>
                  {renderFormattedMarkdown(msg.text)}

                  {msg.actions && msg.actions.length > 0 && (
                    <div className={styles.actionPills}>
                      {msg.actions.map((act, aIdx) => (
                        <button
                          key={aIdx}
                          type="button"
                          className={styles.actionBtn}
                          onClick={() => handleActionClick(act)}
                        >
                          {act.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className={`${styles.messageRow} ${styles.bot}`}>
                <img src={avatarAiThumbsUp} alt="" className={styles.messageAvatar} />
                <div className={styles.messageBubble}>
                  <div className={styles.typingIndicator}>
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                    <span className={styles.typingDot} />
                  </div>
                </div>
              </div>
            )}

            {copiedNotification && (
              <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                ✓ {copiedNotification}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className={styles.suggestionsWrap}>
            <span className={styles.suggestionsLabel}>
              {locale === 'en-US' ? 'Suggested Questions' : 'Perguntas Sugeridas'}
            </span>
            <div className={styles.suggestionsScroll}>
              <button
                type="button"
                className={styles.suggestionChip}
                onClick={() =>
                  handleSendMessage(
                    locale === 'en-US' ? 'What are your main projects?' : 'Quais são seus principais projetos?'
                  )
                }
              >
                🚀 {locale === 'en-US' ? 'Main Projects' : 'Principais Projetos'}
              </button>
              <button
                type="button"
                className={styles.suggestionChip}
                onClick={() =>
                  handleSendMessage(
                    locale === 'en-US' ? 'What technologies do you master?' : 'Quais tecnologias você domina?'
                  )
                }
              >
                💻 {locale === 'en-US' ? 'Tech Stack' : 'Tecnologias'}
              </button>
              <button
                type="button"
                className={styles.suggestionChip}
                onClick={() =>
                  handleSendMessage(
                    locale === 'en-US' ? 'Tell me about your education' : 'Qual sua formação acadêmica?'
                  )
                }
              >
                🎓 {locale === 'en-US' ? 'Education' : 'Formação'}
              </button>
              <button
                type="button"
                className={styles.suggestionChip}
                onClick={() =>
                  handleSendMessage(
                    locale === 'en-US' ? 'How can I contact Gustavo?' : 'Como posso entrar em contato?'
                  )
                }
              >
                📬 {locale === 'en-US' ? 'Contact Info' : 'Contatos'}
              </button>
            </div>
          </div>

          {/* Input Form */}
          <form className={styles.chatInputForm} onSubmit={handleFormSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.chatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                locale === 'en-US' ? 'Ask a question about Gustavo...' : 'Faça uma pergunta sobre o Gustavo...'
              }
              aria-label={locale === 'en-US' ? 'Chat message input' : 'Campo de mensagem do chat'}
            />
            <button
              type="submit"
              className={styles.sendBtn}
              disabled={!inputValue.trim() || isTyping}
              aria-label={locale === 'en-US' ? 'Send message' : 'Enviar mensagem'}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
