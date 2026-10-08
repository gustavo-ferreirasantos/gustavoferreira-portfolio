import { SiteFooter } from './components/SiteFooter';
import { SiteHeader } from './components/SiteHeader';
import { ScrollWalker } from './components/ScrollWalker';
import { AiAssistantChat } from './components/AiAssistantChat';
import { useI18n } from './i18n/useI18n';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Education } from './sections/Education';
import { Hero } from './sections/Hero';
import { Projects } from './sections/projects/Projects';
import { Skills } from './sections/Skills';

export function App() {
  const { t } = useI18n();

  return (
    <>
      <ScrollWalker />
      <a className="skip-link" href="#main">
        {t.skipLink}
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <SiteFooter />
      <AiAssistantChat />
    </>
  );
}
