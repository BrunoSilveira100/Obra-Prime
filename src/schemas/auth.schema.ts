import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Informe um email valido."),
  password: z.string().min(4, "A senha deve ter ao menos 4 caracteres.")
});

export type LoginFormData = z.infer<typeof loginSchema>;
