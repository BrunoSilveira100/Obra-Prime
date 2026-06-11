export type UserRole = "Administrador" | "Engenheiro" | "Tecnico de Campo";
export type UserStatus = "Ativo" | "Inativo";
export type WorkStatus = "Planejamento" | "Em andamento" | "Pausada" | "Concluida";
export type ServiceOrderStatus = "Aberta" | "Em execucao" | "Aguardando aprovacao" | "Finalizada";
export type Priority = "Baixa" | "Media" | "Alta" | "Critica";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
};

export type Work = {
  id: string;
  name: string;
  client: string;
  address: string;
  responsible: string;
  startDate: string;
  expectedEndDate: string;
  status: WorkStatus;
  createdAt: string;
};

export type ServiceOrder = {
  id: string;
  number: string;
  workId: string;
  responsible: string;
  description: string;
  priority: Priority;
  openedAt: string;
  completedAt?: string;
  status: ServiceOrderStatus;
  createdAt: string;
};

export type ServiceOrderNote = {
  id: string;
  serviceOrderId: string;
  user: string;
  text: string;
  createdAt: string;
};

export type Photo = {
  id: string;
  serviceOrderId?: string;
  workId?: string;
  uploadedBy: string;
  name: string;
  url: string;
  createdAt: string;
  location?: string;
};

export type Activity = {
  id: string;
  action: string;
  entity: string;
  entityId: string;
  user: string;
  summary: string;
  createdAt: string;
};

export type AppData = {
  users: User[];
  works: Work[];
  serviceOrders: ServiceOrder[];
  notes: ServiceOrderNote[];
  photos: Photo[];
  activities: Activity[];
};

export type Session = {
  user: User;
  token: string;
};
