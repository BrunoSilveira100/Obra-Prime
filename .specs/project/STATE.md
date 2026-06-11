# Estado do Projeto

## Decisoes

- 2026-06-10: O projeto sera tratado como uma nova plataforma Web chamada Obra Prime Web.
- 2026-06-10: O fluxo de desenvolvimento seguira metodologia orientada por especificacao: Specify, Design, Tasks, Execute.
- 2026-06-10: Nenhum codigo deve ser gerado antes da especificacao inicial.
- 2026-06-10: Stack obrigatoria definida.
  - Frontend: Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI, React Hook Form, Zod, TanStack Query e Axios.
  - Backend: Node.js, Express, TypeScript e Prisma ORM.
  - Banco de dados: PostgreSQL.
  - Autenticacao: JWT com refresh token.
  - Armazenamento de imagens: upload local inicialmente, com estrutura preparada para AWS S3.
- 2026-06-10: Perfis de usuario do MVP definidos: Administrador, Engenheiro e Tecnico de Campo.
- 2026-06-10: Funcionalidades detalhadas do MVP definidas para autenticacao, dashboard, obras, ordens de servico, registro fotografico e relatorios.
- 2026-06-10: Requisitos nao funcionais definidos: responsivo, mobile first, dark mode, acessibilidade, performance, componentizacao, Clean Architecture, SOLID, Repository Pattern, Service Layer, DTO Pattern, validacao com Zod e tratamento global de erros.
- 2026-06-10: Entregaveis documentais criados: PRD, casos de uso, modelagem de dados, diagrama ER, arquitetura, API REST, estrutura frontend/backend, wireframes textuais, backlog, plano de sprints e roadmap de implementacao.
- 2026-06-10: Codigo inicial do projeto esta bloqueado ate aprovacao explicita do usuario.

## Bloqueios

- Geracao de codigo inicial bloqueada ate aprovacao explicita do usuario, conforme processo definido.

## Perguntas em aberto

- Existe base de dados atual do app React Native a ser migrada?
- A recuperacao de senha deve enviar email real no MVP ou apenas preparar fluxo/token?
- A exclusao de obras, OS e fotos deve ser fisica ou logica?
- A localizacao das fotos sera capturada automaticamente no futuro ou preenchida manualmente?

## Preferencias

- Idioma principal da documentacao do projeto: Portugues do Brasil.

## Ideias diferidas

- Integrao com assinatura digital.
- Modo offline para equipes de campo.
- Aplicativo mobile complementar.
- Controle financeiro, compras, estoque ou medições.
