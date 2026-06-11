# Especificacao - Obra Prime Web

## Escopo

Criar uma aplicacao Web completa para gestao de obras da construcao civil, substituindo processos manuais, planilhas e registros fisicos usados no acompanhamento operacional.

Esta especificacao cobre o produto macro. Antes da implementacao, cada modulo principal deve ser refinado em especificacoes menores ou tarefas rastreaveis.

## Requisitos funcionais

### Autenticacao e Usuarios

- REQ-AUTH-001: O sistema deve permitir login de usuarios cadastrados.
- REQ-AUTH-002: O sistema deve impedir acesso as areas internas sem autenticacao.
- REQ-AUTH-003: O sistema deve permitir logout.
- REQ-AUTH-004: A tela de login deve ter campos de email e senha.
- REQ-AUTH-005: O sistema deve oferecer recurso de recuperacao de senha.
- REQ-AUTH-006: O sistema deve controlar sessao do usuario autenticado.
- REQ-USER-001: O sistema deve permitir cadastro, edicao, ativacao e inativacao de usuarios.
- REQ-USER-002: O sistema deve controlar permissoes por perfil de usuario.
- REQ-USER-003: O sistema deve registrar usuario responsavel por acoes relevantes.
- REQ-USER-004: O sistema deve oferecer perfil Administrador.
- REQ-USER-005: Usuarios Administradores devem poder gerenciar usuarios, obras e ordens de servico.
- REQ-USER-006: Usuarios Administradores devem poder visualizar dashboards e emitir relatorios.
- REQ-USER-007: O sistema deve oferecer perfil Engenheiro.
- REQ-USER-008: Usuarios Engenheiros devem poder criar OS, editar OS, adicionar fotos e acompanhar obras.
- REQ-USER-009: O sistema deve oferecer perfil Tecnico de Campo.
- REQ-USER-010: Usuarios Tecnicos de Campo devem poder registrar atividades, adicionar fotos e atualizar status das OS.

### Dashboard Gerencial

- REQ-DASH-001: O sistema deve apresentar um dashboard gerencial apos o login.
- REQ-DASH-002: O dashboard deve exibir indicadores operacionais consolidados.
- REQ-DASH-003: O dashboard deve permitir acompanhar situacao das obras.
- REQ-DASH-004: O dashboard deve destacar pendencias, atrasos ou ordens de servico criticas.
- REQ-DASH-005: O dashboard deve exibir total de obras ativas.
- REQ-DASH-006: O dashboard deve exibir total de obras concluidas.
- REQ-DASH-007: O dashboard deve exibir total de OS abertas.
- REQ-DASH-008: O dashboard deve exibir total de OS em andamento.
- REQ-DASH-009: O dashboard deve exibir total de OS concluidas.
- REQ-DASH-010: O dashboard deve exibir total de fotos registradas.
- REQ-DASH-011: O dashboard deve exibir grafico de obras por status.
- REQ-DASH-012: O dashboard deve exibir grafico de OS por periodo.
- REQ-DASH-013: O dashboard deve exibir grafico de produtividade da equipe.

### Gestao de Obras

- REQ-WORK-001: O sistema deve permitir cadastrar obras.
- REQ-WORK-002: O sistema deve permitir editar informacoes de obras.
- REQ-WORK-003: O sistema deve permitir consultar obras por filtros relevantes.
- REQ-WORK-004: O sistema deve permitir acompanhar status de cada obra.
- REQ-WORK-005: O sistema deve centralizar dados operacionais, ordens de servico, fotos e historico por obra.
- REQ-WORK-006: O cadastro de obra deve conter nome da obra, cliente, endereco, responsavel, data de inicio, data de previsao de termino e status.
- REQ-WORK-007: Obras devem aceitar os status Planejamento, Em andamento, Pausada e Concluida.
- REQ-WORK-008: O sistema deve permitir excluir obras conforme permissao do usuario.

