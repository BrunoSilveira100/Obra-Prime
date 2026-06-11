"use client";

import Link from "next/link";
import { ArrowLeft, Camera, FileText, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { ProtectedPage } from "@/components/layout/protected-page";
import { confirmAction } from "@/components/shared/confirm";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/hooks/use-auth";
import { addNote, addPhotos, deletePhoto } from "@/services/storage";
import { formatDate, formatDateTime } from "@/utils/date";

export function ServiceOrderDetailPage({ id }: { id: string }) {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const [note, setNote] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const order = data.serviceOrders.find((item) => item.id === id);
  const work = order ? data.works.find((item) => item.id === order.workId) : null;
  const notes = data.notes.filter((item) => item.serviceOrderId === id);
  const photos = data.photos.filter((item) => item.serviceOrderId === id);
  const activities = data.activities.filter((item) => item.entityId === id || item.entity === "OS").slice(0, 8);

  if (!order) {
    return (
      <ProtectedPage>
        <EmptyState title="OS nao encontrada" description="A ordem de servico pode ter sido excluida." />
        <Button asChild><Link href="/ordens-servico">Voltar</Link></Button>
      </ProtectedPage>
    );
  }

  function handleNote() {
    if (!note.trim()) {
      toast({ type: "error", title: "Observacao vazia", description: "Escreva uma observacao antes de salvar." });
      return;
    }
    addNote({ serviceOrderId: id, user: session?.user.name ?? "Sistema", text: note });
    setNote("");
    toast({ type: "success", title: "Observacao registrada" });
  }

  function handleFiles(files: FileList | null) {
    if (!files?.length) return;
    const mapped = Array.from(files).map((file) => ({
      serviceOrderId: id,
      workId: order!.workId,
      uploadedBy: session?.user.name ?? "Sistema",
      name: file.name,
      url: URL.createObjectURL(file),
      location: "Localizacao preparada"
    }));
    addPhotos(mapped);
    toast({ type: "success", title: "Fotos enviadas", description: `${mapped.length} imagem(ns) adicionada(s).` });
  }

  function removePhoto(photoId: string) {
    if (!confirmAction("Excluir esta foto?")) return;
    deletePhoto(photoId, session?.user.name);
    toast({ type: "success", title: "Foto excluida" });
  }

  function report() {
    toast({ type: "info", title: "Relatorio simulado", description: "Geracao de PDF sera conectada ao backend posteriormente." });
  }

  return (
    <ProtectedPage>
      <PageHeader
        title={order.number}
        description={`${work?.name ?? "Obra"} - ${order.status}`}
        actions={
          <>
            <Button variant="outline" asChild><Link href="/ordens-servico"><ArrowLeft className="h-4 w-4" />Voltar</Link></Button>
            <Button onClick={report}><FileText className="h-4 w-4" />Gerar relatorio</Button>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <Card>
            <CardHeader><h2 className="font-semibold">Dados completos</h2></CardHeader>
            <CardContent className="grid gap-3 text-sm sm:grid-cols-2">
              <p><strong>Obra:</strong> {work?.name ?? "-"}</p>
              <p><strong>Responsavel:</strong> {order.responsible}</p>
              <p><strong>Prioridade:</strong> {order.priority}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Abertura:</strong> {formatDate(order.openedAt)}</p>
              <p><strong>Conclusao:</strong> {formatDate(order.completedAt)}</p>
              <p className="sm:col-span-2"><strong>Descricao:</strong> {order.description}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><h2 className="font-semibold">Observacoes</h2></CardHeader>
            <CardContent className="space-y-4">
              <Textarea placeholder="Registrar observacao" value={note} onChange={(event) => setNote(event.target.value)} />
              <Button onClick={handleNote}><Plus className="h-4 w-4" />Adicionar observacao</Button>
              {notes.length === 0 ? <EmptyState title="Sem observacoes" description="Registre acompanhamentos tecnicos da OS." /> : notes.map((item) => (
                <div key={item.id} className="rounded-md border p-3 text-sm">
                  <p>{item.text}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{item.user} - {formatDateTime(item.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader><h2 className="font-semibold">Historico de alteracoes</h2></CardHeader>
            <CardContent className="space-y-3">
              {activities.map((activity) => (
                <div key={activity.id} className="rounded-md border p-3 text-sm">
                  <p className="font-medium">{activity.action}</p>
                  <p className="text-muted-foreground">{activity.summary}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{activity.user} - {formatDateTime(activity.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader><h2 className="font-semibold">Fotos da OS</h2></CardHeader>
          <CardContent className="space-y-4">
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed p-6 text-center">
              <Camera className="h-8 w-8 text-muted-foreground" />
              <span className="mt-2 text-sm font-medium">Upload de fotos</span>
              <span className="text-xs text-muted-foreground">Selecione uma ou mais imagens</span>
              <Input className="hidden" type="file" accept="image/*" multiple onChange={(event) => handleFiles(event.target.files)} />
            </label>
            {photos.length === 0 ? <EmptyState title="Sem fotos" description="Anexe evidencias fotograficas da OS." /> : (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo) => (
                  <div key={photo.id} className="overflow-hidden rounded-md border">
                    <button className="block aspect-square w-full bg-muted" onClick={() => setPreview(photo.url)} type="button">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                    </button>
                    <div className="flex items-center justify-between gap-2 p-2">
                      <span className="truncate text-xs">{photo.name}</span>
                      <Button variant="ghost" size="icon" onClick={() => removePhoto(photo.id)} aria-label="Excluir foto"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreview(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Imagem ampliada" className="max-h-full max-w-full rounded-lg object-contain" />
        </div>
      ) : null}
    </ProtectedPage>
  );
}
