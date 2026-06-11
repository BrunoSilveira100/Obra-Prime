import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(2, "Informe o nome."),
  email: z.string().email("Informe um email valido."),
  role: z.enum(["Administrador", "Engenheiro", "Tecnico de Campo"]),
  status: z.enum(["Ativo", "Inativo"])
});

export type UserFormData = z.infer<typeof userSchema>;
