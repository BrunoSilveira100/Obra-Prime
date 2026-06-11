"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/shared/toast";
import { login, requestPasswordReset } from "@/services/auth-service";
import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";

export function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "admin@obraprime.com", password: "1234" }
  });

  async function onSubmit(values: LoginFormData) {
    setLoading(true);
    try {
      await login(values.email, values.password);
      toast({ type: "success", title: "Login realizado", description: "Sessao simulada iniciada." });
      router.replace("/dashboard");
    } catch (error) {
      toast({ type: "error", title: "Nao foi possivel entrar", description: error instanceof Error ? error.message : "Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword() {
    const email = form.getValues("email");
    try {
      await requestPasswordReset(email);
      toast({ type: "info", title: "Recuperacao simulada", description: "Fluxo/token de recuperacao preparado para integracao com email." });
    } catch (error) {
      toast({ type: "error", title: "Informe um email valido", description: error instanceof Error ? error.message : "Verifique o campo email." });
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4">
      <section className="w-full max-w-md rounded-lg border bg-card p-6 shadow-sm">
        <div className="mb-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-primary text-lg font-bold text-primary-foreground">OP</div>
          <h1 className="text-2xl font-semibold">Obra Prime Web</h1>
          <p className="mt-1 text-sm text-muted-foreground">Acesse a gestao operacional das obras.</p>
        </div>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email</label>
            <Input id="email" type="email" autoComplete="email" {...form.register("email")} />
            {form.formState.errors.email ? <p className="mt-1 text-xs text-destructive">{form.formState.errors.email.message}</p> : null}
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">Senha</label>
            <div className="relative">
              <Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" {...form.register("password")} />
              <button
                className="absolute right-2 top-2.5 text-muted-foreground"
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {form.formState.errors.password ? <p className="mt-1 text-xs text-destructive">{form.formState.errors.password.message}</p> : null}
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Entrar
          </Button>
          <Button className="w-full" type="button" variant="ghost" onClick={handleForgotPassword}>
            Recuperar senha
          </Button>
        </form>
      </section>
    </main>
  );
}
