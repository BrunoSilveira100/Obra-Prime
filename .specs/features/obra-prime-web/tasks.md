# Tasks - Implementacao das Interfaces

## T1 - Base frontend Next.js

Status: Complete

What:

- Criar base Next.js 15 com React 19, TypeScript e Tailwind CSS.
- Configurar estrutura `src/` conforme arquitetura aprovada.
- Configurar providers globais, estilos e rotas principais.

Done when:

- `npm run build` compila.
- `npm run dev` inicia a aplicacao.

## T2 - Autenticacao e layout

Status: Complete

What:

- Implementar login com React Hook Form e Zod.
- Simular autenticacao com localStorage.
- Redirecionar para dashboard.
- Implementar sidebar, header, menu, logout, responsividade e dark mode.

Done when:

- Login funciona.
- Logout limpa sessao.
- Menu navega sem links quebrados.

## T3 - Dashboard

Status: Complete

What:

- Implementar cards de indicadores.
- Implementar graficos simples.
- Implementar ultimas OS.
- Implementar atalhos para modulos.

Done when:

- Dashboard reflete dados dos mocks/localStorage.
- Botoes navegam para modulos corretos.

## T4 - Obras

Status: Complete

What:

- Implementar listagem, busca, filtro por status, criar, editar, excluir e alterar status.

Done when:

- Operacoes alteram os dados visiveis na tela.
- Exclusao pede confirmacao.

## T5 - Ordens de Servico

Status: Complete

What:

- Implementar listagem, filtros, criar, editar, finalizar, excluir e detalhe da OS.

Done when:

- OS pode ser criada, alterada, finalizada, removida e aberta em detalhe.

## T6 - Detalhe de OS e fotos

Status: Complete

What:

- Implementar detalhe completo, historico, observacoes, upload, galeria e relatorio simulado.

Done when:

- Observacoes e fotos aparecem na OS.
- Upload mostra preview.
- Relatorio aciona feedback.

## T7 - Modulos auxiliares

Status: Complete

What:

- Implementar fotos, relatorios, usuarios e historico/auditoria.

Done when:

- Todos os botoes executam acao.
- Empty/loading states existem.

## T8 - Validacao final

Status: Complete

What:

- Rodar build.
- Corrigir TypeScript.
- Iniciar dev server.
- Validar rotas no navegador.

Done when:

- Sem erro de build.
- Rotas principais abrem.
