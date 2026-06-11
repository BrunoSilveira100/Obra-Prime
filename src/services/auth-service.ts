import { getData, setSession } from "@/services/storage";
import type { Session } from "@/types/domain";

export async function login(email: string, password: string): Promise<Session> {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const user = getData().users.find((item) => item.email.toLowerCase() === email.toLowerCase() && item.status === "Ativo");
  if (!user || password.length < 4) {
    throw new Error("Email ou senha invalidos.");
  }
  const session = { user, token: `mock-jwt-${Date.now()}` };
  setSession(session);
  return session;
}

export async function requestPasswordReset(email: string) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (!email.includes("@")) throw new Error("Informe um email valido.");
  return true;
}
