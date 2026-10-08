import { Icon } from '../components/Icon';
import { SectionHeader } from '../components/SectionHeader';
import { education, type EducationEntry } from '../data/education';
import { useReveal } from '../hooks/useReveal';
import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import styles from './Education.module.css';

function Entry({ entry }: { entry: EducationEntry }) {
  const { t } = useI18n();
  const copy = t.education.entries[entry.id];
  const reveal = useReveal<HTMLElement>();
  const headingId = `education-${entry.id}`;
  const period = entry.start === entry.end || !entry.end ? `${entry.start ?? ''}` : `${entry.start} – ${entry.end}`;

  return (
    <article ref={reveal} className={`reveal ${styles.entry}`} aria-labelledby={headingId}>
      <p className={styles.period}>
        {period}
        {entry.ongoing && <span className={styles.badge}>{t.education.ongoing}</span>}
      </p>
      <h4 id={headingId} className={styles.title}>
        {copy.title}
      </h4>
      <p className={styles.place}>{copy.place}</p>
      {entry.hours && (
        <p className={styles.hours}>
          <Icon name="award" size={16} />
          <span className="visually-hidden">{t.education.hoursLabel}: </span>
          {fill(t.education.hours, { hours: entry.hours })}
        </p>
      )}
      {copy.topics.length > 0 && (
        <ul role="list" className={styles.topics} aria-label={t.education.topicsLabel}>
          {copy.topics.map((topic) => (
            <li key={topic}>{topic}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

export function Education() {
  const { t } = useI18n();
  const groups = ['academic', 'complementary'] as const;

  return (
    <section id="education" className={styles.education} aria-labelledby="education-title">
      <div className="container">
        <SectionHeader id="education-title" kicker={t.education.kicker} title={t.education.title} />
        <div className={styles.columns}>
          {groups.map((group) => (
            <div key={group} className={styles.column}>
              <h3 className={styles.groupTitle}>
                <Icon name="graduation" size={20} />
                {t.education.groups[group]}
              </h3>
              <div className={styles.list}>
                {education
                  .filter((entry) => entry.group === group)
                  .map((entry) => (
                    <Entry key={entry.id} entry={entry} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
