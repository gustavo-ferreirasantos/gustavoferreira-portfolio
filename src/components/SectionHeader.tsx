import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  id: string;
  kicker: string;
  title: string;
  intro?: string;
}

export function SectionHeader({ id, kicker, title, intro }: SectionHeaderProps) {
  return (
    <header className={styles.header}>
      <p className={styles.kicker}>
        <span aria-hidden="true">{'// '}</span>
        {kicker}
      </p>
      <h2 id={id} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
    </header>
  );
}
