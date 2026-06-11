"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { ProtectedPage } from "@/components/layout/protected-page";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAppData } from "@/hooks/use-app-data";
import { formatDateTime } from "@/utils/date";

export function HistoryPage() {
  const data = useAppData();
  const [query, setQuery] = useState("");
  const [entity, setEntity] = useState("Todas");
  const filtered = useMemo(() => data.activities.filter((activity) => {
    const search = `${activity.action} ${activity.entity} ${activity.user} ${activity.summary}`.toLowerCase();
    return search.includes(query.toLowerCase()) && (entity === "Todas" || activity.entity === entity);
  }), [data.activities, entity, query]);

  return (
    <ProtectedPage>
      <PageHeader title="Historico / Auditoria" description="Acompanhe criacoes, edicoes, uploads e alteracoes de status." />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_220px]">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Buscar acao, usuario ou resumo" value={query} onChange={(event) => setQuery(event.target.value)} />
          </div>
          <Select value={entity} onChange={(event) => setEntity(event.target.value)}>
            <option>Todas</option>
            <option>Obra</option>
            <option>OS</option>
            <option>Foto</option>
            <option>Usuario</option>
          </Select>
        </CardContent>
      </Card>
      {filtered.length === 0 ? <EmptyState title="Nenhuma atividade encontrada" description="As acoes realizadas no sistema aparecem aqui." /> : (
        <div className="space-y-3">
          {filtered.map((activity) => (
            <Card key={activity.id}>
              <CardContent>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-semibold">{activity.action} - {activity.entity}</p>
                    <p className="text-sm text-muted-foreground">{activity.summary}</p>
                  </div>
                  <div className="text-sm text-muted-foreground sm:text-right">
                    <p>{activity.user}</p>
                    <p>{formatDateTime(activity.createdAt)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </ProtectedPage>
  );
}
