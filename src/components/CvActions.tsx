import { resume } from '../data/contacts';
import { useI18n } from '../i18n/useI18n';
import { Icon } from './Icon';
import styles from './CvActions.module.css';

export function CvActions() {
  const { t } = useI18n();

  return (
    <a className={styles.download} href={resume.href} download={resume.fileName}>
      <Icon name="download" size={18} />
      {t.contact.resume}
    </a>
  );
}
