# Design Tecnico - Obra Prime Web

## Objetivo do design

Definir a arquitetura inicial da plataforma Obra Prime Web usando a stack obrigatoria informada, mantendo separacao clara entre frontend, backend, banco de dados, autenticacao e armazenamento de imagens.

## Stack definida

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

- JWT access token
- Refresh token

### Imagens

- Upload local inicialmente
- Camada de storage preparada para AWS S3

## Arquitetura proposta

O projeto deve ser organizado como monorepo simples ou workspace com dois aplicativos principais:

- `apps/web`: frontend Next.js.
- `apps/api`: backend Express.

Bibliotecas compartilhadas podem ser adicionadas depois, se houver reutilizacao real de tipos, validacoes ou contratos.

O backend deve seguir Clean Architecture com separacao entre camadas de entrada, aplicacao, dominio e infraestrutura. Para o MVP, essa separacao deve ser pragmaticamente aplicada sem excesso de abstracao.

## Fronteiras de responsabilidade

### Frontend Next.js

- Renderizar telas autenticadas e publicas.
- Gerenciar formularios com React Hook Form.
- Validar entradas de formulario com Zod.
- Consumir API usando Axios.
- Gerenciar cache, estados de carregamento e sincronizacao com TanStack Query.
- Usar componentes Shadcn/UI e Tailwind CSS para interface consistente.
- Proteger rotas internas no nivel de navegacao e experiencia do usuario.
- Suportar dark mode.
- Aplicar abordagem mobile first.
- Usar componentes reutilizaveis e acessiveis.

### Backend Express

- Expor API REST para autenticacao, usuarios, obras, ordens de servico, fotos, historico, relatorios e indicadores.
- Validar dados recebidos antes de persistir.
- Aplicar autorizacao por perfil/permissao.
- Emitir e renovar JWTs.
- Registrar atividades relevantes.
- Orquestrar upload e recuperacao de imagens.
- Organizar casos de uso em service layer.
- Isolar persistencia com repository pattern.
- Usar DTOs para entrada e saida dos casos de uso.
- Centralizar tratamento de erros.

### Prisma/PostgreSQL

- Persistir entidades do dominio.
- Aplicar relacionamentos entre usuarios, obras, OS, fotos e historico.
- Servir como fonte para indicadores e relatorios.
- Manter migrations versionadas.

### Storage de imagens

- Implementar interface interna de storage.
- Comecar com adaptador local.
- Manter contrato compativel com adaptador futuro para AWS S3.

## Modulos de dominio

### Auth

Responsavel por login, recuperacao de senha, refresh token, logout, controle de sessao e protecao de rotas da API.

Entidades previstas:

- Usuario
- RefreshToken
- PasswordResetToken

### Usuarios e Permissoes

Responsavel por cadastro, ativacao/inativacao e controle de acesso.

Entidades previstas:

- Usuario
- Perfil

Modelo inicial de perfis:

- Administrador
- Engenheiro
- Tecnico de Campo

Permissoes iniciais:

| Permissao | Administrador | Engenheiro | Tecnico de Campo |
| --- | --- | --- | --- |
| Gerenciar usuarios | Sim | Nao | Nao |
| Gerenciar obras | Sim | Nao | Nao |
| Acompanhar obras | Sim | Sim | Nao |
| Gerenciar ordens de servico | Sim | Nao | Nao |
| Criar OS | Sim | Sim | Nao |
| Editar OS | Sim | Sim | Nao |
| Atualizar status de OS | Sim | Sim | Sim |
| Registrar atividades | Sim | Sim | Sim |
| Adicionar fotos | Sim | Sim | Sim |
| Visualizar dashboards | Sim | Nao | Nao |
| Emitir relatorios | Sim | Nao | Nao |

No MVP, o modelo pode ser implementado com enum de perfil e mapa de permissoes em codigo. Uma tabela granular de permissoes so deve ser adicionada se houver necessidade real de configuracao dinamica.

### Obras

Responsavel por cadastro, consulta, status e agregacao operacional.

Entidades previstas:

- Obra

Campos iniciais:

- nome da obra
- cliente
- endereco
- responsavel
- data de inicio
- data de previsao de termino
- status

Status:

- Planejamento
- Em andamento
- Pausada
- Concluida

### Ordens de Servico

Responsavel por criacao, acompanhamento, prioridade, prazo, responsavel, status e vinculo com obra.

Entidades previstas:

- OrdemServico
- ObservacaoOrdemServico

Campos iniciais:

- numero da OS
- obra
- responsavel
- descricao
- prioridade
- data de abertura
- data de conclusao
- status

