import { Component, type ErrorInfo, type ReactNode } from 'react';
import { messages, readDocumentLocale } from '../i18n/messages';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  failed: boolean;
}

/**
 * Fica fora dos providers, então lê o idioma direto do documento
 * em vez de depender de useI18n.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Falha ao renderizar o portfólio:', error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    const { errors } = messages[readDocumentLocale()];
    return (
      <div role="alert" className={styles.fallback}>
        <h1>{errors.title}</h1>
        <p>{errors.message}</p>
        <button type="button" onClick={() => window.location.reload()}>
          {errors.reload}
        </button>
      </div>
    );
  }
}
