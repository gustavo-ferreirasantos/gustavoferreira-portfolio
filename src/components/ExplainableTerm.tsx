import type { ReactNode } from 'react';
import { triggerExplanation } from '../utils/explanationStore';
import { useI18n } from '../i18n/useI18n';
import styles from './ExplainableTerm.module.css';

interface ExplainableTermProps {
  term: string;
  projectId?: string;
  projectName?: string;
  children?: ReactNode;
}

export function ExplainableTerm({ term, projectId, projectName, children }: ExplainableTermProps) {
  const { locale } = useI18n();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    triggerExplanation(term, locale, projectId, projectName);
  };

  const titleText = projectName
    ? locale === 'en-US'
      ? `Click to see how ${term} was used in ${projectName}`
      : `Clique para ver como ${term} foi usado no projeto ${projectName}`
    : locale === 'en-US'
      ? `Click to see how ${term} was used`
      : `Clique para ver como ${term} foi usado`;

  return (
    <button
      type="button"
      className={styles.term}
      onClick={handleClick}
      title={titleText}
      aria-label={titleText}
    >
      {children || term}
      <span className={styles.sparkle} aria-hidden="true">✦</span>
    </button>
  );
}
