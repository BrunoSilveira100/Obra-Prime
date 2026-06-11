import type { AppData } from "@/types/domain";

const now = new Date().toISOString();

export const initialData: AppData = {
  users: [
    {
      id: "u-admin",
      name: "Administrador Obra Prime",
      email: "admin@obraprime.com",
      role: "Administrador",
      status: "Ativo",
      createdAt: now
    },
    {
      id: "u-eng",
      name: "Marina Costa",
      email: "engenheira@obraprime.com",
      role: "Engenheiro",
      status: "Ativo",
      createdAt: now
    },
    {
      id: "u-tech",
      name: "Paulo Ribeiro",
      email: "tecnico@obraprime.com",
      role: "Tecnico de Campo",
      status: "Ativo",
      createdAt: now
    }
  ],
  works: [
    {
      id: "w-1",
      name: "Residencial Jardim Norte",
      client: "Construtora Horizonte",
      address: "Av. Central, 1200 - Sao Paulo",
      responsible: "Marina Costa",
      startDate: "2026-05-01",
      expectedEndDate: "2026-12-20",
      status: "Em andamento",
      createdAt: now
    },
    {
      id: "w-2",
      name: "Galpao Logistico Alfa",
      client: "Alfa Log",
      address: "Rodovia BR-116, km 42",
      responsible: "Carlos Mendes",
      startDate: "2026-03-10",
      expectedEndDate: "2026-08-30",
      status: "Pausada",
      createdAt: now
    },
    {
      id: "w-3",
      name: "Clinica Vila Serena",
      client: "Grupo Serena",
      address: "Rua das Acacias, 91",
      responsible: "Marina Costa",
      startDate: "2026-01-15",
      expectedEndDate: "2026-06-01",
      status: "Concluida",
      createdAt: now
    }
  ],
  serviceOrders: [
    {
      id: "os-1",
      number: "OS-2026-001",
      workId: "w-1",
      responsible: "Paulo Ribeiro",
      description: "Regularizar instalacao eletrica do bloco B.",
      priority: "Alta",
      openedAt: "2026-06-01",
      status: "Em execucao",
      createdAt: now
    },
    {
      id: "os-2",
      number: "OS-2026-002",
      workId: "w-1",
      responsible: "Marina Costa",
      description: "Conferir concretagem da laje tecnica.",
      priority: "Media",
      openedAt: "2026-06-04",
      status: "Aberta",
      createdAt: now
    },
    {
      id: "os-3",
      number: "OS-2026-003",
      workId: "w-3",
      responsible: "Paulo Ribeiro",
      description: "Registrar acabamento final da recepcao.",
      priority: "Baixa",
      openedAt: "2026-05-20",
      completedAt: "2026-05-22",
      status: "Finalizada",
      createdAt: now
    }
  ],
  notes: [
    {
      id: "n-1",
      serviceOrderId: "os-1",
      user: "Paulo Ribeiro",
      text: "Quadro eletrico vistoriado. Falta substituicao de dois disjuntores.",
      createdAt: now
    }
  ],
  photos: [],
  activities: [
    {
      id: "a-1",
      action: "Criacao",
      entity: "Obra",
      entityId: "w-1",
      user: "Administrador Obra Prime",
      summary: "Obra Residencial Jardim Norte criada.",
      createdAt: now
    },
    {
      id: "a-2",
      action: "Alteracao de status",
      entity: "OS",
      entityId: "os-1",
      user: "Marina Costa",
      summary: "OS-2026-001 movida para Em execucao.",
      createdAt: now
    }
  ]
};
