export const ptBR = {
  meta: {
    title: 'Gustavo Ferreira Santos — Desenvolvedor Backend',
    description:
      'Portfólio de Gustavo Ferreira Santos, desenvolvedor backend com Java, Spring Boot, PostgreSQL, Docker e ecossistema web moderno. Projetos, habilidades, formação e contato.',
  },
  skipLink: 'Pular para o conteúdo',
  common: {
    newTab: '(abre em nova aba)',
    until: 'até',
    present: 'atual',
  },
  header: {
    home: 'Gustavo Ferreira — início',
    navLabel: 'Principal',
    nav: {
      about: 'Sobre',
      projects: 'Projetos',
      skills: 'Habilidades',
      education: 'Formação',
      contact: 'Contato',
    },
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    language: {
      label: 'Idioma',
      pt: 'Português',
      en: 'English',
    },
    theme: {
      toLight: 'Mudar para o tema claro',
      toDark: 'Mudar para o tema escuro',
    },
  },
  hero: {
    kicker: 'Portfólio',
    greeting: 'Olá, eu sou',
    role: 'Desenvolvedor Backend',
    summary:
      'Construo APIs REST e sistemas web com Java, Spring Boot e Docker. Estudo Engenharia da Computação e busco evoluir em arquitetura, integrações e práticas DevOps.',
    ctaProjects: 'Ver projetos',
    ctaContact: 'Entrar em contato',
    terminalLabel: 'Terminal simulado executando uma aplicação Spring Boot',
    status: 'Disponível para oportunidades',
  },
  about: {
    kicker: 'Sobre',
    title: 'Backend por foco, curioso por natureza.',
    paragraphs: [
      'Desenvolvedor Back-End & DevOps em formação e graduando em Engenharia da Computação, com experiência prática no desenvolvimento de APIs RESTful utilizando Java e Spring Boot, modelagem de dados com PostgreSQL/MySQL e conteinerização com Docker.',
      'Tenho prática no ciclo completo de aplicações web e interesse contínuo na automação de processos, pipelines de CI/CD e infraestrutura em nuvem.',
      'Busco oportunidade de estágio para atuar na criação, sustentação e implantação de soluções de software corporativas.',
    ],
    factsLabel: 'Resumo rápido',
    facts: {
      location: { label: 'Cidade', value: 'Juazeiro, BA' },
      degree: { label: 'Graduação', value: 'Engenharia da Computação, UNIVASF' },
      focus: { label: 'Foco', value: 'Java · Spring Boot · PostgreSQL · Docker' },
    },
  },
  projects: {
    kicker: 'Projetos',
    title: 'Sistemas que saíram do papel.',
    intro: 'Projetos práticos que unem desenvolvimento de software, dados e arquitetura web para solucionar problemas reais.',
    stackLabel: 'Tecnologias',
    highlightsLabel: 'Destaques',
    links: {
      site: 'Visitar o site',
      repository: 'Ver no GitHub',
    },
    entries: {
      playfisica: {
        title: 'PlayFísica',
        role: 'Desenvolvimento do site do projeto',
        summary:
          'Projeto que integra o ensino de Física com a programação de jogos digitais, utilizando a plataforma P5.js.',
        highlights: [
          'Desenvolvi o site do projeto, disponibilizando vídeos, exercícios e materiais das aulas.',
          'Contribuí diretamente para o aprendizado de 10 alunos participantes do curso.',
        ],
      },
      feirae: {
        title: 'Feiraê',
        role: 'Aplicação Web Full Stack',
        summary:
          'Plataforma web desenvolvida na disciplina de Engenharia de Software III para conectar feirantes a consumidores locais, facilitando a divulgação de barracas, feiras e produtos.',
        highlights: [
          'Projetei e desenvolvi a aplicação full stack com autenticação, catálogo de produtos e sistema de avaliações com respostas para feirantes.',
          'Implementei funcionalidades de localização de feiras, gestão de catálogo de produtos e sistema interativo de feedback/avaliações.',
        ],
      },
    },
  },
  skills: {
    kicker: 'Habilidades',
    title: 'Ferramentas do dia a dia.',
    intro: 'O que uso para projetar, construir e testar aplicações, do banco de dados à interface.',
    learning: 'aprendendo',
    groups: {
      backend: {
        title: 'Backend',
        description: 'Java, Spring Boot, Spring Data JPA, APIs RESTful, POO e modelagem de regras de negócio.',
      },
      frontend: {
        title: 'Front-end & Web',
        description: 'React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS e JavaScript.',
      },
      tools: {
        title: 'DevOps & Ferramentas',
        description: 'Docker, CI/CD (GitHub Actions), Git/GitHub, Linux, Postman e Insomnia.',
      },
      embedded: {
        title: 'Embarcados e IA',
        description: 'Sistemas embarcados, IA na borda, Python e C.',
      },
    },
  },
  education: {
    kicker: 'Formação',
    title: 'Estudo constante.',
    groups: {
      academic: 'Formação acadêmica',
      complementary: 'Cursos e aprimoramentos',
    },
    ongoing: 'em andamento',
    hours: '{hours} horas',
    hoursLabel: 'Carga horária',
    topicsLabel: 'Disciplinas e tópicos',
    entries: {
      univasf: {
        title: 'Engenharia da Computação — Bacharelado',
        place: 'UNIVASF — Universidade Federal do Vale do São Francisco',
        topics: [
          'Programação Orientada a Objetos',
          'Engenharia de Software I e II',
          'Banco de Dados I e II',
          'Sistemas Operacionais',
          'Redes de Computadores',
        ],
      },
      cepedi: {
        title: 'Capacitação da Residência Tecnológica em Sistemas Embarcados',
        place: 'CEPEDI — Centro de Pesquisa, Desenvolvimento Tecnológico e Inovação · Online',
        topics: ['Python', 'C', 'Sistemas operacionais embarcados'],
      },
      pnaat: {
        title: 'Capacitação em Sistemas Embarcados e Inteligência Artificial na Borda',
        place: 'PNAAT — Programa Nacional de Aprendizado Acelerado em Tecnologia · Online',
        topics: [] as string[],
      },
    },
  },
  contact: {
    kicker: 'Contato',
    title: 'Vamos conversar?',
    lead: 'Estou aberto a oportunidades de estágio e vagas júnior em desenvolvimento backend. Me escreva por e-mail ou pelas redes abaixo.',
    channelsLabel: 'Canais de contato',
    email: 'E-mail',
    phone: 'Telefone',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    copy: 'Copiar e-mail',
    copied: 'E-mail copiado',
    copyError: 'Não foi possível copiar. Selecione e copie manualmente.',
    resume: 'Baixar currículo (PDF)',
  },
  footer: {
    rights: '© {year} Gustavo Ferreira Santos. Todos os direitos reservados.',
    backToTop: 'Voltar ao topo',
  },
  errors: {
    title: 'Algo deu errado',
    message: 'Não foi possível carregar o portfólio. Recarregue a página ou tente novamente em instantes.',
    reload: 'Recarregar página',
  },
};
