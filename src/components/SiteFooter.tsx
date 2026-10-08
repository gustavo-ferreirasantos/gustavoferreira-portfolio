import { fill } from '../i18n/format';
import { useI18n } from '../i18n/useI18n';
import { Icon } from './Icon';
import styles from './SiteFooter.module.css';

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.bar}`}>
        <p>{fill(t.footer.rights, { year: new Date().getFullYear() })}</p>
        <a href="#top" className={styles.top}>
          {t.footer.backToTop}
          <Icon name="arrowDown" size={14} className={styles.up} />
        </a>
      </div>
    </footer>
  );
}
