# Backlog - Obra Prime Web

## Epico 1 - Fundacao

- BK-001: Criar monorepo com `apps/web` e `apps/api`.
- BK-002: Configurar TypeScript no frontend e backend.
- BK-003: Configurar Tailwind CSS e Shadcn/UI no frontend.
- BK-004: Configurar Express, middlewares base e health check.
- BK-005: Configurar Prisma e PostgreSQL.
- BK-006: Configurar variaveis de ambiente.

## Epico 2 - Autenticacao e Usuarios

- BK-010: Implementar modelo User, RefreshToken e PasswordResetToken.
- BK-011: Implementar login com JWT e refresh token.
- BK-012: Implementar logout com revogacao de refresh token.
- BK-013: Implementar `GET /auth/me`.
- BK-014: Implementar recuperacao de senha conforme decisao do MVP.
- BK-015: Implementar CRUD de usuarios para Administrador.
- BK-016: Implementar middleware de autenticacao.
- BK-017: Implementar middleware de permissao.
- BK-018: Criar telas de login, recuperacao de senha e usuarios.

## Epico 3 - Obras

- BK-020: Implementar modelo Work.
- BK-021: Implementar API CRUD de obras.
- BK-022: Implementar validacoes Zod de obra.
- BK-023: Implementar tela de lista de obras.
- BK-024: Implementar formulario de obra.
- BK-025: Implementar detalhe de obra com OS, fotos e historico.

## Epico 4 - Ordens de Servico

- BK-030: Implementar modelo ServiceOrder.
- BK-031: Implementar modelo ServiceOrderNote.
- BK-032: Implementar API CRUD de OS.
- BK-033: Implementar atualizacao de status.
- BK-034: Implementar encerramento de OS.
- BK-035: Implementar observacoes de OS.
- BK-036: Implementar telas de lista, formulario e detalhe de OS.

## Epico 5 - Registro Fotografico

- BK-040: Implementar storage service com adaptador local.
- BK-041: Preparar contrato para adaptador S3.
- BK-042: Implementar upload multiplo.
- BK-043: Implementar persistencia de metadados.
- BK-044: Implementar galeria.
- BK-045: Implementar download.
- BK-046: Implementar exclusao conforme estrategia aprovada.

## Epico 6 - Historico

- BK-050: Implementar modelo Activity.
- BK-051: Implementar service para registrar atividades.
- BK-052: Registrar atividades em usuarios, obras, OS, fotos e relatorios.
- BK-053: Implementar consulta de historico.
- BK-054: Implementar tela de historico.

## Epico 7 - Dashboard e Indicadores

- BK-060: Implementar endpoint de indicadores consolidados.
- BK-061: Implementar grafico de obras por status.
- BK-062: Implementar grafico de OS por periodo.
- BK-063: Implementar grafico de produtividade da equipe.
- BK-064: Implementar tela de dashboard.

## Epico 8 - Relatorios

- BK-070: Implementar geracao de PDF.
- BK-071: Implementar filtros de relatorio.
- BK-072: Incluir dados de obra e OS no PDF.
- BK-073: Incluir fotos no PDF.
- BK-074: Incluir historico no PDF.
- BK-075: Implementar tela de relatorios.

## Epico 9 - Qualidade

- BK-080: Implementar tratamento global de erros no backend.
- BK-081: Implementar feedbacks globais no frontend.
- BK-082: Implementar estados de carregamento, vazio e erro.
- BK-083: Revisar responsividade mobile first.
- BK-084: Revisar acessibilidade basica.
- BK-085: Verificar build TypeScript frontend e backend.
