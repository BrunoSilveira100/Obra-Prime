# PRD - Obra Prime Web

## 1. Visao geral

O Obra Prime Web e uma plataforma web para gestao operacional de obras da construcao civil. A solucao substitui processos manuais, planilhas e registros fisicos por um ambiente centralizado para obras, ordens de servico, fotos, historico, relatorios e indicadores.

## 2. Problema

Empresas de construcao frequentemente acompanham obras com informacoes fragmentadas entre planilhas, mensagens, documentos fisicos e registros fotograficos sem padronizacao. Isso dificulta rastreabilidade, acompanhamento em tempo real, emissao de relatorios e tomada de decisao gerencial.

## 3. Objetivos do produto

- Centralizar a gestao de obras e ordens de servico.
- Permitir acompanhamento gerencial por dashboard e indicadores.
- Registrar evidencias fotograficas vinculadas a obras e OS.
- Controlar usuarios, perfis e permissoes.
- Manter historico auditavel de atividades.
- Gerar relatorios PDF com dados operacionais e fotos anexadas.
- Criar base tecnica evolutiva para futura integracao com AWS S3 e outros servicos.

## 4. Publico-alvo

- Administradores da empresa.
- Engenheiros responsaveis por acompanhamento e gestao operacional.
- Tecnicos de campo responsaveis por atualizacoes, fotos e registros.

## 5. Perfis e permissoes

### Administrador

Pode gerenciar usuarios, obras e ordens de servico, visualizar dashboards e emitir relatorios.

### Engenheiro

Pode criar OS, editar OS, adicionar fotos e acompanhar obras.

### Tecnico de Campo

Pode registrar atividades, adicionar fotos e atualizar status das OS.

## 6. Escopo funcional do MVP

- Autenticacao com email e senha.
- Recuperacao de senha.
- JWT e refresh token.
- Controle de sessao.
- Dashboard gerencial.
- CRUD de obras.
- Gestao de ordens de servico.
- Registro fotografico com upload multiplo.
- Galeria, download e exclusao de fotos.
- Historico de alteracoes.
- Relatorios PDF com filtros.
- Controle de usuarios e perfis.

## 7. Indicadores do dashboard

- Obras ativas.
- Obras concluidas.
- OS abertas.
- OS em andamento.
- OS concluidas.
- Total de fotos registradas.

## 8. Graficos

- Obras por status.
- OS por periodo.
- Produtividade da equipe.

## 9. Relatorios

O sistema deve gerar PDF contendo:

- Dados da obra.
- Dados da OS.
- Fotos anexadas.
- Historico de alteracoes.

Filtros:

- Data.
- Obra.
- Responsavel.
- Status.

## 10. Requisitos nao funcionais

- Responsivo.
- Mobile first.
- Dark mode.
- Acessibilidade.
- Performance.
- Componentizacao.
- Clean Architecture.
- SOLID.
- Repository Pattern.
- Service Layer.
- DTO Pattern.
- Validacao com Zod.
- Tratamento global de erros.

## 11. Stack obrigatoria

### Frontend

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- Shadcn/UI
- React Hook Form
- Zod
- TanStack Query
- Axios

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM

### Banco de dados

- PostgreSQL

### Autenticacao

- JWT
- Refresh token

### Imagens

- Upload local inicialmente.
- Estrutura preparada para AWS S3.

## 12. Criterios de sucesso

- Usuario autenticado acessa dashboard conforme permissao.
- Administrador gerencia usuarios, obras e OS.
- Engenheiro cria e edita OS.
- Tecnico atualiza status, registra atividades e adiciona fotos.
- Fotos sao armazenadas localmente e vinculadas a obra ou OS.
- Relatorios PDF sao gerados com filtros.
- Dashboard apresenta indicadores e graficos definidos.
- Backend aplica autorizacao, validacao e tratamento global de erros.

## 13. Fora do escopo inicial

- App mobile novo.
- Modo offline.
- AWS S3 em producao desde o primeiro momento.
- Assinatura digital.
- Modulos financeiro, compras, estoque e medicoes.
- Migracao automatica sem confirmacao de base existente.

## 14. Pendencias para aprovacao final

- Prioridades padrao de OS.
- Estrategia de recuperacao de senha no MVP.
- Exclusao fisica ou logica.
- Localizacao de fotos: automatica futura ou manual.
- Existencia de dados legados do app React Native.
