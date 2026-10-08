import { SectionHeader } from '../components/SectionHeader';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './About.module.css';

const factKeys = ['location', 'degree', 'focus'] as const;

export function About() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className="container">
        <SectionHeader id="about-title" kicker={t.about.kicker} title={t.about.title} />
        <div ref={reveal} className={`reveal ${styles.grid}`}>
          <div className={styles.text}>
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className={styles.facts} aria-label={t.about.factsLabel}>
            {factKeys.map((key) => (
              <div key={key} className={styles.fact}>
                <dt>{t.about.facts[key].label}</dt>
                <dd>{t.about.facts[key].value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
