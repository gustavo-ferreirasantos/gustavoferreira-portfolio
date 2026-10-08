import type { ProjectId, YearMonth } from './types';

export interface Project {
  id: ProjectId;
  start?: YearMonth;
  end?: YearMonth;
  stack: string[];
  links: { kind: 'site' | 'repository'; href: string; display: string }[];
}

export const projects: Project[] = [
  {
    id: 'playfisica',
    stack: ['React', 'Java', 'p5.js', 'PostgreSQL'],
    links: [{ kind: 'site', href: 'https://playfisica.vercel.app/', display: 'playfisica.vercel.app' }],
  },
  {
    id: 'feirae',
    stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Prisma ORM'],
    links: [
      {
        kind: 'site',
        href: 'https://feirae.vercel.app/',
        display: 'feirae.vercel.app',
      },
    ],
  },
];
