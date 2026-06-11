"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Eye, Plus, Search, Trash2, CheckCircle2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ProtectedPage } from "@/components/layout/protected-page";
import { confirmAction } from "@/components/shared/confirm";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/hooks/use-auth";
import { deleteServiceOrder, upsertServiceOrder } from "@/services/storage";
import { serviceOrderSchema, type ServiceOrderFormData } from "@/schemas/service-order.schema";
import type { Priority, ServiceOrder, ServiceOrderStatus } from "@/types/domain";
import { formatDate } from "@/utils/date";

const statuses: ServiceOrderStatus[] = ["Aberta", "Em execucao", "Aguardando aprovacao", "Finalizada"];
const priorities: Priority[] = ["Baixa", "Media", "Alta", "Critica"];

export function ServiceOrdersPage() {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"Todos" | ServiceOrderStatus>("Todos");
  const [priority, setPriority] = useState<"Todas" | Priority>("Todas");
  const [workId, setWorkId] = useState("Todas");
  const [editing, setEditing] = useState<ServiceOrder | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      data.serviceOrders.filter((order) => {
        const work = data.works.find((item) => item.id === order.workId);
        const search = `${order.number} ${order.responsible} ${order.description} ${work?.name ?? ""}`.toLowerCase();
        return search.includes(query.toLowerCase()) && (status === "Todos" || order.status === status) && (priority === "Todas" || order.priority === priority) && (workId === "Todas" || order.workId === workId);
      }),
    [data.serviceOrders, data.works, priority, query, status, workId]
  );

  function openForm(order?: ServiceOrder) {
    setEditing(order ?? null);
    setModalOpen(true);
  }

  function finishOrder(order: ServiceOrder) {
    upsertServiceOrder({ ...order, status: "Finalizada", completedAt: new Date().toISOString().slice(0, 10) }, session?.user.name);
    toast({ type: "success", title: "OS finalizada", description: order.number });
  }

  function remove(order: ServiceOrder) {
    if (!confirmAction(`Excluir ${order.number}?`)) return;
    deleteServiceOrder(order.id, session?.user.name);
    toast({ type: "success", title: "OS excluida", description: order.number });
  }

  return (
    <ProtectedPage>
      <PageHeader title="Ordens de Servico" description="Crie, acompanhe, finalize e registre observacoes das OS." actions={<Button onClick={() => openForm()}><Plus className="h-4 w-4" />Nova OS</Button>} />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_180px_180px_220px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar OS, responsavel ou obra" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Select value={status} onChange={(event) => setStatus(event.target.value as "Todos" | ServiceOrderStatus)}>
            <option>Todos</option>
            {statuses.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Select value={priority} onChange={(event) => setPriority(event.target.value as "Todas" | Priority)}>
            <option>Todas</option>
            {priorities.map((item) => <option key={item}>{item}</option>)}
          </Select>
          <Select value={workId} onChange={(event) => setWorkId(event.target.value)}>
            <option>Todas</option>
            {data.works.map((work) => <option key={work.id} value={work.id}>{work.name}</option>)}
          </Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState title="Nenhuma OS encontrada" description="Crie uma OS ou ajuste os filtros." />
      ) : (
        <div className="grid gap-4">
          {filtered.map((order) => {
            const work = data.works.find((item) => item.id === order.workId);
            return (
              <Card key={order.id}>
                <CardContent className="grid gap-4 xl:grid-cols-[1fr_auto] xl:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-semibold">{order.number}</h2>
                      <span className="rounded-full bg-muted px-2 py-1 text-xs">{order.status}</span>
                      <span className="rounded-full bg-accent px-2 py-1 text-xs text-accent-foreground">{order.priority}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{work?.name ?? "Obra nao encontrada"} - {order.description}</p>
                    <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                      <span>Responsavel: <strong>{order.responsible}</strong></span>
                      <span>Abertura: <strong>{formatDate(order.openedAt)}</strong></span>
                      <span>Conclusao: <strong>{formatDate(order.completedAt)}</strong></span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" asChild><Link href={`/ordens-servico/${order.id}`}><Eye className="h-4 w-4" />Detalhes</Link></Button>
                    <Button variant="outline" onClick={() => openForm(order)}><Edit2 className="h-4 w-4" />Editar</Button>
                    <Button variant="secondary" onClick={() => finishOrder(order)} disabled={order.status === "Finalizada"}><CheckCircle2 className="h-4 w-4" />Finalizar</Button>
                    <Button variant="destructive" onClick={() => remove(order)}><Trash2 className="h-4 w-4" />Excluir</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      <ServiceOrderFormModal open={modalOpen} order={editing} onClose={() => setModalOpen(false)} />
    </ProtectedPage>
  );
}

export function ServiceOrderFormModal({ open, order, onClose }: { open: boolean; order: ServiceOrder | null; onClose: () => void }) {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const form = useForm<ServiceOrderFormData>({
    resolver: zodResolver(serviceOrderSchema),
    values: {
      number: order?.number ?? `OS-${new Date().getFullYear()}-${String(data.serviceOrders.length + 1).padStart(3, "0")}`,
      workId: order?.workId ?? data.works[0]?.id ?? "",
      responsible: order?.responsible ?? session?.user.name ?? "",
      description: order?.description ?? "",
      priority: order?.priority ?? "Media",
      openedAt: order?.openedAt ?? new Date().toISOString().slice(0, 10),
      completedAt: order?.completedAt ?? "",
      status: order?.status ?? "Aberta"
    }
  });

  function submit(values: ServiceOrderFormData) {
    upsertServiceOrder({ ...values, id: order?.id, createdAt: order?.createdAt }, session?.user.name);
    toast({ type: "success", title: order ? "OS atualizada" : "OS criada", description: values.number });
    onClose();
  }

  return (
    <Modal open={open} title={order ? "Editar OS" : "Nova OS"} onClose={onClose}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Numero" error={form.formState.errors.number?.message}><Input {...form.register("number")} /></Field>
          <Field label="Obra" error={form.formState.errors.workId?.message}>
            <Select {...form.register("workId")}>{data.works.map((work) => <option key={work.id} value={work.id}>{work.name}</option>)}</Select>
          </Field>
        </div>
        <Field label="Responsavel" error={form.formState.errors.responsible?.message}><Input {...form.register("responsible")} /></Field>
        <Field label="Descricao" error={form.formState.errors.description?.message}><Textarea {...form.register("description")} /></Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Prioridade" error={form.formState.errors.priority?.message}><Select {...form.register("priority")}>{priorities.map((item) => <option key={item}>{item}</option>)}</Select></Field>
          <Field label="Status" error={form.formState.errors.status?.message}><Select {...form.register("status")}>{statuses.map((item) => <option key={item}>{item}</option>)}</Select></Field>
          <Field label="Data abertura" error={form.formState.errors.openedAt?.message}><Input type="date" {...form.register("openedAt")} /></Field>
        </div>
        <Field label="Data conclusao" error={form.formState.errors.completedAt?.message}><Input type="date" {...form.register("completedAt")} /></Field>
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Salvar</Button>
        </div>
      </form>
    </Modal>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-1 text-sm font-medium">
      {label}
      {children}
      {error ? <span className="text-xs font-normal text-destructive">{error}</span> : null}
    </label>
  );
}
