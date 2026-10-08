import type { EducationId } from './types';

export interface EducationEntry {
  id: EducationId;
  group: 'academic' | 'complementary';
  institution: string;
  start?: number;
  end?: number;
  /** Carga horária em horas, quando aplicável. */
  hours?: number;
  /** Curso em andamento: a conclusão informada é uma previsão. */
  ongoing?: boolean;
}

export const education: EducationEntry[] = [
  { id: 'univasf', group: 'academic', institution: 'UNIVASF', start: 2023, end: 2028, ongoing: true },
  { id: 'cepedi', group: 'complementary', institution: 'CEPEDI', start: 2025, end: 2025, hours: 160 },
  { id: 'pnaat', group: 'complementary', institution: 'PNAAT', start: 2025, end: 2025, hours: 74 },
];
