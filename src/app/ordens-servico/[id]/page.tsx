import { ServiceOrderDetailPage } from "@/modules/ordens-servico/service-order-detail-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ServiceOrderDetailPage id={id} />;
}
