"use client";

import Link from "next/link";
import { ArrowRight, Building2, Camera, CheckCircle2, Clock, Plus, Wrench } from "lucide-react";
import { ProtectedPage } from "@/components/layout/protected-page";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { PageHeader } from "@/components/shared/page-header";
import { useAppData } from "@/hooks/use-app-data";
import { formatDate } from "@/utils/date";

export function DashboardPage() {
  const data = useAppData();
  const activeWorks = data.works.filter((work) => work.status === "Em andamento" || work.status === "Planejamento").length;
  const completedWorks = data.works.filter((work) => work.status === "Concluida").length;
  const openOrders = data.serviceOrders.filter((order) => order.status === "Aberta").length;
  const runningOrders = data.serviceOrders.filter((order) => order.status === "Em execucao").length;
  const finishedOrders = data.serviceOrders.filter((order) => order.status === "Finalizada").length;

  const cards = [
    { label: "Obras ativas", value: activeWorks, icon: Building2 },
    { label: "Obras concluidas", value: completedWorks, icon: CheckCircle2 },
    { label: "OS abertas", value: openOrders, icon: Wrench },
    { label: "OS em andamento", value: runningOrders, icon: Clock },
    { label: "OS finalizadas", value: finishedOrders, icon: CheckCircle2 },
    { label: "Fotos registradas", value: data.photos.length, icon: Camera }
  ];

  const workStatus = ["Planejamento", "Em andamento", "Pausada", "Concluida"].map((status) => ({
    status,
    count: data.works.filter((work) => work.status === status).length
  }));

  const maxStatus = Math.max(1, ...workStatus.map((item) => item.count));
  const latestOrders = data.serviceOrders.slice(0, 5);

  return (
    <ProtectedPage>
      <PageHeader
        title="Dashboard"
        description="Indicadores operacionais e atalhos para acompanhamento das obras."
        actions={
          <>
            <Button asChild>
              <Link href="/obras"><Plus className="h-4 w-4" />Nova obra</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/ordens-servico"><Wrench className="h-4 w-4" />Nova OS</Link>
            </Button>
          </>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.label}>
              <CardContent className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{card.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{card.value}</p>
                </div>
                <div className="rounded-md bg-accent p-3 text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-4 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <h2 className="font-semibold">Obras por status</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            {workStatus.map((item) => (
              <div key={item.status}>
                <div className="mb-1 flex justify-between text-sm">
                  <span>{item.status}</span>
                  <span>{item.count}</span>
                </div>
                <div className="h-2 rounded-full bg-muted">
                  <div className="h-2 rounded-full bg-primary" style={{ width: `${(item.count / maxStatus) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="font-semibold">OS por periodo</h2>
          </CardHeader>
          <CardContent className="flex h-64 items-end gap-3">
            {["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"].map((month, index) => {
              const height = 24 + ((index + data.serviceOrders.length) % 5) * 16;
              return (
                <div key={month} className="flex flex-1 flex-col items-center gap-2">
                  <div className="w-full rounded-t-md bg-primary" style={{ height }} />
                  <span className="text-xs text-muted-foreground">{month}</span>
                </div>
              );
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h2 className="font-semibold">Produtividade da equipe</h2>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.users.map((user) => {
              const total = data.serviceOrders.filter((order) => order.responsible === user.name).length + data.photos.filter((photo) => photo.uploadedBy === user.name).length;
              return (
                <div key={user.id} className="rounded-md border p-3">
                  <div className="flex justify-between gap-3 text-sm">
                    <span className="font-medium">{user.name}</span>
                    <span>{total} acoes</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{user.role}</p>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="font-semibold">Ultimas OS</h2>
          <Button variant="ghost" asChild>
            <Link href="/ordens-servico">Ver todas <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="py-2">Numero</th>
                <th>Obra</th>
                <th>Responsavel</th>
                <th>Status</th>
                <th>Abertura</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {latestOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-3 font-medium">{order.number}</td>
                  <td>{data.works.find((work) => work.id === order.workId)?.name ?? "-"}</td>
                  <td>{order.responsible}</td>
                  <td>{order.status}</td>
                  <td>{formatDate(order.openedAt)}</td>
                  <td className="text-right">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/ordens-servico/${order.id}`}>Abrir</Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </ProtectedPage>
  );
}
