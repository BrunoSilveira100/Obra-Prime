import { z } from "zod";

export const serviceOrderSchema = z.object({
  number: z.string().min(2, "Informe o numero da OS."),
  workId: z.string().min(1, "Selecione a obra."),
  responsible: z.string().min(2, "Informe o responsavel."),
  description: z.string().min(5, "Descreva a OS."),
  priority: z.enum(["Baixa", "Media", "Alta", "Critica"]),
  openedAt: z.string().min(1, "Informe a data de abertura."),
  completedAt: z.string().optional(),
  status: z.enum(["Aberta", "Em execucao", "Aguardando aprovacao", "Finalizada"])
});

export type ServiceOrderFormData = z.infer<typeof serviceOrderSchema>;
