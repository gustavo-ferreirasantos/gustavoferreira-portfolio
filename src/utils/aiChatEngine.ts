import { contacts, profile } from '../data/contacts';
import { generalExplanations } from './explanationStore';

export type AiEmotion = 'headset' | 'listening' | 'talking' | 'thumbsup' | 'confused';

export interface ChatAction {
  label: string;
  url?: string;
  actionType?: 'copy_email' | 'download_cv' | 'open_link' | 'quick_reply';
  payload?: string;
}

export interface AiResponse {
  reply: string;
  emotion: AiEmotion;
  actions?: ChatAction[];
}

export function getInitialGreeting(locale: 'pt-BR' | 'en-US'): AiResponse {
  if (locale === 'en-US') {
    return {
      reply: `👋 Hello! I am **Gustavo's AI Assistant**.\n\nI can answer anything about his **projects**, **backend stack (Java & Spring Boot)**, **academic background at UNIVASF**, and **contact information**. How can I help you today?`,
      emotion: 'thumbsup',
      actions: [
        { label: '🚀 Main Projects', actionType: 'quick_reply', payload: 'What are your main projects?' },
        { label: '💻 Tech Stack', actionType: 'quick_reply', payload: 'What technologies do you master?' },
        { label: '🎓 Education', actionType: 'quick_reply', payload: 'Tell me about your education' },
        { label: '📬 Contact Info', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
      ],
    };
  }

  return {
    reply: `👋 Olá! Eu sou o **Assistente Virtual do Gustavo**.\n\nEstou aqui para tirar qualquer dúvida sobre seus **projetos**, **stack backend (Java & Spring Boot)**, **formação na UNIVASF** e **formas de contato**. Sobre o que você gostaria de conversar?`,
    emotion: 'thumbsup',
    actions: [
      { label: '🚀 Principais Projetos', actionType: 'quick_reply', payload: 'Quais são seus principais projetos?' },
      { label: '💻 Tecnologias & Stack', actionType: 'quick_reply', payload: 'Quais tecnologias você domina?' },
      { label: '🎓 Formação Acadêmica', actionType: 'quick_reply', payload: 'Qual sua formação?' },
      { label: '📬 Como Contatar', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
    ],
  };
}

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

export function processAiMessage(query: string, locale: 'pt-BR' | 'en-US' = 'pt-BR'): AiResponse {
  const norm = normalize(query);
  const isEn = locale === 'en-US';

  // 1. GREETINGS / APRESENTAÇÃO
  if (
    norm.match(/^(oi|ola|hey|hello|hi|e ai|bom dia|boa tarde|boa noite|fala ai|salve)/) ||
    norm.includes('quem e voce') ||
    norm.includes('who are you') ||
    norm.includes('apresente') ||
    norm.includes('se apresente')
  ) {
    if (isEn) {
      return {
        reply: `Hello! I am Gustavo Ferreira's AI avatar. Gustavo is a **Java & Spring Boot Backend Developer** currently studying Computer Engineering at UNIVASF (Juazeiro, BA). He builds robust REST APIs, works with relational databases, and is open to internship and junior backend developer opportunities!`,
        emotion: 'talking',
        actions: [
          { label: 'View Projects', actionType: 'quick_reply', payload: 'What are your main projects?' },
          { label: 'Download Resume', actionType: 'download_cv' },
          { label: 'Get in Touch', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
        ],
      };
    }
    return {
      reply: `Olá! Eu sou o assistente virtual do **Gustavo Ferreira**. O Gustavo é um **desenvolvedor focado em Backend com Java e Spring Boot**, graduando em Engenharia da Computação pela UNIVASF. Ele cria APIs REST estruturadas, gerencia bancos de dados relacionais e busca oportunidades de estágio e vagas júnior!`,
      emotion: 'talking',
      actions: [
        { label: 'Ver Projetos', actionType: 'quick_reply', payload: 'Quais são seus principais projetos?' },
        { label: 'Baixar Currículo PDF', actionType: 'download_cv' },
        { label: 'Falar com Gustavo', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
      ],
    };
  }

  // 2. EXPLANATION STORE MATCH (e.g. "O que é Spring Boot?", "React", "Docker", "PostgreSQL", "MySQL")
  for (const [techKey, descObj] of Object.entries(generalExplanations)) {
    const normTech = normalize(techKey);
    if (norm.includes(normTech)) {
      const expText = isEn ? descObj.en : descObj.pt;
      return {
        reply: isEn
          ? `💡 **${techKey}** in Gustavo's stack:\n\n${expText}`
          : `💡 **${techKey}** no contexto do Gustavo:\n\n${expText}`,
        emotion: 'talking',
        actions: [
          { label: isEn ? 'Other Skills' : 'Outras Habilidades', actionType: 'quick_reply', payload: isEn ? 'What technologies do you know?' : 'Quais tecnologias você domina?' },
          { label: isEn ? 'View Projects' : 'Ver Projetos', actionType: 'quick_reply', payload: isEn ? 'What are your main projects?' : 'Quais são seus principais projetos?' },
        ],
      };
    }
  }

  // 3. PROJECTS (PlayFísica, Feiraê, Geral)
  if (
    norm.includes('playfisica') ||
    norm.includes('play fisica') ||
    norm.includes('fisica') ||
    norm.includes('p5')
  ) {
    if (isEn) {
      return {
        reply: `🎮 **PlayFísica** is an interactive educational platform connecting Physics learning with 2D digital game programming via **p5.js**.\n\nGustavo developed the complete web platform using **React**, **Java**, and **PostgreSQL**, delivering structured lesson materials and video integration that directly impacted 10 participating students!`,
        emotion: 'thumbsup',
        actions: [
          { label: 'Visit playfisica.vercel.app', actionType: 'open_link', url: 'https://playfisica.vercel.app/' },
          { label: 'Feiraê Project', actionType: 'quick_reply', payload: 'Tell me about the Feiraê project' },
        ],
      };
    }
    return {
      reply: `🎮 **PlayFísica** é uma plataforma educacional interativa que une o ensino de Física à programação de jogos digitais em **p5.js**.\n\nO Gustavo desenvolveu o site do projeto utilizando **React**, **Java** e **PostgreSQL**, estruturando o acesso a videoaulas, exercícios e conteúdos práticos que impactaram diretamente 10 alunos no curso!`,
      emotion: 'thumbsup',
      actions: [
        { label: 'Acessar playfisica.vercel.app', actionType: 'open_link', url: 'https://playfisica.vercel.app/' },
        { label: 'Ver Feiraê', actionType: 'quick_reply', payload: 'Fale sobre o Feiraê' },
      ],
    };
  }

  if (
    norm.includes('feirae') ||
    norm.includes('feiraê') ||
    norm.includes('feira') ||
    norm.includes('barraca') ||
    norm.includes('feirante')
  ) {
    if (isEn) {
      return {
        reply: `🛍️ **Feiraê** (feirae.vercel.app) is a modern full-stack web platform built for Software Engineering III to connect local street vendors with consumers.\n\n• **Stack**: Next.js, React, TypeScript, Tailwind CSS, Prisma ORM.\n• **Features**: Full-stack architecture, vendor & consumer authentication, product catalog management, fair localization, and an interactive review/reply system.`,
        emotion: 'thumbsup',
        actions: [
          {
            label: 'Visit feirae.vercel.app',
            actionType: 'open_link',
            url: 'https://feirae.vercel.app/',
          },
          { label: 'See PlayFísica', actionType: 'quick_reply', payload: 'Tell me about PlayFísica' },
        ],
      };
    }
    return {
      reply: `🛍️ **Feiraê** (feirae.vercel.app) é uma plataforma web full stack desenvolvida na disciplina de Engenharia de Software III para conectar feirantes e produtores a consumidores locais.\n\n• **Tecnologias**: Next.js, React, TypeScript, Tailwind CSS e Prisma ORM.\n• **Recursos**: Autenticação de usuários e feirantes, catálogo dinâmico de produtos, localização de feiras e sistema interativo de avaliações com respostas.`,
      emotion: 'thumbsup',
      actions: [
        {
          label: 'Acessar feirae.vercel.app',
          actionType: 'open_link',
          url: 'https://feirae.vercel.app/',
        },
        { label: 'Ver PlayFísica', actionType: 'quick_reply', payload: 'Fale sobre o PlayFísica' },
      ],
    };
  }

  if (
    norm.includes('projeto') ||
    norm.includes('project') ||
    norm.includes('portfolio') ||
    norm.includes('trabalho') ||
    norm.includes('case')
  ) {
    if (isEn) {
      return {
        reply: `🚀 Gustavo features two prominent projects in his portfolio:\n\n1. **PlayFísica**: Educational platform built with **React**, **Java**, and **p5.js** for physics simulations and game coding.\n2. **Feiraê**: Full-stack platform built with **Next.js**, **React**, **TypeScript**, **Tailwind CSS**, and **Prisma ORM** connecting street market vendors with local buyers.\n\nWhich one would you like to explore in detail?`,
        emotion: 'talking',
        actions: [
          { label: 'PlayFísica Details', actionType: 'quick_reply', payload: 'Tell me about PlayFísica' },
          { label: 'Feiraê Details', actionType: 'quick_reply', payload: 'Tell me about Feiraê' },
        ],
      };
    }
    return {
      reply: `🚀 O Gustavo possui dois projetos de grande destaque no portfólio:\n\n1. **PlayFísica**: Plataforma educacional desenvolvida em **React**, **Java** e **p5.js** para ensino de física através de jogos.\n2. **Feiraê**: Plataforma full stack com **Next.js, React, TypeScript, Tailwind CSS e Prisma ORM** para conexão de feirantes e clientes locais.\n\nQual deles você gostaria de conhecer a fundo?`,
      emotion: 'talking',
      actions: [
        { label: 'Detalhes PlayFísica', actionType: 'quick_reply', payload: 'Fale sobre o PlayFísica' },
        { label: 'Detalhes Feiraê', actionType: 'quick_reply', payload: 'Fale sobre o Feiraê' },
      ],
    };
  }

  // 4. TECH STACK & SKILLS (Java, Spring, Backend, Frontend, Docker, etc.)
  if (
    norm.includes('tecnologia') ||
    norm.includes('tecnologias') ||
    norm.includes('tech') ||
    norm.includes('stack') ||
    norm.includes('habilidade') ||
    norm.includes('skill') ||
    norm.includes('linguagem') ||
    norm.includes('backend') ||
    norm.includes('front') ||
    norm.includes('banco de dados')
  ) {
    if (isEn) {
      return {
        reply: `💻 **Gustavo's Tech Stack & Capabilities**:\n\n• **Backend**: Java, Spring Boot, Spring Data JPA, RESTful APIs, OOP, business rule modeling\n• **Frontend & Web**: React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS, JavaScript\n• **DevOps & Tools**: Docker, CI/CD (GitHub Actions), Git, GitHub, Linux, Postman, Insomnia\n• **Databases**: PostgreSQL, MySQL, Prisma ORM\n• **Embedded & AI**: Python, C, Embedded Systems, Edge AI`,
        emotion: 'thumbsup',
        actions: [
          { label: 'See Projects', actionType: 'quick_reply', payload: 'What are your main projects?' },
          { label: 'Academic Background', actionType: 'quick_reply', payload: 'Tell me about your education' },
        ],
      };
    }
    return {
      reply: `💻 **Stack Tecnológica do Gustavo**:\n\n• **Backend**: Java, Spring Boot, Spring Data JPA, APIs RESTful, POO, modelagem de regras de negócio\n• **Front-end & Web**: React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS, JavaScript\n• **DevOps & Ferramentas**: Docker, CI/CD (GitHub Actions), Git, GitHub, Linux, Postman, Insomnia\n• **Banco de Dados**: PostgreSQL, MySQL, Prisma ORM\n• **Embarcados & IA**: Python, C, Sistemas Embarcados, IA na Borda`,
      emotion: 'thumbsup',
      actions: [
        { label: 'Ver Projetos', actionType: 'quick_reply', payload: 'Quais são seus principais projetos?' },
        { label: 'Ver Formação', actionType: 'quick_reply', payload: 'Qual sua formação?' },
      ],
    };
  }

  // 5. EDUCATION & COURSES (UNIVASF, CEPEDI, PNAAT, Graduação, Faculdade)
  if (
    norm.includes('formacao') ||
    norm.includes('faculdade') ||
    norm.includes('universidade') ||
    norm.includes('univasf') ||
    norm.includes('curso') ||
    norm.includes('estudo') ||
    norm.includes('cepedi') ||
    norm.includes('pnaat') ||
    norm.includes('graduacao') ||
    norm.includes('education')
  ) {
    if (isEn) {
      return {
        reply: `🎓 **Academic Background & Specializations**:\n\n1. **UNIVASF (Federal University of Vale do São Francisco)**: Bachelor's in Computer Engineering (2023 – 2028, ongoing).\n   *Key subjects: OOP, Software Engineering I & II, Databases I & II, Operating Systems, Computer Networks.*\n2. **CEPEDI**: Technological Residency in Embedded Systems (160h, 2025) — Python, C, and Embedded OS.\n3. **PNAAT**: Accelerated Tech Learning in Embedded Systems & Edge AI (74h, 2025).`,
        emotion: 'talking',
        actions: [
          { label: 'Tech Stack', actionType: 'quick_reply', payload: 'What technologies do you know?' },
          { label: 'Contact Gustavo', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
        ],
      };
    }
    return {
      reply: `🎓 **Formação Acadêmica e Capacitações do Gustavo**:\n\n1. **UNIVASF (Universidade Federal do Vale do São Francisco)**: Bacharelado em Engenharia da Computação (2023 – 2028, em andamento).\n   *Disciplinas-chave: POO, Engenharia de Software I e II, Banco de Dados I e II, Sistemas Operacionais, Redes.*\n2. **CEPEDI**: Residência Tecnológica em Sistemas Embarcados (160h, 2025) — Python, C e SO Embarcados.\n3. **PNAAT**: Capacitação em Sistemas Embarcados e Inteligência Artificial na Borda (74h, 2025).`,
      emotion: 'talking',
      actions: [
        { label: 'Ver Habilidades', actionType: 'quick_reply', payload: 'Quais tecnologias você domina?' },
        { label: 'Entrar em Contato', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
      ],
    };
  }

  // 6. CONTACT & HIRING (Email, Telefone, WhatsApp, LinkedIn, GitHub, Vaga, Contratar)
  if (
    norm.includes('contato') ||
    norm.includes('contact') ||
    norm.includes('email') ||
    norm.includes('telefone') ||
    norm.includes('whatsapp') ||
    norm.includes('linkedin') ||
    norm.includes('github') ||
    norm.includes('falar') ||
    norm.includes('mensagem') ||
    norm.includes('contratar') ||
    norm.includes('hire') ||
    norm.includes('vaga') ||
    norm.includes('estagio') ||
    norm.includes('junior') ||
    norm.includes('oportunidade')
  ) {
    if (isEn) {
      return {
        reply: `📬 **Let's Connect! Gustavo is open for internship & junior backend roles**:\n\n• **Email**: \`${contacts.email}\`\n• **Phone / WhatsApp**: \`${contacts.phone.display}\`\n• **Location**: ${profile.location}\n• **LinkedIn**: [linkedin.com/in/gustavoferreira-santos](${contacts.linkedin.href})\n• **GitHub**: [github.com/gustavo-ferreirasantos](${contacts.github.href})\n\nFeel free to send a message or download his complete resume!`,
        emotion: 'thumbsup',
        actions: [
          { label: 'Copy Email', actionType: 'copy_email' },
          { label: 'Download Resume (PDF)', actionType: 'download_cv' },
          { label: 'Open LinkedIn', actionType: 'open_link', url: contacts.linkedin.href },
          { label: 'Open GitHub', actionType: 'open_link', url: contacts.github.href },
        ],
      };
    }
    return {
      reply: `📬 **Canais de Contato do Gustavo** (disponível para estágio e vagas júnior):\n\n• **E-mail**: \`${contacts.email}\`\n• **Telefone / WhatsApp**: \`${contacts.phone.display}\`\n• **Localização**: ${profile.location}\n• **LinkedIn**: [linkedin.com/in/gustavoferreira-santos](${contacts.linkedin.href})\n• **GitHub**: [github.com/gustavo-ferreirasantos](${contacts.github.href})\n\nVocê pode copiar o e-mail ou baixar o currículo em PDF nos botões abaixo!`,
      emotion: 'thumbsup',
      actions: [
        { label: 'Copiar E-mail', actionType: 'copy_email' },
        { label: 'Baixar Currículo PDF', actionType: 'download_cv' },
        { label: 'Abrir LinkedIn', actionType: 'open_link', url: contacts.linkedin.href },
        { label: 'Abrir GitHub', actionType: 'open_link', url: contacts.github.href },
      ],
    };
  }

  // 7. RESUME / CV DOWNLOAD
  if (
    norm.includes('curriculo') ||
    norm.includes('resume') ||
    norm.includes('cv') ||
    norm.includes('pdf') ||
    norm.includes('download')
  ) {
    if (isEn) {
      return {
        reply: `📄 You can download Gustavo's official PDF resume right here with full details on his experience, education, and technical stack!`,
        emotion: 'thumbsup',
        actions: [
          { label: '📥 Download Resume (PDF)', actionType: 'download_cv' },
          { label: 'Contact Gustavo', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
        ],
      };
    }
    return {
      reply: `📄 Você pode baixar o currículo oficial em PDF do Gustavo diretamente no botão abaixo, com todos os detalhes de projetos, formação e stack técnica!`,
      emotion: 'thumbsup',
      actions: [
        { label: '📥 Baixar Currículo (PDF)', actionType: 'download_cv' },
        { label: 'Ver Contatos', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
      ],
    };
  }

  // 8. WHY HIRE GUSTAVO / DIFFERENTIALS
  if (
    norm.includes('por que contratar') ||
    norm.includes('diferencial') ||
    norm.includes('vantagem') ||
    norm.includes('qualidades') ||
    norm.includes('why hire')
  ) {
    if (isEn) {
      return {
        reply: `⭐ **Why Hire Gustavo Ferreira?**\n\n1. **Solid Fundamentals**: Computer Engineering background with strong understanding of OOP, Data Structures, Software Engineering, and Clean Code.\n2. **Practical Backend Execution**: Builds real systems using industry-standard tools (Spring Boot, JPA, PostgreSQL/MySQL, Docker, REST APIs).\n3. **Quick Learner & Autonomous**: Self-driven curiosity, easily adapts to modern front-end (Next.js/React) and embedded environments.\n4. **Collaborative & Dedicated**: Team player passionate about problem-solving and delivering high-value code.`,
        emotion: 'thumbsup',
        actions: [
          { label: 'See Feiraê Project', actionType: 'quick_reply', payload: 'Tell me about the Feiraê project' },
          { label: 'Contact Gustavo', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
        ],
      };
    }
    return {
      reply: `⭐ **Por que contratar o Gustavo Ferreira?**\n\n1. **Base Sólida em Engenharia**: Graduando em Eng. da Computação com domínio prático de POO, arquitetura em camadas, banco de dados e boas práticas.\n2. **Experiência Prática em Backend**: Desenvolve sistemas reais em Java e Spring Boot com segurança, ORM (JPA), bancos relacionais e integração de APIs.\n3. **Autonomia e Aprendizado Rápido**: Proativo, adaptável a novos ecossistemas (como Next.js/React e embarcados) e focado em resolver problemas de negócio.\n4. **Perfil Colaborativo**: Facilidade de comunicação e busca constante por evolução técnica em equipe.`,
      emotion: 'thumbsup',
      actions: [
        { label: 'Ver Projeto Feiraê', actionType: 'quick_reply', payload: 'Fale sobre o Feiraê' },
        { label: 'Entrar em Contato', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
      ],
    };
  }

  // 9. FUN / EASTER EGGS
  if (
    norm.includes('cafe') ||
    norm.includes('coffee') ||
    norm.includes('piada') ||
    norm.includes('joke') ||
    norm.includes('robo') ||
    norm.includes('ia') ||
    norm.includes('inteligencia artificial')
  ) {
    if (norm.includes('piada') || norm.includes('joke')) {
      return {
        reply: isEn
          ? `😄 Why do Java developers wear glasses?\n\nBecause they don't C#! ☕`
          : `😄 Por que o desenvolvedor Java usa óculos?\n\nPorque ele não vê Sharp (C#)! ☕`,
        emotion: 'thumbsup',
      };
    }
    return {
      reply: isEn
        ? `🤖 Yes! I am the interactive AI assistant on Gustavo's portfolio, powered by curiosity and lots of coffee ☕! Feel free to ask me anything about Gustavo's career.`
        : `🤖 Sim! Sou o assistente de IA interativo do portfólio do Gustavo, movido a curiosidade e muito café ☕! Pode perguntar qualquer coisa sobre a trajetória dele.`,
      emotion: 'talking',
    };
  }

  // 10. FALLBACK / UNRECOGNIZED QUERY (Triggers confused avatar)
  if (isEn) {
    return {
      reply: `🤔 I didn't quite catch that. I am specialized in everything regarding **Gustavo Ferreira's background**!\n\nYou can ask me about his **backend projects (PlayFísica, Feiraê)**, **Java & Spring stack**, **UNIVASF degree**, or **how to hire him**.`,
      emotion: 'confused',
      actions: [
        { label: '🚀 Main Projects', actionType: 'quick_reply', payload: 'What are your main projects?' },
        { label: '💻 Tech Stack', actionType: 'quick_reply', payload: 'What technologies do you know?' },
        { label: '🎓 Education', actionType: 'quick_reply', payload: 'Tell me about your education' },
        { label: '📬 Contact Info', actionType: 'quick_reply', payload: 'How can I contact Gustavo?' },
      ],
    };
  }

  return {
    reply: `🤔 Hmmm, não tenho certeza sobre isso. Minha especialidade é responder sobre a **trajetória do Gustavo Ferreira**!\n\nVocê pode me perguntar sobre seus **projetos (PlayFísica, Feiraê)**, **stack Java & Spring**, **faculdade na UNIVASF** ou **como entrar em contato**.`,
    emotion: 'confused',
    actions: [
      { label: '🚀 Principais Projetos', actionType: 'quick_reply', payload: 'Quais são seus principais projetos?' },
      { label: '💻 Tecnologias & Stack', actionType: 'quick_reply', payload: 'Quais tecnologias você domina?' },
      { label: '🎓 Formação Acadêmica', actionType: 'quick_reply', payload: 'Qual sua formação?' },
      { label: '📬 Como Contatar', actionType: 'quick_reply', payload: 'Como entrar em contato?' },
    ],
  };
}
