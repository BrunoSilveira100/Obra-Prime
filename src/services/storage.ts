import { initialData } from "@/mocks/seed";
import type { Activity, AppData, Photo, ServiceOrder, ServiceOrderNote, Session, User, Work } from "@/types/domain";

const DATA_KEY = "obra-prime-data";
const SESSION_KEY = "obra-prime-session";

function isBrowser() {
  return typeof window !== "undefined";
}

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getData(): AppData {
  if (!isBrowser()) return clone(initialData);
  const raw = window.localStorage.getItem(DATA_KEY);
  if (!raw) {
    window.localStorage.setItem(DATA_KEY, JSON.stringify(initialData));
    return clone(initialData);
  }
  return JSON.parse(raw) as AppData;
}

export function setData(data: AppData) {
  if (!isBrowser()) return;
  window.localStorage.setItem(DATA_KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("obra-prime-data"));
}

export function getSession(): Session | null {
  if (!isBrowser()) return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  return raw ? (JSON.parse(raw) as Session) : null;
}

export function setSession(session: Session | null) {
  if (!isBrowser()) return;
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("obra-prime-session"));
}

export function addActivity(data: AppData, activity: Omit<Activity, "id" | "createdAt">) {
  data.activities.unshift({
    id: createId("act"),
    createdAt: new Date().toISOString(),
    ...activity
  });
}

export function upsertWork(input: Omit<Work, "id" | "createdAt"> & Partial<Pick<Work, "id" | "createdAt">>, user = "Sistema") {
  const data = getData();
  const exists = input.id ? data.works.find((work) => work.id === input.id) : undefined;
  if (exists) {
    data.works = data.works.map((work) => (work.id === input.id ? { ...work, ...input } as Work : work));
    addActivity(data, { action: "Edicao", entity: "Obra", entityId: input.id!, user, summary: `Obra ${input.name} atualizada.` });
  } else {
    const work: Work = { ...input, id: createId("work"), createdAt: new Date().toISOString() };
    data.works.unshift(work);
    addActivity(data, { action: "Criacao", entity: "Obra", entityId: work.id, user, summary: `Obra ${work.name} criada.` });
  }
  setData(data);
}

export function deleteWork(id: string, user = "Sistema") {
  const data = getData();
  const work = data.works.find((item) => item.id === id);
  data.works = data.works.filter((item) => item.id !== id);
  data.serviceOrders = data.serviceOrders.filter((item) => item.workId !== id);
  addActivity(data, { action: "Exclusao", entity: "Obra", entityId: id, user, summary: `Obra ${work?.name ?? id} excluida.` });
  setData(data);
}

export function upsertServiceOrder(input: Omit<ServiceOrder, "id" | "createdAt"> & Partial<Pick<ServiceOrder, "id" | "createdAt">>, user = "Sistema") {
  const data = getData();
  if (input.id) {
    data.serviceOrders = data.serviceOrders.map((item) => (item.id === input.id ? { ...item, ...input } as ServiceOrder : item));
    addActivity(data, { action: "Edicao", entity: "OS", entityId: input.id, user, summary: `${input.number} atualizada.` });
  } else {
    const order: ServiceOrder = { ...input, id: createId("os"), createdAt: new Date().toISOString() };
    data.serviceOrders.unshift(order);
    addActivity(data, { action: "Criacao", entity: "OS", entityId: order.id, user, summary: `${order.number} criada.` });
  }
  setData(data);
}

export function deleteServiceOrder(id: string, user = "Sistema") {
  const data = getData();
  const order = data.serviceOrders.find((item) => item.id === id);
  data.serviceOrders = data.serviceOrders.filter((item) => item.id !== id);
  data.notes = data.notes.filter((item) => item.serviceOrderId !== id);
  data.photos = data.photos.filter((item) => item.serviceOrderId !== id);
  addActivity(data, { action: "Exclusao", entity: "OS", entityId: id, user, summary: `${order?.number ?? id} excluida.` });
  setData(data);
}

export function addNote(note: Omit<ServiceOrderNote, "id" | "createdAt">) {
  const data = getData();
  const created = { ...note, id: createId("note"), createdAt: new Date().toISOString() };
  data.notes.unshift(created);
  addActivity(data, { action: "Observacao", entity: "OS", entityId: note.serviceOrderId, user: note.user, summary: "Observacao registrada em OS." });
  setData(data);
}

export function addPhotos(photos: Omit<Photo, "id" | "createdAt">[]) {
  const data = getData();
  const created = photos.map((photo) => ({ ...photo, id: createId("photo"), createdAt: new Date().toISOString() }));
  data.photos.unshift(...created);
  created.forEach((photo) => addActivity(data, { action: "Upload de foto", entity: "Foto", entityId: photo.id, user: photo.uploadedBy, summary: `Foto ${photo.name} enviada.` }));
  setData(data);
}

export function deletePhoto(id: string, user = "Sistema") {
  const data = getData();
  const photo = data.photos.find((item) => item.id === id);
  data.photos = data.photos.filter((item) => item.id !== id);
  addActivity(data, { action: "Exclusao", entity: "Foto", entityId: id, user, summary: `Foto ${photo?.name ?? id} excluida.` });
  setData(data);
}

export function upsertUser(input: Omit<User, "id" | "createdAt"> & Partial<Pick<User, "id" | "createdAt">>, user = "Sistema") {
  const data = getData();
  if (input.id) {
    data.users = data.users.map((item) => (item.id === input.id ? { ...item, ...input } as User : item));
    addActivity(data, { action: "Edicao", entity: "Usuario", entityId: input.id, user, summary: `Usuario ${input.name} atualizado.` });
  } else {
    const created: User = { ...input, id: createId("user"), createdAt: new Date().toISOString() };
    data.users.unshift(created);
    addActivity(data, { action: "Criacao", entity: "Usuario", entityId: created.id, user, summary: `Usuario ${created.name} criado.` });
  }
  setData(data);
}

export function deleteUser(id: string, user = "Sistema") {
  const data = getData();
  const target = data.users.find((item) => item.id === id);
  data.users = data.users.filter((item) => item.id !== id);
  addActivity(data, { action: "Exclusao", entity: "Usuario", entityId: id, user, summary: `Usuario ${target?.name ?? id} excluido.` });
  setData(data);
}