### Gestao de Ordens de Servico

- REQ-OS-001: O sistema deve permitir criar ordens de servico.
- REQ-OS-002: O sistema deve permitir associar cada OS a uma obra.
- REQ-OS-003: O sistema deve permitir definir responsavel, prioridade, prazo e status da OS.
- REQ-OS-004: O sistema deve permitir atualizar o andamento da OS.
- REQ-OS-005: O sistema deve manter historico de alteracoes de status e informacoes relevantes da OS.
- REQ-OS-006: O sistema deve permitir anexar registros fotograficos a uma OS.
- REQ-OS-007: O cadastro de OS deve conter numero da OS, obra, responsavel, descricao, prioridade, data de abertura, data de conclusao e status.
- REQ-OS-008: Ordens de servico devem aceitar os status Aberta, Em execucao, Aguardando aprovacao e Finalizada.
- REQ-OS-009: O sistema deve permitir encerrar OS.
- REQ-OS-010: O sistema deve permitir registrar observacoes em OS.

### Registro Fotografico

- REQ-PHOTO-001: O sistema deve permitir upload de fotos.
- REQ-PHOTO-002: O sistema deve permitir associar fotos a obras.
- REQ-PHOTO-003: O sistema deve permitir associar fotos a ordens de servico.
- REQ-PHOTO-004: O sistema deve registrar data, usuario e contexto do envio da foto.
- REQ-PHOTO-005: O sistema deve permitir visualizar fotos organizadas por obra, OS ou periodo.
- REQ-PHOTO-006: O sistema deve permitir upload multiplo de fotos.
- REQ-PHOTO-007: O sistema deve permitir visualizar fotos em galeria.
- REQ-PHOTO-008: O sistema deve permitir download de fotos.
- REQ-PHOTO-009: O sistema deve permitir exclusao de fotos conforme permissao do usuario.
- REQ-PHOTO-010: O sistema deve registrar data, hora e usuario nos metadados da foto.
- REQ-PHOTO-011: O sistema deve manter estrutura preparada para localizacao da foto.

### Relatorios

- REQ-REPORT-001: O sistema deve permitir emissao de relatorios operacionais.
- REQ-REPORT-002: Os relatorios devem poder ser filtrados por obra, periodo, status e responsavel quando aplicavel.
- REQ-REPORT-003: Os relatorios devem incluir informacoes estruturadas de obras, OS, fotos e historico conforme o tipo de relatorio.
- REQ-REPORT-004: O sistema deve permitir exportacao ou impressao de relatorios em formato adequado para uso gerencial.
- REQ-REPORT-005: O sistema deve gerar relatorios em PDF.
- REQ-REPORT-006: O PDF deve conter dados da obra.
- REQ-REPORT-007: O PDF deve conter dados da OS quando aplicavel.
- REQ-REPORT-008: O PDF deve conter fotos anexadas quando aplicavel.
- REQ-REPORT-009: O PDF deve conter historico de alteracoes.
- REQ-REPORT-010: Relatorios devem aceitar filtros por data, obra, responsavel e status.

### Historico de Atividades

- REQ-AUDIT-001: O sistema deve registrar atividades relevantes executadas pelos usuarios.
- REQ-AUDIT-002: O historico deve indicar data, hora, usuario, entidade afetada e tipo de acao.
- REQ-AUDIT-003: O historico deve ser consultavel por obra, OS, usuario ou periodo.

### Indicadores Operacionais

- REQ-KPI-001: O sistema deve calcular indicadores operacionais a partir dos dados registrados.
- REQ-KPI-002: O sistema deve exibir indicadores por obra.
- REQ-KPI-003: O sistema deve exibir indicadores por status de OS.
- REQ-KPI-004: O sistema deve permitir analise por periodo.

## Requisitos nao funcionais

