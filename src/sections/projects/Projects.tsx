import { SectionHeader } from '../../components/SectionHeader';
import { projects } from '../../data/projects';
import { useI18n } from '../../i18n/useI18n';
import { ProjectCard } from './ProjectCard';
import styles from './Projects.module.css';

export function Projects() {
  const { t } = useI18n();

  return (
    <section id="projects" className={styles.projects} aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader id="projects-title" kicker={t.projects.kicker} title={t.projects.title} intro={t.projects.intro} />
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
