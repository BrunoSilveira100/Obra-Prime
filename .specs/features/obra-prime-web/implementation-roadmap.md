# Roadmap de Implementacao - Obra Prime Web

## Fase 1 - Aprovacao documental

Status: em andamento.

Entregaveis:

- PRD completo.
- Requisitos funcionais.
- Requisitos nao funcionais.
- Casos de uso.
- Modelo de dados.
- Diagrama ER.
- Arquitetura da solucao.
- Wireframes textuais.
- Backlog.
- Plano de sprints.
- Roadmap.

Gate de saida:

- Aprovacao do usuario para gerar codigo inicial.

## Fase 2 - Codigo inicial

Status: bloqueado ate aprovacao.

Escopo:

- Criar monorepo.
- Configurar `apps/web`.
- Configurar `apps/api`.
- Configurar Prisma.
- Criar health check.
- Criar layout base.
- Criar tela de login estatica ou funcional conforme decisao.

Gate de saida:

- Projeto instala, compila e roda localmente.

## Fase 3 - Autenticacao

Escopo:

- Modelos de usuario, refresh token e reset token.
- Login.
- Refresh.
- Logout.
- Middleware de autenticacao.
- Middleware de permissao.
- Tela de login e controle de sessao.

## Fase 4 - Modulos operacionais

Escopo:

- Usuarios.
- Obras.
- Ordens de servico.
- Observacoes.
- Historico.

## Fase 5 - Evidencias

Escopo:

- Upload multiplo.
- Galeria.
- Download.
- Exclusao.
- Preparacao para S3.

## Fase 6 - Gestao

Escopo:

- Dashboard.
- Indicadores.
- Graficos.
- Relatorios PDF.

## Fase 7 - Qualidade

Escopo:

- Responsividade.
- Dark mode.
- Acessibilidade.
- Performance.
- Tratamento global de erros.
- Validacao final.
