import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import { useI18n } from '../i18n/useI18n';
import styles from './TerminalCard.module.css';

interface TerminalLog {
  level: 'INFO' | 'OK';
  text: string;
}

const backendCommand = './mvnw spring-boot:run';
const devopsCommand = 'docker compose up -d';

const TYPING_INTERVAL_MS = 45;

function TerminalView({
  path,
  command,
  logs,
  delay = 0,
  ariaLabel,
}: {
  path: string;
  command: string;
  logs: TerminalLog[];
  delay?: number;
  ariaLabel?: string;
}) {
  const reducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(delay === 0);

  useEffect(() => {
    if (reducedMotion) {
      setStarted(true);
      setCount(command.length);
      return;
    }

    let timer: number | undefined;
    const startTimeout = window.setTimeout(() => {
      setStarted(true);
      timer = window.setInterval(() => {
        setCount((current) => {
          if (current >= command.length) {
            window.clearInterval(timer);
            return current;
          }
          return current + 1;
        });
      }, TYPING_INTERVAL_MS);
    }, delay);

    return () => {
      window.clearTimeout(startTimeout);
      if (timer) window.clearInterval(timer);
    };
  }, [command, delay, reducedMotion]);

  const typed = reducedMotion ? command : command.slice(0, count);
  const finished = typed.length === command.length;

  return (
    <figure className={styles.terminal} role="img" aria-label={ariaLabel || path}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.title}>{path}</span>
      </div>
      <div className={styles.body} aria-hidden="true">
        <p className={styles.command}>
          <span className={styles.prompt}>$</span> {started ? typed : ''}
          <span className={styles.caret} data-idle={finished} />
        </p>
        {finished && (
          <ul role="list" className={styles.logs}>
            {logs.map((line, index) => (
              <li key={line.text} style={{ animationDelay: `${index * 160}ms` }}>
                <span className={styles.level} data-level={line.level}>
                  {line.level}
                </span>
                {line.text}
              </li>
            ))}
          </ul>
        )}
      </div>
    </figure>
  );
}

export function TerminalCard({ label }: { label: string }) {
  const { locale } = useI18n();
  const isEn = locale === 'en-US';

  const backendLogs: TerminalLog[] = isEn
    ? [
        { level: 'INFO', text: 'Spring Data JPA connected to MySQL' },
        { level: 'INFO', text: 'Tomcat started on port 8080' },
        { level: 'OK', text: 'GET /api/pacientes → 200' },
        { level: 'OK', text: 'GET /api/consultas → 200' },
      ]
    : [
        { level: 'INFO', text: 'Spring Data JPA conectado ao MySQL' },
        { level: 'INFO', text: 'Tomcat iniciado na porta 8080' },
        { level: 'OK', text: 'GET /api/pacientes → 200' },
        { level: 'OK', text: 'GET /api/consultas → 200' },
      ];

  const devopsLogs: TerminalLog[] = isEn
    ? [
        { level: 'INFO', text: 'Creating docker network curriculum_net' },
        { level: 'INFO', text: 'Container mysql:8.0 healthy (:3306)' },
        { level: 'OK', text: 'Container backend-api active (:8080)' },
        { level: 'OK', text: 'CI/CD GitHub Actions: Deploy successful' },
      ]
    : [
        { level: 'INFO', text: 'Criando rede docker curriculum_net' },
        { level: 'INFO', text: 'Container mysql:8.0 saudável (:3306)' },
        { level: 'OK', text: 'Container backend-api ativo (:8080)' },
        { level: 'OK', text: 'CI/CD GitHub Actions: Deploy concluído' },
      ];

  return (
    <div className={styles.terminalStack}>
      <TerminalView
        path="~/backend"
        command={backendCommand}
        logs={backendLogs}
        delay={0}
        ariaLabel={label}
      />
      <TerminalView
        path="~/devops"
        command={devopsCommand}
        logs={devopsLogs}
        delay={500}
        ariaLabel={
          isEn
            ? 'Simulated DevOps terminal with Docker and CI/CD'
            : 'Terminal simulado de DevOps com Docker e CI/CD'
        }
      />
    </div>
  );
}
