# Casos de Uso - Obra Prime Web

## UC-001 - Realizar login

Ator: Administrador, Engenheiro, Tecnico de Campo.

Fluxo principal:

1. Usuario informa email e senha.
2. Sistema valida credenciais.
3. Sistema gera access token e refresh token.
4. Usuario e direcionado ao dashboard ou tela permitida.

Resultado esperado: usuario autenticado com sessao ativa.

## UC-002 - Recuperar senha

Ator: Usuario nao autenticado.

Fluxo principal:

1. Usuario informa email.
2. Sistema gera token de recuperacao.
3. Sistema disponibiliza fluxo de redefinicao conforme estrategia aprovada.
4. Usuario define nova senha.

Resultado esperado: senha alterada de forma segura.

## UC-003 - Gerenciar usuarios

Ator: Administrador.

Fluxo principal:

1. Administrador acessa modulo de usuarios.
2. Cria, edita, ativa ou inativa usuario.
3. Define perfil do usuario.
4. Sistema registra atividade.

Resultado esperado: usuario mantido com perfil correto.

## UC-004 - Criar obra

Ator: Administrador.

Fluxo principal:

1. Administrador acessa modulo de obras.
2. Informa dados obrigatorios.
3. Sistema valida os dados.
4. Sistema cria obra com status definido.
5. Sistema registra atividade.

Resultado esperado: obra cadastrada e consultavel.

## UC-005 - Consultar obras

Ator: Administrador, Engenheiro.

Fluxo principal:

1. Usuario acessa lista de obras.
2. Sistema exibe obras conforme permissao.
3. Usuario filtra ou abre detalhes.

Resultado esperado: usuario visualiza informacoes operacionais da obra.

## UC-006 - Criar ordem de servico

Ator: Administrador, Engenheiro.

Fluxo principal:

1. Usuario acessa modulo de OS.
2. Informa obra, responsavel, descricao, prioridade, datas e status.
3. Sistema valida dados.
4. Sistema cria OS.
5. Sistema registra atividade.

Resultado esperado: OS criada e vinculada a obra.

## UC-007 - Atualizar status de OS

Ator: Administrador, Engenheiro, Tecnico de Campo.

Fluxo principal:

1. Usuario abre uma OS.
2. Seleciona novo status permitido.
3. Sistema atualiza status.
4. Sistema registra historico.

Resultado esperado: OS atualizada com trilha de auditoria.

## UC-008 - Registrar observacao de OS

Ator: Administrador, Engenheiro, Tecnico de Campo.

Fluxo principal:

1. Usuario abre uma OS.
2. Informa observacao.
3. Sistema salva observacao vinculada a OS e usuario.
4. Sistema registra atividade.

Resultado esperado: observacao disponivel no historico da OS.

## UC-009 - Adicionar fotos

Ator: Administrador, Engenheiro, Tecnico de Campo.

Fluxo principal:

1. Usuario seleciona obra ou OS.
2. Faz upload multiplo de imagens.
3. Sistema armazena arquivos localmente.
4. Sistema grava metadados.
5. Sistema exibe fotos na galeria.

Resultado esperado: fotos vinculadas ao contexto correto.

## UC-010 - Gerar relatorio PDF

Ator: Administrador.

Fluxo principal:

1. Administrador acessa modulo de relatorios.
2. Define filtros de data, obra, responsavel e status.
3. Sistema monta dados da obra, OS, fotos e historico.
4. Sistema gera PDF.

Resultado esperado: PDF pronto para download ou impressao.

## UC-011 - Visualizar dashboard

Ator: Administrador.

Fluxo principal:

1. Administrador acessa dashboard.
2. Sistema consulta indicadores e graficos.
3. Interface apresenta totais e visualizacoes.

Resultado esperado: Administrador acompanha situacao operacional.
