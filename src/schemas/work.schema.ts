import { z } from "zod";

export const workSchema = z.object({
  name: z.string().min(2, "Informe o nome da obra."),
  client: z.string().min(2, "Informe o cliente."),
  address: z.string().min(2, "Informe o endereco."),
  responsible: z.string().min(2, "Informe o responsavel."),
  startDate: z.string().min(1, "Informe a data de inicio."),
  expectedEndDate: z.string().min(1, "Informe a previsao de termino."),
  status: z.enum(["Planejamento", "Em andamento", "Pausada", "Concluida"])
});

export type WorkFormData = z.infer<typeof workSchema>;
