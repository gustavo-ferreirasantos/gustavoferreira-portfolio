import type { Messages } from '../types';

export const enUS: Messages = {
  meta: {
    title: 'Gustavo Ferreira Santos — Backend Developer',
    description:
      'Portfolio of Gustavo Ferreira Santos, backend developer with Java, Spring Boot, PostgreSQL, Docker, and modern web ecosystem. Projects, skills, education, and contact.',
  },
  skipLink: 'Skip to content',
  common: {
    newTab: '(opens in a new tab)',
    until: 'to',
    present: 'present',
  },
  header: {
    home: 'Gustavo Ferreira — home',
    navLabel: 'Main',
    nav: {
      about: 'About',
      projects: 'Projects',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    language: {
      label: 'Language',
      pt: 'Português',
      en: 'English',
    },
    theme: {
      toLight: 'Switch to light theme',
      toDark: 'Switch to dark theme',
    },
  },
  hero: {
    kicker: 'Portfolio',
    greeting: "Hi, I'm",
    role: 'Backend Developer',
    summary:
      'I build REST APIs and web systems with Java, Spring Boot, and Docker. I study Computer Engineering and focus on architecture, integrations, and DevOps practices.',
    ctaProjects: 'View projects',
    ctaContact: 'Get in touch',
    terminalLabel: 'Simulated terminal running a Spring Boot application',
    status: 'Open to opportunities',
  },
  about: {
    kicker: 'About',
    title: 'Backend-focused, curious by nature.',
    paragraphs: [
      'Backend & DevOps Developer in training and Computer Engineering undergraduate with hands-on experience in RESTful API development using Java and Spring Boot, data modeling with PostgreSQL/MySQL, and containerization with Docker.',
      'Experienced in the complete web application lifecycle with continuous interest in process automation, CI/CD pipelines, and cloud infrastructure.',
      'Seeking internship opportunities to contribute to the creation, maintenance, and deployment of corporate software solutions.',
    ],
    factsLabel: 'Quick facts',
    facts: {
      location: { label: 'City', value: 'Juazeiro, BA, Brazil' },
      degree: { label: 'Degree', value: 'Computer Engineering, UNIVASF' },
      focus: { label: 'Focus', value: 'Java · Spring Boot · PostgreSQL · Docker' },
    },
  },
  projects: {
    kicker: 'Projects',
    title: 'Systems that left the drawing board.',
    intro: 'Hands-on projects bringing together software development, data, and web architecture to solve real-world problems.',
    stackLabel: 'Technologies',
    highlightsLabel: 'Highlights',
    links: {
      site: 'Visit the site',
      repository: 'View on GitHub',
    },
    entries: {
      playfisica: {
        title: 'PlayFísica',
        role: 'Project website development',
        summary:
          'A project that integrates Physics teaching with digital game programming using the p5.js platform.',
        highlights: [
          'Developed the project website, providing videos, exercises, and class materials.',
          'Directly contributed to the learning of 10 students participating in the course.',
        ],
      },
      feirae: {
        title: 'Feiraê',
        role: 'Full Stack Web Application',
        summary:
          'Web platform developed in the Software Engineering III course to connect street market vendors with local consumers, facilitating the promotion of stalls, fairs, and products.',
        highlights: [
          'Designed and developed the full stack application with authentication, product catalog, and review system with vendor replies.',
          'Implemented fair localization features, product catalog management, and an interactive feedback/review system.',
        ],
      },
    },
  },
  skills: {
    kicker: 'Skills',
    title: 'Everyday tools.',
    intro: 'What I use to design, build and test applications, from the database to the interface.',
    learning: 'learning',
    groups: {
      backend: {
        title: 'Backend',
        description: 'Java, Spring Boot, Spring Data JPA, RESTful APIs, OOP, and business rule modeling.',
      },
      frontend: {
        title: 'Front-end & Web',
        description: 'React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS, and JavaScript.',
      },
      tools: {
        title: 'DevOps & Tools',
        description: 'Docker, CI/CD (GitHub Actions), Git/GitHub, Linux, Postman, and Insomnia.',
      },
      embedded: {
        title: 'Embedded and AI',
        description: 'Embedded systems, Edge AI, Python, and C.',
      },
    },
  },
  education: {
    kicker: 'Education',
    title: 'Always learning.',
    groups: {
      academic: 'Academic education',
      complementary: 'Courses and training',
    },
    ongoing: 'in progress',
    hours: '{hours} hours',
    hoursLabel: 'Workload',
    topicsLabel: 'Courses and topics',
    entries: {
      univasf: {
        title: 'Computer Engineering — Bachelor’s degree',
        place: 'UNIVASF — Federal University of the São Francisco Valley',
        topics: [
          'Object-Oriented Programming',
          'Software Engineering I and II',
          'Databases I and II',
          'Operating Systems',
          'Computer Networks',
        ],
      },
      cepedi: {
        title: 'Technology Residency Training in Embedded Systems',
        place: 'CEPEDI — Research, Technological Development and Innovation Center · Online',
        topics: ['Python', 'C', 'Embedded operating systems'],
      },
      pnaat: {
        title: 'Training in Embedded Systems and Edge Artificial Intelligence',
        place: 'PNAAT — National Accelerated Technology Learning Program · Online',
        topics: [],
      },
    },
  },
  contact: {
    kicker: 'Contact',
    title: "Let's talk?",
    lead: 'I am open to internships and junior backend development roles. Write to me by email or through the channels below.',
    channelsLabel: 'Contact channels',
    email: 'Email',
    phone: 'Phone',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    copy: 'Copy email',
    copied: 'Email copied',
    copyError: 'Could not copy. Please select and copy it manually.',
    resume: 'Download resume (PDF)',
  },
  footer: {
    rights: '© {year} Gustavo Ferreira Santos. All rights reserved.',
    backToTop: 'Back to top',
  },
  errors: {
    title: 'Something went wrong',
    message: 'The portfolio could not be loaded. Reload the page or try again in a moment.',
    reload: 'Reload page',
  },
};
