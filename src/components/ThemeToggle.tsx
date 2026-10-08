import { useI18n } from '../i18n/useI18n';
import { useTheme } from '../theme/useTheme';
import { Icon } from './Icon';
import styles from './ThemeToggle.module.css';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={styles.toggle}
      aria-label={isDark ? t.header.theme.toLight : t.header.theme.toDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
