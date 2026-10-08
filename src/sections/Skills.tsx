import { Icon, type IconName } from '../components/Icon';
import { SectionHeader } from '../components/SectionHeader';
import { skillGroups } from '../data/skills';
import type { SkillGroupId } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { useI18n } from '../i18n/useI18n';
import styles from './Skills.module.css';

const groupIcons: Record<SkillGroupId, IconName> = {
  backend: 'server',
  frontend: 'layout',
  tools: 'wrench',
  embedded: 'cpu',
};

export function Skills() {
  const { t } = useI18n();
  const reveal = useReveal<HTMLDivElement>();

  return (
    <section id="skills" className={styles.skills} aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader id="skills-title" kicker={t.skills.kicker} title={t.skills.title} intro={t.skills.intro} />
        <div ref={reveal} className={`reveal ${styles.grid}`}>
          {skillGroups.map((group) => {
            const copy = t.skills.groups[group.id];
            const headingId = `skills-${group.id}`;
            return (
              <article key={group.id} className={styles.group} aria-labelledby={headingId}>
                <span className={styles.icon}>
                  <Icon name={groupIcons[group.id]} size={22} />
                </span>
                <h3 id={headingId} className={styles.title}>
                  {copy.title}
                </h3>
                <p className={styles.description}>{copy.description}</p>
                <ul role="list" className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item.name} data-learning={item.learning ?? false}>
                      {item.name}
                      {item.learning && <span className={styles.badge}>{t.skills.learning}</span>}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
