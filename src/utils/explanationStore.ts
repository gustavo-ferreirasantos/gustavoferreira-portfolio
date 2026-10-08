export type ExplanationListener = (term: string, explanation: string, projectName?: string) => void;
const listeners = new Set<ExplanationListener>();

export const projectExplanations: Record<string, Record<string, { pt: string; en: string }>> = {
  playfisica: {
    React: {
      pt: 'No projeto **PlayFísica**, utilizei **React** no front-end para criar uma interface interativa, modular e rápida para visualização de videoaulas, simulações e materiais didáticos.',
      en: 'In the **PlayFísica** project, I used **React** on the front-end to build an interactive, modular, and fast interface for video lessons and educational materials.',
    },
    Java: {
      pt: 'No projeto **PlayFísica**, utilizei **Java** no backend para modelagem, lógica e gerenciamento dos conteúdos e dados educacionais.',
      en: 'In the **PlayFísica** project, I used **Java** for backend structuring and business logic to manage and serve course contents and data.',
    },
    'p5.js': {
      pt: 'No projeto **PlayFísica**, a biblioteca **p5.js** foi utilizada no curso para ensinar programação visual e física aplicada através do desenvolvimento de jogos interativos.',
      en: 'In the **PlayFísica** project, the **p5.js** library was used to teach visual programming and applied physics through interactive game development.',
    },
    PostgreSQL: {
      pt: 'No projeto **PlayFísica**, utilizei o **PostgreSQL** para modelagem relacional e persistência estruturada dos dados da plataforma.',
      en: 'In the **PlayFísica** project, I used **PostgreSQL** for relational modeling and structured platform data persistence.',
    },
  },
  feirae: {
    'Next.js': {
      pt: 'No projeto **Feiraê**, o **Next.js** foi utilizado como framework full stack para rotas otimizadas, SSR/SSG e estrutura unificada da aplicação.',
      en: 'In the **Feiraê** project, **Next.js** was used as the full stack framework for optimized routing, SSR/SSG, and unified app structure.',
    },
    React: {
      pt: 'No projeto **Feiraê**, o **React** compõe toda a interface de usuário com componentes modulares, modais interativos e catálogo dinâmico.',
      en: 'In the **Feiraê** project, **React** powers the user interface with modular components, interactive modals, and dynamic catalogs.',
    },
    TypeScript: {
      pt: 'No projeto **Feiraê**, o **TypeScript** garantiu tipagem estática e segurança de código ponta a ponta entre interface e serviços.',
      en: 'In the **Feiraê** project, **TypeScript** provided end-to-end static typing and type safety across UI and services.',
    },
    'Tailwind CSS': {
      pt: 'No projeto **Feiraê**, o **Tailwind CSS** proporcionou estilização ágil, moderna e totalmente responsiva para feirantes e consumidores.',
      en: 'In the **Feiraê** project, **Tailwind CSS** enabled rapid, modern, and responsive styling for vendors and shoppers.',
    },
    'Prisma ORM': {
      pt: 'No projeto **Feiraê**, o **Prisma ORM** estruturou os modelos de banco de dados, migrações e consultas type-safe de forma robusta.',
      en: 'In the **Feiraê** project, **Prisma ORM** handled database modeling, migrations, and type-safe query execution robustly.',
    },
  },
};

