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
import { deleteUser, upsertUser } from "@/services/storage";
import { userSchema, type UserFormData } from "@/schemas/user.schema";
import type { User, UserRole, UserStatus } from "@/types/domain";
import { formatDate } from "@/utils/date";

const roles: UserRole[] = ["Administrador", "Engenheiro", "Tecnico de Campo"];
const statuses: UserStatus[] = ["Ativo", "Inativo"];

export function UsersPage() {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const [query, setQuery] = useState("");
  const [role, setRole] = useState<"Todos" | UserRole>("Todos");
  const [editing, setEditing] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = useMemo(() => data.users.filter((user) => {
    const search = `${user.name} ${user.email}`.toLowerCase();
    return search.includes(query.toLowerCase()) && (role === "Todos" || user.role === role);
  }), [data.users, query, role]);

  function openForm(user?: User) {
    setEditing(user ?? null);
    setModalOpen(true);
  }

  function remove(user: User) {
    if (user.id === session?.user.id) {
      toast({ type: "error", title: "Acao bloqueada", description: "Voce nao pode excluir o proprio usuario nesta sessao simulada." });
      return;
    }
    if (!confirmAction(`Excluir usuario ${user.name}?`)) return;
    deleteUser(user.id, session?.user.name);
    toast({ type: "success", title: "Usuario excluido", description: user.name });
  }

  return (
    <ProtectedPage>
      <PageHeader title="Usuarios" description="Gerencie acessos, perfis e status dos usuarios." actions={<Button onClick={() => openForm()}><Plus className="h-4 w-4" />Novo usuario</Button>} />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar nome ou email" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Select value={role} onChange={(event) => setRole(event.target.value as "Todos" | UserRole)}>
            <option>Todos</option>
            {roles.map((item) => <option key={item}>{item}</option>)}
          </Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? <EmptyState title="Nenhum usuario encontrado" description="Crie um usuario ou ajuste a busca." /> : (
        <div className="overflow-hidden rounded-lg border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted text-left text-muted-foreground">
                <tr>
                  <th className="p-3">Nome</th>
                  <th>Email</th>
                  <th>Perfil</th>
                  <th>Status</th>
                  <th>Criado em</th>
                  <th className="text-right">Acoes</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((user) => (
                  <tr key={user.id} className="border-t">
                    <td className="p-3 font-medium">{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.status}</td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td className="space-x-2 p-3 text-right">
                      <Button variant="outline" size="sm" onClick={() => openForm(user)}><Edit2 className="h-4 w-4" />Editar</Button>
                      <Button variant="destructive" size="sm" onClick={() => remove(user)}><Trash2 className="h-4 w-4" />Excluir</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <UserFormModal open={modalOpen} user={editing} onClose={() => setModalOpen(false)} />
    </ProtectedPage>
  );
}

function UserFormModal({ open, user, onClose }: { open: boolean; user: User | null; onClose: () => void }) {
  const { session } = useAuth();
  const { toast } = useToast();
  const form = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    values: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      role: user?.role ?? "Engenheiro",
      status: user?.status ?? "Ativo"
    }
  });

  function submit(values: UserFormData) {
    upsertUser({ ...values, id: user?.id, createdAt: user?.createdAt }, session?.user.name);
    toast({ type: "success", title: user ? "Usuario atualizado" : "Usuario criado", description: values.name });
    onClose();
  }

  return (
    <Modal open={open} title={user ? "Editar usuario" : "Novo usuario"} onClose={onClose}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(submit)}>
        <Field label="Nome" error={form.formState.errors.name?.message}><Input {...form.register("name")} /></Field>
        <Field label="Email" error={form.formState.errors.email?.message}><Input type="email" {...form.register("email")} /></Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Perfil" error={form.formState.errors.role?.message}><Select {...form.register("role")}>{roles.map((item) => <option key={item}>{item}</option>)}</Select></Field>
          <Field label="Status" error={form.formState.errors.status?.message}><Select {...form.register("status")}>{statuses.map((item) => <option key={item}>{item}</option>)}</Select></Field>
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