- REQ-NF-001: A interface deve ser responsiva para uso em desktop, tablet e celular.
- REQ-NF-002: A interface deve priorizar leitura rapida, filtros claros e operacao eficiente.
- REQ-NF-003: O sistema deve proteger dados internos por autenticacao e permissoes.
- REQ-NF-004: O sistema deve ter tratamento claro para erro, carregamento e ausencia de dados.
- REQ-NF-005: O sistema deve manter consistencia visual e terminologica em todos os modulos.
- REQ-NF-006: A arquitetura deve permitir evolucao modular por dominio: usuarios, obras, OS, fotos, relatorios e indicadores.
- REQ-NF-007: O frontend deve usar Next.js 15, React 19, TypeScript, Tailwind CSS, Shadcn/UI, React Hook Form, Zod, TanStack Query e Axios.
- REQ-NF-008: O backend deve usar Node.js, Express, TypeScript e Prisma ORM.
- REQ-NF-009: O banco de dados deve ser PostgreSQL.
- REQ-NF-010: A autenticacao deve usar JWT com refresh token.
- REQ-NF-011: O armazenamento de imagens deve usar upload local inicialmente, mantendo abstracao preparada para AWS S3.
- REQ-NF-012: A interface deve ser mobile first.
- REQ-NF-013: O sistema deve suportar dark mode.
- REQ-NF-014: A interface deve seguir boas praticas de acessibilidade.
- REQ-NF-015: O sistema deve ser componentizado.
- REQ-NF-016: O backend deve seguir Clean Architecture, SOLID, Repository Pattern, Service Layer e DTO Pattern.
- REQ-NF-017: O sistema deve usar Zod para validacao de dados.
- REQ-NF-018: O sistema deve implementar tratamento global de erros.
- REQ-NF-019: O sistema deve considerar performance em consultas, listagens, imagens e dashboard.

## Entidades iniciais

- Usuario
- Perfil de acesso
- Obra
- Ordem de servico
- Registro fotografico
- Observacao de OS
- Atividade / evento de historico
- Relatorio
- Indicador operacional

## Criterios de aceite macro

- CA-001: Um usuario autenticado consegue acessar a plataforma e visualizar o dashboard.
- CA-002: Um usuario autorizado consegue cadastrar e consultar obras.
- CA-003: Um usuario autorizado consegue criar e acompanhar ordens de servico vinculadas a obras.
- CA-004: Um usuario autorizado consegue anexar fotos a obras ou OS.
- CA-005: O sistema registra historico de atividades relevantes.
- CA-006: O dashboard apresenta indicadores operacionais baseados nos dados do sistema.
- CA-007: Um usuario autorizado consegue emitir relatorios filtrados.
- CA-008: Um administrador consegue gerenciar usuarios e perfis.
- CA-009: O usuario consegue recuperar senha pelo fluxo definido para o MVP.
- CA-010: O dashboard exibe os indicadores e graficos definidos nesta especificacao.
- CA-011: O usuario autorizado consegue gerar PDF com dados de obra, OS, fotos e historico.

## Decisoes em aberto

- DEC-001: Necessidade de migracao de dados do app React Native.
- DEC-002: Necessidade de uso offline ou captura em campo com baixa conectividade.
- DEC-003: Estrategia de recuperacao de senha no MVP.
- DEC-004: Exclusao fisica ou logica para obras, OS e fotos.
- DEC-005: Captura automatica ou manual de localizacao das fotos.

## Riscos

- RISK-001: Escopo amplo pode gerar uma primeira versao grande demais se os modulos nao forem priorizados.
- RISK-002: Ausencia de definicao de permissoes pode afetar modelagem de dados e navegacao.
- RISK-003: Upload e armazenamento de fotos impactam custo, seguranca e arquitetura.
- RISK-004: Relatorios e indicadores dependem de dados bem estruturados desde o inicio.
- RISK-005: Migracao do app mobile pode exigir compatibilidade com modelos de dados existentes.
