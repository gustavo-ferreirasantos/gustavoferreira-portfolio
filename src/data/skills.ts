import type { SkillGroupId } from './types';

export interface SkillItem {
  name: string;
  learning?: boolean;
}

export interface SkillGroup {
  id: SkillGroupId;
  items: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend',
    items: [
      { name: 'Java' },
      { name: 'Spring Boot' },
      { name: 'Spring Data JPA' },
      { name: 'APIs RESTful' },
      { name: 'POO' },
      { name: 'PostgreSQL' },
      { name: 'MySQL' },
      { name: 'Prisma ORM' },
    ],
  },
  {
    id: 'frontend',
    items: [
      { name: 'HTML' },
      { name: 'CSS' },
      { name: 'JavaScript' },
      { name: 'React' },
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' },
    ],
  },
  {
    id: 'tools',
    items: [
      { name: 'Docker' },
      { name: 'CI/CD (GitHub Actions)' },
      { name: 'Git' },
      { name: 'GitHub' },
      { name: 'Linux' },
      { name: 'Postman' },
      { name: 'Insomnia' },
      { name: 'VS Code' },
    ],
  },
  {
    id: 'embedded',
    items: [{ name: 'Python' }, { name: 'C' }, { name: 'Sistemas embarcados' }, { name: 'IA na borda' }],
  },
];
