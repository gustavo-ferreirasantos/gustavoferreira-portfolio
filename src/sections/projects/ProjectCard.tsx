import type { CSSProperties } from 'react';
import type { Project } from '../../data/projects';
import { useReveal } from '../../hooks/useReveal';
import { formatYearMonth } from '../../i18n/format';
import { useI18n } from '../../i18n/useI18n';
import { Icon } from '../../components/Icon';
import { ExplainableTerm } from '../../components/ExplainableTerm';
import styles from './ProjectCard.module.css';

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const { locale, t } = useI18n();
  const copy = t.projects.entries[project.id];
  const reveal = useReveal<HTMLElement>();
  const headingId = `project-${project.id}`;

  return (
    <article
      ref={reveal}
      className={`reveal ${styles.card}`}
      style={{ '--reveal-delay': `${index * 90}ms` } as CSSProperties}
      aria-labelledby={headingId}
    >
      <p className={styles.meta}>
        <span>{copy.role}</span>
        {project.start && project.end && (
          <span className={styles.period}>
            <time dateTime={project.start}>{formatYearMonth(project.start, locale)}</time>
            <span aria-hidden="true"> → </span>
            <span className="visually-hidden"> {t.common.until} </span>
            <time dateTime={project.end}>{formatYearMonth(project.end, locale)}</time>
          </span>
        )}
      </p>
      <h3 id={headingId} className={styles.title}>
        {copy.title}
      </h3>
      <p className={styles.summary}>{copy.summary}</p>

      <ul className={styles.highlights} aria-label={t.projects.highlightsLabel}>
        {copy.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>

      <div className={styles.stackSection}>
        <span className={styles.stackTitle}>{t.projects.stackLabel}:</span>
        <ul role="list" className={styles.stack} aria-label={t.projects.stackLabel}>
          {project.stack.map((tech) => (
            <li key={tech}>
              <ExplainableTerm term={tech} projectId={project.id} projectName={copy.title}>
                {tech}
              </ExplainableTerm>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.links}>
        {project.links.map((link) => (
          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
            <Icon name={link.kind === 'repository' ? 'github' : 'external'} size={18} />
            {t.projects.links[link.kind]}
            <span className="visually-hidden"> {t.common.newTab}</span>
          </a>
        ))}
      </div>
    </article>
  );
}
