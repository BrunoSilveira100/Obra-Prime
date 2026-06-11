# Obra Prime Web

Plataforma web para gestão de obras, ordens de serviço, registros fotográficos e indicadores operacionais da construção civil. 🚧📊🏗️

O projeto segue desenvolvimento orientado por especificacao. A documentacao do produto, arquitetura, backlog, casos de uso, modelo de dados e roadmap ficam em `.specs/features/obra-prime-web`.

## Status

Interface web funcional com dados mockados e persistencia em `localStorage`.

Backend, Prisma, PostgreSQL, JWT real e armazenamento em S3 estao previstos na arquitetura, mas ainda nao foram integrados nesta versao inicial.

## Stack

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Hook Form
- Zod
- TanStack Query
- Axios
- Lucide React

Stack planejada para backend:

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT com refresh token
- Upload local preparado para futura integracao com AWS S3

## Funcionalidades implementadas

- Login com validacao Zod e autenticacao simulada.
- Layout autenticado com sidebar, header, menu mobile, logout e dark mode.
- Dashboard com indicadores, graficos simples e ultimas OS.
- Gestao de obras com criar, editar, excluir, alterar status, busca e filtro.
- Gestao de ordens de servico com criar, editar, finalizar, excluir e filtros.
- Detalhe de OS com dados completos, historico, observacoes, upload e galeria.
- Registro fotografico com upload multiplo, preview, ampliar, download e exclusao.
- Relatorios com filtros, previa visual e exportacao PDF simulada.
- Gestao de usuarios com perfis Administrador, Engenheiro e Tecnico de Campo.
- Historico / auditoria com eventos das principais acoes.
- Toasts, empty states, confirmacao antes de excluir e feedbacks de acao.

## Como rodar localmente

Instale as dependencias:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000/login
```

## Credenciais de teste

```text
Email: admin@obraprime.com
Senha: 1234
```

Outros usuarios mockados existem em `src/mocks/seed.ts`.

## Scripts

```bash
npm run dev
npm run build
npm run typecheck
```

## Estrutura principal

```text
src/
  app/
  components/
    layout/
    shared/
    ui/
  hooks/
  mocks/
  modules/
    auth/
    dashboard/
    fotos/
    historico/
    obras/
    ordens-servico/
    relatorios/
    usuarios/
  schemas/
  services/
  types/
  utils/
```

## Documentacao Spec-Driven

```text
.specs/
  project/
  features/
    obra-prime-web/
      PRD.md
      architecture.md
      backlog.md
      data-model.md
      design.md
      implementation-roadmap.md
      sprints.md
      spec.md
      tasks.md
      use-cases.md
      wireframes.md
```

## Observacoes

- Os dados sao armazenados no navegador via `localStorage`.
- Upload de imagens usa `URL.createObjectURL`, adequado para preview local em ambiente mockado.
- A exportacao PDF esta simulada por toast ate a implementacao do backend.
- O projeto ainda nao possui backend Express/Prisma implementado.
