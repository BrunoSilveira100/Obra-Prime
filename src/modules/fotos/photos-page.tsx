"use client";

import { Download, Eye, Trash2, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { ProtectedPage } from "@/components/layout/protected-page";
import { confirmAction } from "@/components/shared/confirm";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { useToast } from "@/components/shared/toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAppData } from "@/hooks/use-app-data";
import { useAuth } from "@/hooks/use-auth";
import { addPhotos, deletePhoto } from "@/services/storage";
import { formatDateTime } from "@/utils/date";

export function PhotosPage() {
  const data = useAppData();
  const { session } = useAuth();
  const { toast } = useToast();
  const [serviceOrderId, setServiceOrderId] = useState(data.serviceOrders[0]?.id ?? "");
  const [filterOrder, setFilterOrder] = useState("Todas");
  const [preview, setPreview] = useState<string | null>(null);

  const photos = useMemo(() => data.photos.filter((photo) => filterOrder === "Todas" || photo.serviceOrderId === filterOrder), [data.photos, filterOrder]);

  function handleFiles(files: FileList | null) {
    if (!files?.length || !serviceOrderId) {
      toast({ type: "error", title: "Selecione uma OS", description: "A foto precisa estar associada a uma ordem de servico." });
      return;
    }
    const order = data.serviceOrders.find((item) => item.id === serviceOrderId);
    const mapped = Array.from(files).map((file) => ({
      serviceOrderId,
      workId: order?.workId,
      uploadedBy: session?.user.name ?? "Sistema",
      name: file.name,
      url: URL.createObjectURL(file),
      location: "Localizacao preparada"
    }));
    addPhotos(mapped);
    toast({ type: "success", title: "Upload concluido", description: `${mapped.length} imagem(ns) adicionada(s).` });
  }

  function remove(id: string) {
    if (!confirmAction("Excluir esta imagem?")) return;
    deletePhoto(id, session?.user.name);
    toast({ type: "success", title: "Imagem excluida" });
  }

  function download(url: string, name: string) {
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = name;
    anchor.click();
    toast({ type: "info", title: "Download iniciado", description: name });
  }

  return (
    <ProtectedPage>
      <PageHeader title="Registro Fotografico" description="Envie, visualize, baixe e exclua fotos associadas a OS." />
      <Card>
        <CardContent className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
          <Select value={serviceOrderId} onChange={(event) => setServiceOrderId(event.target.value)}>
            {data.serviceOrders.map((order) => <option key={order.id} value={order.id}>{order.number}</option>)}
          </Select>
          <Select value={filterOrder} onChange={(event) => setFilterOrder(event.target.value)}>
            <option>Todas</option>
            {data.serviceOrders.map((order) => <option key={order.id} value={order.id}>{order.number}</option>)}
          </Select>
          <label className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground">
            <Upload className="h-4 w-4" />
            Upload multiplo
            <Input className="hidden" type="file" accept="image/*" multiple onChange={(event) => handleFiles(event.target.files)} />
          </label>
        </CardContent>
      </Card>
      {photos.length === 0 ? <EmptyState title="Nenhuma foto registrada" description="Envie fotos e associe a uma OS." /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {photos.map((photo) => {
            const order = data.serviceOrders.find((item) => item.id === photo.serviceOrderId);
            return (
              <Card key={photo.id} className="overflow-hidden">
                <button type="button" className="aspect-video w-full bg-muted" onClick={() => setPreview(photo.url)}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.name} className="h-full w-full object-cover" />
                </button>
                <CardContent className="space-y-3">
                  <div>
                    <p className="truncate text-sm font-medium">{photo.name}</p>
                    <p className="text-xs text-muted-foreground">{order?.number ?? "Sem OS"} - {formatDateTime(photo.createdAt)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPreview(photo.url)}><Eye className="h-4 w-4" />Ver</Button>
                    <Button variant="outline" size="sm" onClick={() => download(photo.url, photo.name)}><Download className="h-4 w-4" />Baixar</Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(photo.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      {preview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4" onClick={() => setPreview(null)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="Imagem ampliada" className="max-h-full max-w-full rounded-lg object-contain" />
        </div>
      ) : null}
    </ProtectedPage>
  );
}