Status:

- Aberta
- Em execucao
- Aguardando aprovacao
- Finalizada

### Registro Fotografico

Responsavel por upload, metadados, associacao com obra/OS e visualizacao.

Entidades previstas:

- Foto

Recursos:

- upload multiplo
- galeria
- download
- exclusao

Metadados:

- data
- hora
- usuario
- localizacao preparada para uso futuro

### Historico

Responsavel por trilha de auditoria e eventos relevantes.

Entidades previstas:

- Atividade

### Relatorios e Indicadores

Responsavel por consultas agregadas e filtros operacionais.

Entidades previstas:

- Nao precisa iniciar com entidades proprias, salvo se relatorios gerados precisarem ser persistidos.

Indicadores do dashboard:

- obras ativas
- obras concluidas
- OS abertas
- OS em andamento
- OS concluidas
- total de fotos registradas

Graficos:

- obras por status
- OS por periodo
- produtividade da equipe

Relatorio PDF:

- dados da obra
- dados da OS
- fotos anexadas
- historico de alteracoes

Filtros de relatorio:

- data
- obra
- responsavel
- status

## Modelo inicial de dados

Campos definitivos ainda dependem de decisao de produto, mas o modelo inicial deve prever:

- Usuario: nome, email, senha hash, status, perfil, timestamps.
- RefreshToken: token hash, usuario, expiracao, revogacao, timestamps.
- PasswordResetToken: token hash, usuario, expiracao, uso, timestamps.
- Obra: nome, cliente, endereco, responsavel, dataInicio, dataPrevisaoTermino, status, timestamps.
- OrdemServico: numero, obra, responsavel, descricao, prioridade, dataAbertura, dataConclusao, status, timestamps.
- ObservacaoOrdemServico: OS, usuario, texto, timestamps.
- Foto: caminho/URL, storage provider, obra opcional, OS opcional, usuario, descricao, data/hora, localizacao opcional, metadados, timestamps.
- Atividade: usuario, entidade, entidadeId, acao, resumo, payload opcional, timestamps.

## Autenticacao e sessoes

- Login valida credenciais e retorna access token de curta duracao.
- Refresh token permite renovar access token.
- Refresh tokens devem ser armazenados de forma segura no backend, preferencialmente com hash.
- Logout deve revogar refresh token.
- Rotas protegidas devem validar JWT e carregar usuario autenticado.

## API inicial

Endpoints definitivos serao detalhados em tasks, mas os grupos previstos sao:

- `/auth`
- `/users`
- `/works`
- `/service-orders`
- `/photos`
- `/activities`
- `/reports`
- `/metrics`

## Padroes de validacao

- Frontend: Zod schemas integrados ao React Hook Form.
- Backend: validacao de payloads antes da camada de servico.
- Quando possivel, os contratos devem ter nomes e regras coerentes entre frontend e backend.
- DTOs de entrada e saida devem refletir os schemas de validacao.

## Padroes de backend

- Controllers devem lidar com HTTP, autenticacao extraida da requisicao e traducao de resposta.
- Services devem conter regras de aplicacao e coordenar repositories.
- Repositories devem encapsular acesso ao Prisma.
- DTOs devem separar dados externos dos modelos internos.
- Erros de dominio/aplicacao devem ser convertidos por middleware global de erros.
- Regras de permissao devem ser aplicadas antes de executar operacoes protegidas.

## Estrategia de UI

- Interface administrativa, densa e funcional.
- Navegacao principal com acesso a Dashboard, Obras, OS, Fotos, Relatorios, Usuarios e Historico.
- Componentes Shadcn/UI para formularios, tabelas, dialogs, menus, filtros e feedbacks.
- Estados obrigatorios: carregando, vazio, erro, sem permissao e sucesso.
- Mobile first e responsiva.
- Dark mode obrigatorio.
- Componentes devem respeitar acessibilidade basica: labels, foco visivel, contraste, teclado e semantica adequada.

## Testes e verificacao

- Verificar build TypeScript no frontend e backend.
- Verificar validacoes de formularios e payloads criticos.
- Testar fluxos de autenticacao, refresh token e rotas protegidas.
- Testar criacao e consulta das entidades principais.
- Testar upload local e persistencia dos metadados da foto.

## Decisoes pendentes antes de tasks

- Prioridades padrao de OS.
- Estrategia de recuperacao de senha no MVP.
- Exclusao fisica ou logica para obras, OS e fotos.
- Captura ou preenchimento de localizacao das fotos.
- Necessidade de importar dados do app React Native.
