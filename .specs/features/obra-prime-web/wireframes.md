# Wireframes Textuais - Obra Prime Web

## Login

```text
[Logo Obra Prime]

Email
[________________]

Senha
[________________] [mostrar/ocultar]

[Entrar]

[Esqueci minha senha]
```

Estados:

- carregando ao autenticar
- erro de credenciais
- campos obrigatorios

## Shell autenticado

```text
┌─────────────────────────────────────────────┐
│ Header: busca, usuario, tema, logout        │
├───────────────┬─────────────────────────────┤
│ Sidebar       │ Conteudo                    │
│ Dashboard     │                             │
│ Obras         │                             │
│ OS            │                             │
│ Fotos         │                             │
│ Relatorios    │                             │
│ Usuarios      │                             │
│ Historico     │                             │
└───────────────┴─────────────────────────────┘
```

No mobile, a sidebar deve virar menu lateral acionado por botao.

## Dashboard

```text
[Obras ativas] [Obras concluidas] [OS abertas]
[OS em andamento] [OS concluidas] [Fotos]

[Grafico: Obras por status]
[Grafico: OS por periodo]
[Grafico: Produtividade da equipe]
```

## Obras - Lista

```text
[Titulo: Obras]                         [Nova obra]

Filtros: [Status] [Responsavel] [Busca]

Tabela:
Nome | Cliente | Responsavel | Inicio | Prev. termino | Status | Acoes
```

## Obras - Formulario

```text
Nome da obra
Cliente
Endereco
Responsavel
Data inicio
Data previsao termino
Status

[Cancelar] [Salvar]
```

## OS - Lista

```text
[Titulo: Ordens de Servico]              [Nova OS]

Filtros: [Obra] [Status] [Responsavel] [Periodo]

Tabela:
Numero | Obra | Responsavel | Prioridade | Abertura | Conclusao | Status | Acoes
```

## OS - Detalhe

```text
Numero da OS | Status | Prioridade
Obra
Responsavel
Descricao
Datas

[Atualizar status] [Encerrar OS] [Anexar imagens]

Abas:
- Observacoes
- Fotos
- Historico
```

## Registro Fotografico

```text
[Upload multiplo]

Filtros: [Obra] [OS] [Periodo] [Usuario]

Galeria:
[foto] [foto] [foto]

Ao abrir foto:
Imagem ampliada
Data/hora
Usuario
Obra/OS
[Download] [Excluir]
```

## Relatorios

```text
Filtros:
[Data inicial] [Data final]
[Obra]
[Responsavel]
[Status]

[Gerar PDF]
```

Resultado:

```text
PDF:
- Dados da obra
- Dados da OS
- Fotos anexadas
- Historico de alteracoes
```

## Usuarios

```text
[Titulo: Usuarios]                       [Novo usuario]

Tabela:
Nome | Email | Perfil | Status | Acoes
```

## Historico

```text
Filtros: [Entidade] [Usuario] [Periodo]

Timeline:
Data/hora | Usuario | Acao | Entidade | Resumo
```
