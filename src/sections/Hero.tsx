import { profile } from '../data/contacts';
import { useI18n } from '../i18n/useI18n';
import { Icon } from '../components/Icon';
import styles from './Hero.module.css';
import { TerminalCard } from './TerminalCard';

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="top" className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.status}>
            <span className={styles.pulse} aria-hidden="true" />
            {t.hero.status}
          </p>
          <p className={styles.greeting}>{t.hero.greeting}</p>
          <h1 id="hero-title" className={styles.name}>
            {profile.fullName}
          </h1>
          <p className={styles.role}>{t.hero.role}</p>
          <p className={styles.summary}>{t.hero.summary}</p>
          <div className={styles.actions}>
            <a className={styles.primary} href="#projects">
              {t.hero.ctaProjects}
              <Icon name="arrowRight" size={18} />
            </a>
            <a className={styles.secondary} href="#contact">
              {t.hero.ctaContact}
            </a>
          </div>
          <p className={styles.location}>
            <Icon name="pin" size={16} />
            {profile.location}
          </p>
        </div>
        <TerminalCard label={t.hero.terminalLabel} />
      </div>
    </section>
  );
}
