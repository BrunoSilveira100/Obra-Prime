"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
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
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/hooks/use-auth";
import { deleteWork, upsertWork } from "@/services/storage";
import { workSchema, type WorkFormData } from "@/schemas/work.schema";
import type { Work, WorkStatus } from "@/types/domain";
import { formatDate } from "@/utils/date";

const statuses: WorkStatus[] = ["Planejamento", "Em andamento", "Pausada", "Concluida"];

export function WorksPage() {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"Todos" | WorkStatus>("Todos");
  const [editing, setEditing] = useState<Work | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(
    () =>
      data.works.filter((work) => {
        const matchesSearch = work.name.toLowerCase().includes(query.toLowerCase()) || work.client.toLowerCase().includes(query.toLowerCase());
        const matchesStatus = status === "Todos" || work.status === status;
        return matchesSearch && matchesStatus;
      }),
    [data.works, query, status]
  );

  function openForm(work?: Work) {
    setEditing(work ?? null);
    setModalOpen(true);
  }

  function handleDelete(work: Work) {
    if (!confirmAction(`Excluir a obra "${work.name}"? As OS vinculadas tambem serao removidas neste mock.`)) return;
    deleteWork(work.id, session?.user.name);
    toast({ type: "success", title: "Obra excluida", description: work.name });
  }

  function handleStatus(work: Work, next: WorkStatus) {
    upsertWork({ ...work, status: next }, session?.user.name);
    toast({ type: "success", title: "Status atualizado", description: `${work.name}: ${next}` });
  }

  return (
    <ProtectedPage>
      <PageHeader title="Obras" description="Cadastre, consulte e acompanhe o status das obras." actions={<Button onClick={() => openForm()}><Plus className="h-4 w-4" />Nova obra</Button>} />
      <Card>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Buscar por obra ou cliente" value={query} onChange={(event) => setQuery(event.target.value)} />
            </div>
            <Select value={status} onChange={(event) => setStatus(event.target.value as "Todos" | WorkStatus)}>
              <option>Todos</option>
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </Select>
          </div>
        </CardContent>
      </Card>
      {filtered.length === 0 ? (
        <EmptyState title="Nenhuma obra encontrada" description="Ajuste os filtros ou cadastre uma nova obra." />
      ) : (
        <div className="grid gap-4">
          {filtered.map((work) => (
            <Card key={work.id}>
              <CardContent className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{work.name}</h2>
                    <span className="rounded-full bg-muted px-2 py-1 text-xs">{work.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{work.client} - {work.address}</p>
                  <div className="mt-3 grid gap-2 text-sm sm:grid-cols-3">
                    <span>Responsavel: <strong>{work.responsible}</strong></span>
                    <span>Inicio: <strong>{formatDate(work.startDate)}</strong></span>
                    <span>Prev. termino: <strong>{formatDate(work.expectedEndDate)}</strong></span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Select className="w-44" value={work.status} onChange={(event) => handleStatus(work, event.target.value as WorkStatus)}>
                    {statuses.map((item) => <option key={item}>{item}</option>)}
                  </Select>
                  <Button variant="outline" onClick={() => openForm(work)}><Edit2 className="h-4 w-4" />Editar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(work)}><Trash2 className="h-4 w-4" />Excluir</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <WorkFormModal open={modalOpen} work={editing} onClose={() => setModalOpen(false)} />
    </ProtectedPage>
  );
}

function WorkFormModal({ open, work, onClose }: { open: boolean; work: Work | null; onClose: () => void }) {
  const { session } = useAuth();
  const { toast } = useToast();
  const form = useForm<WorkFormData>({
    resolver: zodResolver(workSchema),
    values: {
      name: work?.name ?? "",
      client: work?.client ?? "",
      address: work?.address ?? "",
      responsible: work?.responsible ?? "",
      startDate: work?.startDate ?? "",
      expectedEndDate: work?.expectedEndDate ?? "",
      status: work?.status ?? "Planejamento"
    }
  });

  function submit(values: WorkFormData) {
    upsertWork({ ...values, id: work?.id, createdAt: work?.createdAt }, session?.user.name);
    toast({ type: "success", title: work ? "Obra atualizada" : "Obra criada", description: values.name });
    onClose();
  }

  return (
    <Modal open={open} title={work ? "Editar obra" : "Nova obra"} onClose={onClose}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <Field label="Nome da obra" error={form.formState.errors.name?.message}><Input {...form.register("name")} /></Field>
        <Field label="Cliente" error={form.formState.errors.client?.message}><Input {...form.register("client")} /></Field>
        <Field label="Endereco" error={form.formState.errors.address?.message}><Input {...form.register("address")} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Responsavel" error={form.formState.errors.responsible?.message}><Input {...form.register("responsible")} /></Field>
          <Field label="Status" error={form.formState.errors.status?.message}>
            <Select {...form.register("status")}>{statuses.map((item) => <option key={item}>{item}</option>)}</Select>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Data inicio" error={form.formState.errors.startDate?.message}><Input type="date" {...form.register("startDate")} /></Field>
          <Field label="Data previsao termino" error={form.formState.errors.expectedEndDate?.message}><Input type="date" {...form.register("expectedEndDate")} /></Field>
        </div>
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
