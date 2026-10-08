# Portfólio — Gustavo Ferreira Santos

## Stack

React 19 · TypeScript (strict) · Vite · CSS Modules · tokens de design em CSS · i18n e tema próprios.

## Como rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # tsc -b + vite build
npm run lint
```

## Estrutura

```
src/
  components/   header, footer, ícones, ErrorBoundary, toggles
  data/         conteúdo tipado (projetos, habilidades, formação, contatos)
  hooks/        useReveal, useActiveSection, usePrefersReducedMotion
  i18n/         provider, contexto, mensagens pt-BR e en-US (en-US é tipado por pt-BR)
  sections/     Hero, About, Projects, Skills, Education, Contact
  styles/       tokens.css e base.css
  theme/        provider e contexto do tema claro/escuro
```

## Atualizar conteúdo

- Textos: `src/i18n/locales/`. O inglês é tipado por `Messages`; faltar uma chave quebra o build.
- Dados estruturais (links, stack, datas): `src/data/`.
- Currículo para download: `public/cv/Gustavo_Ferreira_Santos.pdf`.
