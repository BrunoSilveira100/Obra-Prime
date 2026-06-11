# Arquitetura da Solucao - Obra Prime Web

## Visao arquitetural

A solucao sera uma aplicacao web full stack separada em frontend Next.js e backend Express, com PostgreSQL via Prisma ORM. O frontend consome uma API REST autenticada com JWT e refresh token. O backend aplica Clean Architecture de forma pragmatica, separando controllers, services, repositories, DTOs, middlewares e infraestrutura.

## Organizacao recomendada do repositorio

```text
apps/
  web/
  api/
```

## Frontend

### Estrutura profissional sugerida

```text
apps/web/
  src/
    app/
      (auth)/
        login/
        forgot-password/
        reset-password/
      (dashboard)/
        dashboard/
        works/
        service-orders/
        photos/
        reports/
        users/
        activities/
      layout.tsx
      page.tsx
      providers.tsx
    components/
      ui/
      layout/
      feedback/
      data-table/
      forms/
      charts/
    modules/
      auth/
        components/
        hooks/
        schemas/
        services/
        types/
      dashboard/
      works/
      service-orders/
      photos/
      reports/
      users/
      activities/
    services/
      api.ts
      http-client.ts
      query-client.ts
    hooks/
      use-auth.ts
      use-permissions.ts
      use-mobile.ts
    lib/
      auth.ts
      permissions.ts
      constants.ts
      formatters.ts
    types/
      api.ts
      common.ts
    schemas/
      auth.schema.ts
      work.schema.ts
      service-order.schema.ts
      photo.schema.ts
      report.schema.ts
      user.schema.ts
    utils/
      cn.ts
      date.ts
      errors.ts
```

### Padroes frontend

- `app/`: rotas, layouts e providers do Next.js.
- `components/ui/`: componentes Shadcn/UI.
- `components/layout/`: shell autenticado, sidebar, header e navegacao.
- `modules/`: features organizadas por dominio.
- `services/`: cliente Axios, TanStack Query e servicos HTTP.
- `schemas/`: schemas Zod compartilhados entre formularios.
- `hooks/`: hooks reutilizaveis.
- `lib/`: regras auxiliares de autenticacao, permissoes e constantes.

## Backend

### Estrutura profissional sugerida

```text
apps/api/
  src/
    modules/
      auth/
        auth.controller.ts
        auth.service.ts
        auth.repository.ts
        auth.routes.ts
        auth.dto.ts
        auth.schema.ts
      users/
      works/
      service-orders/
      photos/
      activities/
      reports/
      metrics/
    controllers/
      health.controller.ts
    services/
      storage/
        storage.service.ts
        local-storage.service.ts
        s3-storage.service.ts
      pdf/
        pdf.service.ts
    repositories/
      base.repository.ts
    middlewares/
      auth.middleware.ts
      permission.middleware.ts
      error.middleware.ts
      validation.middleware.ts
      upload.middleware.ts
    routes/
      index.ts
    prisma/
      client.ts
      schema.prisma
      seed.ts
    types/
      express.d.ts
      auth.ts
      common.ts
    utils/
      env.ts
      errors.ts
      crypto.ts
      pagination.ts
      logger.ts
    app.ts
    server.ts
```

### Padroes backend

- `modules/`: modulo completo por dominio quando houver regra propria.
- `controllers/`: adaptadores HTTP.
- `services/`: regras de aplicacao e orquestracao.
- `repositories/`: acesso ao Prisma.
- `middlewares/`: autenticacao, permissao, validacao, upload e erros.
- `routes/`: composicao das rotas.
- `prisma/`: client, schema e seed.
- `types/`: tipos globais e extensoes do Express.
- `utils/`: utilitarios tecnicos.

## API REST inicial

### Auth

- `POST /auth/login`
- `POST /auth/refresh`
- `POST /auth/logout`
- `POST /auth/forgot-password`
- `POST /auth/reset-password`
- `GET /auth/me`

### Users

- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PATCH /users/:id`
- `PATCH /users/:id/status`

### Works

- `GET /works`
- `POST /works`
- `GET /works/:id`
- `PATCH /works/:id`
- `DELETE /works/:id`

### Service Orders

- `GET /service-orders`
- `POST /service-orders`
- `GET /service-orders/:id`
- `PATCH /service-orders/:id`
- `PATCH /service-orders/:id/status`
- `POST /service-orders/:id/close`
- `POST /service-orders/:id/notes`
- `GET /service-orders/:id/notes`

### Photos

- `GET /photos`
- `POST /photos`
- `GET /photos/:id`
- `GET /photos/:id/download`
- `DELETE /photos/:id`

### Activities

- `GET /activities`
- `GET /activities/entity/:entity/:entityId`

### Reports

- `GET /reports/operational.pdf`

### Metrics

- `GET /metrics/dashboard`
- `GET /metrics/works-by-status`
- `GET /metrics/service-orders-by-period`
- `GET /metrics/team-productivity`

## Fluxo de autenticacao

1. Login gera access token e refresh token.
2. Access token autentica chamadas protegidas.
3. Refresh token renova sessao.
4. Logout revoga refresh token.
5. Middleware de permissao valida se o perfil pode executar a acao.

## Estrategia de imagens

1. Upload entra pelo middleware.
2. Service de fotos valida contexto e permissao.
3. Storage service salva localmente no MVP.
4. Repositorio persiste metadados.
5. Interface de storage permite troca futura para S3.

## Observabilidade minima

- Logs de erro no backend.
- Retorno padronizado de erros.
- Historico de atividades para acoes de negocio.

## Segurança minima

- Hash de senha.
- Hash de refresh tokens.
- Validacao de payloads.
- Controle de permissao por rota.
- Limite de tamanho e tipo de arquivo no upload.
