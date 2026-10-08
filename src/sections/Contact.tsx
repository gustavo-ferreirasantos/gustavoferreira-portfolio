import { useEffect, useRef, useState } from 'react';
import { CvActions } from '../components/CvActions';
import { Icon, type IconName } from '../components/Icon';
import { SectionHeader } from '../components/SectionHeader';
import { contacts } from '../data/contacts';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './Contact.module.css';

type CopyStatus = 'idle' | 'copied' | 'error';

const STATUS_RESET_MS = 3000;

interface Channel {
  id: 'email' | 'phone' | 'github' | 'linkedin';
  icon: IconName;
  href: string;
  display: string;
  external: boolean;
}

const channels: Channel[] = [
  { id: 'email', icon: 'mail', href: `mailto:${contacts.email}`, display: contacts.email, external: false },
  { id: 'phone', icon: 'phone', href: contacts.phone.href, display: contacts.phone.display, external: false },
  { id: 'github', icon: 'github', href: contacts.github.href, display: contacts.github.display, external: true },
  { id: 'linkedin', icon: 'linkedin', href: contacts.linkedin.href, display: contacts.linkedin.display, external: true },
];

export function Contact() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();
  const [status, setStatus] = useState<CopyStatus>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(contacts.email);
      setStatus('copied');
    } catch {
      // Clipboard indisponível (contexto inseguro ou permissão negada).
      setStatus('error');
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus('idle'), STATUS_RESET_MS);
  }

  const feedback = status === 'copied' ? t.contact.copied : status === 'error' ? t.contact.copyError : '';

  return (
    <section id="contact" className={styles.contact} aria-labelledby="contact-title">
      <div className="container">
        <div ref={reveal} className={`reveal ${styles.panel}`}>
          <SectionHeader id="contact-title" kicker={t.contact.kicker} title={t.contact.title} intro={t.contact.lead} />

          <ul role="list" className={styles.channels} aria-label={t.contact.channelsLabel}>
            {channels.map((channel) => (
              <li key={channel.id}>
                <a
                  className={styles.channel}
                  href={channel.href}
                  {...(channel.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  <span className={styles.channelIcon}>
                    <Icon name={channel.icon} size={20} />
                  </span>
                  <span className={styles.channelText}>
                    <span className={styles.channelLabel}>{t.contact[channel.id]}</span>
                    <span className={styles.channelValue}>{channel.display}</span>
                  </span>
                  {channel.external && <span className="visually-hidden">{t.common.newTab}</span>}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <button type="button" className={styles.copy} onClick={copyEmail}>
              <Icon name={status === 'copied' ? 'check' : 'copy'} size={18} />
              {t.contact.copy}
            </button>
            <CvActions />
          </div>
          <p className={styles.feedback} role="status" data-status={status}>
            {feedback}
          </p>
        </div>
      </div>
    </section>
  );
}
