export const navigation = ['about', 'projects', 'skills', 'education', 'contact'] as const;

export type SectionId = (typeof navigation)[number];