export const generalExplanations: Record<string, { pt: string; en: string }> = {
  React: {
    pt: 'React: Biblioteca front-end baseada em componentes para criar interfaces interativas, modulares e de alto desempenho.',
    en: 'React: Component-based front-end library for building interactive, modular, and high-performance user interfaces.',
  },
  'Next.js': {
    pt: 'Next.js: Framework React para produção com suporte a renderização híbrida (SSR/SSG), rotas e APIs integradas.',
    en: 'Next.js: React production framework featuring hybrid rendering (SSR/SSG), routing, and built-in API handlers.',
  },
  TypeScript: {
    pt: 'TypeScript: Superset tipado do JavaScript que traz segurança de tipos, produtividade e manutenibilidade para o código.',
    en: 'TypeScript: Typed JavaScript superset providing type safety, productivity, and scalable maintainability.',
  },
  'Tailwind CSS': {
    pt: 'Tailwind CSS: Framework CSS utility-first para criação rápida de interfaces modernas e responsivas.',
    en: 'Tailwind CSS: Utility-first CSS framework for rapidly building responsive and modern user interfaces.',
  },
  'Prisma ORM': {
    pt: 'Prisma ORM: ORM de última geração para Node.js e TypeScript com tipagem estática e migrações declarativas.',
    en: 'Prisma ORM: Next-generation ORM for Node.js and TypeScript offering static typing and declarative migrations.',
  },
  Java: {
    pt: 'Java: Linguagem robusta e orientada a objetos amplamente utilizada em arquitetura backend, escalabilidade e microsserviços.',
    en: 'Java: Robust, object-oriented language widely used for enterprise backend architecture, scalability, and microservices.',
  },
  'Spring Boot': {
    pt: 'Spring Boot: Framework Java líder para desenvolvimento de APIs REST seguras, injeção de dependências e microsserviços.',
    en: 'Spring Boot: Leading Java framework for developing secure REST APIs, dependency injection, and microservices.',
  },
  'Spring Data JPA': {
    pt: 'Spring Data JPA: Framework que simplifica a camada de acesso a dados e mapeamento objeto-relacional (ORM).',
    en: 'Spring Data JPA: Framework that simplifies data access and object-relational mapping (ORM) in Spring applications.',
  },
  PostgreSQL: {
    pt: 'PostgreSQL: Sistema de banco de dados relacional e objeto-relacional de alto desempenho, robustez e integridade.',
    en: 'PostgreSQL: High-performance, robust, and standards-compliant open-source object-relational database.',
  },
  MySQL: {
    pt: 'MySQL: Sistema de gerenciamento de banco de dados relacional (SGBD) amplamente utilizado para persistência confiável.',
    en: 'MySQL: Widely used relational database management system (RDBMS) for reliable structured data persistence.',
  },
  Docker: {
    pt: 'Docker: Plataforma de virtualização leve para empacotar e executar aplicações em contêineres padronizados.',
    en: 'Docker: Lightweight virtualization platform for containerizing and deploying software predictably.',
  },
  'CI/CD (GitHub Actions)': {
    pt: 'GitHub Actions: Plataforma de automação para testes contínuos, validação de código e pipelines de deploy automatizado.',
    en: 'GitHub Actions: Automation platform for continuous integration, testing workflows, and automated deployment pipelines.',
  },
};

export function triggerExplanation(
  term: string,
  locale: 'pt-BR' | 'en-US' = 'pt-BR',
  projectId?: string,
  projectName?: string
) {
  const isEn = locale === 'en-US';

  // 1. Try project-specific explanation first
  if (projectId && projectExplanations[projectId]?.[term]) {
    const item = projectExplanations[projectId][term];
    const text = isEn ? item.en : item.pt;
    listeners.forEach((listener) => listener(term, text, projectName));
    return;
  }

  // 2. Try general explanation
  if (generalExplanations[term]) {
    const item = generalExplanations[term];
    const baseText = isEn ? item.en : item.pt;
    const projectPrefix = projectName
      ? isEn
        ? `In the **${projectName}** project:\n\n`
        : `No projeto **${projectName}**:\n\n`
      : '';
    listeners.forEach((listener) => listener(term, `${projectPrefix}${baseText}`, projectName));
    return;
  }

  // 3. Fallback
  const fallback = projectName
    ? isEn
      ? `In the **${projectName}** project, **${term}** is used as part of the technical stack.`
      : `No projeto **${projectName}**, a tecnologia **${term}** é utilizada como parte da stack técnica.`
    : isEn
      ? `**${term}**: Technology used in project development.`
      : `**${term}**: Tecnologia utilizada no desenvolvimento do projeto.`;

  listeners.forEach((listener) => listener(term, fallback, projectName));
}

export function onExplanation(listener: ExplanationListener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
