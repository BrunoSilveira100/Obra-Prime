"use client";

import { FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { ProtectedPage } from "@/components/layout/protected-page";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAppData } from "@/hooks/use-app-data";
import { formatDate, formatDateTime } from "@/utils/date";

export function ReportsPage() {
  const data = useAppData();
  const { toast } = useToast();
  const [workId, setWorkId] = useState("Todas");
  const [orderId, setOrderId] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [date, setDate] = useState("");
  const [generated, setGenerated] = useState(false);

  const orders = useMemo(() => data.serviceOrders.filter((order) => {
    return (workId === "Todas" || order.workId === workId) && (orderId === "Todas" || order.id === orderId) && (status === "Todos" || order.status === status) && (!date || order.openedAt >= date);
  }), [data.serviceOrders, date, orderId, status, workId]);

  function generate() {
    setGenerated(true);
    toast({ type: "success", title: "Relatorio gerado", description: "Previa visual criada na tela." });
  }

  function exportPdf() {
    toast({ type: "info", title: "Exportacao PDF simulada", description: "O backend de PDF sera conectado em etapa posterior." });
  }

  return (
    <ProtectedPage>
      <PageHeader title="Relatorios" description="Filtre dados operacionais e gere uma previa do relatorio." actions={<Button onClick={exportPdf}><FileText className="h-4 w-4" />Exportar PDF</Button>} />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-5">
          <Select value={workId} onChange={(event) => setWorkId(event.target.value)}>
            <option>Todas</option>
            {data.works.map((work) => <option key={work.id} value={work.id}>{work.name}</option>)}
          </Select>
          <Select value={orderId} onChange={(event) => setOrderId(event.target.value)}>
            <option>Todas</option>
            {data.serviceOrders.map((order) => <option key={order.id} value={order.id}>{order.number}</option>)}
          </Select>
          <Select value={status} onChange={(event) => setStatus(event.target.value)}>
            <option>Todos</option>
            <option>Aberta</option>
            <option>Em execucao</option>
            <option>Aguardando aprovacao</option>
            <option>Finalizada</option>
          </Select>
          <Input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
          <Button onClick={generate}>Gerar relatorio</Button>
        </CardContent>
      </Card>
      {!generated ? <EmptyState title="Relatorio ainda nao gerado" description="Escolha os filtros e clique em gerar relatorio." /> : (
        <Card>
          <CardHeader><h2 className="font-semibold">Previa do relatorio operacional</h2></CardHeader>
          <CardContent className="space-y-6">
            {orders.length === 0 ? <EmptyState title="Sem dados para os filtros" description="Ajuste os filtros para incluir ordens de servico." /> : orders.map((order) => {
              const work = data.works.find((item) => item.id === order.workId);
              const photos = data.photos.filter((photo) => photo.serviceOrderId === order.id);
              const activities = data.activities.filter((activity) => activity.entityId === order.id || activity.entity === "OS").slice(0, 5);
              return (
                <section key={order.id} className="rounded-lg border p-4">
                  <h3 className="font-semibold">{order.number} - {order.status}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{work?.name ?? "-"} | {order.responsible} | {formatDate(order.openedAt)}</p>
                  <p className="mt-3 text-sm">{order.description}</p>
                  <div className="mt-4 grid gap-4 lg:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold">Fotos anexadas</h4>
                      <p className="text-sm text-muted-foreground">{photos.length} foto(s)</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold">Historico</h4>
                      {activities.map((activity) => <p key={activity.id} className="text-sm text-muted-foreground">{formatDateTime(activity.createdAt)} - {activity.summary}</p>)}
                    </div>
                  </div>
                </section>
              );
            })}
          </CardContent>
        </Card>
      )}
    </ProtectedPage>
  );
}
